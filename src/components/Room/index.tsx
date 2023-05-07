import { Option } from '~/components/Room/Option';
import Board from '../Board';

const Room = () => {
  return (
    <div className="flex py-10 justify-center gap-10">
      <Board
        onChange={(_fen: string) => {
          // console.log(fen);
        }}
      />
      <Option />
    </div>
  );
};

export default Room;
