import Link from "next/link";
import { Burger, Search, User, ArrowDown } from "@assets/icons";
import { ROUTES } from "@utils/routes";
import { useMeQuery } from "@generated/graphql";
import { useModalAction } from "@components/modal/modal.context";
import Dropdown from "@components/ui/dropdown";
import Button from "@components/ui/button";


const Header = () => {
	const { data: meData, loading: meLoading } = useMeQuery();
	const { openModal } = useModalAction();
	let body: any;

	if (meLoading) body = null
	else if (!meData?.me) body = <Button size="small" variant="normal" onClick={() => openModal('LOGIN')}>Đăng nhập</Button>
	else body = (
		<Dropdown subItems={ROUTES.account}>

			<div className="flex flex-row ml-4 border-0! items-center">
				<div className="flex flex-col text-right text-sm text-gray-400">
					<p className="font-light">Xin chào,</p>
					<div className="flex flex-row items-center">
						<span className="font-medium mr-1">{meData.me.fullName !== "" ? meData.me.fullName : meData.me.email}</span>
						<ArrowDown />
					</div>
				</div>
				<div className="h-12 w-12 flex justify-center items-center border rounded-full ml-2">
					<User />
				</div>
			</div>
		</Dropdown>
	)

	return (
		<header className="bg-white flex h-24 w-full shadow-md px-3 lg:px-16 z-50">
			<div className="flex items-center justify-between w-full font-medium">
				<div className="lg:hidden"><Burger /></div>

				<div className="flex items-center">
					<Link href="/">
						<a className="text-2xl lg:text-3xl text-emerald-600">Labian Farms</a>
					</Link>
				</div>


				<ul className="hidden flex-row items-center border-0 lg:flex">
					{ROUTES.menu.map(item => (
						<li className="px-5" key={item.name}>
							<Link href={item.route}>
								<a className="text-gray-400 text-sm font-semibold hover:text-emerald-600 duration-300">{item.name}</a>
							</Link>
						</li>
					))}
					<div>{body}</div>
				</ul>
				<div className="lg:hidden"><Search fill="#292D32" height="22" width="22" /></div>
			</div>

		</header >
	)
};

export default Header;
