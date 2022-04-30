import AppLayout from "@components/layouts/app";
import { useFarmsQuery } from "@generated/graphql";

const Farms = () => {
  const {data, loading} = useFarmsQuery()
  
  return (
	<div>Farms</div>
  )
}

Farms.Layout = AppLayout;

export default Farms