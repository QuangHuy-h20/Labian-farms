import { MeDocument, MeQuery, useLogoutMutation } from '@generated/graphql'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Spinner } from '@components/index';
export default function Logout() {

	const [logout] = useLogoutMutation()
	const router = useRouter()
	useEffect(() => {
		logout({
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
	}, [])
	return (
		<div className="min-h-screen  grid place-items-center">
			<div className="text-center">
				<Spinner />
			</div>
		</div>
	)
}
