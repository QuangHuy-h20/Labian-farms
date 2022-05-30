import MobileCategoryMenu from "@components/layouts/mobile-menu/mobile-category-menu";
import { drawerAtom } from "@store/drawer-atom";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import Drawer from "./drawer";
const CartSidebarView = dynamic(
  () => import("@components/cart/cart-sidebar-view")
);

export default function ManagedDrawer() {
  const [{ display, view }, setDrawerState] = useAtom(drawerAtom);
  return (
    <Drawer
      open={display}
      onClose={() => setDrawerState({ display: false, view: "" })}
      variant="right"
    >
      {view === "cart" && <CartSidebarView />}
    </Drawer>
  );
}
