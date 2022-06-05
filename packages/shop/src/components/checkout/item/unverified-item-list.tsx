import { useCart } from "@store/quick-cart/cart.context";
import usePrice from "@lib/use-price";
import { ItemInfoRow } from "./item-info-row";
import Button from "@components/ui/button";
import { moneyFormatter } from "@utils/helper";
import { useMeQuery } from "@generated/graphql";

const UnverifiedItemList = ({ hideTitle = false }: { hideTitle?: boolean }) => {
  const { total } = useCart();
  const { data } = useMeQuery();
  const { address, phone, email, fullName } = data?.me ?? {};
  const deliveryFee = 10000;
  return (
    <div className="w-full">
      {!hideTitle && (
        <div className="flex flex-col items-center mb-4 space-x-4 rtl:space-x-reverse">
          <span className="text-base font-bold text-gray-400">
            Thông tin khách hàng
          </span>
        </div>
      )}

      <div className="mt-4 space-y-2">
        <ItemInfoRow title="Tên khách hàng" value={fullName ?? email} />
      </div>
      <div className="mt-4 space-y-2">
        <ItemInfoRow title="Số điện thoại" value={phone} />
      </div>
      <div className="mt-4 space-y-2">
        <ItemInfoRow title="Địa chỉ" value={address} />
      </div>

      <div className="mt-4 space-y-2 border-t pt-3">
        <ItemInfoRow
          title="Phí vận chuyển"
          value={moneyFormatter(deliveryFee)}
        />
        <div className="flex justify-between pt-3 border-t-4 border-double border-border-200">
          <p className="text-base font-semibold text-heading">Tổng tiền</p>
          <span className="text-base font-semibold text-heading">
            {moneyFormatter(total + deliveryFee)}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <Button size="large" disabled>
          Thanh toán
        </Button>
      </div>
      <div className="mt-4 p-3 border rounded-md font-medium text-gray-500">
        <p>Hiện tại chức năng thanh toán đang trong quá trình phát triển, quý khách vui lòng thông cảm. Để đặt hàng, quý khách vui lòng liên hệ số điện thoại: <b className="underline">0969696969</b>. Xin cảm ơn.</p>
      </div>
    </div>
  );
};
export default UnverifiedItemList;
