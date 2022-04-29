import { useModalAction } from "@components/modal/modal.context";
import { useEffect } from "react";

const ResetPassword = () => {
  const { openModal } = useModalAction();

  useEffect(()=>{
    openModal('RESET_PASSWORD' )  
  },[])

  return (
    <></>
  )
}

export default ResetPassword