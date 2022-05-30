import ActionButtons from "@components/common/action-buttons";
import Table from "@components/ui/table";
import { Tour } from "@generated/graphql";
import { numberFormatter } from "@utils/format-price";
import Image from "next/image";
import { useRouter } from "next/router";

const TourList = ({ tour }) => {
  const router = useRouter();
  const TableTitle: Object[] = [
    { key: "image", name: "Hình ảnh" },
    { key: "name", name: "Tên tour" },
    { key: "address", name: "Địu chỉ" },
    { key: "slot", name: "Số lượng tham gia tối đa" },
    { key: "startDate", name: "Ngày bắt đầu" },
    { key: "endDate", name: "Ngày kết thúc" },
    { key: "action", name: "Thao tác" },
  ];

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  const renderTableBody = (item: Tour) => (
    <tr className="text-center border-b" key={item.id}>
      <td>
        <Image className="rounded" src={item.image1} width={42} height={42} />
      </td>
      <td>{item.name}</td>
      <td>{item.farm.address}</td>
      <td>{item.slot}</td>
      <td>{new Date(item.startDate).toLocaleDateString('vi-VN')}</td>
      <td>{new Date(item.endDate).toLocaleDateString('vi-VN')}</td>
      <td>
        <ActionButtons
          id={item.id}
          editUrl={`${router.asPath}/${item.id}/edit`}
          deleteModalView="DELETE_TOUR"
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
          bodyData={tour}
          renderBody={renderTableBody}
        />
      </div>
    </>
  );
};

export default TourList;
