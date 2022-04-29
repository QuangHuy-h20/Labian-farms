import UploadAvatar from '@components/profile/upload-avatar';
import dynamic from 'next/dynamic';
import ModalComponent from './modal-component';
import { useModalAction, useModalState } from './modal.context';

const Login = dynamic(() => import('@components/auth/login-form'))
const Register = dynamic(() => import('@components/auth/register-form'))
const ForgotPassword = dynamic(() => import('@components/auth/forgot-password-form'))
const ResetPassword = dynamic(()=> import('@components/auth/reset-password-form'))

const Modal = () => {
	const { name, data, isOpen } = useModalState()
	const { closeModal } = useModalAction()
	return (
		<ModalComponent open={isOpen} onClose={closeModal} >
			{name === 'LOGIN' && <Login />}
			{name === 'REGISTER' && <Register />}
			{name === 'FORGOT_PASSWORD' && <ForgotPassword />}
			{name === 'RESET_PASSWORD' && <ResetPassword />}
			{name === 'UPLOAD_AVATAR' && <UploadAvatar />}
		</ModalComponent>
	)
};

export default Modal;
