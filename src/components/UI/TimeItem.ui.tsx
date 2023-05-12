import { GameMode } from '../Room/Option';

export interface TimeItemProps {
  mode: GameMode;
  activated?: boolean;
  onActivated?: () => void;
}

export const TimeItem: React.FC<TimeItemProps> = ({
  mode,
  activated,
  onActivated,
}: TimeItemProps) => {
  const label = mode.increment ? `${mode.duration} / ${mode.increment}` : `${mode.duration}min`;
  return (
    <div
      className={`w-[64px] h-[64px] rounded-md flex items-center justify-center border cursor-pointer ${
        activated ? 'bg-red-100' : 'bg-white'
      }`}
      onClick={onActivated}
    >
      {label}
    </div>
  );
};
