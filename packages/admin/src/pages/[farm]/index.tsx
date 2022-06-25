import UpdateFarmCover from "@components/farm/update-farm-cover";
import { EditIcon } from "@components/icons/edit";
import { Eye } from "@components/icons/eye-icon";
import { MapPin } from "@components/icons/map-pin";
import { PhoneIcon } from "@components/icons/phone";
import { CubeIcon } from "@components/icons/shops/cube";
import { DollarIcon } from "@components/icons/shops/dollar";
import { PriceWalletIcon } from "@components/icons/shops/price-wallet";
import { OrdersIcon } from "@components/icons/sidebar";
import FarmLayout from "@components/layouts/farm";
import ErrorMessage from "@components/ui/error-message";
import Link from "@components/ui/link";
import LinkButton from "@components/ui/link-button";
import PageLoader from "@components/ui/page-loader";
import ReadMore from "@components/ui/read-more";
import {
  FarmDocument,
  FarmQuery,
  useFarmQuery,
  useToursByFarmQuery,
} from "@generated/graphql";
import { addApolloState, initializeApollo } from "@lib/apolloClient";
import { formatDate } from "@utils/format-date";
import { formatPrice, moneyFormatter } from "@utils/use-price";
import Image from "next/image";
import { useRouter } from "next/router";

