import CartCheckBagIcon from '@components/icons/cart-check-bag';
import { formatString } from '@lib/format-string';
import usePrice from '@lib/use-price';
import { drawerAtom } from '@store/drawer-atom';
import { useCart } from '@store/quick-cart/cart.context';
import { useAtom } from 'jotai';

const CartCounterButton = () => {
  const { totalUniqueItems, total } = useCart();
  const [_, setDisplayCart] = useAtom(drawerAtom);
  const { price: totalPrice } = usePrice({
    amount: total,
  });
  function handleCartSidebar() {
    setDisplayCart({ display: true, view: 'cart' });
  }
  return (
    <button
      className="hidden product-cart lg:flex flex-col items-center justify-center p-3 pt-3.5 fixed top-1/2 -mt-12 right-1 z-40 shadow-900 rounded rounded-tr-none rounded-br-none  bg-emerald-500 text-white text-sm font-semibold transition-colors duration-200 focus:outline-none hover:bg-emerald-500-hover"
      onClick={handleCartSidebar}
    >
      <span className="flex pb-0.5">
        <CartCheckBagIcon className="shrink-0" width={14} height={16} />
        <span className="flex ltr:ml-2 rtl:mr-2">
          {formatString(totalUniqueItems, 'Sản phẩm')}
        </span>
      </span>
      <span className="bg-white rounded w-full py-2 px-2 text-emerald-500 mt-3">
        {totalPrice}
      </span>
    </button>
  );
};

export default CartCounterButton;
