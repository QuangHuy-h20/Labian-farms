import { UserIcon } from "@components/icons/user-icon";
import Link from "@components/ui/link";
import { siteSettings } from "@settings/site.settings";
import { formatDate } from "@utils/format-date";
import Image from "next/image";
import React from "react";

const TourList = ({ tours }: any) => {
  return (
    <>
      {tours.map((tour: any) => (
        <div
          key={tour.id}
          className="flex p-3 justify-between w-full bg-white border border-gray-300 rounded-md"
        >
          <Link className="flex flex-grow" href={`/tours/${tour.slug}`}>
            <img
              className="rounded-md"
              src={tour.image1 ?? siteSettings.product.placeholder}
              width={320}
              height={200}
            />
            <div className="flex flex-col ml-3 max-w-[420px]">
              <h1 className="text-emerald-500 font-semibold text-xl mb-3">
                {tour.name}
              </h1>
              <h3 className="text-gray-400 font-medium  mb-4">
                {tour.farm.address}
              </h3>
              <p className="text-gray-400 mb-4 line-clamp-3">
                {tour.description}
              </p>
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
      ))}
    </>
  );
};

export default TourList;
