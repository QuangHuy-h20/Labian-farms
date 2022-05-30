import ConfirmationCard from "@components/common/confirmation-card";
import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import { CloseIcon } from "@components/icons/close-icon";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useApproveFarmMutation } from "@generated/graphql";
import { getErrorMessage } from "@utils/form-error";

const ApproveFarm = () => {
  const [disApproveFarmById, { loading }] = useApproveFarmMutation({
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
      icon={<CheckMarkCircle className="mt-4 w-10 h-10 m-auto text-emerald-500" />}
      deleteBtnClassName="!bg-emerald-500 focus:outline-none hover:!bg-emerald-600 focus:!bg-emerald-600"
      cancelBtnClassName="!bg-red-600 focus:outline-none hover:!bg-red-700 focus:!bg-red-700"
      title="Cho phép nông trại bán hàng?"
      description=""
    />
  );
};

export default ApproveFarm;