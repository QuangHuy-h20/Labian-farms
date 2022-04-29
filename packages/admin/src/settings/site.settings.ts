import { ROUTES } from "@utils/routes";
import { adminOnly, farmerOnly, allowedRoles } from "@utils/auth-utils";
export const siteSettings = {
	authorizedLinks: [
		{
		  href: ROUTES.PROFILE_UPDATE,
		  labelTransKey: "Cập nhật thông tin",
		},
		{
		  href: ROUTES.LOGOUT,
		  labelTransKey: "Đăng xuất",
		},
	  ],
	sidebarLinks: {
		admin: [
			{
				href: ROUTES.DASHBOARD,
				label: "Dashboard",
				icon: "DashboardIcon",
			},
			{
				href: ROUTES.FARMS,
				label: "Nông trại",
				icon: "ShopIcon",
			},

			{
				href: ROUTES.MY_FARMS,
				label: "Tour tham quan",
				icon: "MyShopIcon",
			},
			{
				href: ROUTES.PRODUCTS,
				label: "Sản phẩm",
				icon: "ProductsIcon",
			},
			{
				href: ROUTES.CATEGORIES,
				label: "Loại hàng",
				icon: "CategoriesIcon",
			},
		],
		farm: [
			{
				href: (farm: string) => `${ROUTES.DASHBOARD}${farm}`,
				label: "Dashboard",
				icon: "DashboardIcon",
				permissions: allowedRoles,
			},
			{
				href: (farm: string) => `${ROUTES.MY_FARMS}${farm}`,
				label: "Nông trại của tôi",
				icon: "MyShopIcon",
				permissions: farmerOnly,
			},
			{
				href: (farm: string) => `/${farm}${ROUTES.PRODUCTS}`,
				label: "Sản phẩm",
				icon: "ProductsIcon",
				permissions: allowedRoles,
			},
			{
				href: (farm: string) => `/${farm}${ROUTES.ORDERS}`,
				label: "Danh sách đơn hàng",
				icon: "OrdersIcon",
				permissions: farmerOnly,
			},
			{
				href: (farm: string) => `/${farm}${ROUTES.TOURS}`,
				label: "Tour tham quan",
				icon: "OrdersIcon",
				permissions: farmerOnly,
			},
		],
	},
	avatar: {
		placeholder: "/avatar-placeholder.svg",
	},
}