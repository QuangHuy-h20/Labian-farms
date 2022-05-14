import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Address = {
  __typename?: 'Address';
  address: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customerId: Scalars['Float'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  phone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AddressInput = {
  address: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  phone: Scalars['String'];
};

export type AddressMutationResponse = IMutationResponse & {
  __typename?: 'AddressMutationResponse';
  address?: Maybe<Address>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CategoryMutationResponse = IMutationResponse & {
  __typename?: 'CategoryMutationResponse';
  category?: Maybe<Category>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ChangePasswordInput = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type CoreEntity = {
  __typename?: 'CoreEntity';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type CreateCategoryInput = {
  name: Scalars['String'];
};

export type CreateFarmInput = {
  address: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateProductInput = {
  categoryId: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  originalPrice: Scalars['Float'];
  price: Scalars['Float'];
  qty: Scalars['Float'];
  unit: Scalars['String'];
};

export type CreateRoleInput = {
  roleName: Scalars['String'];
};

export type Farm = {
  __typename?: 'Farm';
  address: Scalars['String'];
  count?: Maybe<Scalars['Float']>;
  coverImage?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  logoImage?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['Float'];
  products?: Maybe<Array<Product>>;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FarmMutationResponse = IMutationResponse & {
  __typename?: 'FarmMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  farm?: Maybe<Farm>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type IMutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  loginField: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Active email */
  activeEmail: UserMutationResponse;
  /** Change user password */
  changePassword: UserMutationResponse;
  /** Confirm email */
  confirmEmail: Scalars['Boolean'];
  /** Create new category. */
  createCategory: CategoryMutationResponse;
  /** Create new farm. */
  createFarm: FarmMutationResponse;
  /** Create new product */
  createProduct: ProductMutationResponse;
  /** Create new user role. */
  createRole: RoleMutationResponse;
  /** Delete address */
  deleteAddress: AddressMutationResponse;
  /** Delete product */
  deleteFarm: Scalars['Boolean'];
  /** Delete product */
  deleteProduct: ProductMutationResponse;
  /** Register for farmer */
  farmerRegister: UserMutationResponse;
  /** Forgot password */
  forgotPassword: Scalars['Boolean'];
  /** Login */
  login: UserMutationResponse;
  /** Logout */
  logout: Scalars['Boolean'];
  /** Add new address */
  newAddress: AddressMutationResponse;
  /** Register for customer. */
  register: UserMutationResponse;
  /** Reset password */
  resetPassword: UserMutationResponse;
  /** Update existing address */
  updateAddress: AddressMutationResponse;
  /** Update user's avatar */
  updateAvatar: Scalars['Boolean'];
  /** Update farm's cover image */
  updateCoverImage: Scalars['Boolean'];
  /** Update farm information. */
  updateFarmInfo: FarmMutationResponse;
  /** Update farm's logo image */
  updateLogoImage: Scalars['Boolean'];
  /** Update product */
  updateProduct: ProductMutationResponse;
  /** Update user profile */
  updateProfile: UserMutationResponse;
};


export type MutationActiveEmailArgs = {
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationConfirmEmailArgs = {
  email: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateFarmArgs = {
  createFarmInput: CreateFarmInput;
  files: Array<Scalars['Upload']>;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
  farmId: Scalars['ID'];
  files: Array<Scalars['Upload']>;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteFarmArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationFarmerRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationNewAddressArgs = {
  addressInput: AddressInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateAddressArgs = {
  addressInput: UpdateAddressInput;
};


export type MutationUpdateAvatarArgs = {
  file: Scalars['Upload'];
  id: Scalars['ID'];
};


export type MutationUpdateCoverImageArgs = {
  file: Scalars['Upload'];
  id: Scalars['ID'];
};


export type MutationUpdateFarmInfoArgs = {
  updateFarmInput: UpdateFarmInput;
};


export type MutationUpdateLogoImageArgs = {
  file: Scalars['Upload'];
  id: Scalars['ID'];
};


export type MutationUpdateProductArgs = {
  farmId: Scalars['ID'];
  files: Array<Scalars['Upload']>;
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateProfileArgs = {
  profileInput: ProfileInput;
};

export type Paginated = {
  __typename?: 'Paginated';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  totalCount: Scalars['Float'];
};

export type PaginatedFarms = {
  __typename?: 'PaginatedFarms';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedFarms: Array<Farm>;
  totalCount: Scalars['Float'];
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedProducts: Array<Product>;
  totalCount: Scalars['Float'];
};

export type Pagination = {
  __typename?: 'Pagination';
  first: Scalars['Int'];
  page: Scalars['Int'];
};

export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  count: Scalars['Int'];
  currentPage: Scalars['Int'];
  firstItem: Scalars['Int'];
  lastItem: Scalars['Int'];
  lastPage: Scalars['Int'];
  perPage: Scalars['Int'];
  total: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  farm: Farm;
  farmId: Scalars['Float'];
  id: Scalars['ID'];
  image1?: Maybe<Scalars['String']>;
  image2?: Maybe<Scalars['String']>;
  image3?: Maybe<Scalars['String']>;
  image4?: Maybe<Scalars['String']>;
  image5?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  originalPrice: Scalars['Float'];
  price: Scalars['Float'];
  qty: Scalars['Float'];
  slug: Scalars['String'];
  unAccentName: Scalars['String'];
  unit: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductMutationResponse = IMutationResponse & {
  __typename?: 'ProductMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  success: Scalars['Boolean'];
};

export type ProductPaginator = {
  __typename?: 'ProductPaginator';
  data: Array<Product>;
  paginatorInfo: PaginatorInfo;
};

export type ProfileInput = {
  address?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  fullName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  nickname?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get all customer's addresses */
  addressesByCustomer: Array<Address>;
  /** query all farms */
  allFarms?: Maybe<Array<Farm>>;
  /** query all products */
  allProducts?: Maybe<Array<Product>>;
  /** Get all the categories. */
  categories?: Maybe<Array<Category>>;
  /** Get specific farm by id */
  farm?: Maybe<Farm>;
  /** Get all farms */
  farms?: Maybe<PaginatedFarms>;
  /** Get all farms by farmer */
  farmsByFarmer?: Maybe<Array<Farm>>;
  /** User information */
  me?: Maybe<User>;
  /** Get specific product by id */
  product?: Maybe<Product>;
  /** Get all products with paginate */
  products?: Maybe<PaginatedProducts>;
  /** Get all products by category */
  productsByCategory?: Maybe<Array<Product>>;
  /** Get all products by category */
  productsByFarm?: Maybe<Array<Product>>;
  /** Get all roles */
  roles?: Maybe<Array<UserRole>>;
  /** Find products by keyword */
  search?: Maybe<Array<Product>>;
  /** Get all users */
  users?: Maybe<Array<User>>;
};


export type QueryAddressesByCustomerArgs = {
  customerId: Scalars['ID'];
};


export type QueryFarmArgs = {
  slug: Scalars['String'];
};


export type QueryFarmsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryFarmsByFarmerArgs = {
  ownerId: Scalars['ID'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductsArgs = {
  categoryId?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryProductsByCategoryArgs = {
  categoryId: Scalars['ID'];
};


export type QueryProductsByFarmArgs = {
  farmId: Scalars['ID'];
};


export type QuerySearchArgs = {
  searchInput: SearchInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type ResetPasswordInput = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type RoleMutationResponse = IMutationResponse & {
  __typename?: 'RoleMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  success: Scalars['Boolean'];
};

export type SearchInput = {
  name?: InputMaybe<Scalars['String']>;
  unAccentName?: InputMaybe<Scalars['String']>;
};

export type UpdateAddressInput = {
  address: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  phone: Scalars['String'];
};

export type UpdateFarmInput = {
  address: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateProductInput = {
  categoryId: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  originalPrice: Scalars['Float'];
  price: Scalars['Float'];
  qty: Scalars['Float'];
  unit: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  addresses?: Maybe<Array<Address>>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  farms?: Maybe<Array<Farm>>;
  fullName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActiveEmail: Scalars['Boolean'];
  nickname?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  role: UserRole;
  roleId: Scalars['String'];
  status: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Scalars['String']>>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UserRole = {
  __typename?: 'UserRole';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  roleName: Scalars['String'];
};

export type FarmInfoFragment = { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } };

export type FarmMutationResponseFragment = { __typename?: 'FarmMutationResponse', code: number, success: boolean, message?: string | null, farm?: { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserMutationStatusFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type FarmMutationStatusFragment = { __typename?: 'FarmMutationResponse', code: number, success: boolean, message?: string | null };

export type ProductMutationStatusFragment = { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null };

export type ProductInfoFragment = { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, qty: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } };

export type ProductMutationResponseFragment = { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null, product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, qty: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type UserInfoFragment = { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, avatar?: string | null, roleId: string, isActiveEmail: boolean };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type CreateFarmMutationVariables = Exact<{
  createFarmInput: CreateFarmInput;
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type CreateFarmMutation = { __typename?: 'Mutation', createFarm: { __typename?: 'FarmMutationResponse', code: number, success: boolean, message?: string | null, farm?: { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateProductMutationVariables = Exact<{
  farmId: Scalars['ID'];
  createProductInput: CreateProductInput;
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null, product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, qty: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', farmerRegister: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateProductMutationVariables = Exact<{
  updateProductInput: UpdateProductInput;
  farmId: Scalars['ID'];
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null, product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, qty: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null };

export type FarmByFarmerQueryVariables = Exact<{
  ownerId: Scalars['ID'];
}>;


export type FarmByFarmerQuery = { __typename?: 'Query', farmsByFarmer?: Array<{ __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } }> | null };

export type FarmQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type FarmQuery = { __typename?: 'Query', farm?: { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } } | null };

export type FarmsQueryVariables = Exact<{ [key: string]: never; }>;


export type FarmsQuery = { __typename?: 'Query', allFarms?: Array<{ __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, qty: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } } | null };

export type GetProductsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['ID'];
}>;


export type GetProductsByCategoryQuery = { __typename?: 'Query', productsByCategory?: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, qty: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } }> | null };

export type ProductsByFarmQueryVariables = Exact<{
  farmId: Scalars['ID'];
}>;


export type ProductsByFarmQuery = { __typename?: 'Query', productsByFarm?: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, qty: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } }> | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', allProducts?: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, qty: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } }> | null };

export const FarmMutationStatusFragmentDoc = gql`
    fragment farmMutationStatus on FarmMutationResponse {
  code
  success
  message
}
    `;
export const FarmInfoFragmentDoc = gql`
    fragment farmInfo on Farm {
  id
  name
  address
  description
  slug
  logoImage
  createdAt
  count
  isActive
  products {
    id
    name
  }
  owner {
    phone
    email
  }
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
}
    `;
export const FarmMutationResponseFragmentDoc = gql`
    fragment farmMutationResponse on FarmMutationResponse {
  ...farmMutationStatus
  farm {
    ...farmInfo
  }
  errors {
    ...fieldError
  }
}
    ${FarmMutationStatusFragmentDoc}
${FarmInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const ProductMutationStatusFragmentDoc = gql`
    fragment productMutationStatus on ProductMutationResponse {
  code
  success
  message
}
    `;
export const ProductInfoFragmentDoc = gql`
    fragment productInfo on Product {
  id
  name
  unAccentName
  description
  price
  originalPrice
  categoryId
  farmId
  image1
  unit
  slug
  qty
  category {
    id
    name
  }
  farm {
    id
    name
  }
}
    `;
export const ProductMutationResponseFragmentDoc = gql`
    fragment productMutationResponse on ProductMutationResponse {
  ...productMutationStatus
  product {
    ...productInfo
  }
  errors {
    ...fieldError
  }
}
    ${ProductMutationStatusFragmentDoc}
${ProductInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const UserMutationStatusFragmentDoc = gql`
    fragment userMutationStatus on UserMutationResponse {
  code
  success
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  email
  phone
  nickname
  fullName
  gender
  address
  avatar
  roleId
  isActiveEmail
}
    `;
export const UserMutationResponseFragmentDoc = gql`
    fragment userMutationResponse on UserMutationResponse {
  ...userMutationStatus
  user {
    ...userInfo
  }
  errors {
    ...fieldError
  }
}
    ${UserMutationStatusFragmentDoc}
${UserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const CreateFarmDocument = gql`
    mutation CreateFarm($createFarmInput: CreateFarmInput!, $files: [Upload!]!) {
  createFarm(createFarmInput: $createFarmInput, files: $files) {
    ...farmMutationResponse
  }
}
    ${FarmMutationResponseFragmentDoc}`;
export type CreateFarmMutationFn = Apollo.MutationFunction<CreateFarmMutation, CreateFarmMutationVariables>;

/**
 * __useCreateFarmMutation__
 *
 * To run a mutation, you first call `useCreateFarmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFarmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFarmMutation, { data, loading, error }] = useCreateFarmMutation({
 *   variables: {
 *      createFarmInput: // value for 'createFarmInput'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useCreateFarmMutation(baseOptions?: Apollo.MutationHookOptions<CreateFarmMutation, CreateFarmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFarmMutation, CreateFarmMutationVariables>(CreateFarmDocument, options);
      }
export type CreateFarmMutationHookResult = ReturnType<typeof useCreateFarmMutation>;
export type CreateFarmMutationResult = Apollo.MutationResult<CreateFarmMutation>;
export type CreateFarmMutationOptions = Apollo.BaseMutationOptions<CreateFarmMutation, CreateFarmMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($farmId: ID!, $createProductInput: CreateProductInput!, $files: [Upload!]!) {
  createProduct(files: $files, createProductInput: $createProductInput, farmId: $farmId) {
    ...productMutationResponse
  }
}
    ${ProductMutationResponseFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      farmId: // value for 'farmId'
 *      createProductInput: // value for 'createProductInput'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id) {
    ...productMutationStatus
  }
}
    ${ProductMutationStatusFragmentDoc}`;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  farmerRegister(registerInput: $registerInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($updateProductInput: UpdateProductInput!, $farmId: ID!, $files: [Upload!]!) {
  updateProduct(updateProductInput: $updateProductInput, farmId: $farmId, files: $files) {
    ...productMutationResponse
  }
}
    ${ProductMutationResponseFragmentDoc}`;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      updateProductInput: // value for 'updateProductInput'
 *      farmId: // value for 'farmId'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    name
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const FarmByFarmerDocument = gql`
    query FarmByFarmer($ownerId: ID!) {
  farmsByFarmer(ownerId: $ownerId) {
    ...farmInfo
  }
}
    ${FarmInfoFragmentDoc}`;

/**
 * __useFarmByFarmerQuery__
 *
 * To run a query within a React component, call `useFarmByFarmerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFarmByFarmerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFarmByFarmerQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useFarmByFarmerQuery(baseOptions: Apollo.QueryHookOptions<FarmByFarmerQuery, FarmByFarmerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FarmByFarmerQuery, FarmByFarmerQueryVariables>(FarmByFarmerDocument, options);
      }
export function useFarmByFarmerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FarmByFarmerQuery, FarmByFarmerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FarmByFarmerQuery, FarmByFarmerQueryVariables>(FarmByFarmerDocument, options);
        }
export type FarmByFarmerQueryHookResult = ReturnType<typeof useFarmByFarmerQuery>;
export type FarmByFarmerLazyQueryHookResult = ReturnType<typeof useFarmByFarmerLazyQuery>;
export type FarmByFarmerQueryResult = Apollo.QueryResult<FarmByFarmerQuery, FarmByFarmerQueryVariables>;
export const FarmDocument = gql`
    query Farm($slug: String!) {
  farm(slug: $slug) {
    ...farmInfo
  }
}
    ${FarmInfoFragmentDoc}`;

/**
 * __useFarmQuery__
 *
 * To run a query within a React component, call `useFarmQuery` and pass it any options that fit your needs.
 * When your component renders, `useFarmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFarmQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFarmQuery(baseOptions: Apollo.QueryHookOptions<FarmQuery, FarmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FarmQuery, FarmQueryVariables>(FarmDocument, options);
      }
export function useFarmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FarmQuery, FarmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FarmQuery, FarmQueryVariables>(FarmDocument, options);
        }
export type FarmQueryHookResult = ReturnType<typeof useFarmQuery>;
export type FarmLazyQueryHookResult = ReturnType<typeof useFarmLazyQuery>;
export type FarmQueryResult = Apollo.QueryResult<FarmQuery, FarmQueryVariables>;
export const FarmsDocument = gql`
    query Farms {
  allFarms {
    ...farmInfo
  }
}
    ${FarmInfoFragmentDoc}`;

/**
 * __useFarmsQuery__
 *
 * To run a query within a React component, call `useFarmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFarmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFarmsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFarmsQuery(baseOptions?: Apollo.QueryHookOptions<FarmsQuery, FarmsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FarmsQuery, FarmsQueryVariables>(FarmsDocument, options);
      }
export function useFarmsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FarmsQuery, FarmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FarmsQuery, FarmsQueryVariables>(FarmsDocument, options);
        }
export type FarmsQueryHookResult = ReturnType<typeof useFarmsQuery>;
export type FarmsLazyQueryHookResult = ReturnType<typeof useFarmsLazyQuery>;
export type FarmsQueryResult = Apollo.QueryResult<FarmsQuery, FarmsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    ...productInfo
  }
}
    ${ProductInfoFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const GetProductsByCategoryDocument = gql`
    query GetProductsByCategory($categoryId: ID!) {
  productsByCategory(categoryId: $categoryId) {
    ...productInfo
  }
}
    ${ProductInfoFragmentDoc}`;

/**
 * __useGetProductsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetProductsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsByCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetProductsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>(GetProductsByCategoryDocument, options);
      }
export function useGetProductsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>(GetProductsByCategoryDocument, options);
        }
export type GetProductsByCategoryQueryHookResult = ReturnType<typeof useGetProductsByCategoryQuery>;
export type GetProductsByCategoryLazyQueryHookResult = ReturnType<typeof useGetProductsByCategoryLazyQuery>;
export type GetProductsByCategoryQueryResult = Apollo.QueryResult<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>;
export const ProductsByFarmDocument = gql`
    query ProductsByFarm($farmId: ID!) {
  productsByFarm(farmId: $farmId) {
    ...productInfo
  }
}
    ${ProductInfoFragmentDoc}`;

/**
 * __useProductsByFarmQuery__
 *
 * To run a query within a React component, call `useProductsByFarmQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsByFarmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsByFarmQuery({
 *   variables: {
 *      farmId: // value for 'farmId'
 *   },
 * });
 */
export function useProductsByFarmQuery(baseOptions: Apollo.QueryHookOptions<ProductsByFarmQuery, ProductsByFarmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsByFarmQuery, ProductsByFarmQueryVariables>(ProductsByFarmDocument, options);
      }
export function useProductsByFarmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsByFarmQuery, ProductsByFarmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsByFarmQuery, ProductsByFarmQueryVariables>(ProductsByFarmDocument, options);
        }
export type ProductsByFarmQueryHookResult = ReturnType<typeof useProductsByFarmQuery>;
export type ProductsByFarmLazyQueryHookResult = ReturnType<typeof useProductsByFarmLazyQuery>;
export type ProductsByFarmQueryResult = Apollo.QueryResult<ProductsByFarmQuery, ProductsByFarmQueryVariables>;
export const ProductsDocument = gql`
    query Products {
  allProducts {
    ...productInfo
  }
}
    ${ProductInfoFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;