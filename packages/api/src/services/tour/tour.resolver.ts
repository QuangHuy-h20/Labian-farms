import { Context } from "../../types/Context";
import { Arg, Ctx, FieldResolver, ID, Int, Mutation, Query, registerEnumType, Resolver, Root, UseMiddleware } from "type-graphql";
import { Tour, TourStatus } from "../../entities/Tour";
import { Farm } from "../../entities/Farm";
import { TourMutationResponse } from "./tour.mutation";
import { checkRole } from "../../middleware/checkRole";
import { CreateTourInput, UpdateTourInput } from "./tour.input";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { failureResponse, successResponse } from "../../utils/statusResponse";
import { toSlug } from "../../utils/common";
import { multipleUploads, deleteFile } from "../../utils/s3";
import { ApplyTourStatus } from "../../types/ApplyTourStatus";
import { UserInputError } from "apollo-server-core";
import { ApplyTour } from "../../entities/ApplyTour";
import { PaginatedTours } from "../../types/Paginated";
import { LessThan } from "typeorm";
import { User } from "../../entities/User";
import { checkAuth } from "../../middleware/checkAuth";

registerEnumType(TourStatus, {
	name: "TourStatus"
})
registerEnumType(ApplyTourStatus, {
	name: "ApplyTourStatus", // this one is mandatory
});
@Resolver(_of => Tour)
export class TourResolver {

	//----------------------- Field resolver -----------------------
	@FieldResolver(_return => Tour)
	async farm(@Root() root: Tour, @Ctx() { dataLoaders: { farmLoader } }: Context) {
		return await farmLoader.load(root.farmId)
	}

	@FieldResolver(_return => [User], { nullable: true })
	async customerAppliedTour(
		@Root() root: Tour,
		@Ctx() { dataLoaders: { userLoader } }: Context
	) {
		try {
			return await userLoader.load(root.id)
		} catch {
			return null
		}
	}

	@FieldResolver((_return) => Int)
	async applyTourStatus(
		@Root() root: Tour,
		@Ctx() { req, dataLoaders: { applyTourLoader } }: Context
	) {
		if (!req.session.userId) return 0;

		const existingApplyStatus = await applyTourLoader.load({
			tourId: root.id,
			customerId: req.session.userId,
		});
		return existingApplyStatus ? existingApplyStatus.active : 0;
	}

	//----------------------- Query -----------------------

	@Query(_return => [Tour], { description: "Get tours by farm", nullable: true })
	async toursByFarm(
		@Arg("farmId", _type => ID, { nullable: true }) farmId: number,
		@Arg("slug", (_type) => String, { nullable: true }) slug: string
	): Promise<Tour[] | null> {
		try {
			if (farmId) return await Tour.find({ farmId })
			else return await Tour.find({ slug });
		} catch (error) {
			return null
		}
	}

	@Query((_return) => PaginatedTours, { nullable: true })
	async toursPaginated(
		@Arg("limit", (_type) => Int) limit: number,
		@Arg("cursor", { nullable: true }) cursor?: string
	): Promise<PaginatedTours | null> {
		try {
			const totalCount = await Tour.count({ isActive: true });

			if (totalCount === 0) return null;

			const realLimit = Math.min(10, limit);

			const findOptions: { [key: string]: any } = {
				where: { isActive: true },
				order: {
					createdAt: "DESC",
				},
				take: realLimit,
			};

			let lastTour: Tour[] = [];

			if (cursor) {
				findOptions.where = { createdAt: LessThan(cursor) };
				lastTour = await Tour.find({
					where: { isActive: true },
					order: {
						createdAt: "ASC",
					},
					take: 1,
				});

			}

			const tours = await Tour.find(findOptions);

			return {
				totalCount,
				cursor: tours[tours.length - 1].createdAt,
				hasMore: cursor
					? tours[tours.length - 1].createdAt.toString() !==
					lastTour[0].createdAt.toString()
					: tours.length !== totalCount,
				paginatedTours: tours,
			};
		} catch (error) {
			return null;
		}
	}

