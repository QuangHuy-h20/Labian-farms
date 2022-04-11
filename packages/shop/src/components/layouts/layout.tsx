import { ReactNode, ReactElement } from "react";
import Header from "./header";

export interface ILayoutProps {
	children: ReactNode
}
const Layout = ({ children }: ILayoutProps) => {
	return <div className=" relative flex flex-col min-h-screen bg-gray-100">
		<Header />
		<div className="layout ">
		{children}
		</div>
	</div>;
};
export default Layout;
