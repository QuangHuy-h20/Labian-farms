import Navbar from "@components/layouts/navbar";
// import OwnerInformation from "@components/user/user-details";
import MobileNavigation from "@components/layouts/mobile-navigation";
import FarmerInformation from "@components/user/user-detail";

const FarmerLayout: React.FC = ({ children }: any) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-colors duration-150">
      <Navbar />
      <MobileNavigation>
        <FarmerInformation />
      </MobileNavigation>

      <div className="flex flex-1 pt-20">
        <aside className="shadow w-72 xl:w-76 hidden lg:block overflow-y-auto bg-white px-4 fixed start-0 bottom-0 h-full pt-24">
          <FarmerInformation />
        </aside>
        <main className="w-full pl-72">
          <div className="p-5 md:p-8 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default FarmerLayout;
