import cn from "classnames";
import { PlusIcon } from "@components/icons/plus-icon";
import { MinusIcon } from "@components/icons/minus-icon";

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value: number;
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

const Counter: React.FC<CounterProps> = ({
  value,
  onDecrement,
  onIncrement,
  disabled,
}) => {
  return (
    <div className={cn("flex overflow-hidden neon")}>
      <button
        onClick={onDecrement}
        className={cn(
          "cursor-pointer p-2 transition-colors duration-200 hover:bg-emerald-500 focus:outline-none"
        )}
      >
        <span className="sr-only">Giảm</span>
        <MinusIcon className="h-3 w-3 stroke-2.5" />
      </button>
      <div
        className={cn(
          "flex flex-1 items-center justify-center px-3 text-sm font-semibold"
        )}
      >
        {value}
      </div>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          "cursor-pointer p-2 transition-colors duration-200 hover:bg-emerald-500 focus:outline-none"
        )}
        title={disabled ? "Hết hàng" : ""}
      >
        <span className="sr-only">Thêm</span>
        <PlusIcon className="md:w-4.5 h-3.5 w-3.5 stroke-2.5 md:h-4.5" />
      </button>
    </div>
  );
};

export default Counter;
