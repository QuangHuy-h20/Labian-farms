import Spinner from "@components/loader/spinner";
import { MeDocument, MeQuery, useLogoutMutation } from "@generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { gql, Reference } from "@apollo/client";
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

          cache.modify({
            fields: {
              toursPaginated(existing) {
                existing.paginatedTours.forEach((tour: Reference) => {
                  cache.writeFragment({
                    id: tour.__ref,
                    fragment: gql`
                      fragment applyTourStatus on Tour {
                        applyTourStatus
                      }
                    `,
                    data: {
                      applyTourStatus: 0,
                    },
                  });
                });
                return existing;
              },
            },
          });
        }
      },
    });
    router.push("/");
  }, []);
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <Spinner size="large" />
      </div>
    </div>
  );
}
