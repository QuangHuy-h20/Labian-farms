import { ROUTES } from "@utils/routes";
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
				label: "Quản lý nông trại",
				icon: "ShopIcon",
			},
			{
				href: ROUTES.TOURS,
				label: "Quản lý tour tham quan",
				icon: "DiaryIcon",
			},
			{
				href: ROUTES.PRODUCTS,
				label: "Quản lý sản phẩm",
				icon: "ProductsIcon",
			},
			{
				href: ROUTES.USERS,
				label: "Quản lý người dùng",
				icon: "UsersIcon",
			},
			{
				href: ROUTES.CATEGORIES,
				label: "Quản lý loại sản phẩm",
				icon: "CategoriesIcon",
			},
			{
				href: ROUTES.ORDERS,
				label: "Quản lý đơn hàng",
				icon: "OrdersIcon",
			},
		],
		farm: [
			{
				href: (farm?: string) => `${ROUTES.DASHBOARD}`,
				label: "Dashboard",
				icon: "DashboardIcon",
			},
			{
				href: (farm?: string) => `/${farm}${ROUTES.DASHBOARD}`,
				label: "Nông trại của tôi",
				icon: "ShopIcon",
			},
			{
				href: (farm?: string) => `/${farm}${ROUTES.PRODUCTS}`,
				label: "Sản phẩm",
				icon: "ProductsIcon",
			},
			{
				href: (farm?: string) => `/${farm}${ROUTES.ORDERS}`,
				label: "Danh sách đơn hàng",
				icon: "OrdersIcon",
			},
			{
				href: (farm?: string) => `/${farm}${ROUTES.TOURS}`,
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