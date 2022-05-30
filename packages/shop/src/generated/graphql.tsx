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
  endDate: Scalars['DateTime'];
  name: Scalars['String'];
  slot: Scalars['Float'];
  startDate: Scalars['DateTime'];
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
  farmId: Scalars['ID'];
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
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  farm: Farm;
  farmId: Scalars['Float'];
  id: Scalars['ID'];
  image1?: Maybe<Scalars['String']>;
  image2?: Maybe<Scalars['String']>;
  image3?: Maybe<Scalars['String']>;
  image4?: Maybe<Scalars['String']>;
  image5?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  numberOfVisitor: Scalars['Float'];
  slot: Scalars['Float'];
  slug: Scalars['String'];
  startDate: Scalars['DateTime'];
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
  id: Scalars['String'];
  name: Scalars['String'];
  originalPrice: Scalars['Float'];
  price: Scalars['Float'];
  stock: Scalars['Float'];
  unit: Scalars['String'];
};

export type UpdateTourInput = {
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  slot: Scalars['Float'];
  startDate: Scalars['DateTime'];
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

export type FarmInfoFragment = { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null | undefined, createdAt: any, count?: number | null | undefined, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null | undefined, owner: { __typename?: 'User', phone: string, email: string } };

export type FarmMutationResponseFragment = { __typename?: 'FarmMutationResponse', code: number, success: boolean, message?: string | null | undefined, farm?: { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null | undefined, createdAt: any, count?: number | null | undefined, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null | undefined, owner: { __typename?: 'User', phone: string, email: string } } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserMutationStatusFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type ProductMutationStatusFragment = { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type FarmMutationStatusFragment = { __typename?: 'FarmMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type TourMutationStatusFragment = { __typename?: 'TourMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type ProductInfoFragment = { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null | undefined, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string, slug: string } };

export type ProductMutationResponseFragment = { __typename?: 'ProductMutationResponse', code: number, success: boolean, message?: string | null | undefined, product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null | undefined, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string, slug: string } } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type TourInfoFragment = { __typename?: 'Tour', id: string, slug: string, createdAt: any, updatedAt: any, name: string, description: string, startDate: any, endDate: any, status: string, slot: number, numberOfVisitor: number, applyTourStatus: number, image1?: string | null | undefined, farmId: number, farm: { __typename?: 'Farm', id: string, name: string, address: string, owner: { __typename?: 'User', phone: string } } };

export type TourMutationResponseFragment = { __typename?: 'TourMutationResponse', code: number, success: boolean, message?: string | null | undefined, tour?: { __typename?: 'Tour', id: string, slug: string, createdAt: any, updatedAt: any, name: string, description: string, startDate: any, endDate: any, status: string, slot: number, numberOfVisitor: number, applyTourStatus: number, image1?: string | null | undefined, farmId: number, farm: { __typename?: 'Farm', id: string, name: string, address: string, owner: { __typename?: 'User', phone: string } } } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type UserInfoFragment = { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null | undefined, fullName?: string | null | undefined, dateOfBirth?: any | null | undefined, gender?: string | null | undefined, address?: string | null | undefined, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null | undefined, fullName?: string | null | undefined, dateOfBirth?: any | null | undefined, gender?: string | null | undefined, address?: string | null | undefined, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type ApplyTourMutationVariables = Exact<{
  tourId: Scalars['ID'];
  applyTourStatusValue: ApplyTourStatus;
}>;


export type ApplyTourMutation = { __typename?: 'Mutation', applyTour: { __typename?: 'TourMutationResponse', code: number, success: boolean, message?: string | null | undefined, tour?: { __typename?: 'Tour', id: string, slug: string, createdAt: any, updatedAt: any, name: string, description: string, startDate: any, endDate: any, status: string, slot: number, numberOfVisitor: number, applyTourStatus: number, image1?: string | null | undefined, farmId: number, farm: { __typename?: 'Farm', id: string, name: string, address: string, owner: { __typename?: 'User', phone: string } } } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null | undefined, fullName?: string | null | undefined, dateOfBirth?: any | null | undefined, gender?: string | null | undefined, address?: string | null | undefined, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null | undefined, fullName?: string | null | undefined, dateOfBirth?: any | null | undefined, gender?: string | null | undefined, address?: string | null | undefined, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['String'];
  token: Scalars['String'];
  resetPasswordInput: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null | undefined, fullName?: string | null | undefined, dateOfBirth?: any | null | undefined, gender?: string | null | undefined, address?: string | null | undefined, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type UpdateAvatarMutationVariables = Exact<{
  id: Scalars['ID'];
  file: Scalars['Upload'];
}>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateAvatar: boolean };

export type UpdateProfileMutationVariables = Exact<{
  profileInput: ProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null | undefined, fullName?: string | null | undefined, dateOfBirth?: any | null | undefined, gender?: string | null | undefined, address?: string | null | undefined, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null | undefined };

export type FarmByFarmerQueryVariables = Exact<{
  ownerId: Scalars['ID'];
}>;


export type FarmByFarmerQuery = { __typename?: 'Query', farmByFarmer?: { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null | undefined, createdAt: any, count?: number | null | undefined, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null | undefined, owner: { __typename?: 'User', phone: string, email: string } } | null | undefined };

export type FarmQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type FarmQuery = { __typename?: 'Query', farm?: { __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null | undefined, createdAt: any, count?: number | null | undefined, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null | undefined, owner: { __typename?: 'User', phone: string, email: string } } | null | undefined };

export type FarmsQueryVariables = Exact<{ [key: string]: never; }>;


export type FarmsQuery = { __typename?: 'Query', allFarms?: Array<{ __typename?: 'Farm', id: string, name: string, address: string, description: string, slug: string, logoImage?: string | null | undefined, createdAt: any, count?: number | null | undefined, isActive: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string }> | null | undefined, owner: { __typename?: 'User', phone: string, email: string } }> | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, phone: string, nickname?: string | null | undefined, fullName?: string | null | undefined, dateOfBirth?: any | null | undefined, gender?: string | null | undefined, address?: string | null | undefined, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined };

export type GetProductsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['ID'];
}>;


export type GetProductsByCategoryQuery = { __typename?: 'Query', productsByCategory?: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null | undefined, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string, slug: string } }> | null | undefined };

export type ProductQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null | undefined, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string, slug: string } } | null | undefined };

