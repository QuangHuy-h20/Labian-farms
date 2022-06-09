import { Reference } from "@apollo/client";
import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import {
  ProductsByFarmDocument,
  ProductsByFarmQuery,
  ProductsDocument,
  ProductsQuery,
  useDeleteProductMutation,
  useMeQuery,
  useProductsByFarmQuery,
  useProductsQuery,
} from "@generated/graphql";
import { EXECUTIVE_ADMIN } from "@utils/constants";
import { getErrorMessage } from "@utils/form-error";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ProductDeleteView = () => {
  const router = useRouter();
  const { data: meData } = useMeQuery();
  const [deleteProductById, { loading }] = useDeleteProductMutation({
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
        onCompleted: (data) => {
          const { success, message } = data.deleteProduct;
          if (success) {
            toast.success(message);
            // router.reload();
          } else {
            toast.error(message);
          }
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
