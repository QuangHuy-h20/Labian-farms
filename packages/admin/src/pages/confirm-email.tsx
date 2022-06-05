import {
  MeDocument,
  MeQuery,
  useActiveEmailMutation,
} from "@generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageLoader from "@components/ui/page-loader";
import { ROUTES } from "@utils/routes";
import { toast } from "react-toastify";

export default function ConfirmEmail() {
  const [activeEmail] = useActiveEmailMutation();
  const router = useRouter();

  console.log(router.query.userId as string);

  useEffect(() => {
    activeEmail({
      variables: {
        token: router.query.token as string,
        userId: router.query.userId as string,
      },
      onCompleted: () => {
        router.push(ROUTES.PROFILE_UPDATE);
        toast.success("Kích hoạt email thành công.");
      },
    });
  }, []);
  return <PageLoader />;
}
