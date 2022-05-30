import UploadAvatar from "@components/profile/upload-avatar"
import Link from "@components/ui/link"
import { useMeQuery } from "@generated/graphql"
import classNames from "classnames"
import { useRouter } from "next/router"
import { FC } from "react"
import { ROUTES } from '../../utils/routes'
type SidebarProps = {
	className?: string
}

const Sidebar: FC<SidebarProps> = ({ className }) => {
	const { data: meData } = useMeQuery()
	const { pathname } = useRouter()

	return (
		<aside className="flex-shrink-0 hidden mr-8 lg:block lg:w-80">
			<div className="bg-white border min-h-full rounded  px-10 py-8 mb-5">
				<h3 className="text-center text-lg font-semibold mb-4">
					Avatar
				</h3>
				<UploadAvatar />
			</div>
			<div className="bg-white rounded border overflow-hidden">
				<ul className="py-8">
					{ROUTES.profile
						?.slice(0, -1)
						.map((item: any, idx) => (
							<li className="py-2" key={idx}>
								<Link
									href={item.route}
									className={classNames(
										'block py-2 px-10 font-semibold text-gray-600 transition-colors border-l-4 border-transparent hover:text-emerald-600 focus:text-emerald-600',
										{
											'border-emerald-600 text-emerald-600': pathname === item.route,
										}
									)}
								>
									{item.name}
								</Link>
							</li>
						))}
				</ul>
			</div>
		</aside>
	)
}

export default Sidebar