import CreateOrUpdateCategoriesForm from "@components/category/category-form";
import Layout from "@components/layouts/admin";

export default function CreateCategoriesPage() {
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          Tạo loại sản phẩm mới
        </h1>
      </div>
      <CreateOrUpdateCategoriesForm />
    </>
  );
}

CreateCategoriesPage.Layout = Layout;
