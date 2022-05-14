import AppLayout from "@components/layouts/app";
import Link from "@components/ui/link";

const Products = () => {
  return (
    <div className="p-5 md:p-8 bg-white shadow rounded flex flex-col mb-8">
      <h1 className="text-lg font-semibold text-gray-500">Sản phẩm</h1>
    </div>
  );
};

Products.Layout = AppLayout;

export default Products;
