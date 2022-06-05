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
  status?: number;
  deleteModalView?: string | any;
  editUrl?: string;
  detailsUrl?: string;
  approveFarmButton?: boolean;
  approveTourButton?: boolean;
  isUserActive?: boolean;
  isFarmActive?: boolean;
  isTourActive?: boolean;
  userStatus?: boolean;
};

const ActionButtons = ({
  id,
  status,
  deleteModalView,
  editUrl,
  isTourActive,
  isFarmActive,
  detailsUrl,
  approveFarmButton = false,
  approveTourButton = false,
  userStatus = false,
  isUserActive = false,
}: Props) => {
  const { openModal } = useModalAction();
  function handleDelete() {
    openModal(deleteModalView, { id });
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

  function handleTourStatus(status: boolean) {
    if (status === true) {
      openModal("TOUR_APPROVE_VIEW", id);
    } else {
      openModal("TOUR_DISAPPROVE_VIEW", id);
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

      {userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus()}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
              title="Chặn"
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus()}
              className="text-emerald-500 transition duration-200 hover:text-emerald-500 focus:outline-none"
              title="Kích hoạt"
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
            title="Duyệt"
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleFarmStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title="Bỏ duyệt"
          >
            <CloseFillIcon width={20} />
          </button>
        ))}

      {approveTourButton &&
        (!isTourActive ? (
          <button
            onClick={() => handleTourStatus(true)}
            className="text-emerald-500 transition duration-200 hover:text-emerald-500-hover focus:outline-none"
            title="Duyệt"
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleTourStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title="Bỏ duyệt"
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
