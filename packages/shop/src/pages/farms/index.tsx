import FarmCard from '@components/ui/cards/farm';
import ErrorMessage from '@components/ui/error-message';
import CouponLoader from '@components/ui/loaders/coupon-loader';
import NotFound from '@components/ui/not-found';
import { useFarmsQuery } from '@generated/graphql';
import { FARMS_LIMIT } from '@lib/constants';
import rangeMap from '@lib/range-map';
import { NextPageWithLayout } from '../../types';


const FarmsPage: NextPageWithLayout = () => {
  const limit = FARMS_LIMIT;
  const { data, loading, error } =
    useFarmsQuery();
  if (error) return <ErrorMessage message={error.message} />;
  if (!loading && !data?.allFarms?.length) {
    return (
      <div className="min-h-full px-4 pt-6 pb-8 bg-gray-100 lg:p-8">
        <NotFound text="Không có nông trại nào" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="flex flex-col w-full max-w-6xl p-8 mx-auto pt-14">
        <h3 className="mb-8 text-2xl font-bold text-heading">
          Nông trại tại Labian Farms
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading && !data?.allFarms?.length ? (
            <>
              {rangeMap(limit, (i) => (
                <CouponLoader key={i} uniqueKey={`shops-${i}`} />
              ))}
            </>
          ) : (
            data?.allFarms?.map((farm) => <FarmCard farm={farm} key={farm.id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmsPage;
