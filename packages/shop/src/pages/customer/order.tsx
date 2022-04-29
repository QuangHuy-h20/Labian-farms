import { ReactElement } from "react";
import { getLayout as getSiteLayout } from '@components/layouts/site-layout'

const Order = () => {
  return (
    <div>Order</div>
  )
}

const getLayout = (page: ReactElement) =>
  getSiteLayout(
    <div className="bg-gray-100 flex flex-col lg:flex-row items-start w-full mx-auto">
      <div className="flex justify-center bg-white w-full px-1 pb-1 overflow-hidden  border rounded">
        {page}
      </div>
    </div>
  );
Order.getLayout = getLayout;

export default Order