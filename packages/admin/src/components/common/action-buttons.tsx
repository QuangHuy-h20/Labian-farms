import { BanUser } from "@components/icons/ban-user";
import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import { CloseFillIcon } from "@components/icons/close-fill";
import { EditIcon } from "@components/icons/edit";
import { Eye } from "@components/icons/eye-icon";
import Trash from "@components/icons/trash";
import Link from "@components/ui/link";
import { useModalAction } from "@components/ui/modal/modal.context";

type Props = {
  id: string;
  farmId?: string;
  status?: number;
  deleteModalView?: string | any;
  editUrl?: string;
  detailsUrl?: string;
  content?: string;
  listUserApprove?: any[];
  permission?: boolean;
  approveProductButton?: boolean;
  approveFarmButton?: boolean;
  approveTourButton?: boolean;
  isUserActive?: boolean;
  isProductActive?: boolean;
  isFarmActive?: boolean;
  isTourActive?: boolean;
  userStatus?: boolean;
};

const ActionButtons = ({
  id,
  farmId,
  status,
  deleteModalView,
  editUrl,
  permission = false,
  isTourActive,
  isProductActive,
  isFarmActive,
  detailsUrl,
  listUserApprove,
  content,
  approveProductButton = false,
  approveFarmButton = false,
  approveTourButton = false,
  userStatus = false,
  isUserActive = false,
}: Props) => {
  const { openModal } = useModalAction();
  function handleDelete() {
    openModal(deleteModalView, { id, farmId });
  }
  function handleUserStatus() {
    openModal("BAN_CUSTOMER", { id, status });
  }

  function handleFarmStatus(status: boolean) {
    if (status === true) {
      openModal("SHOP_APPROVE_VIEW", id);
    } else {
      openModal("SHOP_DISAPPROVE_VIEW", id);
    }
  }

  function handleProductStatus(status: boolean) {
    if (status === true) {
      openModal("PRODUCT_APPROVE_VIEW", id);
    } else {
      openModal("PRODUCT_DISAPPROVE_VIEW", id);
    }
  }

  function handleTourStatus(status: boolean) {
    if (status === true) {
      openModal("TOUR_APPROVE_VIEW", id);
    } else {
      openModal("TOUR_DISAPPROVE_VIEW", id);
    }
  }

  function handleOpenUserList() {
    openModal("USER_APPROVE_LIST", listUserApprove)
  }
  return (
    <div className="inline-flex items-center w-auto">
      {deleteModalView && (
        <button
          onClick={handleDelete}
          className="text-red-500 mr-4 transition duration-200 hover:text-red-600 focus:outline-none"
          title="Xoá"
        >
          <Trash width={16} />
        </button>
      )}

      {userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus()}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
              title="Disapprove"
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus()}
              className="text-emerald-500 transition duration-200 hover:text-emerald-500 focus:outline-none"
              title="Approve"
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}
      {approveFarmButton &&
        (!isFarmActive ? (
          <button
            onClick={() => handleFarmStatus(true)}
            className="text-emerald-500 transition duration-200 hover:text-emerald-500-hover focus:outline-none"
            title="Approve"
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleFarmStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title="Disapprove"
          >
            <CloseFillIcon width={20} />
          </button>
        ))}
      {listUserApprove && <button className="text-emerald-500 hover:underline" onClick={handleOpenUserList}>{content}</button>}
      {approveTourButton &&
        (!isTourActive ? (
          <button
            onClick={() => handleTourStatus(true)}
            className="text-emerald-500 transition duration-200 hover:text-emerald-500-hover focus:outline-none"
            title="Approve"
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleTourStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title="Disapprove"
          >
            <CloseFillIcon width={20} />
          </button>
        ))}

      {approveProductButton &&
        (!isProductActive ? (
          <button
            onClick={() => handleProductStatus(true)}
            className="text-emerald-500 transition duration-200 hover:text-emerald-500-hover focus:outline-none"
            title="Cập nhật trạng thái"
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleProductStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title="Cập nhật trạng thái"
          >
            <CloseFillIcon width={20} />
          </button>
        ))}

      {editUrl && (
        <Link
          href={editUrl}
          className="text-base transition duration-200 text-emerald-500 hover:text-gray-600"
          title="Sửa"
        >
          <EditIcon width={16} />
        </Link>
      )}
      {detailsUrl && (
        <Link
          href={detailsUrl}
          className="ml-2 text-emerald-500 transition duration-200 hover:text-emerald-500-hover focus:outline-none"
          title="Xem"
        >
          <Eye width={24} />
        </Link>
      )}
    </div>
  );
};

export default ActionButtons;
