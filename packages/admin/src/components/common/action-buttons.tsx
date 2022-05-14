import { BanUser } from "@components/icons/ban-user";
import { EditIcon } from "@components/icons/edit";
import Trash from "@components/icons/trash";
import { Eye } from "@components/icons/eye-icon";
import Link from "@components/ui/link";
import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import { useModalAction } from "@components/ui/modal/modal.context";
import { CloseFillIcon } from "@components/icons/close-fill";

type Props = {
  id: string;
  farmId?: number;
  deleteModalView?: string | any;
  editUrl?: string;
  detailsUrl?: string;
  isUserActive?: boolean;
  userStatus?: boolean;
  isShopActive?: boolean;
  approveButton?: boolean;
  showAddWalletPoints?: boolean;
  showMakeAdminButton?: boolean;
  changeRefundStatus?: boolean;
};

const ActionButtons = ({
  id,
  deleteModalView,
  editUrl,
  detailsUrl,
  userStatus = false,
  isUserActive = false,
  isShopActive,
  approveButton = false,
}: Props) => {
  const { openModal } = useModalAction();
  function handleDelete() {
    openModal(deleteModalView, { id });
  }
  function handleUserStatus(type: string) {
    openModal("BAN_CUSTOMER", { id, type });
  }
  function handleAddWalletPoints() {
    openModal("ADD_WALLET_POINTS", id);
  }
  function handleMakeAdmin() {
    openModal("MAKE_ADMIN", id);
  }
  function handleUpdateRefundStatus() {
    openModal("UPDATE_REFUND", id);
  }
  function handleShopStatus(status: boolean) {
    if (status === true) {
      openModal("SHOP_APPROVE_VIEW", id);
    } else {
      openModal("SHOP_DISAPPROVE_VIEW", id);
    }
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
      {approveButton &&
        (!isShopActive ? (
          <button
            onClick={() => handleShopStatus(true)}
            className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
            title="Chấp thuận"
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleShopStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title="Không chấp thuận"
          >
            <CloseFillIcon width={20} />
          </button>
        ))}
      {userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus("ban")}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
              title="Chặn"
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus("active")}
              className="text-accent transition duration-200 hover:text-accent focus:outline-none"
              title="Kích hoạt"
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}

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
          className="ml-2 text-base transition duration-200 hover:text-gray-600"
          title="Xem"
        >
          <Eye width={24} />
        </Link>
      )}
    </div>
  );
};

export default ActionButtons;
