import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import { useMeQuery } from "@generated/graphql";
import PageLoader from "@components/ui/page-loader";

const UserDetails: React.FC = () => {
  const { data, loading } = useMeQuery();
  if (loading) return <PageLoader />;

  const { email, avatar } = data?.me! ?? {};

  return (
    <div className="h-full p-5 flex flex-col items-center">
      <div className="w-32 h-32 relative rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
        <Image
          src={avatar ?? siteSettings?.avatar?.placeholder}
          layout="fill"
        />
      </div>
      {/* <h3 className="text-lg font-semibold text-gray-600 mt-4">{name}</h3> */}
      <p className="text-sm text-muted mt-1">{email}</p>
     
     
    </div>
  );
};
export default UserDetails;
