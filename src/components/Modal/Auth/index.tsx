import React, {useContext} from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { LoginModal } from '@/components/Modal/Auth/Login'
import { RegisterModal } from '@/components/Modal/Auth/Register'
import { StateContext } from '@/Provider';
import './styles.css';

export const AuthModal: React.FC = () =>{
    const {
        userState,
    } = useContext(StateContext)
    return (
        <Dialog.Portal className=''>
            <Dialog.Overlay className="DialogOverlay bg-gray-500 bg-opacity-75 z-50" />
            <Dialog.Content className="DialogContent z-50">
                {
                    userState 
                    ?
                    <RegisterModal/>
                    :
                    <LoginModal/>
                }
                
            </Dialog.Content>
        </Dialog.Portal>
    )
}