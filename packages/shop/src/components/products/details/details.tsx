import { AddToCart } from "@components/products/add-to-cart/add-to-cart";
import BackButton from "@components/ui/back-button";
import { useModalAction } from "@components/modal/modal.context";
import Truncate from "@components/ui/truncate";
import { ROUTES } from "@lib/routes";
import { stickyShortDetailsAtom } from "@store/sticky-short-details-atom";
import classNames from "classnames";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import { Element, scroller } from "react-scroll";
import { Waypoint } from "react-waypoint";
import { calDiscount, moneyFormatter } from "@utils/helper";
import { productPlaceholder } from "@lib/placeholders";

type Props = {
  product: any;
  backBtn?: boolean;
  isModal?: boolean;
};
const Details: React.FC<Props> = ({
  product,
  backBtn = true,
  isModal = false,
}) => {
  const {
    name,
    description,
    unit,
    price: salePrice,
    originalPrice,
    category,
    stock,
    farm,
    slug,
  } = product ?? {};
  const [_, setShowStickyShortDetails] = useAtom(stickyShortDetailsAtom);

  const router = useRouter();
  const { closeModal } = useModalAction();

  const discount = calDiscount(product);

  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

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

  return (
    <article className="rounded-lg bg-white text-left">
      <div className="flex flex-col border-b md:flex-row border-border-200 border-opacity-70">
        <div className="p-6 pt-10 md:w-1/2 lg:p-14 xl:p-16">
          <div className="flex items-center justify-between mb-8 lg:mb-10">
            {backBtn && <BackButton />}
            {discount && (
              <div className="px-3 text-xs font-semibold leading-6 bg-emerald-500 rounded-full text-white ml-auto">
                {discount} %
              </div>
            )}
          </div>

          <div className="h-full product-gallery">
            <img
              src={product?.image1 ?? productPlaceholder}
              className="object-cover bg-contain"
              width={200}
              height={250}
            />
          </div>
        </div>

        <div className="flex flex-col items-start p-5 pt-10 md:w-1/2 lg:p-14 xl:p-16">
          <Waypoint
            onLeave={() => setShowStickyShortDetails(true)}
            onEnter={() => setShowStickyShortDetails(false)}
            onPositionChange={onWaypointPositionChange}
          >
            <div className="flex flex-col w-full">
              <h1
                className={classNames(
                  `font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-gray-600`,
                  {
                    "cursor-pointer transition-colors hover:text-emerald-600":
                      isModal,
                  }
                )}
                {...(isModal && {
                  onClick: () => navigate(`${ROUTES.PRODUCT}/${slug!}`),
                })}
              >
                {name}
              </h1>

              {description && (
                <div className="mt-3 text-sm leading-7 md:mt-4 text-gray-400">
                  <Truncate
                    character={150}
                    {...(!isModal && {
                      onClick: () => scrollDetails(),
                      compressText: "Thu gọn",
                    })}
                  >
                    {description}
                  </Truncate>
                </div>
              )}

              <span className="flex items-center my-5 md:my-10">
                <ins className="text-2xl font-semibold no-underline mr-2 md:text-3xl text-emerald-600">
                  {moneyFormatter(salePrice)} / {unit}
                </ins>
                {originalPrice && (
                  <del className="text-sm font-normal md:text-base text-gray-500">
                    {moneyFormatter(originalPrice)}
                  </del>
                )}
              </span>

              <div className="flex flex-col items-center mt-4 md:mt-6 lg:flex-row">
                <div className="mb-3 lg:mb-0 w-full">
                  <AddToCart
                    data={product}
                    variant="neon"
                    disabled={stock! < 0 ? true : false}
                  />
                </div>
              </div>
            </div>
          </Waypoint>

          <div className="flex items-center mt-3">
            <span className="py-1 text-sm font-semibold capitalize text-gray-600 mr-3">
              Loại hàng:
            </span>
            <div className="lowercase text-sm text-gray-600 tracking-wider whitespace-nowrap py-1 px-2.5 bg-transparent border border-border-200 rounded transition-colors hover:border-emerald-600 hover:text-emerald-600 focus:outline-none focus:bg-opacity-100">
              {category?.name}
            </div>
          </div>

          {farm?.name && (
            <div className="flex items-center mt-2">
              <span className="py-1 text-sm font-semibold capitalize text-gray-600 mr-3">
                Nông trại:
              </span>

              <button
                onClick={() =>
                  navigate(`${ROUTES.FARMS}/${encodeURIComponent(farm?.slug)}`)
                }
                className="text-sm tracking-wider underline transition text-emerald-600 hover:text-emerald-600-hover hover:no-underline"
              >
                {farm?.name}
              </button>
            </div>
          )}
        </div>
      </div>

      <Element
        name="details"
        className="px-5 py-4 border-b lg:px-16 lg:py-14 border-border-200 border-opacity-70"
      >
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-gray-600 md:mb-6">
          Chi tiết
        </h2>
        <p className="text-sm text-body">{description}</p>
      </Element>
    </article>
  );
};

export default Details;
