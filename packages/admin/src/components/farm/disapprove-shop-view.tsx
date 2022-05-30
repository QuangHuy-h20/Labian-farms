import ConfirmationCard from "@components/common/confirmation-card";
import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import { CloseFillIcon } from "@components/icons/close-fill";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDisApproveFarmMutation } from "@generated/graphql";
import { getErrorMessage } from "@utils/form-error";

const DisApproveFarm = () => {
  const [disApproveFarmById, { loading }] = useDisApproveFarmMutation({
    onCompleted: () => {
      closeModal();
    },
    onError: (error) => {
      closeModal();
      getErrorMessage(error);
    },
  });

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    disApproveFarmById({
      variables: { id: modalData as string },
    });
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
      deleteBtnText="Chấp thuận"
      cancelBtnText="Quay lại"
      icon={<CloseFillIcon className="mt-4 w-10 h-10 m-auto text-red-500" />}
      deleteBtnClassName="!bg-emerald-500 focus:outline-none hover:!bg-emerald-600 focus:!bg-emerald-600"
      cancelBtnClassName="!bg-red-600 focus:outline-none hover:!bg-red-700 focus:!bg-red-700"
      title="Chặn quyền của nông trại này?"
      description=""
    />
  );
};

export default DisApproveFarm;
