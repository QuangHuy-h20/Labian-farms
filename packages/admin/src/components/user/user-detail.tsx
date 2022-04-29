import Image from "next/image";
import { CheckMarkFill } from "@components/icons/checkmark-circle-fill";
import { CloseFillIcon } from "@components/icons/close-fill";

import Link from "@components/ui/Link";
import { ROUTES } from "@utils/routes";
import Spinner from "@components/loader/spinner";
import { siteSettings } from "@settings/site.settings";
import { useMeQuery } from "@generated/graphql";

const FarmerInformation: React.FC = () => {
  const { data, loading } = useMeQuery();
  if (loading) return <Spinner size="small" />;

  const { fullName, email, avatar, phone, isActiveEmail } = data?.me! ?? {};

  return (
    <div className="h-full p-5 flex flex-col items-center">
      <div className="w-32 h-32 relative rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
        <Image
          src={avatar ?? siteSettings?.avatar?.placeholder}
          layout="fill"
        />
      </div>
      <h3 className="text-lg font-semibold text-heading mt-4">{fullName ? fullName : email}</h3>
      <p className="text-sm text-muted mt-1">{email}</p>
      {!fullName ? (
        <p className="text-sm text-muted mt-0.5">
         
          <Link href={ROUTES.PROFILE_UPDATE} className="text-emerald-500 underline">
            Cập nhật thông tin cá nhân
          </Link>
        </p>
      ) : (
        <>
          <p className="text-sm text-muted mt-0.5">{phone}</p>
        </>
      )}
      <div className="border border-gray-200 rounded flex items-center justify-center text-sm text-body-dark py-2 px-3 mt-6">
        {isActiveEmail ? (
          <CheckMarkFill width={16} className="me-2 text-emerald-500" />
        ) : (
          <CloseFillIcon width={16} className="me-2 text-red-500" />
        )}
        {isActiveEmail ? "Enabled" : "Disabled"}
      </div>
    </div>
  );
};
export default FarmerInformation;
