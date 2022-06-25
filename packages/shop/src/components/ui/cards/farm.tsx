import { Image } from "@components/ui/image";
import { MapPin } from "@components/icons/map-pin";
import { ROUTES } from "@lib/routes";
import Link from "@components/ui/link";
import isEmpty from "lodash/isEmpty";
import { productPlaceholder } from "@lib/placeholders";


const FarmCard = ({ farm }) => {
  return (
    <Link href={`${ROUTES.FARMS}/${farm.slug}`}>
      <div className="flex items-center p-5 border border-gray-200 rounded cursor-pointer relative">
        <div className="w-16 h-16 mr-2 relative flex shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden">
          <img
            alt="Ảnh logo"
            src={farm?.logoImage ?? productPlaceholder}
            className="w-full h-full object-cover bg-contain"
          />
        </div>

        <div className="flex flex-col ltr:ml-4 rtl:mr-4">
          <span className="text-lg font-semibold text-heading mb-2">
            {farm?.name}
          </span>
          <span className="text-xs text-body flex">
            <MapPin className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            {farm.address}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FarmCard;
