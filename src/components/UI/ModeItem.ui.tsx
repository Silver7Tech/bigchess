import { Blitz, Bullet, Rapid, Settings } from '~/assets/icons';
import { useAppState } from '~/providers/StateProvider/StateProvider';
export interface ModeItemProps {
  SVG: string;
  activated?: boolean;
  mode_number: number;
}
const Icons = (props: { SVG: string }) => {
  switch (props.SVG) {
    case 'bullet':
      return <Bullet />;
    case 'blitz':
      return <Blitz />;
    case 'rapid':
      return <Rapid />;
    case 'classical':
      return <Settings />;
    default:
      return null;
  }
};

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
        activated ? 'hover:bg-red-200' : 'hover:bg-gray-200'
      } cursor-pointer ${activated ? 'bg-red-100' : 'bg-white'}`}
      onClick={() => setGameMode(mode_number)}
    >
      <Icons SVG={SVG} />
    </div>
  );
};
