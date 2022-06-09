import { ShopIcon } from "@components/icons/shop";
import { UserIcon } from "@components/icons/user-icon";
import PageLoader from "@components/loader/page-loader";
import Button from "@components/ui/button";
import Scrollbar from "@components/ui/scrollbar";
import {
  ApplyTourStatus,
  TourDocument,
  TourIdsDocument,
  TourIdsQuery,
  TourQuery,
  useApplyTourMutation,
  useMeQuery,
  useTourQuery,
  useProductsByFarmQuery,
} from "@generated/graphql";
import { addApolloState, initializeApollo } from "@lib/apolloClient";
import { productPlaceholder } from "@lib/placeholders";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { limit } from "./index";
import ProductsGrid from "@components/products/grid";
import { toast } from "react-toastify";

enum ApplyTourStatusValue {
  Apply = 1,
  UnApply = 0,
}

const TourPage = () => {
  const { data: meData } = useMeQuery();
  const {
    query: { slug },
  } = useRouter();
  const { data: tourData, loading } = useTourQuery({
    variables: {
      slug: slug as string,
    },
  });
  const [applyTour] = useApplyTourMutation();

  const {
    id,
    applyTourStatus,
    description,
    endDate,
    name,
    numberOfVisitor,
    slot,
    status,
    startDate,
    image1,
    farm,
  } = tourData?.tour!;

  const { data: productData } = useProductsByFarmQuery({
    variables: {
      farmId: farm!.id,
    },
  });

  const handleApply = async () => {
    await applyTour({
      variables: {
        applyTourStatusValue: ApplyTourStatus.Apply,
        tourId: id,
      },
      update(cache, { data }) {
        cache.writeQuery<TourQuery>({
          query: TourDocument,
          variables: { slug: data?.applyTour?.tour },
          data: {
            tour: data?.applyTour?.tour,
          },
        });
      },
      onCompleted: () => {
        toast.success("Chúc mừng bạn đã đăng ký thành công!");
      },
      onError: () => {
        toast.error("Đã có lỗi xảy ra, bạn vui lòng thử lại sau nhé.");
      },
    });
  };

  const handleUnApply = async () => {
    await applyTour({
      variables: {
        applyTourStatusValue: ApplyTourStatus.UnApply,
        tourId: id!,
      },
      onCompleted: () => {
        toast.success("Huỷ đăng ký tour thành công!");
      },
      onError: () => {
        toast.error("Đã có lỗi xảy ra, bạn vui lòng thử lại sau nhé.");
      },
    });
  };

  if (loading) return <PageLoader />;

  return (
    <>
      <div className="flex flex-col bg-gray-100 lg:flex-row lg:items-start lg:p-8">
        <aside className="bg-white md:rounded h-full w-full lg:w-80 2xl:w-96 hidden lg:block">
          <div className="max-h-full overflow-hidden">
            <Scrollbar className="w-full scrollbar_height">
              <div className="flex flex-col items-center w-full border-b border-gray-200 p-7">
                <div className="relative mx-auto mb-8 overflow-hidden bg-gray-200 border border-gray-100 rounded-lg w-44 h-44">
                  <Image
                    src={image1! ?? productPlaceholder}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <h1 className="text-emerald-400">
                  {applyTourStatus! === ApplyTourStatusValue!.Apply
                    ? "Đã tham gia"
                    : ""}
                </h1>
                <h3 className="mb-4 text-lg font-semibold text-center text-gray-600">
                  {name!}{" "}
                  <p className="text-emerald-400">
                    {status! === "open" ? "Đang mở" : "Đã đóng"}
                  </p>
                </h3>
                <div className="flex mb-4">
                  <div className="w-6 h-6 mr-2">
                    <ShopIcon />
                  </div>
                  {farm?.name!}
                </div>

                <div className="flex mb-6">
                  <span className="text-gray-400">
                    Số người đã đăng ký: {numberOfVisitor!}/ {slot!}
                  </span>
                  <UserIcon className="ml-1 text-gray-500" />
                </div>

                {meData?.me ? (
                  numberOfVisitor! === slot! &&
                  applyTourStatus! === ApplyTourStatusValue!.UnApply ? (
                    <Button
                      disabled={numberOfVisitor! === slot! ? true : false}
                      size="large"
                    >
                      Đã hết lượt đăng ký
                    </Button>
                  ) : (
                    <Button
                      variant={
                        applyTourStatus! === ApplyTourStatusValue!.Apply
                          ? "outline"
                          : "normal"
                      }
                      size="large"
                      onClick={
                        applyTourStatus! === ApplyTourStatusValue!.Apply
                          ? handleUnApply
                          : handleApply
                      }
                    >
                      {applyTourStatus! === ApplyTourStatusValue!.Apply
                        ? "Huỷ đăng ký"
                        : "Đăng ký"}
                    </Button>
                  )
                ) : (
                  ""
                )}
              </div>
            </Scrollbar>
          </div>
        </aside>
        <div className="flex w-full flex-col lg:px-4">
          <div className="relative h-full w-full overflow-hidden rounded">
            <Image
              src={image1! ?? productPlaceholder}
              layout="responsive"
              width={2340}
              height={640}
              objectFit="cover"
              className="h-full w-full"
            />
          </div>
          <div className="bg-white mt-8 p-4 w-full rounded-md">
            <h1 className="font-bold text-gray-600 text-2xl mb-3">Mô tả</h1>
            <p>{description!}</p>
          </div>

          <div className="bg-white mt-8 p-4 rounded-md w-full">
            <h1 className="font-bold text-gray-600 text-2xl mb-6">
              Sản phẩm có sẵn tại nông trại
            </h1>
            <ProductsGrid products={productData?.productsByFarm} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<TourIdsQuery>({
    query: TourIdsDocument,
    variables: { limit },
  });
  return {
    paths: data!.toursPaginated!.paginatedTours.map((tour) => ({
      params: { slug: `${tour.slug}` },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  { [key: string]: any },
  { slug: string }
> = async ({ params }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query<TourQuery>({
    query: TourDocument,
    variables: { slug: params?.slug as string },
  });

  return addApolloState(apolloClient, { props: {} });
};

export default TourPage;
