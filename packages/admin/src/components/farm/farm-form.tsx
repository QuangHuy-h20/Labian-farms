import Card from "@components/common/card";
import { Input } from "@components/form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import TextArea from "@components/ui/text-area";
import {
  UpdateFarmInput,
  useCreateFarmMutation,
  useUpdateFarmMutation,
} from "@generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
// import { farmValidationSchema } from "./farm-validation-schema";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema: yup.SchemaOf<UpdateFarmInput> = yup.object().shape({
  name: yup.string().required("Trường dữ liệu bắt buộc.").default(""),
  description: yup.string().default(""),
  address: yup.string().required("Trường dữ liệu bắt buộc."),
});

const CreateOrUpdateFarmForm = ({ initialValues }: { initialValues?: any }) => {
  const router = useRouter();
  const [createFarm, { loading: creating }] = useCreateFarmMutation({
    onCompleted: (data) => {
      if (data.createFarm.success) {
        toast.success(data.createFarm.message);
        router.push(ROUTES.DASHBOARD);
      } else toast.error(data.createFarm.message);
    },
  });
  const [updateFarm, { loading: updating }] = useUpdateFarmMutation({
    onCompleted: () => {
      toast.success("Cập nhật thông tin nông trại thành công.");
    },
  });
  const [fileToUpload, setFileToUpload] = useState<File>([] as any);
  const [imageSrc, setImageSrc] = useState(
    initialValues ? initialValues.logoImage : ""
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFarmInput>({
    shouldUnregister: true,
    ...(initialValues
      ? {
          defaultValues: {
            ...initialValues,
            logoImage: initialValues.logoImage,
          },
        }
      : {}),
    resolver: yupResolver(schema),
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

  const onSubmit: SubmitHandler<UpdateFarmInput> = async (values) => {
    if (initialValues) {
      updateFarm({
        variables: {
          updateFarmInput: { ...values },
          files: fileToUpload,
        },
        onCompleted(data) {
          const { name, slug } = data?.updateFarm?.farm ?? {};
          if (name !== initialValues.name) {
            router.push(`/${slug}`);
          }
        },
      });
    } else {
      createFarm({
        variables: {
          createFarmInput: { ...values },
          files: fileToUpload,
        },
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
          <Description
            title="Ảnh logo"
            details="Tải lên ảnh đại diện cho nông trại của bạn"
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
            title="Thông tin cơ bản"
            details="Thêm 1 số thông tin cơ bản cho nông trại của bạn"
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label="Tên nông trại"
              {...register("name")}
              className="mb-5"
              error={errors.name?.message}
            />
            <TextArea
              label="Mô tả về nông trại"
              {...register("description")}
              variant="outline"
              error={errors.description?.message!}
            />
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 border-b border-dashed border-gray-300 my-5 sm:my-8">
          <Description
            title="Địa chỉ"
            details="Nhập địa chỉ của trang trại"
            className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label="Địa chỉ"
              {...register("address")}
              className="mb-5"
              error={errors.address?.message!}
            />
          </Card>
        </div>

        <div className="mb-5 text-right">
          <Button
            loading={creating || updating}
            disabled={creating || updating}
          >
            {initialValues ? "Cập nhật" : "Tạo nông trại"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateOrUpdateFarmForm;
