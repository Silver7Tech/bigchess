import { Flag, FrontHand, SettingCog } from '~/assets/icons';
import { Button } from '../UI';
import Panel from '../UI/Panel.ui';

export default function History() {
  return (
    <Panel
      containerStyles={{ height: 'calc( 100% - 132px )' }}
      header={
        <div className="flex justify-between">
          <div className="font-bold">Moves</div>
          <SettingCog className="w-5" />
        </div>
      }
      body={null}
      footer={
        <div className="flex gap-4">
          <Button
            text="Offer Draw"
            className="flex border items-center flex-1 justify-center gap-0.5 border-gray-200 shadow-lg"
            icon={<FrontHand className="w-5" />}
          />
          <Button
            text="Resign"
            className="flex border items-center flex-1 justify-center gap-0.5 border-gray-200 shadow-lg"
            icon={<Flag className="w-5" />}
          />
        </div>
      }
    />
  );
}
