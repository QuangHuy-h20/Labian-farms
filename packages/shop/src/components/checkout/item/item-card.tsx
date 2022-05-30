import usePrice from "@lib/use-price";
import cn from "classnames";
interface Props {
  item: any;
  notAvailable?: boolean;
}

const ItemCard = ({ item, notAvailable }: Props) => {
  const { price } = usePrice({
    amount: item.itemTotal,
  });
  return (
    <div className="flex justify-between py-2">
      <div className="flex items-center justify-between text-base">
        <span
          className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
        >
          <span
            className={cn(
              "text-sm font-bold",
              notAvailable ? "text-red-500" : "text-heading"
            )}
          >
            {item.quantity}
          </span>
          <span className="mx-2">x</span>
          <span>{item.name}</span> | <span>{item.unit}</span>
        </span>
      </div>
      <span
        className={cn("text-sm", notAvailable ? "text-red-500" : "text-body")}
      >
        {!notAvailable ? price : ""}
      </span>
    </div>
  );
};

export default ItemCard;
