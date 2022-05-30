import cn from "classnames";
import { AllHTMLAttributes, FC } from "react";

const Card: FC<AllHTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("p-5 md:p-8 bg-white shadow rounded", className)}
      {...props}
    />
  );
};

export default Card;
