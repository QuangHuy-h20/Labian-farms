import AppLayout from "@components/layouts/app";
import Link from "@components/ui/link";
import { useFarmsQuery } from "@generated/graphql";

const Farms = () => {
  const { data, loading } = useFarmsQuery();

  return (
    <div>
      <div className="p-5 md:p-8 bg-white shadow rounded flex flex-col mb-8">
        <h1 className="text-lg font-semibold text-gray-500">Nông trại</h1>
      </div>
      <ul>
        {data?.allFarms?.map((item) => (
          <li>
            <Link href={`/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Farms.Layout = AppLayout;

export default Farms;
