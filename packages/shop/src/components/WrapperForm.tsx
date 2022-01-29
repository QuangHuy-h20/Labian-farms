import { ReactNode } from "react";

interface IChildrenProps {
	children: ReactNode
}

const WrapperForm = ({children} : IChildrenProps) => {
  return (
	<div className="flex justify-center">
		{children}
	</div>
  )
};

export default WrapperForm;
