import { Reference } from "@apollo/client";
import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteProductMutation } from "@generated/graphql";
import { getErrorMessage } from "@utils/form-error";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ProductDeleteView = () => {
  const router = useRouter();
  const [deleteProductById, { loading }] = useDeleteProductMutation({
    onCompleted: () => {
      toast.success("Xoá sản phẩm thành công");
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    try {
      await deleteProductById({
        variables: { id: modalData.id as string },
        update(cache, { data }) {
          if (data?.deleteProduct.success) {
            cache.modify({
              fields: {
                productsByFarm(existing) {
                  return existing.filter(
                    (productRefObject) =>
                      productRefObject.__ref !==
                      `Product:${modalData.id as string}`
                  );
                },
              },
            });
          }
        },
        onCompleted: () => {
          router.reload();
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
      title="Xoá sản phẩm"
      description="Bạn có chắc muốn xoá sản phẩm này?"
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText="Xoá"
      cancelBtnText="Quay lại"
      deleteBtnLoading={loading}
    />
  );
};

export default ProductDeleteView;
