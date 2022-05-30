import { useRouter } from "next/router";
import Image from "next/image";
import cn from "classnames";
import { AddToCart } from "@components/products/add-to-cart/add-to-cart";
import usePrice from "@lib/use-price";
import { getVariations } from "@lib/get-variations";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import VariationPrice from "./variation-price";
import { ROUTES } from "@lib/routes";
import { useModalAction } from "@components/modal/modal.context";
import VariationGroups from "./variation-groups";
import { productPlaceholder } from "@lib/placeholders";
import { isVariationSelected } from "@lib/is-variation-selected";
import { useMemo } from "react";
import { useAttributes } from "./attributes.context";
import { Product } from "@generated/graphql";

interface ShortDetailsProps {
  product: any;
  isSticky: boolean;
}
const ShortDetails: React.FC<ShortDetailsProps> = ({ product, isSticky }) => {
  const router = useRouter();

  const { closeModal } = useModalAction();
  const { attributes } = useAttributes();

  const {
    name,
    slug,
    image1,
    unit,
    qty,
    price: salePrice,
    originalPrice,
  } = product ?? {};

  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  // const { price, basePrice, discount } = usePrice({
  //   amount: salePrice! ? salePrice! : originalPrice!,
  //   baseAmount: salePrice!,
  // });

  return (
    <div
      className={cn(
        "max-w-6xl h-auto w-full hidden md:block bg-white fixed top-0 left-1/2 transform -translate-x-1/2 z-50 px-8 py-6 shadow transition-all duration-300",
        {
          "invisible opacity-0 -translate-y-1/2": !isSticky,
          "visible opacity-100 translate-y-0": isSticky,
        }
      )}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "border border-border-200 border-opacity-70 rounded relative flex items-center justify-center overflow-hidden shrink-0 w-28 h-28"
          )}
        >
          <Image
            src={image1! ?? productPlaceholder}
            alt={name!}
            layout="fill"
            objectFit="contain"
            className="product-image"
          />
        </div>

        <div className="px-8 flex flex-col justify-center ltr:mr-auto rtl:ml-auto overflow-hidden">
          <h3
            className="font-semibold text-lg lg:text-xl tracking-tight text-heading truncate cursor-pointer transition-colors hover:text-accent"
            onClick={() => navigate(`${ROUTES.PRODUCT}/${slug}`)}
            title={name!}
          >
            {name!}
          </h3>
        </div>

        <div className={cn("w-full flex shrink-0 max-w-max ")}>
          <div className="w-full">
            <div>
              {qty! > 0 ? (
                <AddToCart
                  data={product}
                  variant="big"
                  disabled={qty < 0 ? true : false}
                />
              ) : (
                <div className="bg-red-500 rounded text-sm text-white px-3 py-2">
                  Đã hết hàng
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortDetails;
