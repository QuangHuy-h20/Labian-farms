import { Arg, Mutation, Resolver, Ctx, ID, Query } from "type-graphql";
import { AddressInput, UpdateAddressInput } from "./address.input";
import { AddressMutationResponse } from "./address.mutation";
import { failureResponse, successResponse } from "../../utils/statusResponse";
import { validateEmailAndPhone } from "../../utils/validateInput";
import { User } from "../../entities/User";
import { Address } from "../../entities/Address";
import { Context } from "../../types/Context";

@Resolver(_of => Address)
export class AddressResolver {

	//----------------------- Query -----------------------

	@Query(_return => [Address], { description: "Get all customer's addresses" })
	async addressesByCustomer(@Arg("customerId", _type => ID) customerId: number): Promise<Address[] | null> {
		try {
			return await Address.find({ customerId })
		} catch (error) {
			return null
		}
	}

	//----------------------- Mutation -----------------------
	@Mutation(_return => AddressMutationResponse, { description: "Add new address" })
	async newAddress(@Arg("addressInput") addressInput: AddressInput, @Ctx() { req }: Context): Promise<AddressMutationResponse> {
		try {
			const { email, phone } = addressInput
			const validateEmailAndPhoneError = validateEmailAndPhone(email, phone);
			if (validateEmailAndPhoneError !== null) return { code: 400, success: false, ...validateEmailAndPhoneError };

			const existingUser = await User.findOne(req.session.userId)
			if (!existingUser) return failureResponse(404, false, "Người dùng không hợp lệ.")

			const newAddress = Address.create({ ...addressInput, customerId: req.session.userId })
			await newAddress.save()

			return successResponse(200, true, "Thêm địa chỉ thành công.")
		} catch (error) {
			return failureResponse(500, false, `Internal Server Error ${error.message}`)
		}
	}

	@Mutation(_return => AddressMutationResponse, { description: "Update existing address" })
	async updateAddress(@Arg("addressInput") updateAddressInput: UpdateAddressInput, @Ctx() { req }: Context): Promise<AddressMutationResponse> {
		try {
			const { id, email, phone, fullName, address } = updateAddressInput
			const validateEmailAndPhoneError = validateEmailAndPhone(email, phone);
			if (validateEmailAndPhoneError !== null) return { code: 400, success: false, ...validateEmailAndPhoneError };

			const existingAddress = await Address.findOne(id)
			if (!existingAddress) return failureResponse(404, false, "Không tìm thấy địa chỉ.")

			if (existingAddress.customerId !== req.session.userId) return failureResponse(404, false, "Người dùng không hợp lệ.")

			existingAddress.fullName = fullName
			existingAddress.email = email
			existingAddress.phone = phone
			existingAddress.address = address

			existingAddress.save()

			return successResponse(200, true, "Cập nhật địa chỉ thành công.")
		} catch (error) {
			return failureResponse(500, false, `Internal Server Error ${error.message}`)
		}
	}

	@Mutation(_return => AddressMutationResponse, { description: "Delete address" })
	async deleteAddress(@Arg("id", _type => ID) id: number, @Ctx() { req }: Context): Promise<AddressMutationResponse> {
		try {
			const existingAddress = await Address.findOne(id)

			if (!existingAddress) return failureResponse(404, false, "Không tìm thấy địa chỉ.")
			if (existingAddress.customerId !== req.session.userId) return failureResponse(401, false, "Không có quyền thực hiện thao tác này.")

			await Address.delete({ id })

			return successResponse(200, true, "Xoá địa chỉ thành công")
		} catch (error) {
			return failureResponse(500, false, `Internal Server Error ${error.message}`)
		}
	}
}

