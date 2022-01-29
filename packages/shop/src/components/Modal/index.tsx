import dynamic from 'next/dynamic';
import React from 'react';
import ModalComponent from './modal';
import { useModalAction, useModalState } from './modal.context';

const Login = dynamic(() => import('@components/Auth/login-form'))
const Modal = () => {
	const { name, data, isOpen } = useModalState()
	const { closeModal } = useModalAction()
	return (
		<ModalComponent open={isOpen} onClose={closeModal} >
			{name === 'LOGIN' && <Login />}
			{/* {name === 'REGISTER' && <Register />} */}
		</ModalComponent>
	)
};

export default Modal;
