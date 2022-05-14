import { useRouter } from "next/router";
import Navbar from "@components/layouts/navbar";
import { getAuthCredentials, hasAccess } from "@utils/auth-utils";
import { siteSettings } from "@settings/site.settings";
import SidebarItem from "@components/layouts/sidebar-item";
import MobileNavigation from "@components/layouts/mobile-navigation";

const FarmLayout: React.FC = ({ children }: any) => {
  const router = useRouter();
  const {
    query: { farm },
  } = router;

  const SidebarItemMap = () => (
	<>
	{siteSettings.sidebarLinks.farm.map(({ href, label, icon }) => (
	  <SidebarItem key={label} href={href(farm?.toString())} label={label} icon={icon} />
	))}
  </>
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
            <SidebarItemMap />
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