export type ProductsByFarmQueryVariables = Exact<{
  farmId: Scalars['ID'];
}>;


export type ProductsByFarmQuery = { __typename?: 'Query', productsByFarm?: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null | undefined, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string, slug: string } }> | null | undefined };

export type ProductsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['String']>;
}>;


export type ProductsQuery = { __typename?: 'Query', products?: { __typename?: 'PaginatedProducts', totalCount: number, hasMore: boolean, cursor: any, paginatedProducts: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null | undefined, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string, slug: string } }> } | null | undefined };

export type SearchQueryVariables = Exact<{
  searchInput: SearchInput;
}>;


export type SearchQuery = { __typename?: 'Query', search?: Array<{ __typename?: 'Product', id: string, name: string, unAccentName: string, description: string, price: number, originalPrice: number, categoryId: string, farmId: number, image1?: string | null | undefined, unit: string, slug: string, stock: number, category: { __typename?: 'Category', id: string, name: string }, farm: { __typename?: 'Farm', id: string, name: string, slug: string } }> | null | undefined };

export type TourQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type TourQuery = { __typename?: 'Query', tour?: { __typename?: 'Tour', id: string, slug: string, createdAt: any, updatedAt: any, name: string, description: string, startDate: any, endDate: any, status: string, slot: number, numberOfVisitor: number, applyTourStatus: number, image1?: string | null | undefined, farmId: number, farm: { __typename?: 'Farm', id: string, name: string, address: string, owner: { __typename?: 'User', phone: string } } } | null | undefined };

export type TourIdsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type TourIdsQuery = { __typename?: 'Query', toursPaginated?: { __typename?: 'PaginatedTours', paginatedTours: Array<{ __typename?: 'Tour', id: string, slug: string }> } | null | undefined };

export type ToursByFarmQueryVariables = Exact<{
  farmId: Scalars['ID'];
}>;


export type ToursByFarmQuery = { __typename?: 'Query', toursByFarm?: Array<{ __typename?: 'Tour', id: string, slug: string, createdAt: any, updatedAt: any, name: string, description: string, startDate: any, endDate: any, status: string, slot: number, numberOfVisitor: number, applyTourStatus: number, image1?: string | null | undefined, farmId: number, farm: { __typename?: 'Farm', id: string, name: string, address: string, owner: { __typename?: 'User', phone: string } } }> | null | undefined };

export type ToursPaginatedQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ToursPaginatedQuery = { __typename?: 'Query', toursPaginated?: { __typename?: 'PaginatedTours', totalCount: number, hasMore: boolean, cursor: any, paginatedTours: Array<{ __typename?: 'Tour', id: string, slug: string, createdAt: any, updatedAt: any, name: string, description: string, startDate: any, endDate: any, status: string, slot: number, numberOfVisitor: number, applyTourStatus: number, image1?: string | null | undefined, farmId: number, farm: { __typename?: 'Farm', id: string, name: string, address: string, owner: { __typename?: 'User', phone: string } } }> } | null | undefined };

export type ToursQueryVariables = Exact<{ [key: string]: never; }>;


