import { Fragment } from "react";
import { siteSettings } from "../../settings/site.settings";
import Navbar from "./navbar";
import SidebarItem from "./sidebar-item";

const AppLayout = ({ children }) => {
  const SidebarItemMap = () => (
    <Fragment>
      {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => (
        <SidebarItem key={label} href={href} label={label} icon={icon} />
      ))}
    </Fragment>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-colors duration-150">
      <Navbar />

      <div className="flex flex-1 pt-20">
        <aside className="shadow w-72 xl:w-76 hidden lg:block overflow-y-auto bg-white px-4 fixed start-0 bottom-0 h-full pt-20">
          <div className="flex flex-col space-y-6 py-4">
            <SidebarItemMap />
          </div>
        </aside>
        <main className="w-full lg:ps-72 xl:ps-76">
          <div className="p-5 md:p-8 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
