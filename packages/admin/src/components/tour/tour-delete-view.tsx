import { Reference } from "@apollo/client";
import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { Tour, useDeleteTourMutation } from "@generated/graphql";
import { getErrorMessage } from "@utils/form-error";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const TourDeleteView = () => {
  const router = useRouter();
  const [deleteTour, { loading }] = useDeleteTourMutation();

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    try {
      await deleteTour({
        variables: {
          id: modalData.id as string,
          farmId: modalData.farmId as string,
        },
        update(cache, { data }) {
          if (data?.deleteTour!) {
            cache.modify({
              fields: {
                toursByFarm(existing) {
                  console.log(existing);
                  console.log("DELETE SUCCESS");

                  return existing.filter(
                    (tourRefObject) =>
                      tourRefObject.__ref !== `Tour:${modalData.id as string}`
                  );
                },
              },
            });
          }
        },
        onCompleted: (data) => {
          if (data.deleteTour.success) {
            toast.success("Xoá tour thành công");
            router.reload();
          } else {
            toast.error(data.deleteTour.message);
          }
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
      title="Xoá tour tham quan"
      description="Bạn có chắc muốn xoá sự kiện này?"
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText="Xoá"
      cancelBtnText="Quay lại"
      deleteBtnLoading={loading}
    />
  );
};

export default TourDeleteView;
