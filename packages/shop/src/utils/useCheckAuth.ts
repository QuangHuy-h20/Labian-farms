import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useCheckAuth = () => {

  const { data, loading } = useMeQuery()
  const router = useRouter()

  useEffect(() => {
    if (!loading && data.me && (router.route === '/login' || router.route === '/register')) {
      router.replace("/")
    }
  }, [data, loading, router])
  return { data, loading }
};
