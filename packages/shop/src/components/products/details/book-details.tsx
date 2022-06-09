import usePrice from "@lib/use-price";
import { ThumbsCarousel } from "@components/ui/thumb-carousel";
import { getVariations } from "@lib/get-variations";
import { useMemo } from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import Truncate from "@components/ui/truncate";
import { scroller, Element } from "react-scroll";
import { useAtom } from "jotai";
import { isVariationSelected } from "@lib/is-variation-selected";
import { Waypoint } from "react-waypoint";
import { stickyShortDetailsAtom } from "@store/sticky-short-details-atom";
import { useAttributes } from "./attributes.context";
import { AddToCartAlt } from "@components/products/add-to-cart/add-to-cart-alt";
import { displayImage } from "@lib/display-product-preview-images";

type Props = {
  product: any;
  backBtn?: boolean;
  isModal?: boolean;
};
const BookDetails: React.FC<Props> = ({ product, isModal = false }) => {
  const {
    name,
    image, //could only had image we need to think it also
    description,
    categories,
    gallery,
    type,
    sku,
    author,
    manufacturer,
    tags,
    is_digital,
  } = product ?? {};

  const [_, setShowStickyShortDetails] = useAtom(stickyShortDetailsAtom);

  const { attributes } = useAttributes();

  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price!,
    baseAmount: product?.price ?? 0,
  });

  const variations = useMemo(
    () => getVariations(product?.variations),
    [product?.variations]
  );
  const isSelected = isVariationSelected(variations, attributes);
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const scrollDetails = () => {
    scroller.scrollTo("details", {
      smooth: true,
      offset: -80,
    });
  };

  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      setShowStickyShortDetails(true);
    }
  };
  const hasVariations = !isEmpty(variations);
  const previewImages = displayImage(selectedVariation?.image, gallery, image);
  return (
    <article className="max-w-screen-xl px-5 py-16 mx-auto rounded-lg bg-light xl:px-0">
      <div className="flex flex-col border-b lg:flex-row lg:space-x-10 xl:space-x-16 rtl:lg:space-x-reverse pb-14 border-border-200 border-opacity-70">
        <div className="lg:w-1/2">
          <div className="h-full py-5 bg-gray-100 product-gallery md:py-16">
            <ThumbsCarousel
              gallery={previewImages}
              hideThumbs={previewImages.length <= 1}
              aspectRatio="auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-start mt-8 lg:w-1/2 lg:px-0 lg:mt-0">
          <Waypoint
            onLeave={() => setShowStickyShortDetails(true)}
            onEnter={() => setShowStickyShortDetails(false)}
            onPositionChange={onWaypointPositionChange}
          >
            <div className="w-full">
              <div className="flex items-center">
                {name && (
                  <h1 className="text-xl font-bold tracking-tight lg:text-2xl xl:text-3xl text-heading">
                    {name}
                  </h1>
                )}
              </div>

              <span className="flex items-center mt-5 mb-7 space-x-4 rtl:space-x-reverse">
                <ins className="text-2xl font-bold no-underline md:text-3xl text-heading">
                  {price}
                </ins>
                {basePrice && (
                  <del className="text-base font-normal md:text-base text-muted">
                    {basePrice}
                  </del>
                )}

                {discount && (
                  <span className="px-2 py-1 text-xs font-semibold leading-6 uppercase rounded-md bg-accent-200 text-accent">
                    {discount}
                  </span>
                )}
              </span>

              {description && (
                <div className="text-sm leading-7 text-body mt-7">
                  <Truncate
                    character={150}
                    {...(!isModal && {
                      onClick: () => scrollDetails(),
                      compressText: "Xem thêmd",
                    })}
                  >
                    {description}
                  </Truncate>
                </div>
              )}

              <div className="flex flex-col items-center pb-5 mt-4 border-b md:mt-6 md:pb-8 lg:flex-row border-border-200 border-opacity-70">
                <div className="w-full mb-3 lg:mb-0">
                  <AddToCartAlt
                    data={product}
                    variant="bordered"
                    variation={selectedVariation}
                    disabled={selectedVariation?.is_disable || !isSelected}
                  />
                </div>
              </div>
            </div>
          </Waypoint>
        </div>
      </div>

      <Element name="details" className="pt-5 lg:pt-14">
        <h2 className="mb-4 text-xl font-bold tracking-tight lg:text-3xl text-heading md:mb-6">
          Chi tiết
        </h2>
        <p className="text-sm leading-relaxed text-body">{description}</p>

        <div className="flex flex-col space-y-3 mt-7">
          {name && <p className="text-sm text-body">{name}</p>}
        </div>
      </Element>
    </article>
  );
};

export default BookDetails;
