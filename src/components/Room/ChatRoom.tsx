import { Button, Input } from '~/components/UI';
import Panel from '../UI/Panel.ui';
export const ChatRoom: React.FC = () => {
  return (
    <Panel
      body={null}
      containerStyles={{ height: 'calc( 100% - 132px )' }}
      footer={
        <div className="flex items-center gap-2">
          <Input className="flex-1" />
          <Button text="Send" className="bg-blue-100 text-white-100" />
        </div>
      }
      header={<div className="font-bold">Chat</div>}
    />
  );
};
