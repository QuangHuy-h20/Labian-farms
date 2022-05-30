export const ROUTES = {
	menu: [
		{
			name: 'Nông trại',
			route: '/farms'
		},
		{
			name: 'Đăng ký nông trại',
			route: 'http://localhost:3001'
		},
		{
			name: 'Tour tham quan',
			route: '/tours'
		}
	],
	account: [
		{
			name: "Đơn hàng của tôi",
			href: '/customer/order'
		},
		{
			name: "Tài khoản của tôi",
			href: '/customer/profile'
		},
		{
			name: "Đăng xuất",
			href: '/logout'
		},
	],
	profile: [
		{
			name: "Thông tin tài khoản",
			route: "/customer/profile"
		},
		{
			name: "Đổi mật khẩu",
			route: "/customer/change-password"
		},
		{
			name: "Quản lý đơn hàng",
			route: "/customer/order"
		},
		{
			name: "Đăng xuất",
			route: '/logout'
		}
	]
}