const Farm = () => {
  const {
    query: { farm },
  } = useRouter();
  const { data, loading, error } = useFarmQuery({
    variables: {
      slug: farm?.toString(),
    },
  });

  const { data: tourData, loading: tourLoading } = useToursByFarmQuery({
    variables: {
      farmId: data?.farm?.id,
    },
    notifyOnNetworkStatusChange: true,
  });
  if (loading || tourLoading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="order-2 xl:order-1 col-span-12 sm:col-span-6 xl:col-span-4 3xl:col-span-3">
        <div className="py-8 px-6 bg-white rounded flex flex-col items-center">
          <div className="w-36 h-36 relative rounded-full mb-5">
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center border border-gray-100 rounded-full">
              <img
                src={
                  data?.farm?.logoImage
                    ? data?.farm?.logoImage
                    : "/avatar-placeholder.svg"
                }
                className="object-fill h-full"
              // layout="fill"
              // objectFit="contain"
              />
            </div>
          </div>

          <h1 className="text-xl font-semibold text-gray-600 mb-2">
            {data?.farm?.name}
          </h1>
          <p className="text-sm text-gray-500">
            <ReadMore character={70}>{data?.farm?.description!}</ReadMore>
          </p>

          <div className="flex w-full justify-start mt-5">
            <span className="mt-0.5 mr-2 text-gray-300">
              <MapPin width={16} />
            </span>

            <address className="text-gray-500 text-sm not-italic">
              {data?.farm?.address}
            </address>
          </div>

          <div className="flex w-full justify-start mt-3">
            <span className="text-gray-300 mt-0.5 mr-2">
              <PhoneIcon width={16} />
            </span>
            <span className="text-gray-500 text-sm">
              {data?.farm?.owner.phone}
            </span>
          </div>

          <div className="grid grid-cols-1 w-full mt-7">
            <a
              href={`http://localhost:3000/${data?.farm?.slug}`}
              target="_blank"
              className="inline-flex items-center justify-center flex-shrink-0 leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow focus:ring-1 focus:ring-emerald-700 !bg-gray-100 hover:!bg-emerald-600 !text-gray-600 hover:!text-white !font-medium px-5 py-0 h-12"
            >
              Xem trang trại
            </a>
          </div>
        </div>
      </div>
      {/* Cover Photo */}
      <div className="order-1 xl:order-2 col-span-12 xl:col-span-8 3xl:col-span-9 h-full overflow-hidden relative rounded bg-white min-h-[400px]">
        <UpdateFarmCover id={data?.farm?.id} image={data?.farm?.coverImage} />
        {/* <Image
          src={data?.farm?.coverImage ?? "/farm-banner.jpg"}
          layout="fill"
          objectFit="cover"
        /> */}

        <LinkButton
          size="small"
          className="absolute top-3 right-3 flex items-center bg-emerald-400 hover:bg-emerald-600 shadow-sm"
          href={`/${farm}/edit`}
        >
          <EditIcon className="w-4 mr-2" /> {"Chỉnh sửa thông tin nông trại"}
        </LinkButton>
      </div>

      {/* Mini Dashboard */}
      <div className="order-4 xl:order-3 col-span-12 xl:col-span-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-4 rounded h-full">
          <div className="space-y-3">
            <h2 className="texxt-gray-600 text-lg font-semibold">Sản phẩm</h2>

            <div className="border border-gray-100">
              <div className="flex items-center py-3 px-4 border-b border-gray-100">
                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#FC9EC6] text-white">
                  <CubeIcon width={18} />
                </div>

                <div className="ml-3">
                  <p className="text-lg font-semibold text-gray-500 mb-0.5">
                    {data?.farm?.count}
                  </p>
                  <p className="text-sm text-gray-400 mt-0">Tổng sản phẩm</p>
                </div>
              </div>

              <div className="flex items-center py-3 px-4">
                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#6EBBFD] text-white">
                  <OrdersIcon width={16} />
                </div>

                <div className="ml-3">
                  <p className="text-lg font-semibold text-gray-500 mb-0.5">
                    0
                  </p>
                  <p className="text-sm text-gray-400 mt-0">Tổng số đơn hàng</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-gray-600 text-lg font-semibold">Doanh thu</h2>

            <div className="border border-gray-100">
              <div className="flex items-center py-3 px-4 border-b border-gray-100">
                <div className="p-3 rounded-full w-11 h-11 flex items-center justify-center bg-[#C7AF99] text-white">
                  <DollarIcon width={12} />
                </div>

                <div className="ml-3">
                  <p className="text-lg font-semibold text-gray-500 mb-0.5">
                    {moneyFormatter(6969696969)}
                  </p>
                  <p className="text-sm text-gray-400 mt-0">Doanh thu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="order-3 xl:order-4 bg-white rounded col-span-12 sm:col-span-6 xl:col-span-6">
        <div className="flex flex-col p-6 2xl:p-7 border-b border-gray-200">
          <span className="text-gray-500 font-semibold text-xl mb-2">
            Ngày tham gia
          </span>
          <span className="text-sm font-medium text-gray-400">
            {formatDate(data?.farm?.createdAt)}
          </span>
        </div>
        <div className="flex flex-col p-6 2xl:p-7">
          <span className="text-gray-500 font-semibold text-xl mb-2">
            Tour tham quan đang mở
          </span>
          <div className="flex flex-col mt-4">
            {tourData?.toursByFarm?.length > 0 ? (
              tourData?.toursByFarm.map((tour) => (
                <div
                  key={tour.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex">
                    <div className="mr-3">
                      <img className=" rounded-md object-cover bg-cover w-20 h-20"
                        src={tour.image1}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-500 mb-2">
                        {tour.name}
                      </span>
                      {/* <span className="text-sm text-gray-400 mb-1">
                        {tour.description}
                      </span> */}
                      <span className="text-sm text-gray-400">
                        {tour.farm.address}
                      </span>
                    </div>
                  </div>
                  {tour.isActive ? (
                    <Link
                      target="_blank"
                      href={`http://localhost:3000/tours/${tour.slug}`}
                      className="ml-2 text-emerald-500 transition duration-200 hover:text-emerald-500-hover focus:outline-none"
                      title="Xem tour"
                    >
                      <Eye width={28} />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="text-gray-400">Chưa có nông trại nào được mở</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Farm.Layout = FarmLayout;

export const getServerSideProps = async ({ params }: any) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: FarmDocument,
    variables: { slug: params.farm },
  });
  if (!data?.farm) {
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Farm;
