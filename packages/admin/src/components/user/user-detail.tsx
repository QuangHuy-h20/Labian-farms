import Image from "next/image";
import { CheckMarkFill } from "@components/icons/checkmark-circle-fill";
import { CloseFillIcon } from "@components/icons/close-fill";
import { toast } from "react-toastify";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import Spinner from "@components/loader/spinner";
import { siteSettings } from "@settings/site.settings";
import { useMeQuery, useConfirmEmailMutation } from "@generated/graphql";
import Button from "@components/ui/button";

const FarmerInformation: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [confirmEmail, { loading: updating }] = useConfirmEmailMutation();
  const { email, avatar, phone, isActiveEmail, fullName } = data?.me! ?? {};

  const handleConfirmEmail = async () => {
    await confirmEmail({
      variables: {
        email,
      },
      onCompleted: () => {
        toast.success(
          "Một thư xác nhận đã được gửi đến email của bạn, vui lòng kiểm tra email và xác thực."
        );
      },
    });
  };

  if (loading) return <Spinner size="small" />;

  return (
    <div className="h-full p-5 flex flex-col items-center">
      <div className="w-32 h-32 relative rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
        <Image
          src={avatar ? avatar : siteSettings?.avatar?.placeholder}
          layout="fill"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-600 mt-4">
        {fullName ? fullName : email}
      </h3>
      <p className="text-sm text-gray-400 mt-1">{email}</p>

      <p className="text-sm text-gray-400 mt-0.5">{phone}</p>

      <div className="border border-gray-200 rounded flex items-center justify-center text-sm text-gray-500 py-2 px-3 mt-6">
        {isActiveEmail ? (
          <CheckMarkFill width={16} className="me-2 text-emerald-500" />
        ) : (
          <CloseFillIcon width={16} className="me-2 text-red-500" />
        )}
        <span className="ml-2">
          {isActiveEmail ? "Đã xác thực email" : "Chưa xác thực email"}
        </span>
      </div>
      {!isActiveEmail ? (
        <p className="text-sm text-gray-400 mt-0.5">
          <Button
            size="medium"
            variant="transparent"
            className="text-emerald-500 underline"
            onClick={handleConfirmEmail}
            loading={updating}
          >
            Xác thực email
          </Button>
        </p>
      ) : (
        ""
      )}
    </div>
  );
};
export default FarmerInformation;
