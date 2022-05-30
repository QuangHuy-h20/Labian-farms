import Input from "@components/ui/input";
import {
  Control,
  FieldErrors,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import Button from "@components/ui/button";
import TextArea from "@components/ui/text-area";
import Label from "@components/ui/label";

import Card from "@components/common/card";
import Description from "@components/ui/description";
import * as categoriesIcon from "@components/icons/category";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { getErrorMessage } from "@utils/form-error";
import ValidationError from "@components/ui/form-validation-error";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { categoryIcons } from "./category-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryValidationSchema } from "./category-validation-schema";
import {
  Category,
  CreateCategoryInput,
  useCreateCategoryMutation,
} from "@generated/graphql";

export default function CreateOrUpdateCategoriesForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateCategoryInput>({
    resolver: yupResolver(categoryValidationSchema),
  });

  const [createCategory, { loading: creating }] = useCreateCategoryMutation();

  const onSubmit = async (values: CreateCategoryInput) => {
    try {
      await createCategory({
        variables: {
          createCategoryInput: values,
        },
        onCompleted: () => {
          toast.success("Tạo loại sản phẩm mới thành công.");
        },
      });
      router.push(ROUTES.CATEGORIES);
    } catch (err) {
      getErrorMessage(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title="Thông tin loại sản phẩm"
          details="Nhập tên loại sản phẩm"
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Tên loại sản phẩm"
            {...register("name")}
            error={errors.name?.message!}
            variant="outline"
            className="mb-5"
          />
        </Card>
      </div>
        <div className="mb-5 text-right">
          <Button loading={creating}>Thêm mới</Button>
        </div>
    </form>
  );
}
