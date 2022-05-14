import cn from "classnames";
import styles from "./page-loader.module.css";

const PageLoader = () => {
  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col items-center justify-center"
      )}
    >
      <div className="flex relative">
        <div className={styles.page_loader}></div>
      </div>
    </div>
  );
};

export default PageLoader;
