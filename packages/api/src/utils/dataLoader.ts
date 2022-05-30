import DataLoader from "dataloader";
import { Product } from "../entities/Product";
import { Address } from "../entities/Address";
import { Category } from "../entities/Category";
import { Farm } from "../entities/Farm";
import { User } from "../entities/User"
import { ApplyTour } from "../entities/ApplyTour";
import { In } from "typeorm";
import { Tour } from "../entities/Tour";

interface ApplyTourConditions {
	tourId: number;
	customerId: number;
}

const batchGetApplyTourTypes = async (applyTourConditions: ApplyTourConditions[]) => {
	const types = await ApplyTour.findByIds(applyTourConditions);
	return applyTourConditions.map((applyTourCondition) =>
		types.find(
			(type) =>
				type.tourId === applyTourCondition.tourId &&
				type.customerId === applyTourCondition.customerId
		)
	);
};

const batchGetTours = async (tourIds: number[]) => {
	const toursApplied = await ApplyTour.find({
		join: {
			alias: "applyTour",
			innerJoinAndSelect: {
				tour: "applyTour.tour",
			},
		},
		where: {
			customerId: In(tourIds),
		},

	});
	const userIdToTours: { [key: number]: Tour[] } = {};

	toursApplied.forEach((tour) => {
		if (tour.customerId in userIdToTours) {
			userIdToTours[tour.customerId].push((tour as any).__tour__);
		} else {
			userIdToTours[tour.customerId] = [(tour as any).__tour__];
		}
	});
	return tourIds.map(tourId => userIdToTours[tourId])
}

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

const batchGetCategories = async (categoryIds: string[]) => {
	const categories = await Category.findByIds(categoryIds)
	return categoryIds.map(categoryId => categories.find(category => category.id === categoryId))
}

const batchGetProducts = async (productIds: number[]) => {
	const products = await Product.findByIds(productIds)
	return productIds.map(productId => products.find(product => product.id === productId))
}

export const buildDataLoaders = () => ({
	userLoader: new DataLoader<number, User | undefined>(userIds => batchGetUsers(userIds as number[])),
	addressLoader: new DataLoader<number, Address | undefined>(addressIds => batchGetAddresses(addressIds as number[])),
	farmLoader: new DataLoader<number, Farm | undefined>(farmIds => batchGetFarms(farmIds as number[])),
	categoryLoader: new DataLoader<string, Category | undefined>(categoryIds => batchGetCategories(categoryIds as string[])),
	productLoader: new DataLoader<number, Product | undefined>(productIds => batchGetProducts(productIds as number[])),
	tourLoader: new DataLoader((tourIds) =>
		batchGetTours(tourIds as number[])
	),
	applyTourLoader: new DataLoader<ApplyTourConditions, ApplyTour | undefined>(
		(applyTourConditions) =>
			batchGetApplyTourTypes(applyTourConditions as ApplyTourConditions[])
	),
})