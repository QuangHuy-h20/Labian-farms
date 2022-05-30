import Image from "next/image";
import Link from "@components/ui/link";
import Badge from "@components/ui/badge/badge";

type FarmCardProps = {
  farm: any;
};

const ShopCard: React.FC<FarmCardProps> = ({ farm }) => {

  const isNew = false;

  return (
    <Link href={`/${farm?.slug}`}>
      <div className="flex items-center p-5 bg-white border border-gray-200 rounded cursor-pointer relative">
        {isNew && (
          <span className="text-xs text-light px-2 py-1 rounded bg-blue-500 absolute top-2 end-2">
           Mới
          </span>
        )}
        <div className="w-16 h-16 relative flex flex-shrink-0 border border-gray-100 items-center justify-center bg-gray-300 rounded-full overflow-hidden">
          <Image
            alt="Logo"
            src={
              farm?.logoImage ?? "/product-placeholder-borderless.svg"
            }
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="flex flex-col ms-4">
          <span className="text-lg font-semibold text-gray-600 mb-2">
            {farm?.name}
          </span>
          {/* <span>
            <Badge
              textKey={
                shop?.is_active ? "common:text-active" : "common:text-inactive"
              }
              color={farm?.is_active ? "bg-accent" : "bg-red-500"}
            />
          </span> */}
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
