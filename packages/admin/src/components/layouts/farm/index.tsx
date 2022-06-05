import Navbar from "@components/layouts/navbar";
import { siteSettings } from "@settings/site.settings";
import SidebarItem from "@components/layouts/sidebar-item";
import MobileNavigation from "@components/layouts/mobile-navigation";
import { useFarmByFarmerQuery, useMeQuery } from "@generated/graphql";
import { Fragment } from "react";
import { FARMER } from "@utils/constants";
import { DashboardIcon } from "@components/icons/sidebar";

const FarmLayout: React.FC = ({ children }: any) => {
  const { data } = useMeQuery();
  const { data: farmData } = useFarmByFarmerQuery({
    variables: { ownerId: data?.me?.id },
  });
  const SidebarItemMap = () => (
    <Fragment>
      {siteSettings.sidebarLinks.farm.map(({ href, label, icon }) => {
        if (data?.me?.roleId !== FARMER) return null;
        return (
          <SidebarItem
            key={label}
            href={href(farmData?.farmByFarmer?.slug?.toString()!)}
            label={label}
            icon={icon}
          />
        );
      })}
    </Fragment>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-colors duration-150">
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>

      <div className="flex flex-1 pt-20">
        <aside className="shadow w-72 xl:w-76 hidden lg:block overflow-y-auto bg-white px-4 fixed start-0 bottom-0 h-full pt-24">
          <div className="flex flex-col space-y-6 py-3">
            {!farmData?.farmByFarmer! ? (
              <div className="flex w-full items-center text-base text-gray-500 focus:text-emerald-500 hover:text-emerald-500">
                <div className="w-5 h-5">
                  <DashboardIcon />
                </div>
                <span className="ml-2">Dashboard</span>
              </div>
            ) : (
              <SidebarItemMap />
            )}
          </div>
        </aside>
        <main className="w-full pl-72">
          <div className="p-5 md:p-8 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default FarmLayout;
