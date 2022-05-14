import ActionButtons from "@components/common/action-buttons";
import Card from "@components/common/card";
import { Eye } from "@components/icons/eye-icon";
import FarmLayout from "@components/layouts/farm";
import ErrorMessage from "@components/ui/error-message";
import Link from "@components/ui/link";
import PageLoader from "@components/ui/page-loader";
import Table from "@components/ui/table";
import { Farm, useFarmByFarmerQuery, useMeQuery } from "@generated/graphql";
import Image from "next/image";
import { useRouter } from "next/router";

const MyFarms = () => {
  const { data } = useMeQuery();
  const router = useRouter();
  const {
    data: farmData,
    loading,
    error,
  } = useFarmByFarmerQuery({
    variables: { ownerId: data?.me?.id },
  });

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const TableTitle: Object[] = [
    { key: "detail", name: "Xem " },
    { key: "image", name: "Hình ảnh" },
    { key: "name", name: "Tên sản phẩm" },
    { key: "phoneNumber", name: "Số điện thoại" },
    { key: "count", name: "Số lượng sản phẩm" },
    { key: "createdAt", name: "Ngày tạo" },
    { key: "status", name: "Trạng thái" },
    { key: "action", name: "Thao tác" },
  ];

  const renderTableHead = (item: any) => <th key={item.key}>{item.name}</th>;

  const renderTableBody = (item: Farm) => (
    <tr className="text-center border-b" key={item.id}>
      <td>
        <div className="flex justify-center text-emerald-500">
          <Link href={`${item.slug}/products`}>
            <Eye width={24} />
          </Link>
        </div>
      </td>
      <td>
        <Image
          className="rounded"
          src={item.logoImage}
          width={42}
          height={42}
        />
      </td>
      <td>{item.name}</td>
      <td>{item.owner.phone}</td>
      <td>{item!.count}</td>
      <td>{new Date(item.createdAt).toLocaleDateString("vi-VI")}</td>
      <td>
        {!item.isActive ? (
          <span>Chưa kích hoạt</span>
        ) : (
          <span>Đã kích hoạt</span>
        )}
      </td>
      <td>
        <ActionButtons
          id={item.id}
          editUrl={`${router.asPath}/${item.id}/edit`}
          deleteModalView="DELETE_FARM"
        />
      </td>
    </tr>
  );

  return (
    <>
      <Card className="flex flex-col mb-8 justify-between">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-gray-600">
              Nông trại của tôi
            </h1>
          </div>
        </div>
      </Card>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          limit="6"
          headData={TableTitle}
          renderHead={renderTableHead}
          bodyData={farmData.farmsByFarmer}
          renderBody={renderTableBody}
        />
      </div>
    </>
  );
};

MyFarms.Layout = FarmLayout;

export default MyFarms;
