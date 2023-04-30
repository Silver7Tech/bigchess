import { Button } from "~/components/UI";
import { ModeItem } from "~/components/UI/ModeItem.ui";
import gameModeData from "~/assets/game_modes.json";
import timeModeData from "~/assets/time_modes.json";
import { TimeItem } from "~/components/UI/TimeItem.ui";
import { useAppState } from "~/providers/StateProvider";
export interface OptionInterface {
  isPlaying: boolean;
}
export const Option: React.FC<OptionInterface> = ({
  isPlaying,
}: OptionInterface) => {
  const {
    state: { gameMode, timeMode },
  } = useAppState();
  return (
    <div
      className={`relative col-span-2 max-w-[348px] border border-sky-600 mx-2 bg-orange-100 ${
        isPlaying ? "" : "pointer-events-none"
      }`}
    >
      <div className="w-full flex justify-between px-4 py-4 bg-orange-300 border-b text-bold ">
        <p>Play</p>
        <p>Friends</p>
      </div>
      <div className="flex flex-col justify-between gap-2 p-4">
        <div className="flex flex-col">
          <p className="font-bold">Game Mode:</p>
          <div className="flex gap-1">
            {gameModeData.map((mode, index) => {
              return (
                <ModeItem
                  key={index}
                  activated={gameMode === index ? true : false}
                  mode_number={index}
                  SVG={mode.mode}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <p className="font-bold">Time:</p>
          <div className="flex gap-2 justify-center">
            {timeModeData.map((time, index) => {
              return (
                <TimeItem
                  time={time.time}
                  time_mode={index}
                  activated={timeMode === index ? true : false}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col mt-6 gap-2">
          <Button
            text="Play"
            className="w-full border font-bold"
            height="h-12"
          />

          <Button
            text="Invite a Friend"
            className="w-full border font-bold"
            height="h-12"
          />
        </div>
      </div>
    </div>
  );
};
