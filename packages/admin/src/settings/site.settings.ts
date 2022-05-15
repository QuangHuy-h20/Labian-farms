import { ROUTES } from "@utils/routes";
import { adminOnly, farmerOnly, allowedRoles } from "@utils/auth-utils";
export const siteSettings = {
	logo: {
		url: "/logo.svg",
		alt: "Labian Farms",
		href: "/",
		width: 128,
		height: 40,
	  },
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
	defaultLanguage: "vn",
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
				href: ROUTES.TOURS,
				label: "Tour tham quan",
				icon: "DiaryIcon",
			},
			{
				href: ROUTES.PRODUCTS,
				label: "Sản phẩm",
				icon: "ProductsIcon",
			},
			{
				href: ROUTES.USERS,
				label: "Người dùng",
				icon: "UsersIcon",
			  },
			{
				href: ROUTES.CATEGORIES,
				label: "Loại hàng",
				icon: "CategoriesIcon",
			},
		],
		farm: [
			{
				href: ROUTES.DASHBOARD,
				label: "Dashboard",
				icon: "DashboardIcon",
			},
			{
				href: ROUTES.PRODUCTS,
				label: "Sản phẩm",
				icon: "ProductsIcon",
			},
			{
				href: ROUTES.ORDERS,
				label: "Danh sách đơn hàng",
				icon: "OrdersIcon",
			},
			{
				href: ROUTES.TOURS,
				label: "Tour tham quan",
				icon: "DiaryIcon",
			},
		],
	},
	product: {
		placeholder: "/product-placeholder.svg",
	},
	avatar: {
		placeholder: "/avatar-placeholder.svg",
	},
}