import { UserIcon } from "@components/icons/user-icon";
import Link from "@components/ui/link";
import { Tour, ToursDocument } from "@generated/graphql";
import { addApolloState, initializeApollo } from "@lib/apolloClient";
import { siteSettings } from "@settings/site.settings";
import { formatDate } from "@utils/format-date";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";

interface TourCardProps {
  tour: any;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="flex p-3 justify-between w-full bg-white border my-4 border-gray-300 rounded-md">
      <Link className="flex flex-grow" href={`/tours/${tour.slug}`}>
        <Image
          className="rounded-md"
          src={tour.image1 ?? siteSettings.product.placeholder}
          width={320}
          height={200}
          objectFit="cover"
        />
        <div className="flex flex-col ml-3">
          <h1 className="text-emerald-500 font-semibold text-xl mb-3">
            {tour.name}
          </h1>
          <h3 className="text-gray-400 font-medium  mb-4">
            {tour.farm.address}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-3">{tour.description}</p>
          
        </div>
      </Link>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col items-end">
          <h3 className="text-gray-500 font-medium mb-2">Thời gian</h3>
          <span className="text-gray-400">
            Từ {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
          </span>
        </div>
        <div className="flex mb-3">
          <span className="text-gray-400">
            Số người đã đăng ký: {tour.numberOfVisitor}/ {tour.slot}
          </span>
          <UserIcon className="ml-1 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default TourCard;
