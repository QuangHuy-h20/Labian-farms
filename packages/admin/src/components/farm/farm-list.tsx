import ActionButtons from "@components/common/action-buttons";
import Table from "@components/ui/table";
import { Farm } from "@generated/graphql";
import { formatDate } from "@utils/format-date";
import Image from "next/image";
import { useRouter } from "next/router";

const FarmList = ({ farms }) => {
  const router = useRouter();
  const TableTitle: Object[] = [
    { key: "image", name: "Hình ảnh" },
    { key: "name", name: "Tên nông trại" },
    { key: "address", name: "Địa chỉ" },
    { key: "email", name: "Email liên hệ" },
    { key: "count", name: "Tống số sản phẩm" },
    { key: "createdAt", name: "Tạo ngày" },
    { key: "active", name: "Trạng thái" },
    { key: "action", name: "Thao tác" },
  ];

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  const renderTableBody = (item: Farm) => (
    <tr className="text-center border-b" key={item.id}>
      <td>
        <Image
          className="rounded"
          src={item.logoImage}
          width={42}
          height={42}
        />
      </td>
      <td>{item.name}</td>
      <td>{item.address}</td>
      <td>{item.owner.email}</td>
      <td>{item.count}</td>
      <td>{formatDate(item.createdAt)}</td>
      <td>
        {item.isActive ? (
          <span className="text-emerald-500">Đã được duyệt</span>
        ) : (
          <span className="text-red-500">Chưa được duyệt</span>
        )}
      </td>
      <td>
        <ActionButtons
          id={item.id}
          approveButton={true}
          detailsUrl={`/${item.slug}`}
          isFarmActive={item.isActive}
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
          bodyData={farms}
          renderBody={renderTableBody}
        />
      </div>
    </>
  );
};

export default FarmList;
