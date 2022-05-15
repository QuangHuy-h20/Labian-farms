import Card from "@components/common/card";
import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Input from "@components/ui/input";
import TextArea from "@components/ui/text-area";
import {
  Product,
  UpdateProductInput,
  useCreateProductMutation,
  useFarmQuery,
  useUpdateProductMutation,
} from "@generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "@utils/form-error";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  getProductDefaultValues,
  getProductInputValues,
  ProductFormValues,
} from "./form-utils";
import ProductCategoryInput from "./product-category-input";

type ProductFormProps = {
  initialValues?: Product | null;
};

const schema: yup.SchemaOf<Omit<ProductFormValues, "categoryId">> = yup
  .object()
  .shape({
    name: yup.string().required("Trường dữ liệu bắt buộc.").default(""),
    description: yup.string().default(""),
    originalPrice: yup
      .number()
      .typeError("Định dạng phải là số")
      .positive("Giá không được âm")
      .required("Trường dữ liệu bắt buộc."),
    qty: yup
      .number()
      .typeError("Định dạng phải là số")
      .positive("Số lượng không được âm")
      .required("Trường dữ liệu bắt buộc."),
    unit: yup.string().required("Trường dữ liệu bắt buộc.").default(""),
    price: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .lessThan(
        yup.ref("originalPrice"),
        "Giá khuyến mãi không được lớn hơn giá gốc"
      ),
  });

export default function CreateOrUpdateProductForm({
  initialValues,
}: ProductFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File>([] as any);
  const [imageSrc, setImageSrc] = useState(initialValues ? initialValues.image1 : "");
  const { data: farmData } = useFarmQuery({
    variables: {
      slug: router.query.farm as string,
    },
  });

  const farmId = farmData?.farm?.id;

  const methods = useForm<ProductFormValues>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: getProductDefaultValues(initialValues),
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = methods;


  const [createProduct, { loading: creating }] = useCreateProductMutation({
    onCompleted: () => {
      toast.success("Thêm sản phẩm mới thành công");
      router.push(ROUTES.PRODUCTS);
    },
    onError: (error) => {
      const serverErrors = getErrorMessage(error);
      if (serverErrors?.validation.length) {
        Object.keys(serverErrors?.validation).forEach((field: any) => {
          setError(field.split(".")[1], {
            type: "manual",
            message: serverErrors?.validation[field][0],
          });
        });
      } else {
        setErrorMessage(error?.message);
      }
    },
  });

  const [updateProduct, { loading: updating }] = useUpdateProductMutation({
    onCompleted: () => {
      toast.success("Cập nhật sản phẩm thành công");
      router.push(ROUTES.PRODUCTS);
    },
    onError: (error) => {
      const serverErrors = getErrorMessage(error);
      if (serverErrors?.validation.length) {
        Object.keys(serverErrors?.validation).forEach((field: any) => {
          setError(field.split(".")[1], {
            type: "manual",
            message: serverErrors?.validation[field][0],
          });
        });
      } else {
        setErrorMessage(error?.message);
      }
    },
  });

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: any) => {
    const file = e;
    let imageUrl: any = await readFile(file);
    setImageSrc(imageUrl);
  };

  const onDrop = useCallback(([file]) => {
    setFileToUpload(file);
    onFileChange(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit: SubmitHandler<ProductFormValues> = async (
    values: ProductFormValues
  ) => {
    const inputValues = getProductInputValues(values, initialValues);

    if (initialValues) {
      updateProduct({
        variables: {
          farmId,
          updateProductInput: { ...inputValues, id: initialValues.id },
          files: fileToUpload,
        },
      });
    } else {
      await createProduct({
        variables: {
          farmId,
          createProductInput: inputValues,
          files: fileToUpload,
        },
        onCompleted: (data) => {
          if (data.createProduct.success)
            toast.success("Thêm sản phẩm mới thành công");
        },
        onError: () => toast.error("Đã có lỗi xảy ra, vui lòng thử lại."),
      });
    }
  };
  return (
    <>
      {errorMessage ? (
        <Alert
          message={`${errorMessage}`}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title="Ảnh sản phẩm"
              details="Cập nhật ảnh của sản phẩm"
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <div
                {...getRootProps({
                  className: "border border-dashed py-6 px-3 my-2",
                })}
              >
                <input name="uploadFile" {...getInputProps()} />
                {imageSrc ? (
                  <img
                    className=" w-full h-56 object-contain"
                    src={imageSrc}
                    alt=""
                  />
                ) : (
                  <p className="text-center">
                    Kéo ảnh hoặc nhấp vào ô để chọn ảnh
                  </p>
                )}
              </div>
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title="Loại sản phẩm"
              details="Chọn loại sản phẩm tại đây"
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <ProductCategoryInput  control={control} />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title="Chi tiết"
              details="Thêm mô tả sản phẩm của bạn và thông tin cần thiết từ đây"
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label="Tên sản phẩm"
                {...register("name")}
                error={errors.name?.message!}
                variant="outline"
                className="mb-5"
              />

              <Input
                label="Đơn vị"
                {...register("unit")}
                error={errors.unit?.message!}
                variant="outline"
                className="mb-5"
              />

              <TextArea
                label="Mô tả về sản phẩm"
                {...register("description")}
                error={errors.description?.message!}
                variant="outline"
                className="mb-5"
              />
            </Card>
          </div>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title="Thông tin cơ bản"
              details="Thêm thông tin cơ bản sản phẩm của bạn ở đây"
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label="Số lượng"
                {...register("qty")}
                error={errors.qty?.message!}
                variant="outline"
                className="mb-5"
              />
              <Input
                label="Giá gốc"
                {...register("originalPrice")}
                error={errors.originalPrice?.message!}
                variant="outline"
                className="mb-5"
              />
              <Input
                label="Giá khuyến mãi"
                {...register("price")}
                error={errors.price?.message!}
                variant="outline"
                className="mb-5"
              />
            </Card>
          </div>

          <div className="mb-4 text-right">
            {initialValues ? (
              <Button loading={updating}>Cập nhật sản phẩm</Button>
            ) : (
              <Button loading={creating}>Thêm sản phẩm</Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
