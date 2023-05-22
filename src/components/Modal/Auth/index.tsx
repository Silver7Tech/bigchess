import { Content, Overlay, Portal } from '@radix-ui/react-dialog';
import { LoginModal } from '~/components/Modal/Auth/Login';
import './styles.css';
import { ValidateOTPModal } from './ValidateOTP';
import { useStore } from '~/store';

const ConditionalRender = () => {
  const loginState = useStore().auth.step();

  switch (loginState) {
    case 'login':
      return <LoginModal />;
    case 'validate':
      return <ValidateOTPModal />;
    default:
      return null;
  }
};

export const AuthModal: React.FC = () => {
  return (
    <Portal className="">
      <Overlay className="DialogOverlay bg-gray-500 bg-opacity-75 z-50" />
      <Content className="DialogContent z-50">
        <ConditionalRender />
      </Content>
    </Portal>
  );
};
