import ActionButtons from "@components/common/action-buttons";
import Table from "@components/ui/table";
import { Product } from "@generated/graphql";
import { numberFormatter } from "@utils/format-price";
import Image from "next/image";
import { useRouter } from "next/router";

type IProductList = {
  products: any[];
  permission?: boolean;
};
const ProductList = ({ products, permission }: IProductList) => {
  const router = useRouter();
  const TableTitle: Object[] = [
    { key: "view", name: "" },
    { key: "image", name: "Hình ảnh" },
    { key: "name", name: "Tên sản phẩm" },
    { key: "category", name: "Loại" },
    { key: "farmName", name: "Nông trại" },
    { key: "price", name: "Giá khuyến mãi/ Giá gốc" },
    { key: "unit", name: "Đơn vị" },
    { key: "stock", name: "Số lượng" },
    { key: "action", name: "Thao tác" },
  ];

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  const renderTableBody = (item: Product) => (
    <tr className="text-center border-b" key={item.id}>
      <td>
        {item.isActive ? (
          <ActionButtons
            id={item.id}
            detailsUrl={`http://localhost:3000/products/${item.id}`}
          />
        ) : (
          ""
        )}
      </td>
      <td className="flex justify-center">
        <img className="rounded w-14 h-14" src={item.image1}  />
      </td>
      <td>{item.name}</td>
      <td>{item?.category?.name}</td>
      <td>{item?.farm?.name}</td>
      <td>{`${numberFormatter(item.price, " đ")} / ${numberFormatter(
        item.originalPrice,
        " đ"
      )}`}</td>
      <td>{item.unit}</td>
      <td>{item.stock}</td>
      <td>
        {!permission ? (
          <ActionButtons
            id={item.id}
            editUrl={`${router.asPath}/${item.id}/edit`}
            deleteModalView="DELETE_PRODUCT"
          />
        ) : (
          <ActionButtons
            id={item.id}
            approveProductButton={true}
            isProductActive={item?.isActive}
            deleteModalView="DELETE_PRODUCT"
          />
        )}
      </td>
    </tr>
  );

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          limit="10"
          headData={TableTitle}
          renderHead={renderTableHead}
          bodyData={products}
          renderBody={renderTableBody}
        />
      </div>
    </>
  );
};

export default ProductList;
