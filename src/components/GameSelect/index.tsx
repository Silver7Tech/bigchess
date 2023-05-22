import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '~/assets/CONSTANTS';
import game_modes from '~/assets/game_modes.json';
import { Button } from '~/components/UI';
import { ModeItem } from '~/components/UI/ModeItem.ui';
import { trpc } from '~/helpers/trpc';
import { GameCategory, GameMode } from '~/interfaces';
import { appActions } from '~/store';
import { Ticket } from '~/store/lobby.store';
import { TimeItem } from '../UI/TimeItem.ui';
import { PlayingStatus } from './PlayingStatus';
import Panel from '../UI/Panel.ui';
import './styles.css';

type CategoryMap = { [key in GameCategory]: (GameMode & { index: number })[] };
const categorize = () => {
  const result: CategoryMap = {
    blitz: [],
    bullet: [],
    classical: [],
    rapid: [],
  };
  const list = game_modes as GameMode[];
  if (!game_modes) return result;
  list.forEach((mode, index) => {
    if (result[mode.category]) result[mode.category].push({ ...mode, index });
  });
  return result;
};
const categories = categorize();

export const Option = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    selected_index: null as number | null,
    selected_category: 'bullet' as GameCategory,
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const selected = game_modes[state.selected_index!];
      if (!selected) return;
      return (await trpc.mutation('matcher.join', {
        time_control_limit: selected.duration * 60 * 1000,
        time_control_inc: (selected.increment || 0) * 1000,
      })) as Awaited<{ ticket: Ticket }>;
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess({ ticket }: any) {
      if (!ticket) return appActions.lobby.ticket(null);
      appActions.lobby.ticket(ticket);
      if (ticket.game_id) return navigate(`/play/${ticket.game_id}`);
    },
  });

  function onClickPlay() {
    if (!state.selected_index) return;

    const mode = game_modes[state.selected_index];

    if (!mode) return;

    mutate();
  }
  return (
    <Panel
      body={
        <div className="flex flex-col justify-between gap-2 p-4 flex-1">
          <div>
            <div className="flex flex-col gap-1">
              <p className="font-bold">Game Mode:</p>
              <div className="flex gap-1 justify-around">
                {CATEGORIES.map((category, index) => {
                  return (
                    <ModeItem
                      SVG={category}
                      mode_number={index}
                      key={`mode-${index}`}
                      activated={state.selected_category === category}
                      onActivated={() => setState({ ...state, selected_category: category })}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-8">
              <p className="font-bold">Time:</p>
              <div className="flex gap-2 justify-center">
                {categories?.[state.selected_category].map((mode) => {
                  return (
                    <TimeItem
                      key={mode.index}
                      mode={mode}
                      activated={mode.index === state.selected_index}
                      onActivated={() => setState({ ...state, selected_index: mode.index })}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col mt-6 gap-2">
              <Button
                text="Play"
                className="w-full border font-bold"
                bg_colorHover="bg-red-200"
                text_colorHover={`text-white-100`}
                height="h-12"
                onClick={onClickPlay}
              />

              <Button text="Invite a Friend" className="w-full border font-bold" height="h-12" />
            </div>
          </div>
        </div>
      }
      footer={<PlayingStatus />}
      header={
        <div className="w-full flex justify-between text-bold ">
          <p>Play</p>
          <p>Friends</p>
        </div>
      }
    />
  );
};
