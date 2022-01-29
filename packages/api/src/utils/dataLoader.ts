import DataLoader from "dataloader";
import { Address } from "../entities/Address";
import { Category } from "../entities/Category";
import { Farm } from "../entities/Farm";
import { User } from "../entities/User"

const batchGetUsers = async (userIds: number[]) => {
	const users = await User.findByIds(userIds)
	return userIds.map((userId) => users.find((user) => user.id === userId));
}

const batchGetAddresses = async (addrIds: number[]) => {
	const addresses = await Address.findByIds(addrIds)
	return addrIds.map(addrId => addresses.find(address => address.id === addrId))
}

const batchGetFarms = async (farmIds: number[]) => {
	const farms = await Farm.findByIds(farmIds)
	return farmIds.map(farmId => farms.find(farm => farm.id === farmId))
}

const batchGetCategories = async (categoryIds: number[]) => {
	const categories = await Category.findByIds(categoryIds)
	return categoryIds.map(categoryId => categories.find(category => category.id === categoryId))
}

export const buildDataLoaders = () => ({
	userLoader: new DataLoader<number, User | undefined>(userIds => batchGetUsers(userIds as number[])),
	addressLoader: new DataLoader<number, Address | undefined>(addressIds => batchGetAddresses(addressIds as number[])),
	farmLoader: new DataLoader<number, Farm | undefined>(farmIds => batchGetFarms(farmIds as number[])),
	categoryLoader: new DataLoader<number, Category | undefined>(categoryIds => batchGetCategories(categoryIds as number[]))
})