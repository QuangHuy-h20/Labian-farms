import Card from "@components/common/card";
import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import { DatePicker } from "@components/ui/date-picker";
import Description from "@components/ui/description";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import PageLoader from "@components/ui/page-loader";
import Radio from "@components/ui/radio/radio";
import TextArea from "@components/ui/text-area";
import {
  useFarmQuery,
  TourStatus as t,
  CreateTourInput,
  useCreateTourMutation,
  UpdateTourInput,
  useUpdateTourMutation,
  Tour,
  ToursQuery,
  ToursDocument,
} from "@generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "@utils/form-error";
import { formatDate } from "@utils/format-date";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { getTourDefaultValues, getTourInputValues } from "./form-validate";

type TourFormProps = {
  initialValues?: Tour | null;
};

const schema = yup.object().shape({
  name: yup.string().required("Trường dữ liệu bắt buộc.").default(""),
  description: yup.string().default(""),
  startDate: yup
    .date()
    .typeError("Định dạng phải là số")
    .required("Trường dữ liệu bắt buộc."),
  endDate: yup
    .date()
    .typeError("Định dạng phải là số")
    .required("Trường dữ liệu bắt buộc."),
  slot: yup
    .number()
    .positive("Số lượng không được âm")
    .required("Trường dữ liệu bắt buộc.")
    .default(0),
  status: yup.string().oneOf([t.Open, t.Closed]).default(t.Open),
});

export default function CreateOrUpdateTourForm({ initialValues }: any) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File>([] as any);
  const [imageSrc, setImageSrc] = useState(
    initialValues ? initialValues.image1 : ""
  );
  const {
    query: { farm },
  } = useRouter();
  const { data: farmData, loading: farmLoading } = useFarmQuery({
    variables: {
      slug: farm as string,
    },
  });
  const farmId = farmData?.farm?.id;

  const methods = useForm<CreateTourInput>({
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: getTourDefaultValues(initialValues),
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = methods;

  const [createTour, { loading: creating }] = useCreateTourMutation({
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

  const [updateTour, { loading: updating }] = useUpdateTourMutation({
    onCompleted: () => {
      toast.success("Cập nhật tour thành công");
      router.push(ROUTES.TOURS);
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

  const onSubmit: SubmitHandler<CreateTourInput> = async (
    values: CreateTourInput
  ) => {
    const inputValues = getTourInputValues(values, initialValues);

    if (initialValues) {
      updateTour({
        variables: {
          updateTourInput: { ...inputValues, id: initialValues.id },
          files: fileToUpload,
        },
      });
    } else {
      await createTour({
        variables: {
          farmId,
          createTourInput: inputValues,
          files: fileToUpload,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              toursByFarm(existing) {
                if (data?.createTour?.success) {
                  const newToursRef = cache.identify(data?.createTour?.tour);
                  return existing.concat([{ __ref: newToursRef }]);
                }
              },
            },
          });
        },
        onCompleted: (data) => {
          if (data.createTour.success) {
            toast.success("Tạo tour tham quan thành công");
            router.back();
          }
        },
        onError: () => toast.error("Đã có lỗi xảy ra, vui lòng thử lại."),
      });
    }
  };

  if (farmLoading) return <PageLoader />;

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
              title="Ảnh bìa tour"
              details="Cập nhật ảnh của tour tham quan"
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
              title="Thông tin tổng quát"
              details="Tên và mô tả về tour tham quan"
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label="Tên tour"
                {...register("name")}
                error={errors.name?.message!}
                variant="outline"
                className="mb-5"
              />

              <TextArea
                label="Mô tả về tour"
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
              details="Thêm thông tin cơ bản tour tham quan ở đây"
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label="Số lượng tham gia"
                {...register("slot")}
                error={errors.slot?.message!}
                variant="outline"
                className="mb-5"
              />
              <Label>Ngày bắt đầu</Label>
              <Controller
                defaultValue={
                  initialValues?.startDate
                    ? new Date(initialValues?.startDate).toISOString()
                    : ""
                }
                control={control}
                name="startDate"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      placeholderText={
                        initialValues?.startDate
                          ? formatDate(initialValues?.startDate)
                          : "Nhập ngày bắt đầu tour"
                      }
                      onChange={(date) => onChange(date)}
                      onBlur={onBlur}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      selected={value as any}
                      className="border border-border-base"
                    />
                    <p className="text-left text-sm text-red-500 mt-1">
                      {error?.message}
                    </p>
                  </>
                )}
              />
              <Label>Ngày kết thúc</Label>
              <Controller
                defaultValue={
                  initialValues?.endDate
                    ? new Date(initialValues?.endDate).toISOString()
                    : ""
                }
                control={control}
                name="endDate"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      placeholderText={
                        initialValues?.endDate
                          ? formatDate(initialValues?.endDate)
                          : "Nhập ngày kết thúc tour"
                      }
                      onChange={(date) => onChange(date)}
                      onBlur={onBlur}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      selected={value as any}
                      className="border border-border-base"
                    />
                    <p className="text-left text-sm text-red-500 mt-1">
                      {error?.message}
                    </p>
                  </>
                )}
              />
              <Label>Trạng thái</Label>
              <Controller
                name="status"
                control={control}
                render={() => (
                  <div className="w-1/3 mb-4 flex items-center justify-between">
                    <Radio
                      {...register("status")}
                      defaultChecked={!!t.Closed}
                      id="closed"
                      type="radio"
                      disabled={initialValues ? false : true}
                      label={"Đóng tour"}
                      value="CLOSED"
                    />

                    <Radio
                      {...register("status")}
                      defaultChecked={!!t.Open}
                      label={"Mở tour"}
                      id="open"
                      type="radio"
                      value="OPEN"
                    />
                  </div>
                )}
              />
            </Card>
          </div>

          <div className="mb-4 text-right">
            {initialValues ? (
              <Button loading={updating}>Cập nhật tour</Button>
            ) : (
              <Button loading={creating}>Tạo tour</Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