	@Query(_return => [Tour], { nullable: true, description: "query all tours" })
	async tours(): Promise<Tour[] | null> {
		try {
			return await Tour.find();
		} catch (error) {
			return null;
		}
	}
	@Query(_return => Tour, { nullable: true, description: "query a tour" })
	async tour(
		@Arg("id", (_type) => ID, { nullable: true }) id: number,
		@Arg("slug", (_type) => String, { nullable: true }) slug: string
	): Promise<Tour | undefined> {
		try {
			if (id) return await Tour.findOne(id)
			else return await Tour.findOne({ slug })
		} catch (error) {
			return undefined;
		}
	}



	//----------------------- Mutation -----------------------

	@Mutation(_return => TourMutationResponse)
	@UseMiddleware(checkAuth)
	async approveTour(@Arg("id", _type => ID) id: number): Promise<TourMutationResponse> {
		try {
			const existingTour = await Tour.findOne({ id })
			if (!existingTour) return failureResponse(404, false, "Nông trại không tồn tại.")

			existingTour.isActive = true
			await existingTour.save()
			return { code: 200, success: true, message: "Cập nhật trạng thái thành công.", tour: existingTour }
		} catch (error) {
			return failureResponse(500, false, `Internal Server Error ${error.message}`)
		}
	}

	@Mutation(_return => TourMutationResponse)
	@UseMiddleware(checkAuth)
	async disApproveTour(@Arg("id", _type => ID) id: number): Promise<TourMutationResponse> {
		try {
			const existingTour = await Tour.findOne({ id })
			if (!existingTour) return failureResponse(404, false, "Nông trại không tồn tại.")

			existingTour.isActive = false
			await existingTour.save()

			return { code: 200, success: true, message: "Cập nhật trạng thái thành công.", tour: existingTour }
		} catch (error) {
			return failureResponse(500, false, `Internal Server Error ${error.message}`)
		}
	}

	@Mutation((_return) => TourMutationResponse, { description: "Create new tour." })
	@UseMiddleware(checkRole)
	async createTour(
		@Arg("farmId", (_type) => ID) farmId: number,
		@Ctx() { req }: Context,
		@Arg("createTourInput") createTourInput: CreateTourInput,
		@Arg("files", () => [GraphQLUpload]) files: [FileUpload]
	): Promise<TourMutationResponse> {

		let list: string[] = []
		try {
			const { name } = createTourInput;
			const existingTour = await Tour.findOne({ where: [{ name }] });

			if (existingTour) return failureResponse(400, false, "Tên tour đã được sử dụng.")
			const existingFarm = await Farm.findOne({ id: farmId })

			if (!existingFarm) return failureResponse(404, false, "Nông trại không tồn tại.");

			if (req.session.userId !== existingFarm?.ownerId) return failureResponse(401, false, "Không có quyền truy cập.");

			const slug = toSlug(name)
			const folder = `farms/${existingFarm.slug}/tour/${slug}`

			let response: any;


			await multipleUploads(files, folder, slug).then(async (value) => {
				list = value as string[];


				const newTour = Tour.create(
					{
						...createTourInput,
						slug,
						image1: list[0] !== null ? list[0] : undefined,
						image2: list[1] !== null ? list[1] : undefined,
						image3: list[2] !== null ? list[2] : undefined,
						image4: list[3] !== null ? list[3] : undefined,
						image5: list[4] !== null ? list[4] : undefined,
						farmId: existingFarm.id,
					}
				);
				response = newTour
				await newTour.save();
			});

			return { code: 200, success: true, message: "Tạo tour tham quan thành công", tour: response }
		} catch (error) {
			return failureResponse(500, false, `Internal Server Error ${error.message}`)
		}
	}

	@Mutation((_return) => TourMutationResponse, { description: "Update farm information." })
	@UseMiddleware(checkRole)
	async updateTour(@Arg('updateTourInput') updateTourInput: UpdateTourInput, @Ctx() { req }: Context, @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
	): Promise<TourMutationResponse> {
		let list: string[] = []
		try {
			const { id, name, description, startDate, endDate, slot, status } = updateTourInput
			const existingTour = await Tour.findOne(id)
			if (!existingTour) return failureResponse(400, false, 'Không tìm thấy tour.')

			const existingFarm = await Farm.findOne(existingTour.farmId)

			if (!existingFarm) return failureResponse(404, false, 'Không tìm thấy nông trại.')
			if (req.session.userId !== existingFarm.ownerId) return failureResponse(401, false, 'Không có quyền truy cập.')

			const slug = toSlug(name)
			const folder = `farms/${existingFarm.slug}/tour/${slug}`
			await multipleUploads(files, folder, slug).then(async (value) => {
				list = value as string[];

				const newImage = list[0] !== null ? list[0] : undefined

				const existingImage1 = existingTour.image1

				if (newImage && newImage !== existingImage1) {
					new Promise((_) => deleteFile(folder, existingImage1.split("/").pop() as string));
					existingTour.image1 = newImage
				}

				existingTour.name = name
				existingTour.slug = slug
				existingTour.startDate = startDate
				existingTour.endDate = endDate
				existingTour.slot = slot
				existingTour.status = status
				existingTour.description = description
				await existingTour.save()
			});

			return { code: 200, success: true, message: 'Thông tin tour đã được cập nhật thành công.', tour: existingTour }
		} catch (error) {
			return failureResponse(500, false, `Internal Server Error ${error.message}`)
		}
	}



