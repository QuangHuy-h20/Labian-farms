import ConfirmationCard from "@components/common/confirmation-card";
import { getErrorMessage } from "@utils/form-error";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useActiveUserMutation, useBanUserMutation } from "@generated/graphql";

const CustomerBanView = () => {
  const [banUser, { loading: banLoading }] = useBanUserMutation();
  const [activeUser, { loading: activeLoading }] = useActiveUserMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    try {
      console.log(data);
      
      if (data?.status === 1) {
        await banUser({
          variables: { id: data?.id },
        });
      } else {
        await activeUser({
          variables: { id: data?.id },
        });
      }
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
      cancelBtnText="Quay lại"
      deleteBtnText={data?.status === 1 ? "Chặn" : "Bỏ chặn"}
      title={data?.status === 1 ? "Chặn người dùng" : "Bỏ chặn người dùng"}
      description="Chặn người dùng này?"
      deleteBtnLoading={banLoading || activeLoading}
    />
  );
};

export default CustomerBanView;
