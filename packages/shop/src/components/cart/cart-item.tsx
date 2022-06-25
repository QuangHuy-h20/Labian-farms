import { Image } from '@components/ui/image';
import { motion } from 'framer-motion';
import { siteSettings } from '@settings/site.settings';
import Counter from '@components/ui/counter';
import { CloseIcon } from '@components/icons/close-icon';
import { fadeInOut } from '@lib/motion/fade-in-out';
import usePrice from '@lib/use-price';
import { useCart } from '@store/quick-cart/cart.context';

interface CartItemProps {
  item: any;
}

const CartItem = ({ item }: CartItemProps) => {
  const { isInStock, clearItemFromCart, addItemToCart, removeItemFromCart } =
    useCart();

  const { price } = usePrice({
    amount: item.price,
  });
  const { price: itemPrice } = usePrice({
    amount: item.itemTotal,
  });
  function handleIncrement(e: any) {
    e.stopPropagation();
    addItemToCart(item, 1);
  }
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  const outOfStock = !isInStock(item.id);
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="flex items-center py-4 px-4 sm:px-6 text-sm border-b border-solid border-border-200 border-opacity-75"
    >
      <div className="flex-shrink-0">
        <Counter
          value={item.quantity}
          onDecrement={handleRemoveClick}
          onIncrement={handleIncrement}
          disabled={outOfStock}
        />
      </div>

      <div className="w-10 sm:w-16 h-10 sm:h-16 flex items-center justify-center overflow-hidden bg-gray-100 mx-4 shrink-0 relative">
        <img
          src={item?.image ?? siteSettings?.product?.placeholder}
          alt={item.name}
          className="object-cover bg-contain"

        />
      </div>
      <div>
        <h3 className="font-bold text-heading">{item.name} </h3>
        <p className="my-2.5 font-semibold text-emerald-400">{price}</p>
        <span className="text-xs text-body">
          {item.quantity} X {item.unit}
        </span>
      </div>
      <span className="ltr:ml-auto rtl:mr-auto font-bold text-heading">
        {itemPrice}
      </span>
      <button
        className="w-7 h-7 ltr:ml-3 rtl:mr-3 ltr:-mr-2 rtl:-ml-2 flex items-center justify-center shrink-0 rounded-full text-muted transition-all duration-200 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 hover:text-red-600 focus:text-red-600"
        onClick={() => clearItemFromCart(item.id)}
      >
        <span className="sr-only">Đóng</span>
        <CloseIcon className="w-3 h-3" />
      </button>
    </motion.div>
  );
};

export default CartItem;
