import cn from "classnames";
import { Image } from "@components/ui/image";
import { formatAddress } from "@lib/format-address";
import isEmpty from "lodash/isEmpty";
import { useModalAction } from "@components/modal/modal.context";
import Scrollbar from "@components/ui/scrollbar";
import ReadMore from "@components/ui/truncate";
import { productPlaceholder } from "@lib/placeholders";

type FarmSidebarProps = {
  farm: any;
  className?: string;
  cardClassName?: string;
};

const FarmSidebar: React.FC<FarmSidebarProps> = ({
  farm,
  className,
  cardClassName,
}) => {
  const { openModal } = useModalAction();

  function handleMoreInfoModal() {
    return openModal("FARM_INFO", { farm });
  }
  return (
    <>
      <div
        className={cn(
          "flex items-center lg:hidden w-full bg-white border-b border-gray-300 py-4 px-6 sticky top-[55px] z-10",
          cardClassName
        )}
      >
        <div className="relative w-16 h-16 mx-auto overflow-hidden bg-gray-200 border border-gray-100 rounded-lg shrink-0">
          <img
            src={farm?.logoImage ?? productPlaceholder}
            className="w-full h-full object-cover bg-contain"
          />
        </div>

        <div className="w-full">
          <h3 className="text-base font-semibold text-gray-600">{farm?.name}</h3>

          <button
            className="text-sm font-semibold transition text-accent hover:text-accent-hover"
            onClick={handleMoreInfoModal}
          >
            Xem thêm
          </button>
        </div>
      </div>

      <aside
        className={cn(
          "bg-white md:rounded h-full w-full lg:w-80 2xl:w-96 hidden lg:block",
          className
        )}
      >
        <div className="max-h-full overflow-hidden">
          <Scrollbar className={cn("w-full", "scrollbar_height")}>
            <div className="flex flex-col items-center w-full border-b border-gray-200 p-7">
              <div className="relative mx-auto mb-8 overflow-hidden bg-gray-200 border border-gray-100 rounded-lg w-44 h-44">
                <img
                  src={farm?.logoImage! ?? productPlaceholder}
                  className="w-full h-full object-cover bg-contain"
                />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-600">
                {farm?.name}
              </h3>

              {farm?.description && (
                <p className="mb-2 text-sm leading-relaxed text-center text-body">
                  <ReadMore character={70}>{farm.description}</ReadMore>
                </p>
              )}
            </div>

            <div className="p-7">
              <div className="flex flex-col mb-7 last:mb-0">
                <span className="mb-2 text-sm font-semibold text-gray-600">
                  Địa chỉ
                </span>
                <span className="text-sm text-body">
                  {farm?.address}
                </span>
              </div>

              <div className="flex flex-col mb-7 last:mb-0">
                <span className="mb-2 text-sm font-semibold text-gray-600">
                  Số điện thoại
                </span>
                <span className="text-sm text-body">
                  {farm?.owner.phone
                    ? farm?.owner.phone
                    : "Không có số điện thoại"}
                </span>
              </div>
            </div>
          </Scrollbar>
        </div>
      </aside>
    </>
  );
};

export default FarmSidebar;
