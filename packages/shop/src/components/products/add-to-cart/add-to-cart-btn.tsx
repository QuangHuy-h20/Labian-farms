import { PlusIcon } from "@components/icons/plus-icon";
import CartIcon from "@components/icons/cart";
import cn from "classnames";

type Props = {
  variant?: "helium" | "neon" | "argon" | "oganesson" | "single" | "big";
  onClick(event: React.MouseEvent<HTMLButtonElement | MouseEvent>): void;
  disabled?: boolean;
};

const AddToCartBtn: React.FC<Props> = ({ variant, onClick, disabled }) => {
  switch (variant) {
    case "neon":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="flex items-center justify-between w-full text-xs transition-colors bg-gray-100 rounded group h-7 md:h-9 md:text-sm text-gray-500 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white focus:outline-none focus:bg-emerald-500 focus:border-emerald-500 focus:text-white"
        >
          <span className="flex-1">Thêm vào giỏ</span>
          <span className="grid transition-colors duration-200 bg-gray-200 w-7 h-7 md:w-9 md:h-9 place-items-center ltr:rounded-tr rtl:rounded-tl ltr:rounded-br rtl:rounded-bl group-hover:bg-emerald-600 group-focus:bg-emerald-500-600">
            <PlusIcon className="w-4 h-4 stroke-2" />
          </span>
        </button>
      );
    case "argon":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="flex items-center justify-center text-sm transition-colors border rounded w-7 h-7 md:w-9 md:h-9 text-gray-600 bg-white border-border-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white focus:outline-none focus:bg-emerald-500 focus:border-emerald-500 focus:text-white"
        >
          <PlusIcon className="w-5 h-5 stroke-2" />
        </button>
      );
    case "oganesson":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="flex items-center justify-center w-8 h-8 text-sm transition-colors rounded-full md:w-10 md:h-10 text-white bg-emerald-500 shadow-500 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white focus:outline-none focus:bg-emerald-500 focus:border-emerald-500 focus:text-white"
        >
          <span className="sr-only">+</span>
          <PlusIcon className="w-5 h-5 stroke-2 md:w-6 md:h-6" />
        </button>
      );
    case "single":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="flex items-center justify-center order-5 px-3 py-2 text-sm font-semibold transition-colors duration-300 border-2 rounded-full sm:order-4 sm:px-5 border-border-100 sm:justify-start text-emerald-500 hover:text-white bg-white hover:bg-emerald-500 hover:border-emerald-500 focus:outline-none focus:bg-emerald-500 focus:border-emerald-500 focus:text-white"
        >
          <CartIcon className="w-4 h-4 ltr:mr-2.5 rtl:ml-2.5" />
          <span>Giỏ hàng</span>
        </button>
      );
    case "big":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-white rounded text-white bg-emerald-500 hover:bg-emerald-500-hover transition-colors duration-300 focus:outline-none focus:bg-emerald-500-hover",
            {
              "border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed":
                disabled,
            }
          )}
        >
          <span>Thêm vào giỏ</span>
        </button>
      );
    default:
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          title={disabled ? "Out Of Stock" : ""}
          className="flex items-center justify-center text-sm transition-colors border rounded w-7 h-7 md:w-9 md:h-9 text-emerald-500 bg-white border-border-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white focus:outline-none focus:bg-emerald-500 focus:border-emerald-500 focus:text-white"
        >
          <span className="sr-only">+</span>
          <PlusIcon className="w-5 h-5 stroke-2" />
        </button>
      );
  }
};

export default AddToCartBtn;
