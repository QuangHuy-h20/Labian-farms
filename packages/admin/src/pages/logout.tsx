import { MeDocument, MeQuery, useLogoutMutation } from "@generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageLoader from "@components/ui/page-loader";

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
  return <PageLoader />;
}
