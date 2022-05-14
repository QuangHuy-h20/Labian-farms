import cn from "classnames";
import { TriangleArrowDown } from "@components/icons/triangle-arrow-down";
import { TriangleArrowUp } from "@components/icons/triangle-arrow-up";

type Props = {
  title: string | React.ReactNode;
  ascending?: boolean;
  isActive?: boolean;
};

const TitleWithSort = ({ title, ascending, isActive }: Props) => {
  return (
    <span className="inline-flex items-center">
      <span>{title}</span>

      {ascending ? (
        <TriangleArrowUp
          width="9"
          className={cn("ml-1 flex-shrink-0 text-gray-500", {
            "!text-gray-600": isActive,
          })}
        />
      ) : (
        <TriangleArrowDown
          width="9"
          className={cn("ml-1 flex-shrink-0 text-gray-500", {
            "!text-gray-600": isActive,
          })}
        />
      )}
    </span>
  );
};

export default TitleWithSort;