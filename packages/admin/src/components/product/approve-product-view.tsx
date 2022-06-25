import ConfirmationCard from "@components/common/confirmation-card";
import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import {
  useModalAction,
  useModalState
} from "@components/ui/modal/modal.context";
import { useApproveProductMutation } from "@generated/graphql";
import { getErrorMessage } from "@utils/form-error";

const ApproveProduct = () => {
  const [approveProduct, { loading }] = useApproveProductMutation({
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
    approveProduct({
      variables: { id: modalData as string },
    });
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
      deleteBtnText="Tiếp tục"
      cancelBtnText="Quay lại"
      icon={
        <CheckMarkCircle className="mt-4 w-10 h-10 m-auto text-emerald-500" />
      }
      deleteBtnClassName="!bg-emerald-500 focus:outline-none hover:!bg-emerald-600 focus:!bg-emerald-600"
      cancelBtnClassName="!bg-red-400 focus:outline-none hover:!bg-red-500 focus:!bg-red-500"
      title="Cho phép trưng bày sản phẩm?"
      description=""
    />
  );
};

export default ApproveProduct;