	@Mutation((_return) => TourMutationResponse, {
		description: "Delete tour",
	})
	// @UseMiddleware(checkRole)
	async deleteTour(
		@Arg("id", (_type) => ID) id: number,
		@Arg("farmId", (_type) => ID) farmId: number,
		@Ctx() { req }: Context
	): Promise<TourMutationResponse> {
		try {
			const existingFarm = await Farm.findOne({ id: farmId });

			if (!existingFarm) return failureResponse(404, false, "Không tìm thấy nông trại.");


			const existingTour = await Tour.findOne(id);

			if (!existingTour) return failureResponse(404, false, "Không tìm thấy tour.");

			const folder = `farms/${existingFarm.slug}/tour/${existingTour.slug}`

			if (req.session.roleId === 'executive-admin') {
				if (existingTour.isActive) return failureResponse(400, false, "Tour tham quan vẫn còn đang hoạt động. Đóng tour và thử lại.");
				await ApplyTour.delete({ tourId: id })
				await Tour.delete({ id });
				new Promise((_) => deleteFile(folder, existingTour.image1.split("/").pop() as string));
				return successResponse(200, true, "Xoá tour tham quan thành công.");
			}

			if (existingTour.isActive) return failureResponse(400, false, "Tour tham quan vẫn còn đang hoạt động. Vui lòng liên hệ quản lý để tiến hành xử lý.");

			else {
				await ApplyTour.delete({ tourId: id })
				await Tour.delete({ id });
				new Promise((_) => deleteFile(folder, existingTour.image1.split("/").pop() as string));
				return successResponse(200, true, "Xoá tour tham quan thành công.");
			}


		} catch (error) {
			return failureResponse(
				500,
				false,
				`Internal server error ${error.message}`
			);
		}
	}

	@Mutation((_return) => TourMutationResponse)
	async applyTour(
		@Arg("tourId", (_type) => ID!) tourId: number,
		@Arg("applyTourStatusValue", (_type) => ApplyTourStatus)
		applyTourStatusValue: ApplyTourStatus,
		@Ctx() { req: { session: { userId }, }, connection, }: Context
	): Promise<TourMutationResponse> {
		return await connection.transaction(async (transactionEntityManager) => {
			//check if tour exists
			let tour = await transactionEntityManager.findOne(Tour, tourId);

			if (!tour) {
				throw new UserInputError("Tour không tồn tại.");
			}
			//check if user has enrolled or not
			const existingApplyTour = await transactionEntityManager.findOne(ApplyTour, {
				tourId,
				customerId: userId,
			});

			if (existingApplyTour && (existingApplyTour.active !== applyTourStatusValue)) {
				await transactionEntityManager.delete(ApplyTour, {
					tourId,
					customerId: userId,
				});

				tour = await transactionEntityManager.save(Tour, {
					...tour,
					numberOfVisitor: tour.numberOfVisitor + applyTourStatusValue,
				});
			}

			if (!existingApplyTour) {
				const newApplyTour = transactionEntityManager.create(ApplyTour, {
					customerId: userId,
					tourId,
					active: applyTourStatusValue,
				});
				await transactionEntityManager.save(newApplyTour);

				tour.numberOfVisitor += applyTourStatusValue;

				tour = await transactionEntityManager.save(tour);
			}

			return {
				code: 200,
				success: true,
				message:
					applyTourStatusValue === 1
						? "Đăng ký tham gia thành công"
						: "Huỷ đăng ký tham gia thành công",
				tour,
			};
		});
	}


}






