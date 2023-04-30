import { useAppState } from "~/providers/StateProvider";

export interface TimeItemProps {
  time: React.ReactNode;
  activated?: boolean;
  time_mode: number;
}

export const TimeItem: React.FC<TimeItemProps> = ({
  time,
  activated,
  time_mode,
}: TimeItemProps) => {
  const {
    actions: { setTimeMode },
  } = useAppState();
  return (
    <div
      className={`w-[64px] h-[64px] rounded-md flex items-center justify-center border cursor-pointer ${
        activated ? "bg-red-100" : "bg-white"
      }`}
      onClick={() => setTimeMode(time_mode)}
    >
      {time}
    </div>
  );
};
