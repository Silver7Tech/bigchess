import { LoginModal } from "~/components/Modal/Auth/Login";
import { RegisterModal } from "~/components/Modal/Auth/Register";
import { useAppState } from "~/providers/StateProvider/StateProvider";
import { Content, Overlay, Portal } from "@radix-ui/react-dialog";
import "./styles.css";

export const AuthModal: React.FC = () => {
  const {
    state: { userState },
  } = useAppState();
  return (
    <Portal className="">
      <Overlay className="DialogOverlay bg-gray-500 bg-opacity-75 z-50" />
      <Content className="DialogContent z-50">
        {userState ? <RegisterModal /> : <LoginModal />}
      </Content>
    </Portal>
  );
};
