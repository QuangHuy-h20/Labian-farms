import { Image } from "@components/ui/image";
import cn from "classnames";
import usePrice from "@lib/use-price";
import { AddToCart } from "@components/products/add-to-cart/add-to-cart";
import { useModalAction } from "@components/modal/modal.context";
import { productPlaceholder } from "@lib/placeholders";
import { PlusIcon } from "@components/icons/plus-icon";
import { Product } from "@generated/graphql";
import { moneyFormatter, calDiscount } from "@utils/helper";

type NeonProps = {
  product: Product;
  className?: string;
};

const Neon: React.FC<NeonProps> = ({ product, className }) => {
  const {
    name,
    slug,
    price: salePrice,
    originalPrice,
    unit,
    qty,
    image1,
  } = product ?? {};

  // const { price, basePrice, discount } = usePrice({
  //   amount: salePrice! ? salePrice! : originalPrice!,
  //   baseAmount: originalPrice!,
  // });

  const discount = calDiscount(product);

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal("PRODUCT_DETAILS", product.id);
  }
  return (
    <article
      className={cn(
        "product-card cart-type-neon border border-border-200 rounded h-full bg-white overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5",
        className
      )}
    >
      <div
        className="relative flex items-center justify-center cursor-pointer w-auto h-48 sm:h-64"
        onClick={handleProductQuickView}
      >
        <span className="sr-only">{slug}</span>
        <Image
          src={image1! ?? productPlaceholder}
          alt={name!}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 md:top-4 right-3 rounded text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-emerald-500 text-white">
            {discount} %
          </div>
        )}
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6">
        <div className="flex items-center font-medium mb-2">
          <span className="text-slate-600 text-lg mr-2 font-semibold">
            {moneyFormatter(salePrice)} / <span>{unit}</span>
          </span>
          <del>{moneyFormatter(originalPrice)}</del>
        </div>

        {/* End of product price */}

        <h3
          className="text-sm truncate text-gray-500 mb-4 cursor-pointer"
          onClick={handleProductQuickView}
        >
          {name}
        </h3>
        {/* End of product title */}

        <>{Number(qty) > 0 && <AddToCart variant="neon" data={product} />}</>

        {Number(qty) <= 0 && (
          <div className="bg-red-500 rounded text-xs text-center text- px-2 py-1.5 sm:py-2.5">
            Số lượng kho không đủ
          </div>
        )}
        {/* End of add to cart */}
      </header>
    </article>
  );
};

export default Neon;
