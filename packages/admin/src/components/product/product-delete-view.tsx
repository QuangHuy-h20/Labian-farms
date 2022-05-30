import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteProductMutation } from "@generated/graphql";
import { getErrorMessage } from "@utils/form-error";
import { toast } from "react-toastify";

const ProductDeleteView = () => {

  const [deleteProductById, { loading }] = useDeleteProductMutation({
    onCompleted: () => {
      toast.success("Xoá sản phẩm thành công");
     
    },
    onError: (error) => {
      toast.error(`${error}`)
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
                products(existingProductRefs) {
                  const newProductsAfterDeletion = {
                    ...existingProductRefs,
                    products: existingProductRefs.filter(
                      (productFefObject) =>
                      productFefObject.__ref !== `Product:${modalData.id}`
                    ),
                  };
                  return newProductsAfterDeletion;
                },
              },
            });
            toast
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
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default ProductDeleteView;
