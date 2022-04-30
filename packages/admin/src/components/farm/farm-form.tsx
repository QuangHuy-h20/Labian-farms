import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Spinner from "@components/loader/spinner";
import Button from "@components/ui/button";
import { Input } from "@components/form";
import { CreateFarmInput, useCreateFarmMutation } from "@generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { toast } from "react-toastify";

const schema: yup.SchemaOf<CreateFarmInput> = yup.object().shape({
  name: yup.string().required("Trường dữ liệu bắt buộc.").default(""),
  address: yup.string().required("Trường dữ liệu bắt buộc.").default(""),
  description: yup.string().default(""),
});

const FarmForm = () => {
  const router = useRouter();
  const [createFarm] = useCreateFarmMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateFarmInput>({
    resolver: yupResolver(schema),
  });

  const [fileToUpload, setFileToUpload] = useState<File>([] as any);
  const [imageSrc, setImageSrc] = useState("");
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

  const onSubmit: SubmitHandler<CreateFarmInput> = async (
    values: CreateFarmInput
  ) => {
    await createFarm({
      variables: { createFarmInput: values, files: fileToUpload },
      onCompleted: (data) => {
        if (data.createFarm.success) toast.success(data.createFarm.message);
      },
      onError: () => toast.error("Đã có lỗi xảy ra, vui lòng thử lại."),
    });
  };

  return (
    <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="pl-3 text-md" htmlFor="uploadFile">
          Ảnh đại diện
        </label>
        <div
          {...getRootProps({
            className: "border border-dashed py-6 px-3 my-2",
          })}
        >
          <input name="uploadFile" {...getInputProps()} />
          {imageSrc ? <img className=" w-full h-56 object-contain" src={imageSrc} alt="" /> : <p className="text-center">Kéo ảnh hoặc nhấp vào ô để chọn ảnh</p>}
        </div>
      </div>
      <Input
        name="name"
        label="Tên trang trại"
        type="text"
        {...register("name")}
        placeholder="Nhập tên trang trại"
        error={errors?.name?.message!}
      />
      <Input
        name="address"
        label="Địa chỉ trang trại"
        type="text"
        {...register("address")}
        placeholder="Nhập địa chỉ trang trại"
        error={errors?.address?.message!}
      />
      <Input
        name="description"
        label="Mô tả"
        type="text"
        {...register("description")}
        placeholder="Nhập mô tả"
        error={errors?.description?.message!}
      />

      <Button
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        size="large"
        variant="normal"
      >
        <span className="cursor-pointer text-xl">Hoàn thành</span>
      </Button>
    </form>
  );
};

export default FarmForm;
