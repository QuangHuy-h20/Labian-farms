import React, { ButtonHTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import Spinner from "@components/loader/spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "normal" | "outline" | "transparent";
  size?: "none" | "small" | "medium" | "large";
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const classes = {
  root: "inline-flex items-center justify-center rounded-md outline-0 font-semibold transition duration-200 transition focus:outline-none",
  none: "p-0",
  small: "px-3 py-2",
  medium: "px-3 py-4",
  large: "w-full py-3 text-lg",
  loading:
    "loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200 h-6 w-6",
  transparent: "bg-none",
  normal: "bg-emerald-500 hover:bg-emerald-600 text-white",
  outline: "bg-none border border-emerald-400 text-emerald-300 font-normal",
  disabled: "cursor-not-allowed",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = "normal",
    size = "medium",
    children,
    active,
    loading = false,
    disabled = false,
    ...rest
  } = props;
  const classesName = cn(
    classes.root,
    {
      [classes.normal]: !disabled && variant === "normal",
      [classes.transparent]: !disabled && variant === "transparent",
      [classes.disabled]: disabled && variant === "normal",
      [classes.outline]: !disabled && variant === "outline",
      [classes.small]: size === "small",
      [classes.medium]: size === "medium",
      [classes.large]: size === "large",
    },
    className
  );
  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={classesName}
      disabled={disabled}
      {...rest}
    >
      {children}
      {loading && (
        <span
          className={classes.loading}
          style={{
            borderTopColor: variant === "outline" ? "currentColor" : "#ffffff",
          }}
        />
      )}
    </button>
  );
});

export default Button;
