interface Props {
  message?: string | undefined;
}

export const Error = ({ message }: Props) => {
  return (
    <p className="my-2 text-xs text-start text-red-500">Đã có lỗi xảy ra</p>
  );
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <p className="bg-red-400 p-5 mt-16 mx-auto max-w-sm min-w-min text-center text-lg text-light font-semibold rounded">
      Đã có lỗi xảy ra
    </p>
  );
};

export default ErrorMessage;
