import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteTourMutation } from "@generated/graphql";
import { getErrorMessage } from "@utils/form-error";
import { toast } from "react-toastify";

const TourDeleteView = () => {
  const [deleteTour, { loading }] = useDeleteTourMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    try {
      await deleteTour({
        variables: { id: modalData.id as string },
        onCompleted: () => {
          toast.success("Xoá tour thành công");
        },
        onError: (error) => {
          toast.error(`${error}`);
        },
      });
      closeModal();
    } catch (error) {
      closeModal();
      getErrorMessage(error);
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default TourDeleteView;
