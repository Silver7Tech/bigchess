import { useAppState } from "~/providers/StateProvider/StateProvider";
import { Image } from "./Image.ui";
export interface ModeItemProps {
  SVG: string;
  activated?: boolean;
  mode_number: number;
}

export const ModeItem: React.FC<ModeItemProps> = ({
  SVG,
  activated,
  mode_number,
}: ModeItemProps) => {
  const {
    actions: { setGameMode },
  } = useAppState();
  return (
    <div
      className={`w-[64px] h-[64px] rounded-md flex items-center justify-center border ${
        activated ? "hover:bg-red-200" : "hover:bg-gray-200"
      } cursor-pointer ${activated ? "bg-red-100" : "bg-white"}`}
      onClick={() => setGameMode(mode_number)}
    >
      <Image source={SVG} />
    </div>
  );
};
