import FarmLayout from "@components/layouts/farm";
import CreateOrUpdateProductForm from "@components/product/product-form";

export default function CreateProductPage() {
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-gray-600">Thêm sản phẩm</h1>
      </div>
      <CreateOrUpdateProductForm />
    </>
  );
}

CreateProductPage.Layout = FarmLayout;
