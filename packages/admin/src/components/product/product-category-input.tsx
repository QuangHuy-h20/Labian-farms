import SelectInput from "@components/ui/select-input";
import Label from "@components/ui/label";
import { Control } from "react-hook-form";
import { useCategoriesQuery } from "@generated/graphql";

interface Props {
  control: Control<any>;
}

const ProductCategoryInput = ({ control }: Props) => {
  const { data, loading } = useCategoriesQuery({
    fetchPolicy: "network-only",
  });

  return (
    <div className="mb-5">
      <Label>Loại sản phẩm</Label>
      <SelectInput
        name="categoryId"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        options={data?.categories ?? []}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductCategoryInput;
