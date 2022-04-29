import Link from "@components/ui/Link";
import { getIcon } from "@utils/get-icon";
import * as sidebarIcons from "@components/icons/sidebar";
import { useUI } from "@contexts/ui.context";
const SidebarItem = ({ href, icon, label }: any) => {
	const { closeSidebar } = useUI();
	return (
	  <Link
		href={href}
		className="flex w-full items-center text-base text-gray-500 focus:text-emerald-500 hover:text-emerald-500"
	  >
		{getIcon({
		  iconList: sidebarIcons,
		  iconName: icon,
		  className: "w-5 h-5 me-4",
		})}
		<span className="ml-2" onClick={() => closeSidebar()}>{label}</span>
	  </Link>
	);
  };

export default SidebarItem