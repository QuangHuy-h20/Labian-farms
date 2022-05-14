import Select from "@components/ui/select/select";
import { Control, Controller } from "react-hook-form";

interface SelectInputProps {
  control: Control<any>;
  rules?: any;
  name: string;
  options: any[];
  getOptionLabel: any;
  getOptionValue: any;
  isClearable?: any;
  isLoading: any;
  [key: string]: unknown;
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  isClearable,
  isLoading,
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => (
        <Select
          {...field}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isClearable={isClearable}
          isLoading={isLoading}
          options={options}
        />
      )}
    />
  );
};

export default SelectInput;
