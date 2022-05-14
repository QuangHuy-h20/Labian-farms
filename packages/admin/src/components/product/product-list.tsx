import ActionButtons from "@components/common/action-buttons";
import Table from "@components/ui/table";
import { Product, useProductsQuery } from "@generated/graphql";
import { numberFormatter } from "@utils/format-price";
import Image from "next/image";
import { useRouter } from "next/router";

const ProductList = ({ products }) => {
  const { data } = useProductsQuery();
  const router = useRouter();
  const TableTitle: Object[] = [
    { key: "image", name: "Hình ảnh" },
    { key: "name", name: "Tên sản phẩm" },
    { key: "category", name: "Loại" },
    { key: "originalPrice", name: "Giá gốc/ Đơn vị" },
    { key: "price", name: "Giá Km/ Đơn vị" },
    { key: "qty", name: "Số lượng" },
    { key: "action", name: "Thao tác" },
  ];

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  const renderTableBody = (item: Product) => (
    <tr className="text-center border-b" key={item.id}>
      <td>
        <Image className="rounded" src={item.image1} width={42} height={42} />
      </td>
      <td>{item.name}</td>
      <td>{item.category.name}</td>
      <td>{numberFormatter(item.originalPrice, ' đ')}</td>
      <td>{numberFormatter(item.price, ' đ')}</td>
      <td>{item.qty}</td>
      <td>
        <ActionButtons
          id={item.id}
          editUrl={`${router.asPath}/${item.id}/edit`}
          deleteModalView="DELETE_PRODUCT"
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          limit="6"
          headData={TableTitle}
          renderHead={renderTableHead}
          bodyData={data.allProducts}
          renderBody={renderTableBody}
        />
      </div>
    </>
  );
};

export default ProductList;
