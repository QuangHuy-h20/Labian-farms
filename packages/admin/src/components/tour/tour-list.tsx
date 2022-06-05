import ActionButtons from "@components/common/action-buttons";
import ErrorMessage from "@components/ui/error-message";
import PageLoader from "@components/ui/page-loader";
import Table from "@components/ui/table";
import { Tour, useToursByFarmQuery } from "@generated/graphql";
import { siteSettings } from "@settings/site.settings";
import Image from "next/image";
import { useRouter } from "next/router";

type ITourList = {
  tours?: any[];
  farmId?: string;
  permission?: boolean;
};

const TourList = ({ tours, farmId, permission }: ITourList) => {
  const router = useRouter();

  const { data, loading, error } = useToursByFarmQuery({
    variables: { farmId },
  });

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;

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
    <tr className="text-center border-b" key={item?.id!}>
      <td>
        <Image
          className="rounded"
          src={item?.image1! ?? siteSettings.product.placeholder}
          width={42}
          height={42}
        />
      </td>
      <td>{item?.name}</td>
      <td>{item?.farm?.address}</td>
      <td>{item?.slot}</td>
      <td>{new Date(item?.startDate).toLocaleDateString("vi-VN")}</td>
      <td>{new Date(item?.endDate).toLocaleDateString("vi-VN")}</td>
      <td>
        {permission ? (
          <ActionButtons
            id={item?.id}
            approveTourButton={true}
            detailsUrl={`localhost:3000/tours/${item?.slug}`}
            isTourActive={item?.isActive}
          />
        ) : (
          <ActionButtons
            id={item.id}
            editUrl={`${router.asPath}/${item.id}/edit`}
            deleteModalView="DELETE_TOUR"
          />
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
          bodyData={data?.toursByFarm! ?? tours}
          renderBody={renderTableBody}
        />
      </div>
    </>
  );
};

export default TourList;
