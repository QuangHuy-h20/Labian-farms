import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";

type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => ReactNode
  className?: string
  validationSchema?: any
  [key: string]: unknown
}
export const Form = <
  TFormValues extends Record<string, any> = Record<string, any>
>({
  onSubmit,
  children,
  options,
  className,
  validationSchema,
  ...props
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...(!!validationSchema && { resolver: yupResolver(validationSchema) }),
  });

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className={className}
      {...props}
    >
      {children(methods)}
    </form>
  );
};