export type ToursQuery = { __typename?: 'Query', tours?: Array<{ __typename?: 'Tour', id: string, slug: string, createdAt: any, updatedAt: any, name: string, description: string, startDate: any, endDate: any, status: string, slot: number, numberOfVisitor: number, applyTourStatus: number, image1?: string | null | undefined, farmId: number, farm: { __typename?: 'Farm', id: string, name: string, address: string, owner: { __typename?: 'User', phone: string } } }> | null | undefined };

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
    slug
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
  updatedAt
  name
  description
  startDate
  endDate
  status
  slot
  numberOfVisitor
  applyTourStatus
  image1
  farmId
  farm {
    id
    name
    address
    owner {
      phone
    }
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
  dateOfBirth
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
export const ApplyTourDocument = gql`
    mutation ApplyTour($tourId: ID!, $applyTourStatusValue: ApplyTourStatus!) {
  applyTour(tourId: $tourId, applyTourStatusValue: $applyTourStatusValue) {
    ...tourMutationResponse
  }
}
    ${TourMutationResponseFragmentDoc}`;
export type ApplyTourMutationFn = Apollo.MutationFunction<ApplyTourMutation, ApplyTourMutationVariables>;

/**
 * __useApplyTourMutation__
 *
 * To run a mutation, you first call `useApplyTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyTourMutation, { data, loading, error }] = useApplyTourMutation({
 *   variables: {
 *      tourId: // value for 'tourId'
 *      applyTourStatusValue: // value for 'applyTourStatusValue'
 *   },
 * });
 */
export function useApplyTourMutation(baseOptions?: Apollo.MutationHookOptions<ApplyTourMutation, ApplyTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyTourMutation, ApplyTourMutationVariables>(ApplyTourDocument, options);
      }
export type ApplyTourMutationHookResult = ReturnType<typeof useApplyTourMutation>;
export type ApplyTourMutationResult = Apollo.MutationResult<ApplyTourMutation>;
export type ApplyTourMutationOptions = Apollo.BaseMutationOptions<ApplyTourMutation, ApplyTourMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
  changePassword(changePasswordInput: $changePasswordInput) {
    code
    success
    message
    errors {
      field
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
  forgotPassword(forgotPasswordInput: $forgotPasswordInput)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
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
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
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
export const ResetPasswordDocument = gql`
    mutation ResetPassword($userId: String!, $token: String!, $resetPasswordInput: ResetPasswordInput!) {
  resetPassword(userId: $userId, token: $token, resetPasswordInput: $resetPasswordInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *      resetPasswordInput: // value for 'resetPasswordInput'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar($id: ID!, $file: Upload!) {
  updateAvatar(file: $file, id: $id)
}
    `;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      id: // value for 'id'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, options);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
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
export const ProductDocument = gql`
    query Product($id: ID, $slug: String) {
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
export function useProductQuery(baseOptions?: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
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
    query products($limit: Int!, $cursor: String, $categoryId: String) {
  products(limit: $limit, cursor: $cursor, categoryId: $categoryId) {
    totalCount
    hasMore
    cursor
    paginatedProducts {
      ...productInfo
    }
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
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useProductsQuery(baseOptions: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
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
export const SearchDocument = gql`
    query Search($searchInput: SearchInput!) {
  search(searchInput: $searchInput) {
    ...productInfo
  }
}
    ${ProductInfoFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
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
export const TourIdsDocument = gql`
    query TourIds($limit: Int!, $cursor: String) {
  toursPaginated(limit: $limit, cursor: $cursor) {
    paginatedTours {
      id
      slug
    }
  }
}
    `;

/**
 * __useTourIdsQuery__
 *
 * To run a query within a React component, call `useTourIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTourIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTourIdsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useTourIdsQuery(baseOptions: Apollo.QueryHookOptions<TourIdsQuery, TourIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TourIdsQuery, TourIdsQueryVariables>(TourIdsDocument, options);
      }
export function useTourIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TourIdsQuery, TourIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TourIdsQuery, TourIdsQueryVariables>(TourIdsDocument, options);
        }
export type TourIdsQueryHookResult = ReturnType<typeof useTourIdsQuery>;
export type TourIdsLazyQueryHookResult = ReturnType<typeof useTourIdsLazyQuery>;
export type TourIdsQueryResult = Apollo.QueryResult<TourIdsQuery, TourIdsQueryVariables>;
export const ToursByFarmDocument = gql`
    query ToursByFarm($farmId: ID!) {
  toursByFarm(farmId: $farmId) {
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
 *   },
 * });
 */
export function useToursByFarmQuery(baseOptions: Apollo.QueryHookOptions<ToursByFarmQuery, ToursByFarmQueryVariables>) {
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
export const ToursPaginatedDocument = gql`
    query ToursPaginated($limit: Int!, $cursor: String) {
  toursPaginated(limit: $limit, cursor: $cursor) {
    totalCount
    hasMore
    cursor
    paginatedTours {
      ...tourInfo
    }
  }
}
    ${TourInfoFragmentDoc}`;

/**
 * __useToursPaginatedQuery__
 *
 * To run a query within a React component, call `useToursPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useToursPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToursPaginatedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useToursPaginatedQuery(baseOptions: Apollo.QueryHookOptions<ToursPaginatedQuery, ToursPaginatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToursPaginatedQuery, ToursPaginatedQueryVariables>(ToursPaginatedDocument, options);
      }
export function useToursPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToursPaginatedQuery, ToursPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToursPaginatedQuery, ToursPaginatedQueryVariables>(ToursPaginatedDocument, options);
        }
export type ToursPaginatedQueryHookResult = ReturnType<typeof useToursPaginatedQuery>;
export type ToursPaginatedLazyQueryHookResult = ReturnType<typeof useToursPaginatedLazyQuery>;
export type ToursPaginatedQueryResult = Apollo.QueryResult<ToursPaginatedQuery, ToursPaginatedQueryVariables>;
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