import Board from '../Board';
import { Option } from './Option';

export default function Lobby() {
  return (
    <div className="room">
      <Board disabled={true} />
      <Option />
    </div>
  );
}
