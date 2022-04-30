import { useMeQuery } from '@generated/graphql'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ROUTES } from './routes'

const useCheckUser = () => {
	const { data, loading } = useMeQuery()
	const router = useRouter()

	useEffect(() => {
		if (
			!loading &&
			data.me) {
			router.replace(ROUTES.LOGIN)
		}
	}, [data, loading])
	return { data, loading }
}

export default useCheckUser