import Link from "next/link";
import { Burger, Search } from "@assets/icons";
import { ROUTES } from "./routes";
import { useModalAction } from "./Modal/modal.context";
import { useMeQuery, useLogoutMutation, MeQuery, MeDocument } from "@generated/graphql";
import Image from "next/image";
import { useRouter } from "next/router";


const Header = () => {
	const { data: meData, loading: meLoading } = useMeQuery();
	const [logout] = useLogoutMutation()
	const { openModal } = useModalAction();
	const router = useRouter()
	let body: any;

	if (meLoading) body = null
	else if (!meData?.me) body = (
		<button onClick={() => openModal('LOGIN')} className="ml-2 px-4 py-2 rounded-md font-bold text-white bg-emerald-500 hover:bg-emerald-600 duration-300">Đăng nhập</button>
	)
	else body = (
		<div className="flex flex-row items-center ml-4">
			<div className="flex flex-col justify-center items-center">
				<span className="text-emerald-600">{meData.me.nickname ? meData.me.nickname : meData.me.email.split("@").pop()}</span>
			</div>
			<div className="h-12 w-12 flex justify-center items-center border rounded-full ml-2">
				{!meData.me.avatar ? (<span>{meData?.me?.email.charAt(0).toUpperCase()}</span>) : <Image src={`${meData.me?.avatar}`} width={40} height={40} layout="fixed" />}
			</div>
			<button onClick={() => handleLogout()} className="bg-none">Logout</button>
		</div>
	)

	const handleLogout = async () => {
		await logout({
			update(cache, { data }) {
				if (data.logout) {
					cache.writeQuery<MeQuery>({
						query: MeDocument,
						data: { me: null }
					})
				}
			}
		})
		router.push("/")
	}
	return (
		<header className=" flex h-24 w-full">
			<div className="flex items-center justify-between w-full font-medium">
				<div className="lg:hidden"><Burger /></div>

				<div className="flex items-center">
					<Link href="/">
						<a className="text-2xl lg:text-3xl text-emerald-600">Labian Farms</a>
					</Link>
				</div>


				<ul className="hidden flex-row items-center lg:flex">
					{ROUTES.menu.map(item => (
						<li className="px-5" key={item.name}>
							<Link href={item.route}>
								<a className="text-gray-400 text-sm font-semibold hover:text-emerald-600 duration-300">{item.name}</a>
							</Link>
						</li>
					))}
					<div className="">{body}</div>
				</ul>
				<div className="lg:hidden"><Search fill="#292D32" height="22" width="22" /></div>
			</div>

		</header >
	)
};

export default Header;
