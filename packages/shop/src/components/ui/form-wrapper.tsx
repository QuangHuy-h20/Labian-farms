import { ReactNode } from "react";

interface IChildrenProps {
	children: ReactNode
}

const WrapperForm = ({ children }: IChildrenProps) => {
	return (
		<div className="flex justify-center drop-shadow-2xl">
			{children}
		</div>
	)
};

export default WrapperForm;
