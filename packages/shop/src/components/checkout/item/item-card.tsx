import usePrice from "@lib/use-price";
import cn from "classnames";
import Image from "next/image";
interface Props {
  item: any;
  notAvailable?: boolean;
  className?: string;
}

const ItemCard = ({ item, notAvailable, className }: Props) => {
  const { price } = usePrice({
    amount: item.itemTotal,
  });
  return (
    <div className={cn("flex justify-between items-center py-2", className)}>
      <div className="flex items-center justify-between text-base">
        <img className="object-cover bg-contain" src={item.image1} width={72} height={72} />
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
        className={cn(
          "text-sm",
          notAvailable ? "text-red-500" : "text-gray-400"
        )}
      >
        {!notAvailable ? price : ""}
      </span>
    </div>
  );
};

export default ItemCard;
