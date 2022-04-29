import { useCategoriesQuery } from "@generated/graphql";
import StickySidebarBoxedCategories from "./sidebar-category";

const Categories = () => {
  const { data, loading } = useCategoriesQuery();
  return (
    <StickySidebarBoxedCategories
      className="bg-white"
      categories={data?.categories}
      loading={loading}
    />
  );
};

export default Categories;
