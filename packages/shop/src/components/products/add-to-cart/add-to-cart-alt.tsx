import Counter from "@components/ui/counter";
import { cartAnimation } from "@lib/cart-animation";
import { useCart } from "@store/quick-cart/cart.context";
import { generateCartItem } from "@store/quick-cart/generate-cart-item";
import Button from "@components/ui/button";
import { useState } from "react";

interface Props {
  data: any;
  variant?:
    | "helium"
    | "neon"
    | "argon"
    | "oganesson"
    | "single"
    | "big"
    | "bordered";
  counterVariant?:
    | "helium"
    | "neon"
    | "argon"
    | "oganesson"
    | "single"
    | "details"
    | "bordered";
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
}

export const AddToCartAlt = ({
  data,
  counterClass,
  disabled,
}: Props) => {
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const item = generateCartItem(data);
  const [quantity, setQuantity] = useState<number>(() =>
    isInCart(item?.id) ? getItemFromCart(item.id).quantity : 1
  );
  const increment = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.stopPropagation();
    console.log(quantity);
    
    setQuantity((prev) => prev + 1);
    addItemToCart(item, 1);
    if (!isInCart(item.id)) {
      cartAnimation(e);
    }
  };
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    
    addItemToCart(item, quantity);
    setQuantity(1);
    if (!isInCart(item.id)) {
      cartAnimation(e);
    }
  };
  const decrement = (e: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    e.stopPropagation();
    setQuantity((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });

    removeItemFromCart(item.id);
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  return (
    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
      <Counter
        value={quantity}
        onDecrement={decrement}
        onIncrement={increment}
        className={counterClass}
        disabled={outOfStock}
      />
      <Button
        className="h-14 w-full flex-shrink max-w-sm"
        onClick={handleAddClick}
        disabled={disabled || outOfStock}
      >
        Thêm vào giỏ
      </Button>
    </div>
  );
};
