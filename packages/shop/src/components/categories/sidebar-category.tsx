import Scrollbar from "@components/ui/scrollbar";
import CategoriesLoader from "@components/loader/category-loader";
import OutlinedBoxedCategoryMenu from "@components/categories/outline-boxed-category";

interface StickySidebarBoxedCategoriesProps {
  loading: boolean;
  categories: any[];
  className?: string;
}
const StickySidebarBoxedCategories: React.FC<
  StickySidebarBoxedCategoriesProps
> = ({ categories, loading, className }) => {
  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoriesLoader />
        </div>
      </div>
    );
  }
  return (
    <aside
      className={`lg:sticky lg:top-22 h-full w-full lg:w-[380px] hidden xl:block lg:bg-gray-100 ${className}`}
    >
      <Scrollbar style={{ maxHeight: "calc(100vh - 88px)" }}>
        <div className="flex flex-col">
          <OutlinedBoxedCategoryMenu items={categories} className="py-8" />
        </div>
      </Scrollbar>
    </aside>
  );
};

export default StickySidebarBoxedCategories;
