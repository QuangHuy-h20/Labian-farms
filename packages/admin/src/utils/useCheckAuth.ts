import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFarmByFarmerQuery, useMeQuery } from "../generated/graphql";

export const useCheckAuth = () => {

  const { data: meData, loading: meLoading } = useMeQuery()
  const router = useRouter()
  const { data: farmData, loading: farmLoading } = useFarmByFarmerQuery({
    variables: {
      ownerId: meData?.me?.id
    }
  })

  const { farm } = router.query

  const farmActive = farmData?.farmByFarmer?.isActive



  useEffect(() => {
    if (
      !meLoading &&
      meData.me &&
      (router.route === '/login' ||
        router.route === '/register' ||
        router.route === '/reset-password'
      )) {
      router.replace("/")
    }
    if (!farmLoading && farmActive === false && (router.route === "/[farm]/products/create" ||
      router.route === "/[farm]/tours/create" ||
      router.route === "/[farm]/orders/create"
    )
    ) {
      router.replace("/")
    }
  }, [meData, meLoading, farmLoading, farmActive, router])
  return { meData, meLoading, farmLoading, farmActive }
}
