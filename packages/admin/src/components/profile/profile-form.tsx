import {
  ProfileInput,
  useMeQuery,
  useUpdateProfileMutation,
  Gender as g,
} from "@generated/graphql";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Label, Radio } from "@components/form";
import Button from "@components/ui/button";
import Card from "@components/cards";
import { DatePicker } from "@components/ui/date-picker";
import { toast } from "react-toastify";
import { constants as c } from "@constants/index";

const schema = yup.object().shape({
  fullName: yup.string().required("Bạn chưa nhập họ tên").default(""),
  nickname: yup.string().min(2, "Nickname từ 2 ký tự trở lên"),
  gender: yup.string().oneOf([g.Male, g.Female, g.Other]),
  address: yup.string(),
  dateOfBirth: yup.date().required("Vui lòng cập nhật lại ngày sinh."),
});

const ProfileForm = () => {
  const { data: meData } = useMeQuery();
  const { fullName, nickname, gender, dateOfBirth, address } = meData?.me!;
  const [updateProfile] = useUpdateProfileMutation();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: ProfileInput) => {
    await updateProfile({
      variables: { profileInput: values },
      onCompleted: (data) => {
        if (data.updateProfile.success) toast.success(c.UPDATE_PROFILE_SUCCESS);
      },
      onError: () => toast.error(c.UPDATE_PROFILE_FAILURE),
    });
  };

  return (
    <div className="w-3/4">
      <h1 className="font-bold text-2xl my-8 text-center">
        Thông tin tài khoản
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-dashed mb-8"
      >
        <div className="flex">
          <Card className="w-full">
            <Input
              name="fullName"
              label="Họ tên"
              type="text"
              defaultValue={fullName ? fullName : null}
              {...register("fullName")}
              placeholder="Nhập họ tên"
              error={errors?.fullName?.message!}
            />
            <Input
              name="nickname"
              label="Nickname"
              type="text"
              defaultValue={nickname ? nickname : null}
              {...register("nickname")}
              placeholder="Thêm nickname"
              error={errors?.nickname?.message!}
            />
            <Label>Giới tính</Label>
            <Controller
              name="gender"
              control={control}
              render={() => (
                <div className="w-1/3 mb-4 flex items-center justify-between">
                  <Radio
                    {...register("gender")}
                    defaultChecked={!!(gender === "male")}
                    label={"Nam"}
                    id="male"
                    type="radio"
                    value="MALE"
                  />
                  <Radio
                    {...register("gender")}
                    defaultChecked={!!(gender === "female")}
                    id="female"
                    type="radio"
                    label={"Nữ"}
                    value="FEMALE"
                  />
                  <Radio
                    {...register("gender")}
                    defaultChecked={!!(gender === "other")}
                    id="other"
                    type="radio"
                    label={"Khác"}
                    value="OTHER"
                  />
                </div>
              )}
            />
            <Input
              name="address"
              label="Địa chỉ"
              type="text"
              {...register("address")}
              defaultValue={address ? address : null}
              placeholder="Nhập địa chỉ mặc định"
            />
            <Label>Ngày sinh</Label>
            <Controller
              defaultValue={new Date(dateOfBirth)}
              control={control}
              name="dateOfBirth"
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    placeholderText={new Date(dateOfBirth).toLocaleDateString()}
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

            <Button
              className="mt-6"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              size="large"
              variant="normal"
            >
              Cập nhật
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
