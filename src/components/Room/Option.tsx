import { Button } from '~/components/UI';
import { ModeItem } from '~/components/UI/ModeItem.ui';

import { useMemo } from 'react';
import { useTrpcQuery } from '~/hooks/useTrpcQuery';
import { appActions, useTrackedStore } from '~/store';
import { TimeItem } from '../UI/TimeItem.ui';
import { PlayingStatus } from './PlayingStatus';

export type GameCategory = 'classical' | 'blitz' | 'rapid' | 'bullet';

export type GameMode = { id: string; increment: number; duration: number; category: GameCategory };

const CATEGORIES: GameCategory[] = ['bullet', 'blitz', 'rapid', 'classical'];
export const Option = () => {
  const { data: gameModeData, isFetched } = useTrpcQuery<{}, GameMode[]>('lobby.list', {}, {});

  const categories = useMemo<{ [key in GameCategory]: GameMode[] }>(() => {
    const result: { [key in GameCategory]: GameMode[] } = {
      blitz: [],
      bullet: [],
      classical: [],
      rapid: [],
    };
    if (!gameModeData) return result;
    gameModeData?.forEach((mode) => {
      if (result[mode.category]) result[mode.category].push(mode);
    });
    return result;
  }, [gameModeData]);
  const selected_category = useTrackedStore().lobby.category();
  const selected_modeId = useTrackedStore().lobby.modeId();



  function onClickPlay() {
    if (!selected_modeId) return;
  }
  return (
    <div className={`min-w-[256px] border border-sky-600 flex flex-col flex-none`}>
      <div className="w-full flex justify-between px-4 py-4 border-b text-bold ">
        <p>Play</p>
        <p>Friends</p>
      </div>
      <div className="flex flex-col justify-between gap-2 p-4 flex-1">
        <div>
          {isFetched && (
            <>
              <div className="flex flex-col gap-1">
                <p className="font-bold">Game Mode:</p>
                <div className="flex gap-1 justify-around">
                  {CATEGORIES?.map((category, index) => {
                    return (
                      <ModeItem
                        SVG={category}
                        mode_number={index}
                        key={`mode-${index}`}
                        activated={selected_category === category}
                        onActivated={() => appActions.lobby.category(category)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-8">
                <p className="font-bold">Time:</p>
                <div className="flex gap-2 justify-center">
                  {isFetched
                    ? categories?.[selected_category].map((mode) => {
                        return (
                          <TimeItem
                            key={mode.id}
                            mode={mode}
                            activated={mode.id === selected_modeId}
                            onActivated={() => appActions.lobby.modeId(mode.id)}
                          />
                        );
                      })
                    : null}
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
            </>
          )}
        </div>
        <div className="self-end">
          <PlayingStatus />
        </div>
      </div>
    </div>
  );
};
