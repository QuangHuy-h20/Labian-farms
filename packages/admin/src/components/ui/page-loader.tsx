import Spinner from "@components/loader/spinner";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size="large" />
    </div>
  );
};

export default PageLoader;
