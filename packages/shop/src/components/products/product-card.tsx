import React from "react";
import cn from "classnames";
import { Image } from "@components/ui/image";
import { moneyFormatter } from "@utils/helper";
import { useModalAction } from "@components/modal/modal.context";

type CardProps = {
  product: any;
  className?: string;
};
const ProductCard: React.FC<CardProps> = ({ product, className }) => {
  const { id, name, price, priceRoot, unit, image1 } = product ?? {};

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal("PRODUCT_DETAILS", product.slug);
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
        <span className="sr-only">{name}</span>
        <img
          src={image1}
          alt={name}
          width={200}
          height={230}
        />
      </div>
      {/* End of product image */}

      <header className="p-4 mt-2">
        <h3
          className="text-xs md:text-lg text-emerald-500 truncate font-semibold mb-4 cursor-pointer"
          onClick={handleProductQuickView}
        >
          {name}
        </h3>
        <div className="flex items-center mb-2">
          <span>{priceRoot}</span>
          <span className="text-gray-500 font-medium">
            {moneyFormatter(price)} / <span>{unit}</span>
          </span>
        </div>
        {/* End of product price */}

        {/* End of product title */}

        {/* {product_type.toLowerCase() === "variable" ? (
          <>
            {Number(quantity) > 0 && (
              <button
                onClick={handleProductQuickView}
                className="group w-full h-7 md:h-9 flex items-center justify-between text-xs md:text-sm text-gray-500 rounded bg-gray-100 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
              >
                <span className="flex-1">{t("text-add")}</span>
                <span className="w-7 h-7 md:w-9 md:h-9 bg-gray-200 grid place-items-center ltr:rounded-tr rtl:rounded-tl ltr:rounded-br rtl:rounded-bl transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600">
                  <PlusIcon className="w-4 h-4 stroke-2" />
                </span>
              </button>
            )}
          </>
        ) : (
          <>
            {Number(quantity) > 0 && (
              <AddToCart variant="neon" data={product} />
            )}
          </>
        )} */}

        {/* End of add to cart */}
      </header>
    </article>
  );
};

export default ProductCard;
