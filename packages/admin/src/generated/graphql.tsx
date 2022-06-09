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

export type ApplyTour = {
  __typename?: 'ApplyTour';
  active: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export enum ApplyTourStatus {
  Apply = 'apply',
  UnApply = 'unApply'
}

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
  stock: Scalars['Float'];
  unit: Scalars['String'];
};

export type CreateRoleInput = {
  roleName: Scalars['String'];
};

export type CreateTourInput = {
  description: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  slot: Scalars['Float'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  status: TourStatus;
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
  orders?: Maybe<Array<Order>>;
  owner: User;
  ownerId: Scalars['Float'];
  products?: Maybe<Array<Product>>;
  slug: Scalars['String'];
  tours?: Maybe<Array<Tour>>;
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
  activeUser: Scalars['Boolean'];
  applyTour: TourMutationResponse;
  approveFarm: Scalars['Boolean'];
  approveTour: Scalars['Boolean'];
  banUser: Scalars['Boolean'];
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
  /** Create new tour. */
  createTour: TourMutationResponse;
  /** Delete address */
  deleteAddress: AddressMutationResponse;
  /** Delete product */
  deleteFarm: Scalars['Boolean'];
  /** Delete product */
  deleteProduct: ProductMutationResponse;
  /** Delete tour */
  deleteTour: Scalars['Boolean'];
  disApproveFarm: Scalars['Boolean'];
  disApproveTour: Scalars['Boolean'];
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
  updateFarm: FarmMutationResponse;
  /** Update farm's logo image */
  updateLogoImage: Scalars['Boolean'];
  /** Update product */
  updateProduct: ProductMutationResponse;
  /** Update user profile */
  updateProfile: UserMutationResponse;
  /** Update farm information. */
  updateTour: TourMutationResponse;
};


export type MutationActiveEmailArgs = {
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationActiveUserArgs = {
  id: Scalars['ID'];
};


export type MutationApplyTourArgs = {
  applyTourStatusValue: ApplyTourStatus;
  tourId: Scalars['ID'];
};


export type MutationApproveFarmArgs = {
  id: Scalars['ID'];
};


export type MutationApproveTourArgs = {
  id: Scalars['ID'];
};


export type MutationBanUserArgs = {
  id: Scalars['ID'];
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


export type MutationCreateTourArgs = {
  createTourInput: CreateTourInput;
  farmId: Scalars['ID'];
  files: Array<Scalars['Upload']>;
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


export type MutationDeleteTourArgs = {
  id: Scalars['ID'];
};


export type MutationDisApproveFarmArgs = {
  id: Scalars['ID'];
};


export type MutationDisApproveTourArgs = {
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


export type MutationUpdateFarmArgs = {
  files: Array<Scalars['Upload']>;
  updateFarmInput: UpdateFarmInput;
};


export type MutationUpdateLogoImageArgs = {
  file: Scalars['Upload'];
  id: Scalars['ID'];
};


export type MutationUpdateProductArgs = {
  files: Array<Scalars['Upload']>;
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateProfileArgs = {
  profileInput: ProfileInput;
};


export type MutationUpdateTourArgs = {
  files: Array<Scalars['Upload']>;
  updateTourInput: UpdateTourInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  customer: User;
  customerId: Scalars['Float'];
  delivery_fee: Scalars['Float'];
  id: Scalars['ID'];
  status: Scalars['String'];
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  stock: Scalars['Float'];
  subTotal: Scalars['Float'];
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

export type PaginatedTours = {
  __typename?: 'PaginatedTours';
  cursor: Scalars['DateTime'];
  hasMore: Scalars['Boolean'];
  paginatedTours: Array<Tour>;
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
  slug: Scalars['String'];
  stock: Scalars['Float'];
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
  /** Get all farms by farmer */
  farmByFarmer?: Maybe<Farm>;
  /** Get all farms */
  farms?: Maybe<PaginatedFarms>;
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
  /** query a tour */
  tour?: Maybe<Tour>;
  /** query all tours */
  tours?: Maybe<Array<Tour>>;
  /** Get tours by farm */
  toursByFarm?: Maybe<Array<Tour>>;
  toursPaginated?: Maybe<PaginatedTours>;
  /** Get user */
  user?: Maybe<User>;
  /** Get all users */
  users?: Maybe<Array<User>>;
};


export type QueryAddressesByCustomerArgs = {
  customerId: Scalars['ID'];
};


export type QueryFarmArgs = {
  slug: Scalars['String'];
};


export type QueryFarmByFarmerArgs = {
  ownerId: Scalars['ID'];
};


export type QueryFarmsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
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


export type QueryTourArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryToursByFarmArgs = {
  farmId?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryToursPaginatedArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
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

export type Tour = {
  __typename?: 'Tour';
  applyTourStatus: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  customerAppliedTour?: Maybe<Array<User>>;
  description: Scalars['String'];
  endDate?: Maybe<Scalars['DateTime']>;
  farm: Farm;
  farmId: Scalars['Float'];
  id: Scalars['ID'];
  image1?: Maybe<Scalars['String']>;
  image2?: Maybe<Scalars['String']>;
  image3?: Maybe<Scalars['String']>;
  image4?: Maybe<Scalars['String']>;
  image5?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  numberOfVisitor: Scalars['Float'];
  slot: Scalars['Float'];
  slug: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TourMutationResponse = IMutationResponse & {
  __typename?: 'TourMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  tour?: Maybe<Tour>;
};

export enum TourStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

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
  name: Scalars['String'];
};

export type UpdateProductInput = {
  categoryId: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  originalPrice: Scalars['Float'];
  price: Scalars['Float'];
  stock: Scalars['Float'];
  unit: Scalars['String'];
};

export type UpdateTourInput = {
  description: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  slot: Scalars['Float'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  status: TourStatus;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  addresses?: Maybe<Array<Address>>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  farm: Farm;
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
  toursApplyByCustomer?: Maybe<Array<Tour>>;
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

export type TourMutationStatusFragment = { __typename?: 'TourMutationResponse', code: number, success: boolean, message?: string | null };

export type ProductInfoFragment = { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } };

export type ProductMutationResponseFragment = { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null, product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type TourInfoFragment = { __typename?: 'Tour', id: string, slug: string, createdAt: any, name: string, description: string, startDate?: any | null, endDate?: any | null, status: string, slot: number, numberOfVisitor: number, isActive: boolean, image1?: string | null, farmId: number, farm: { __typename?: 'Farm', name: string, address: string } };

export type TourMutationResponseFragment = { __typename?: 'TourMutationResponse', code: number, success: boolean, message?: string | null, tour?: { __typename?: 'Tour', id: string, slug: string, createdAt: any, name: string, description: string, startDate?: any | null, endDate?: any | null, status: string, slot: number, numberOfVisitor: number, isActive: boolean, image1?: string | null, farmId: number, farm: { __typename?: 'Farm', name: string, address: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type UserInfoFragment = { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, dateOfBirth?: any | null, avatar?: string | null, roleId: string, isActiveEmail: boolean };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, dateOfBirth?: any | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ActiveEmailMutationVariables = Exact<{
  token: Scalars['String'];
  userId: Scalars['String'];
}>;


export type ActiveEmailMutation = { __typename?: 'Mutation', activeEmail: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, dateOfBirth?: any | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ActiveUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ActiveUserMutation = { __typename?: 'Mutation', activeUser: boolean };

export type ApproveFarmMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ApproveFarmMutation = { __typename?: 'Mutation', approveFarm: boolean };

export type ApproveTourMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ApproveTourMutation = { __typename?: 'Mutation', approveTour: boolean };

export type BanUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BanUserMutation = { __typename?: 'Mutation', banUser: boolean };

export type ConfirmEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: boolean };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CategoryMutationResponse', code: number, success: boolean, message?: string | null } };

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


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null, product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateTourMutationVariables = Exact<{
  createTourInput: CreateTourInput;
  files: Array<Scalars['Upload']> | Scalars['Upload'];
  farmId: Scalars['ID'];
}>;


export type CreateTourMutation = { __typename?: 'Mutation', createTour: { __typename?: 'TourMutationResponse', code: number, success: boolean, message?: string | null, tour?: { __typename?: 'Tour', id: string, slug: string, createdAt: any, name: string, description: string, startDate?: any | null, endDate?: any | null, status: string, slot: number, numberOfVisitor: number, isActive: boolean, image1?: string | null, farmId: number, farm: { __typename?: 'Farm', name: string, address: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null } };

export type DeleteTourMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTourMutation = { __typename?: 'Mutation', deleteTour: boolean };

export type DisApproveFarmMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DisApproveFarmMutation = { __typename?: 'Mutation', disApproveFarm: boolean };

export type DisApproveTourMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DisApproveTourMutation = { __typename?: 'Mutation', disApproveTour: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', farmerRegister: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, dateOfBirth?: any | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, dateOfBirth?: any | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UpdateFarmMutationVariables = Exact<{
  updateFarmInput: UpdateFarmInput;
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type UpdateFarmMutation = { __typename?: 'Mutation', updateFarm: { __typename?: 'FarmMutationResponse', code: number, success: boolean, message?: string | null, farm?: { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateProductMutationVariables = Exact<{
  updateProductInput: UpdateProductInput;
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null, product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateTourMutationVariables = Exact<{
  updateTourInput: UpdateTourInput;
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type UpdateTourMutation = { __typename?: 'Mutation', updateTour: { __typename?: 'TourMutationResponse', code: number, success: boolean, message?: string | null, tour?: { __typename?: 'Tour', id: string, slug: string, createdAt: any, name: string, description: string, startDate?: any | null, endDate?: any | null, status: string, slot: number, numberOfVisitor: number, isActive: boolean, image1?: string | null, farmId: number, farm: { __typename?: 'Farm', name: string, address: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateProfileMutationVariables = Exact<{
  profileInput: ProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, dateOfBirth?: any | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null };

export type FarmByFarmerQueryVariables = Exact<{
  ownerId: Scalars['ID'];
}>;


export type FarmByFarmerQuery = { __typename?: 'Query', farmByFarmer?: { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } } | null };

export type FarmQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type FarmQuery = { __typename?: 'Query', farm?: { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } } | null };

export type FarmsQueryVariables = Exact<{ [key: string]: never; }>;


export type FarmsQuery = { __typename?: 'Query', allFarms?: Array<{ __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null, createdAt: any, count?: number | null, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null, owner: { __typename?: 'User', phone: string, email: string } }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null, fullName?: string | null, gender?: string | null, address?: string | null, dateOfBirth?: any | null, avatar?: string | null, roleId: string, isActiveEmail: boolean } | null };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID'];
  slug?: InputMaybe<Scalars['String']>;
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } } | null };

export type GetProductsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['ID'];
}>;


export type GetProductsByCategoryQuery = { __typename?: 'Query', productsByCategory?: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } }> | null };

export type ProductsByFarmQueryVariables = Exact<{
  farmId: Scalars['ID'];
}>;


export type ProductsByFarmQuery = { __typename?: 'Query', productsByFarm?: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } }> | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', allProducts?: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string } }> | null };

export type TourQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type TourQuery = { __typename?: 'Query', tour?: { __typename?: 'Tour', id: string, slug: string, createdAt: any, name: string, description: string, startDate?: any | null, endDate?: any | null, status: string, slot: number, numberOfVisitor: number, isActive: boolean, image1?: string | null, farmId: number, farm: { __typename?: 'Farm', name: string, address: string } } | null };

export type ToursByFarmQueryVariables = Exact<{
  farmId?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type ToursByFarmQuery = { __typename?: 'Query', toursByFarm?: Array<{ __typename?: 'Tour', id: string, slug: string, createdAt: any, name: string, description: string, startDate?: any | null, endDate?: any | null, status: string, slot: number, numberOfVisitor: number, isActive: boolean, image1?: string | null, farmId: number, farm: { __typename?: 'Farm', name: string, address: string } }> | null };

export type ToursQueryVariables = Exact<{ [key: string]: never; }>;


export type ToursQuery = { __typename?: 'Query', tours?: Array<{ __typename?: 'Tour', id: string, slug: string, createdAt: any, name: string, description: string, startDate?: any | null, endDate?: any | null, status: string, slot: number, numberOfVisitor: number, isActive: boolean, image1?: string | null, farmId: number, farm: { __typename?: 'Farm', name: string, address: string } }> | null };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', avatar?: string | null, email: string, id: string, phone: string, roleId: string, status: number } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', avatar?: string | null, email: string, id: string, phone: string, roleId: string, status: number, createdAt: any }> | null };

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
  stock
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
export const TourMutationStatusFragmentDoc = gql`
    fragment tourMutationStatus on TourMutationResponse {
  code
  success
  message
}
    `;
export const TourInfoFragmentDoc = gql`
    fragment tourInfo on Tour {
  id
  slug
  createdAt
  name
  description
  startDate
  endDate
  status
  slot
  numberOfVisitor
  isActive
  image1
  farmId
  farm {
    name
    address
  }
}
    `;
export const TourMutationResponseFragmentDoc = gql`
    fragment tourMutationResponse on TourMutationResponse {
  ...tourMutationStatus
  tour {
    ...tourInfo
  }
  errors {
    ...fieldError
  }
}
    ${TourMutationStatusFragmentDoc}
${TourInfoFragmentDoc}
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
  dateOfBirth
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
export const ActiveEmailDocument = gql`
    mutation ActiveEmail($token: String!, $userId: String!) {
  activeEmail(token: $token, userId: $userId) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type ActiveEmailMutationFn = Apollo.MutationFunction<ActiveEmailMutation, ActiveEmailMutationVariables>;

/**
 * __useActiveEmailMutation__
 *
 * To run a mutation, you first call `useActiveEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActiveEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activeEmailMutation, { data, loading, error }] = useActiveEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useActiveEmailMutation(baseOptions?: Apollo.MutationHookOptions<ActiveEmailMutation, ActiveEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActiveEmailMutation, ActiveEmailMutationVariables>(ActiveEmailDocument, options);
      }
export type ActiveEmailMutationHookResult = ReturnType<typeof useActiveEmailMutation>;
export type ActiveEmailMutationResult = Apollo.MutationResult<ActiveEmailMutation>;
export type ActiveEmailMutationOptions = Apollo.BaseMutationOptions<ActiveEmailMutation, ActiveEmailMutationVariables>;
export const ActiveUserDocument = gql`
    mutation ActiveUser($id: ID!) {
  activeUser(id: $id)
}
    `;
export type ActiveUserMutationFn = Apollo.MutationFunction<ActiveUserMutation, ActiveUserMutationVariables>;

/**
 * __useActiveUserMutation__
 *
 * To run a mutation, you first call `useActiveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActiveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activeUserMutation, { data, loading, error }] = useActiveUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useActiveUserMutation(baseOptions?: Apollo.MutationHookOptions<ActiveUserMutation, ActiveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActiveUserMutation, ActiveUserMutationVariables>(ActiveUserDocument, options);
      }
export type ActiveUserMutationHookResult = ReturnType<typeof useActiveUserMutation>;
export type ActiveUserMutationResult = Apollo.MutationResult<ActiveUserMutation>;
export type ActiveUserMutationOptions = Apollo.BaseMutationOptions<ActiveUserMutation, ActiveUserMutationVariables>;
export const ApproveFarmDocument = gql`
    mutation ApproveFarm($id: ID!) {
  approveFarm(id: $id)
}
    `;
export type ApproveFarmMutationFn = Apollo.MutationFunction<ApproveFarmMutation, ApproveFarmMutationVariables>;

/**
 * __useApproveFarmMutation__
 *
 * To run a mutation, you first call `useApproveFarmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveFarmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveFarmMutation, { data, loading, error }] = useApproveFarmMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveFarmMutation(baseOptions?: Apollo.MutationHookOptions<ApproveFarmMutation, ApproveFarmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveFarmMutation, ApproveFarmMutationVariables>(ApproveFarmDocument, options);
      }
export type ApproveFarmMutationHookResult = ReturnType<typeof useApproveFarmMutation>;
export type ApproveFarmMutationResult = Apollo.MutationResult<ApproveFarmMutation>;
export type ApproveFarmMutationOptions = Apollo.BaseMutationOptions<ApproveFarmMutation, ApproveFarmMutationVariables>;
export const ApproveTourDocument = gql`
    mutation ApproveTour($id: ID!) {
  approveTour(id: $id)
}
    `;
export type ApproveTourMutationFn = Apollo.MutationFunction<ApproveTourMutation, ApproveTourMutationVariables>;

/**
 * __useApproveTourMutation__
 *
 * To run a mutation, you first call `useApproveTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveTourMutation, { data, loading, error }] = useApproveTourMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveTourMutation(baseOptions?: Apollo.MutationHookOptions<ApproveTourMutation, ApproveTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveTourMutation, ApproveTourMutationVariables>(ApproveTourDocument, options);
      }
export type ApproveTourMutationHookResult = ReturnType<typeof useApproveTourMutation>;
export type ApproveTourMutationResult = Apollo.MutationResult<ApproveTourMutation>;
export type ApproveTourMutationOptions = Apollo.BaseMutationOptions<ApproveTourMutation, ApproveTourMutationVariables>;
export const BanUserDocument = gql`
    mutation BanUser($id: ID!) {
  banUser(id: $id)
}
    `;
export type BanUserMutationFn = Apollo.MutationFunction<BanUserMutation, BanUserMutationVariables>;

/**
 * __useBanUserMutation__
 *
 * To run a mutation, you first call `useBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banUserMutation, { data, loading, error }] = useBanUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBanUserMutation(baseOptions?: Apollo.MutationHookOptions<BanUserMutation, BanUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument, options);
      }
export type BanUserMutationHookResult = ReturnType<typeof useBanUserMutation>;
export type BanUserMutationResult = Apollo.MutationResult<BanUserMutation>;
export type BanUserMutationOptions = Apollo.BaseMutationOptions<BanUserMutation, BanUserMutationVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($email: String!) {
  confirmEmail(email: $email)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    code
    success
    message
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      createCategoryInput: // value for 'createCategoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
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
export const CreateTourDocument = gql`
    mutation CreateTour($createTourInput: CreateTourInput!, $files: [Upload!]!, $farmId: ID!) {
  createTour(createTourInput: $createTourInput, files: $files, farmId: $farmId) {
    ...tourMutationResponse
  }
}
    ${TourMutationResponseFragmentDoc}`;
export type CreateTourMutationFn = Apollo.MutationFunction<CreateTourMutation, CreateTourMutationVariables>;

/**
 * __useCreateTourMutation__
 *
 * To run a mutation, you first call `useCreateTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTourMutation, { data, loading, error }] = useCreateTourMutation({
 *   variables: {
 *      createTourInput: // value for 'createTourInput'
 *      files: // value for 'files'
 *      farmId: // value for 'farmId'
 *   },
 * });
 */
export function useCreateTourMutation(baseOptions?: Apollo.MutationHookOptions<CreateTourMutation, CreateTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTourMutation, CreateTourMutationVariables>(CreateTourDocument, options);
      }
export type CreateTourMutationHookResult = ReturnType<typeof useCreateTourMutation>;
export type CreateTourMutationResult = Apollo.MutationResult<CreateTourMutation>;
export type CreateTourMutationOptions = Apollo.BaseMutationOptions<CreateTourMutation, CreateTourMutationVariables>;
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
export const DeleteTourDocument = gql`
    mutation DeleteTour($id: ID!) {
  deleteTour(id: $id)
}
    `;
export type DeleteTourMutationFn = Apollo.MutationFunction<DeleteTourMutation, DeleteTourMutationVariables>;

/**
 * __useDeleteTourMutation__
 *
 * To run a mutation, you first call `useDeleteTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTourMutation, { data, loading, error }] = useDeleteTourMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTourMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTourMutation, DeleteTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTourMutation, DeleteTourMutationVariables>(DeleteTourDocument, options);
      }
export type DeleteTourMutationHookResult = ReturnType<typeof useDeleteTourMutation>;
export type DeleteTourMutationResult = Apollo.MutationResult<DeleteTourMutation>;
export type DeleteTourMutationOptions = Apollo.BaseMutationOptions<DeleteTourMutation, DeleteTourMutationVariables>;
export const DisApproveFarmDocument = gql`
    mutation DisApproveFarm($id: ID!) {
  disApproveFarm(id: $id)
}
    `;
export type DisApproveFarmMutationFn = Apollo.MutationFunction<DisApproveFarmMutation, DisApproveFarmMutationVariables>;

/**
 * __useDisApproveFarmMutation__
 *
 * To run a mutation, you first call `useDisApproveFarmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisApproveFarmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disApproveFarmMutation, { data, loading, error }] = useDisApproveFarmMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDisApproveFarmMutation(baseOptions?: Apollo.MutationHookOptions<DisApproveFarmMutation, DisApproveFarmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisApproveFarmMutation, DisApproveFarmMutationVariables>(DisApproveFarmDocument, options);
      }
export type DisApproveFarmMutationHookResult = ReturnType<typeof useDisApproveFarmMutation>;
export type DisApproveFarmMutationResult = Apollo.MutationResult<DisApproveFarmMutation>;
export type DisApproveFarmMutationOptions = Apollo.BaseMutationOptions<DisApproveFarmMutation, DisApproveFarmMutationVariables>;
export const DisApproveTourDocument = gql`
    mutation DisApproveTour($id: ID!) {
  disApproveTour(id: $id)
}
    `;
export type DisApproveTourMutationFn = Apollo.MutationFunction<DisApproveTourMutation, DisApproveTourMutationVariables>;

/**
 * __useDisApproveTourMutation__
 *
 * To run a mutation, you first call `useDisApproveTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisApproveTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disApproveTourMutation, { data, loading, error }] = useDisApproveTourMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDisApproveTourMutation(baseOptions?: Apollo.MutationHookOptions<DisApproveTourMutation, DisApproveTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisApproveTourMutation, DisApproveTourMutationVariables>(DisApproveTourDocument, options);
      }
export type DisApproveTourMutationHookResult = ReturnType<typeof useDisApproveTourMutation>;
export type DisApproveTourMutationResult = Apollo.MutationResult<DisApproveTourMutation>;
export type DisApproveTourMutationOptions = Apollo.BaseMutationOptions<DisApproveTourMutation, DisApproveTourMutationVariables>;
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
export const UpdateFarmDocument = gql`
    mutation UpdateFarm($updateFarmInput: UpdateFarmInput!, $files: [Upload!]!) {
  updateFarm(updateFarmInput: $updateFarmInput, files: $files) {
    ...farmMutationResponse
  }
}
    ${FarmMutationResponseFragmentDoc}`;
export type UpdateFarmMutationFn = Apollo.MutationFunction<UpdateFarmMutation, UpdateFarmMutationVariables>;

/**
 * __useUpdateFarmMutation__
 *
 * To run a mutation, you first call `useUpdateFarmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFarmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFarmMutation, { data, loading, error }] = useUpdateFarmMutation({
 *   variables: {
 *      updateFarmInput: // value for 'updateFarmInput'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useUpdateFarmMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFarmMutation, UpdateFarmMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFarmMutation, UpdateFarmMutationVariables>(UpdateFarmDocument, options);
      }
export type UpdateFarmMutationHookResult = ReturnType<typeof useUpdateFarmMutation>;
export type UpdateFarmMutationResult = Apollo.MutationResult<UpdateFarmMutation>;
export type UpdateFarmMutationOptions = Apollo.BaseMutationOptions<UpdateFarmMutation, UpdateFarmMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($updateProductInput: UpdateProductInput!, $files: [Upload!]!) {
  updateProduct(updateProductInput: $updateProductInput, files: $files) {
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
export const UpdateTourDocument = gql`
    mutation UpdateTour($updateTourInput: UpdateTourInput!, $files: [Upload!]!) {
  updateTour(updateTourInput: $updateTourInput, files: $files) {
    ...tourMutationResponse
  }
}
    ${TourMutationResponseFragmentDoc}`;
export type UpdateTourMutationFn = Apollo.MutationFunction<UpdateTourMutation, UpdateTourMutationVariables>;

/**
 * __useUpdateTourMutation__
 *
 * To run a mutation, you first call `useUpdateTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTourMutation, { data, loading, error }] = useUpdateTourMutation({
 *   variables: {
 *      updateTourInput: // value for 'updateTourInput'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useUpdateTourMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTourMutation, UpdateTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTourMutation, UpdateTourMutationVariables>(UpdateTourDocument, options);
      }
export type UpdateTourMutationHookResult = ReturnType<typeof useUpdateTourMutation>;
export type UpdateTourMutationResult = Apollo.MutationResult<UpdateTourMutation>;
export type UpdateTourMutationOptions = Apollo.BaseMutationOptions<UpdateTourMutation, UpdateTourMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($profileInput: ProfileInput!) {
  updateProfile(profileInput: $profileInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      profileInput: // value for 'profileInput'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
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
  farmByFarmer(ownerId: $ownerId) {
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
    query Product($id: ID!, $slug: String) {
  product(id: $id, slug: $slug) {
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
 *      slug: // value for 'slug'
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
export const TourDocument = gql`
    query Tour($id: ID, $slug: String) {
  tour(id: $id, slug: $slug) {
    ...tourInfo
  }
}
    ${TourInfoFragmentDoc}`;

/**
 * __useTourQuery__
 *
 * To run a query within a React component, call `useTourQuery` and pass it any options that fit your needs.
 * When your component renders, `useTourQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTourQuery({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useTourQuery(baseOptions?: Apollo.QueryHookOptions<TourQuery, TourQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TourQuery, TourQueryVariables>(TourDocument, options);
      }
export function useTourLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TourQuery, TourQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TourQuery, TourQueryVariables>(TourDocument, options);
        }
export type TourQueryHookResult = ReturnType<typeof useTourQuery>;
export type TourLazyQueryHookResult = ReturnType<typeof useTourLazyQuery>;
export type TourQueryResult = Apollo.QueryResult<TourQuery, TourQueryVariables>;
export const ToursByFarmDocument = gql`
    query ToursByFarm($farmId: ID, $slug: String) {
  toursByFarm(farmId: $farmId, slug: $slug) {
    ...tourInfo
  }
}
    ${TourInfoFragmentDoc}`;

/**
 * __useToursByFarmQuery__
 *
 * To run a query within a React component, call `useToursByFarmQuery` and pass it any options that fit your needs.
 * When your component renders, `useToursByFarmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToursByFarmQuery({
 *   variables: {
 *      farmId: // value for 'farmId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useToursByFarmQuery(baseOptions?: Apollo.QueryHookOptions<ToursByFarmQuery, ToursByFarmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToursByFarmQuery, ToursByFarmQueryVariables>(ToursByFarmDocument, options);
      }
export function useToursByFarmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToursByFarmQuery, ToursByFarmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToursByFarmQuery, ToursByFarmQueryVariables>(ToursByFarmDocument, options);
        }
export type ToursByFarmQueryHookResult = ReturnType<typeof useToursByFarmQuery>;
export type ToursByFarmLazyQueryHookResult = ReturnType<typeof useToursByFarmLazyQuery>;
export type ToursByFarmQueryResult = Apollo.QueryResult<ToursByFarmQuery, ToursByFarmQueryVariables>;
export const ToursDocument = gql`
    query Tours {
  tours {
    ...tourInfo
  }
}
    ${TourInfoFragmentDoc}`;

/**
 * __useToursQuery__
 *
 * To run a query within a React component, call `useToursQuery` and pass it any options that fit your needs.
 * When your component renders, `useToursQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToursQuery({
 *   variables: {
 *   },
 * });
 */
export function useToursQuery(baseOptions?: Apollo.QueryHookOptions<ToursQuery, ToursQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToursQuery, ToursQueryVariables>(ToursDocument, options);
      }
export function useToursLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToursQuery, ToursQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToursQuery, ToursQueryVariables>(ToursDocument, options);
        }
export type ToursQueryHookResult = ReturnType<typeof useToursQuery>;
export type ToursLazyQueryHookResult = ReturnType<typeof useToursLazyQuery>;
export type ToursQueryResult = Apollo.QueryResult<ToursQuery, ToursQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    avatar
    email
    id
    phone
    roleId
    status
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    avatar
    email
    id
    phone
    roleId
    status
    createdAt
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;