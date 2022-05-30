import Card from "@components/common/card";
import AdminLayout from "@components/layouts/admin";
import ProductList from "@components/product/product-list";
import ErrorMessage from "@components/ui/error-message";
import PageLoader from "@components/ui/page-loader";
import UserList from "@components/user/user-list";
import { useUsersQuery } from "@generated/graphql";

function UsersAdminPage() {
  const { data, loading, error } = useUsersQuery();

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Card className="flex flex-col mb-8 justify-between">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-gray-600">Sản phẩm</h1>
          </div>
        </div>
      </Card>

      <UserList users={data?.users} />
    </>
  );
}

UsersAdminPage.Layout = AdminLayout;

export default UsersAdminPage;
