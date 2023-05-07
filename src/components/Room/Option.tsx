import gameModeData from '~/assets/game_modes.json';
import timeModeData from '~/assets/time_modes.json';
import { Button } from '~/components/UI';
import { ModeItem } from '~/components/UI/ModeItem.ui';
import { TimeItem } from '~/components/UI/TimeItem.ui';
import { useAppState } from '~/providers/StateProvider/StateProvider';
import { PlayingStatus } from './PlayingStatus';

export const Option = () => {
  const {
    state: { gameMode, timeMode },
  } = useAppState();
  return (
    <div className={`max-w-[320px] border border-sky-600 flex flex-col`}>
      <div className="w-full flex justify-between px-4 py-4 border-b text-bold ">
        <p>Play</p>
        <p>Friends</p>
      </div>
      <div className="flex flex-col justify-between gap-2 p-4 flex-1">
        <div>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Game Mode:</p>
            <div className="flex gap-1 justify-around">
              {gameModeData.map((mode, index) => {
                return (
                  <ModeItem
                    key={`mode-${index}`}
                    activated={gameMode === index ? true : false}
                    mode_number={index}
                    SVG={mode.category}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-8">
            <p className="font-bold">Time:</p>
            <div className="flex gap-2 justify-center">
              {timeModeData.map((time, index) => {
                return (
                  <TimeItem
                    key={`time-${index}`}
                    time={time.time}
                    time_mode={index}
                    activated={timeMode === index ? true : false}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col mt-6 gap-2">
            <Button text="Play" className="w-full border font-bold" height="h-12" />

            <Button text="Invite a Friend" className="w-full border font-bold" height="h-12" />
          </div>
        </div>
        <div className="self-end">
          <PlayingStatus />
        </div>
      </div>
    </div>
  );
};
