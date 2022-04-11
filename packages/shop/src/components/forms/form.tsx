import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";
import { DeepMap, FieldError, FieldValues, SubmitHandler, useForm, UseFormProps, UseFormReturn } from "react-hook-form";

type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => ReactNode
  options?: UseFormProps<TFormValues>,
  className?: string
  validationSchema?: any
  [key: string]: unknown
}

const Form = <
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
    ...(!!options && options),
  });
  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className={className} //grid gap-3, flex flex-col space-y-3
      noValidate
      {...props}
    >
      {children(methods)}
    </form>
  );
};

export default Form