import { useRouter } from "next/router";
import Header from "./header";
export interface ILayoutProps {
	children: React.ReactNode
}

// if (typeof window !== "undefined") {
// 	// eslint-disable-next-line global-require
// 	require("smooth-scroll")('a[href*="/"]', {
// 		speed: 2000,
// 		speedAsDuration: true,
// 	})
// }

const Layout = ({ children }: ILayoutProps) => {
	// const router = useRouter()
	// const isHome = router.pathname === '/[[...pages]]';

	return <div className="relative flex flex-col min-h-screen bg-gray-100">
		<Header />
		<div>
			{children}
		</div>
	</div>;
};
export default Layout;
