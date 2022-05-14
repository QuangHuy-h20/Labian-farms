import styles from "./loader.module.css";
import cn from "classnames";

interface Props {
  className?: string;
}

const Loader = (props: Props) => {
  const { className } = props;
  return (
    <>
      <div
        className={cn(
          "w-full flex flex-col items-center justify-center",
          className
        )}
        style={{ height: "calc(100vh - 200px)" }}
      >
        <div className={styles.loading} />
      </div>
    </>
  );
};

export default Loader;
