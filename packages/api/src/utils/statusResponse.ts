
export const failureResponse = (code: number, success: boolean, message?: string | undefined) => ({
	code, success, message
})

export const successResponse = (code: number, success: boolean, message: string, ...rest: any) => {
	return { code, success, message, ...rest }
}
