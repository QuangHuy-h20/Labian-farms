import TrashIcon from "@components/icons/trash";
import Button from "@components/ui/button";
import cn from "classnames";

type ConfirmationCardProps = {
  onCancel: () => void;
  onDelete: () => void;
  title?: string;
  icon?: any;
  description?: string;
  cancelBtnClassName?: string;
  deleteBtnClassName?: string;
  cancelBtnText?: string;
  deleteBtnText?: string;
  cancelBtnLoading?: boolean;
  deleteBtnLoading?: boolean;
};

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  onCancel,
  onDelete,
  icon,
  title = "button-delete",
  description = "delete-item-confirm",
  cancelBtnText = "button-cancel",
  deleteBtnText = "button-delete",
  cancelBtnClassName,
  deleteBtnClassName,
  cancelBtnLoading,
  deleteBtnLoading,
}) => {
  return (
    <div className="p-4 pb-6 bg-white m-auto max-w-sm w-full rounded-md md:rounded-xl sm:w-[24rem]">
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col justify-between">
          {icon ? (
            icon
          ) : (
            <TrashIcon className="mt-4 w-12 h-12 m-auto text-accent" />
          )}
          <p className="text-gray-600 text-xl uppercase font-bold mt-4">
            {title}
          </p>
          <p className="text-gray-500 dark:text-muted leading-relaxed py-2 px-6">
            {description}
          </p>
          <div className="flex items-center justify-between space-s-4 w-full mt-4">
            <div className="w-full mr-2">
              <Button
                onClick={onCancel}
                loading={cancelBtnLoading}
                disabled={cancelBtnLoading}
                variant="normal"
                className={cn(
                  "w-full py-2 px-4 bg-emerald-400 focus:outline-none hover:bg-emerald-500-hover focus:bg-emerald-500-hover text-white transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md",
                  cancelBtnClassName
                )}
              >
                {cancelBtnText}
              </Button>
            </div>

            <div className="w-full">
              <Button
                onClick={onDelete}
                loading={deleteBtnLoading}
                disabled={deleteBtnLoading}
                variant="normal"
                className={cn(
                  "w-full py-2 px-4 bg-red-400 focus:outline-none hover:bg-red-400 focus:bg-red-400 text-white transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md",
                  deleteBtnClassName
                )}
              >
                {deleteBtnText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
