import { MeDocument, MeQuery, useLogoutMutation } from "@generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Spinner from "@components/loader/spinner";
export default function Logout() {
  const [logout] = useLogoutMutation();
  const router = useRouter();
  useEffect(() => {
    logout({
      update(cache, { data }) {
        if (data.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: null },
          });
        }
      },
    });
    router.push("/login");
  }, []);
  return (
    <div className="min-h-screen justify-center items-center">
      <Spinner size="large" />
    </div>
  );
}
