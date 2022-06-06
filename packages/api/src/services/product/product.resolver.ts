import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { checkRole } from "../../middleware/checkRole";
import {
  CreateProductInput,
  SearchInput,
  UpdateProductInput,
} from "./product.input";
import { ProductMutationResponse } from "./product.mutation";
import { Farm } from "../../entities/Farm";
import { Context } from "../../types/Context";
import { Product } from "../../entities/Product";
import { Category } from "../../entities/Category";
import { deleteFile, multipleUploads } from "../../utils/s3";
import { failureResponse, successResponse } from "../../utils/statusResponse";
import { toNonAccent, toSlug } from "../../utils/common";
import { PaginatedProducts } from "../../types/Paginated";
import { getConnection, LessThan } from "typeorm";
import { checkAuth } from "../../middleware/checkAuth";

@Resolver((_of) => Product)
export class ProductResolver {
  //-------------------- Field resolver ----------------------

  @FieldResolver((_return) => Farm)
  async farm(
    @Root() root: Product,
    @Ctx() { dataLoaders: { farmLoader } }: Context
  ) {
    return await farmLoader.load(root.farmId);
  }

  @FieldResolver((_return) => Category)
  async category(
    @Root() root: Product,
    @Ctx() { dataLoaders: { categoryLoader } }: Context
  ) {
    return await categoryLoader.load(root.categoryId)
  }

  //------------------------- Query --------------------------

  @Query(_return => [Product], { nullable: true, description: "query all products" })
  async allProducts(): Promise<Product[] | null> {
    try {
      return await Product.find();
    } catch (error) {
      return null;
    }
  }

  @Query((_return) => PaginatedProducts, {
    nullable: true,
    description: "Get all products with paginate",
  })

