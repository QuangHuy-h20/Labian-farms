import ActionButtons from "@components/common/action-buttons";
import Table from "@components/ui/table";
import { Category, Farm } from "@generated/graphql";
import { formatDate } from "@utils/format-date";
import Image from "next/image";
import { useRouter } from "next/router";

const CategoryList = ({ categories }) => {
  const router = useRouter();
  const TableTitle: Object[] = [
    { key: "slug", name: "Slug" },
    { key: "name", name: "Tên loại sản phẩm" },
  ];

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  const renderTableBody = (item: Category) => (
    <tr className="text-center border-b" key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
    </tr>
  );

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          limit="6"
          headData={TableTitle}
          renderHead={renderTableHead}
          bodyData={categories}
          renderBody={renderTableBody}
        />
      </div>
    </>
  );
};

export default CategoryList;
