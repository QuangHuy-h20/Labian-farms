
export const failureResponse = (code: number, success: boolean, message?: string | undefined) => ({
	code, success, message
})

export const successResponse = (code: number, success: boolean, message: string) => {
	return { code, success, message }
}
