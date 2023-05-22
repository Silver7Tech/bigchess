import { Content, Overlay, Portal } from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/UI';
type Props = {
  isDraw: boolean;
  isWinner: boolean;
  isAborted: boolean;
  rating: number;
};
export default function Summary(props: Props) {
  const navigate = useNavigate();
  const title = props.isAborted
    ? 'Aborted!'
    : props.isWinner
    ? 'You Win'
    : props.isDraw
    ? 'Draw'
    : 'You Lose';
  return (
    <Portal className="">
      <Overlay className="DialogOverlay bg-gray-500 bg-opacity-75 z-50" />
      <Content className="DialogContent z-50">
        <div className="flex flex-col justify-stretch p-4 min-h-[250px]">
          <div className="flex-1">
            <p className="font-bold text-center mb-3 text-5xl text-gray-300 mx-auto">{title}</p>
            <div className="text-center">Rating: {props.rating || 0}</div>
          </div>
          <div className="w-full flex justify-center gap-2">
            <Button text="New Game" className="bg-blue-100 text-white-100 flex-1" />
            <Button
              text="Main Menu"
              className="bg-gray-200 text-white-100 flex-1"
              onClick={() => {
                navigate('/play');
              }}
            />
          </div>
        </div>
      </Content>
    </Portal>
  );
}
