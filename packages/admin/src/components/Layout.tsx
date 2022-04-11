import { ReactNode } from "react";
import { Header } from '@components/index'

interface ILayoutProps {
	children: ReactNode
}
const Layout = ({ children }: ILayoutProps) => {
	return <div className="relative flex flex-col min-h-screen px-3 lg:px-16">
		<Header />
		{children}
	</div>;
};

export default Layout;
