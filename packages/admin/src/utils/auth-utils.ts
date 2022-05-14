import Cookie from "js-cookie";
import SSRCookie from "cookie";
import {
	AUTH_CRED,
	PERMISSIONS,
	EXECUTIVE_ADMIN,
	FARMER,
	TOKEN,
	CUSTOMER,
} from "./constants";

export const allowedRoles = [EXECUTIVE_ADMIN, FARMER];
export const adminOnly = [EXECUTIVE_ADMIN];
export const farmerOnly = [FARMER];
export const customerOnly = [CUSTOMER];

export function setAuthCredentials(permissions: any) {
	Cookie.set(AUTH_CRED, JSON.stringify({ permissions }));
}

export function getAuthCredentials(context?: any): {
	permissions: string[] | null;
} {
	let authCred: any;
	if (context) {
		authCred = parseSSRCookie(context)[AUTH_CRED];
	} else {
		authCred = Cookie.get(AUTH_CRED);
	}
	if (authCred) {
		return JSON.parse(authCred);
	}
	return { permissions: null };
}

export function parseSSRCookie(context: any) {
	return SSRCookie.parse(context.req.headers.cookie ?? "");
}

export function hasAccess(
	_allowedRoles: string[],
	_userPermissions: string[] | undefined | null
) {
	if (_userPermissions) {
		return Boolean(
			_allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
		);
	}
	return false;
}
export function isAuthenticated(_cookies: any) {
	return (
		!!_cookies[TOKEN] &&
		Array.isArray(_cookies[PERMISSIONS]) &&
		!!_cookies[PERMISSIONS].length
	);
}
