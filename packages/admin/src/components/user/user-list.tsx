import ActionButtons from "@components/common/action-buttons";
import Table from "@components/ui/table";
import { Product, User } from "@generated/graphql";
import { EXECUTIVE_ADMIN } from "@utils/constants";
import { formatDate } from "@utils/format-date";
import { numberFormatter } from "@utils/format-price";
import Image from "next/image";
import { useRouter } from "next/router";

const UserList = ({ users }) => {
  const router = useRouter();
  const TableTitle: Object[] = [
    { key: "image", name: "Ảnh đại diện" },
    { key: "email", name: "Email" },
    { key: "phoneNumber", name: "Số điện thoại" },
    { key: "createdAt", name: "Tham gia ngày" },
    { key: "role", name: "Role" },
    { key: "status", name: "Trạng thái" },
    { key: "action", name: "Thao tác" },
  ];

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  const renderTableBody = (item: User) => (
    <tr className="text-center border-b" key={item.id}>
      <td className="flex justify-center">
        <img className="rounded w-14 h-14" src={item.avatar ? item.avatar : "/rick-roll.webp"} />
      </td>

      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{formatDate(item.createdAt)}</td>
      <td>{item.roleId}</td>
      <td>
        {item.status === 1 ? (
          <span className="text-emerald-500">Đã kích hoạt</span>
        ) : (
          <span className="text-red-400">Chưa kích hoạt</span>
        )}
      </td>
      <td>
        {item.roleId !== EXECUTIVE_ADMIN ? (
          <ActionButtons
            id={item.id}
            status={item.status}
            userStatus={true}
            isUserActive={item.status === 1 ? true : false}
          />
        ) : (
          ""
        )}
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
          bodyData={users}
          renderBody={renderTableBody}
        />
      </div>
    </>
  );
};

export default UserList;
