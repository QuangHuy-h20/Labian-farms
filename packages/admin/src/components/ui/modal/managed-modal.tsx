import Modal from "@components/ui/modal/modal";
import dynamic from "next/dynamic";
import { MODAL_VIEWS, useModalAction, useModalState } from "./modal.context";

const BanCustomerView = dynamic(() => import("@components/user/user-ban-view"));

const ProductDeleteView = dynamic(
  () => import("@components/product/product-delete-view")
);
const TourDeleteView = dynamic(
  () => import("@components/tour/tour-delete-view")
);

const ApproveShopView = dynamic(
  () => import("@components/farm/approve-shop-view")
);
const DisApproveShopView = dynamic(
  () => import("@components/farm/disapprove-shop-view")
);

const ApproveTourView = dynamic(
  () => import("@components/tour/approve-tour-view")
);
const DisApproveTourView = dynamic(
  () => import("@components/tour/disapprove-tour-view")
);

const ApproveProductView = dynamic(
  () => import("@components/product/approve-product-view")
);
const DisApproveProductView = dynamic(
  () => import("@components/product/disapprove-product-view")
);

function renderModal(view: MODAL_VIEWS | undefined, data: any) {
  switch (view) {
    case "DELETE_PRODUCT":
      return <ProductDeleteView />;
    case "DELETE_TOUR":
      return <TourDeleteView />;

    case "BAN_CUSTOMER":
      return <BanCustomerView />;
    case "SHOP_APPROVE_VIEW":
      return <ApproveShopView />;
    case "SHOP_DISAPPROVE_VIEW":
      return <DisApproveShopView />;
    case "TOUR_APPROVE_VIEW":
      return <ApproveTourView />;
    case "TOUR_DISAPPROVE_VIEW":
      return <DisApproveTourView />;
    case "PRODUCT_APPROVE_VIEW":
      return <ApproveProductView />;
    case "PRODUCT_DISAPPROVE_VIEW":
      return <DisApproveProductView />;

    default:
      return null;
  }
}

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {renderModal(view, data)}
    </Modal>
  );
};

export default ManagedModal;