  async products(
    @Arg("limit", (_type) => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor?: string,
    @Arg("categoryId", (_type) => String, { nullable: true }) categoryId?: string | null,

  ): Promise<PaginatedProducts | null> {
    try {
      const totalCount = categoryId
        ? await Product.count({
          where: { categoryId, isActive: true },
        })
        : await Product.count();
      const realLimit = Math.min(10, limit);

      const findOptions: { [key: string]: any } = {
        where: { isActive: true },
        order: {
          createdAt: "DESC",
        },
        take: realLimit,
      };

      let lastProduct: Product[] = [];

      if (cursor) {
        findOptions.where = {
          categoryId: categoryId ?? undefined,
          createdAt: LessThan(cursor),
        };
        lastProduct = await Product.find({
          where: { categoryId, isActive: true },
          order: {
            createdAt: "ASC",
          },
          take: 1,
        });
      }
      let products = await Product.find(
        categoryId === undefined
          ? findOptions
          : { ...findOptions, where: { categoryId } }
      );

      return {
        totalCount,
        cursor: products[products.length - 1].createdAt,
        hasMore: cursor
          ? products[products.length - 1].createdAt.toString() !==
          lastProduct[0].createdAt.toString()
          : products.length !== totalCount,
        paginatedProducts: products,
      };
    } catch {
      return null;
    }
  }

  @Query((_return) => [Product], {
    nullable: true,
    description: "Get all products by category",
  })
  async productsByFarm(
    @Arg("farmId", (_type) => ID) farmId: number
  ): Promise<Product[] | null> {
    try {
      return await Product.find({ farmId });
    } catch (error) {
      return null;
    }
  }

  @Query((_return) => [Product], {
    nullable: true,
    description: "Get all products by category",
  })
  async productsByCategory(
    @Arg("categoryId", (_type) => ID) categoryId: string
  ): Promise<Product[] | null> {
    try {
      return await Product.find({ categoryId });
    } catch (error) {
      return null;
    }
  }

  @Query((_return) => Product, {
    nullable: true,
    description: "Get specific product by id",
  })
  async product(
    @Arg("id", (_type) => ID, { nullable: true }) id: number,
    @Arg("slug", (_type) => String, { nullable: true }) slug: string
  ): Promise<Product | undefined> {
    try {
      if (id) return await Product.findOne(id)
      else return await Product.findOne({ slug });
    } catch (error) {
      return undefined;
    }
  }

  @Query((_return) => [Product!], {
    nullable: true,
    description: "Find products by keyword",
  })
  async search(
    @Arg("searchInput") { name, unAccentName }: SearchInput
  ): Promise<Product[]> {
    let listingQB = getConnection()
      .getRepository(Product)
      .createQueryBuilder("prod");
    if (name) {
      listingQB.andWhere("prod.name ilike :name", {
        name: `%${name}%`,
      });
    }
    if (unAccentName) {
      listingQB.andWhere("prod.unAccentName ilike :unAccentName", {
        unAccentName: `%${unAccentName}%`,
      });
    }
    return listingQB.getMany();
  }

  //----------------------- Mutation -----------------------

  @Mutation(_return => ProductMutationResponse)
  @UseMiddleware(checkAuth)
  async approveProduct(@Arg("id", _type => ID) id: number): Promise<ProductMutationResponse> {
    try {
      const existingProduct = await Product.findOne({ id })
      if (!existingProduct) return failureResponse(400, false, "Sản phẩm không tồn tại.")

      existingProduct.isActive = true
      existingProduct.save()
      return {
        code: 200,
        message: "Thông in đã được cập nhật",
        success: true,
        product: existingProduct
      }
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  @Mutation(_return => ProductMutationResponse)
  @UseMiddleware(checkAuth)
  async disApproveProduct(@Arg("id", _type => ID) id: number): Promise<ProductMutationResponse> {
    try {
      const existingProduct = await Product.findOne({ id })
      if (!existingProduct) return failureResponse(400, false, "Sản phẩm không tồn tại.")

      existingProduct.isActive = false
      existingProduct.save()

      return {
        code: 200,
        message: "Thông in đã được cập nhật",
        success: true,
        product: existingProduct
      }
    } catch (error) {
      return failureResponse(500, false, `Internal Server Error ${error.message}`)
    }
  }

  @Mutation((_return) => ProductMutationResponse, {
    description: "Create new product",
  })
  @UseMiddleware(checkRole)
  async createProduct(
    @Arg("createProductInput") createProductInput: CreateProductInput,
    @Arg("farmId", (_type) => ID) farmId: number,
    @Ctx() { req }: Context,
    @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ): Promise<ProductMutationResponse> {
    let list: string[] = [];

    try {
      const { name } = createProductInput;
      const existingProduct = await Product.findOne({ where: [{ name }] });

      if (existingProduct) return failureResponse(400, false, "Tên sản phẩm đã được sử dụng.");

      const existingFarm = await Farm.findOne({ id: farmId });
      if (!existingFarm) return failureResponse(404, false, "Nông trại không tồn tại.");

      if (existingFarm.ownerId !== req.session.userId) return failureResponse(401, false, "Không có quyền truy cập.");

      const getFarmSlug = existingFarm.slug;
      const productSlug = toSlug(name);
      const unAccentName = toNonAccent(name);
      const folder = `products/${getFarmSlug}`;

      let response: any
      await multipleUploads(files, folder, productSlug).then(async (value) => {
        list = value as string[];

        const newProduct = Product.create({
          ...createProductInput,
          unAccentName,
          slug: productSlug,
          image1: list[0] !== null ? list[0] : undefined,
          image2: list[1] !== null ? list[1] : undefined,
          image3: list[2] !== null ? list[2] : undefined,
          image4: list[3] !== null ? list[3] : undefined,
          image5: list[4] !== null ? list[4] : undefined,
          farmId: existingFarm.id,
        });
        response = newProduct
        await newProduct.save();
      });
      return { code: 200, success: true, message: "Tạo sản phẩm thành công", product: response }
    } catch (error) {
      return failureResponse(
        500,
        false,
        `Internal Server Error ${error.message}`
      );
    }
  }

  @Mutation((_return) => ProductMutationResponse, {
    description: "Update product",
  })
  @UseMiddleware(checkRole)
  async updateProduct(
    @Arg("updateProductInput") updateProductInput: UpdateProductInput,
    @Ctx() { req }: Context,
    @Arg("files", () => [GraphQLUpload]) files: [FileUpload]
  ):
    Promise<ProductMutationResponse> {
    let list: string[] = []

    try {
      const {
        id,
        name,
        description,
        originalPrice,
        price,
        stock,
        unit,
        categoryId
      } = updateProductInput;

      const existingProduct = await Product.findOne(id);
      if (!existingProduct) return failureResponse(404, false, "Sản phẩm không tồn tại.");

      const existingFarm = await Farm.findOne({ id: existingProduct.farmId });
      if (!existingFarm) return failureResponse(400, false, "Không tìm thấy nông trại.");

      if (existingFarm.ownerId !== req.session.userId) return failureResponse(400, false, "Không có quyền truy cập.");

      const getFarmSlug = existingFarm.slug
      const folder = `products/${getFarmSlug}`

      const slug = toSlug(name);
      const unAccentName = toNonAccent(name);


      let productInfoAfterUpdate: any

      await multipleUploads(files, folder, slug).then(async (value) => {
        list = value as string[];

        const newImage = list[0] !== null ? list[0] : undefined

        const existingImage1 = existingProduct.image1

        if (newImage && newImage !== existingImage1) {
          new Promise((_) => deleteFile(folder, existingImage1.split("/").pop() as string));
          existingProduct.image1 = newImage
        }

        existingProduct.name = name
        existingProduct.slug = slug;
        existingProduct.unAccentName = unAccentName;
        existingProduct.description = description;
        existingProduct.categoryId = categoryId;
        existingProduct.price = price;
        existingProduct.originalPrice = originalPrice;
        existingProduct.stock = stock;
        existingProduct.unit = unit;

        productInfoAfterUpdate = existingProduct
        await existingProduct.save();
      });


      return {
        code: 200,
        success: true,
        message: "Cập nhật thông tin sản phẩm thành công.",
        product: productInfoAfterUpdate
      }
    } catch (error) {
      return failureResponse(
        500,
        false,
        `Internal server error ${error.message}`
      );
    }
  }


  @Mutation((_return) => ProductMutationResponse, {
    description: "Delete product",
  })
  @UseMiddleware(checkRole)
  async deleteProduct(
    @Arg("id", (_type) => ID) id: number,
    @Ctx() { req }: Context
  ): Promise<ProductMutationResponse> {
    try {
      const existingProduct = await Product.findOne(id);
      if (!existingProduct) return failureResponse(404, false, "Không tìm thấy sản phẩm.");

      const existingFarm = await Farm.findOne({ id: existingProduct.farmId });
      if (!existingFarm) return failureResponse(404, false, "Không tìm thấy trang trại.");

      if (req.session.userId !== existingFarm?.ownerId) return failureResponse(401, false, "Không có quyền truy cập.");

      const folder = `products/${existingFarm.slug}`;

      await Product.delete({ id });

      new Promise((_) => deleteFile(folder, existingProduct.image1.split("/").pop() as string));

      return successResponse(200, true, "Xoá sản phẩm thành công.");
    } catch (error) {
      return failureResponse(
        500,
        false,
        `Internal server error ${error.message}`
      );
    }
  }
}
