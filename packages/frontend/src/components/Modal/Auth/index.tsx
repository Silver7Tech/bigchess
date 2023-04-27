import React from 'react'
import Modal from 'react-modal'
import { LoginModal } from './Login'
export interface AuthModalProps{
    isModalOpen: boolean,
    closeModal: () => void,
}
export const AuthModal: React.FC<AuthModalProps> = ({isModalOpen, closeModal}:AuthModalProps) =>{
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="w-1/4 h-2/3 mx-auto my-6 rounded-md overflow-hidden"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            >
            <LoginModal/>
        </Modal>
    )
}