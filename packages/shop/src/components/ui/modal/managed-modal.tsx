// import UploadAvatar from "@components/profile/upload-avatar";
// import dynamic from "next/dynamic";
// import ModalComponent from "./modal";
// import { useModalAction, useModalState } from "./modal.context";

// const Login = dynamic(() => import("@components/auth/login-form"));
// const Register = dynamic(() => import("@components/auth/register-form"));
// const ForgotPassword = dynamic(
//   () => import("@components/auth/forgot-password-form")
// );
// const ResetPassword = dynamic(
//   () => import("@components/auth/reset-password-form")
// );
// const FarmInfoCard = dynamic(() => import("@components/shops/sidebar"));

// const Modal = () => {
//   const { name, data, isOpen } = useModalState();
//   const { closeModal } = useModalAction();
//   return (
//     <ModalComponent open={isOpen} onClose={closeModal}>
//       {name === "LOGIN" && <Login />}
//       {name === "REGISTER" && <Register />}
//       {name === "FORGOT_PASSWORD" && <ForgotPassword />}
//       {name === "RESET_PASSWORD" && <ResetPassword />}
//       {name === "UPLOAD_AVATAR" && <UploadAvatar />}
//       {name === "FARM_INFO" && (
//         <FarmInfoCard
//           farm={data?.farm}
//           cardClassName="!hidden"
//           className="!flex !h-screen !w-screen max-w-screen-sm flex-col"
//         />
//       )}
//     </ModalComponent>
//   );
// };

// export default Modal;
