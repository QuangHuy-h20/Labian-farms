import { Eye } from "@components/icons/eye-icon";
import { EyeOff } from "@components/icons/eye-off-icon";
import cn from "classnames";
import React, { InputHTMLAttributes, useState } from "react";
import Link from "./link";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  forgotPassHelpText?: string;
  label: string;
  name: string;
  forgotPageLink?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  error: string | undefined;
}
const classes = {
  root: "px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-gray-600 text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-white focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-white focus:border-accent",
  outline: "border border-border-base focus:border-accent",
  shadow: "focus:shadow",
};
const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      forgotPassHelpText,
      label,
      name,
      error,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      forgotPageLink = "",
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.solid]: variant === "solid",
        [classes.outline]: variant === "outline",
      },
      shadow == true && classes.shadow,
      inputClassName
    );

    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor={name}
            className="text-gray-500 font-semibold text-sm leading-none"
          >
            {label}
          </label>

          {forgotPageLink && forgotPassHelpText && (
            <Link
              href={forgotPageLink}
              className="text-xs text-accent transition-colors duration-200 focus:outline-none focus:text-accent-700 focus:font-semibold hover:text-accent-hover"
            >
              {forgotPassHelpText}
            </Link>
          )}
        </div>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={show ? "text" : "password"}
            ref={ref}
            className={rootClassName}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
          />
          <label
            htmlFor={name}
            className="absolute end-4 top-5 -mt-2 text-gray-400"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </label>
        </div>
        {error && (
          <p className="my-2 text-xs text-start text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

export default PasswordInput;
