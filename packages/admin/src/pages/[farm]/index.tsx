import { MapPin } from "@components/icons/map-pin";
import { PhoneIcon } from "@components/icons/phone";
import AppLayout from "@components/layouts/app";
import PageLoader from "@components/ui/page-loader";
import ReadMore from "@components/ui/read-more";
import { useFarmQuery } from "@generated/graphql";
import Image from "next/image";
import { useRouter } from "next/router";

const Farm = () => {
  const {
    query: { farm },
  } = useRouter();
  const { data, loading } = useFarmQuery({
    variables: {
      slug: farm?.toString(),
    },
  });
  if (loading) return <PageLoader />;

  const { logoImage, name, slug, address, description, owner } = data!.farm!;

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="order-2 xl:order-1 col-span-12 sm:col-span-6 xl:col-span-4 3xl:col-span-3">
        <div className="py-8 px-6 bg-white rounded flex flex-col items-center">
          <div className="w-36 h-36 relative rounded-full mb-5">
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center border border-gray-100 rounded-full">
              <Image
                src={logoImage ? logoImage : "/avatar-placeholder.svg"}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <h1 className="text-xl font-semibold text-heading mb-2">{name}</h1>
          <p className="text-sm text-body text-center">
            <ReadMore character={70}>{description!}</ReadMore>
          </p>

          <div className="flex w-full justify-start mt-5">
            <span className="mt-0.5 mr-2 text-gray-300">
              <MapPin width={16} />
            </span>

            <address className="text-body text-sm not-italic">
              {address}
            </address>
          </div>

          <div className="flex w-full justify-start mt-3">
            <span className="text-gray-300 mt-0.5 mr-2">
              <PhoneIcon width={16} />
            </span>
            <span className="text-body text-sm">{owner.phone}</span>
          </div>

          <div className="grid grid-cols-1 w-full mt-7">
            <a
              href={`http://localhost:3000/${slug}`}
              target="_blank"
              className="inline-flex items-center justify-center flex-shrink-0 leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-accent-700 !bg-gray-100 hover:!bg-accent !text-heading hover:!text-light !font-normal px-5 py-0 h-12"
            >
              Xem trang trại
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Farm.Layout = AppLayout;

export default Farm;
