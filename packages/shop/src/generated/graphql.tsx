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
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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
  categoryId: Scalars['Float'];
  description: Scalars['String'];
  farmId: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  totalInventory: Scalars['Float'];
  unit: Scalars['String'];
};

export type CreateRoleInput = {
  roleName: Scalars['String'];
};

export type Farm = {
  __typename?: 'Farm';
  address: Scalars['String'];
  coverImage: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  logoImage: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['Float'];
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


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateFarmArgs = {
  createFarmInput: CreateFarmInput;
  files: Array<Scalars['Upload']>;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
  files: Array<Scalars['Upload']>;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationFarmerRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
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
  resetPassword: Scalars['String'];
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
  createProductInput: UpdateProductInput;
};


export type MutationUpdateProfileArgs = {
  profileInput: ProfileInput;
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  categoryId: Scalars['Float'];
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
  price: Scalars['Float'];
  slug: Scalars['String'];
  totalInventory: Scalars['Float'];
  unit?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProductMutationResponse = IMutationResponse & {
  __typename?: 'ProductMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  product: Product;
  success: Scalars['Boolean'];
};

export type ProfileInput = {
  address: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  fullName: Scalars['String'];
  gender: Gender;
  nickname: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Get all customer's addresses */
  addressesByCustomer: Array<Address>;
  /** Get all the categories. */
  categories?: Maybe<Array<Category>>;
  /** Get specific farm by id */
  farm?: Maybe<Farm>;
  /** Get all farms */
  farms?: Maybe<Array<Farm>>;
  /** Get all farms by farmer */
  farmsByFarmer?: Maybe<Array<Farm>>;
  /** User information */
  me?: Maybe<User>;
  /** Get specific product by id */
  product?: Maybe<Product>;
  /** Get all products */
  products?: Maybe<Array<Product>>;
  /** Get all products by category */
  productsByCategory?: Maybe<Array<Product>>;
  /** Get all roles */
  roles?: Maybe<Array<UserRole>>;
  /** Get all users */
  users?: Maybe<Array<User>>;
};


export type QueryAddressesByCustomerArgs = {
  customerId: Scalars['ID'];
};


export type QueryFarmArgs = {
  id: Scalars['ID'];
};


export type QueryFarmsByFarmerArgs = {
  ownerId: Scalars['ID'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductsByCategoryArgs = {
  categoryId: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type RoleMutationResponse = IMutationResponse & {
  __typename?: 'RoleMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  success: Scalars['Boolean'];
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
  categoryId: Scalars['Float'];
  description: Scalars['String'];
  farmId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  totalInventory: Scalars['Float'];
  unit: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  addresses?: Maybe<Array<Address>>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dateOfBirth: Scalars['DateTime'];
  email: Scalars['String'];
  farms?: Maybe<Array<Farm>>;
  fullName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  isActiveEmail: Scalars['Boolean'];
  nickname: Scalars['String'];
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
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UserRole = {
  __typename?: 'UserRole';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  roleName: Scalars['String'];
};

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserMutationStatusFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type FarmMutationStatusFragment = { __typename?: 'FarmMutationResponse', code: number, success: boolean, message?: string | null | undefined };

export type UserInfoFragment = { __typename?: 'User', id: string, email: string, phone: string, nickname: string, fullName: string, gender: string, address: string, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname: string, fullName: string, gender: string, address: string, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname: string, fullName: string, gender: string, address: string, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null | undefined, user?: { __typename?: 'User', id: string, email: string, phone: string, nickname: string, fullName: string, gender: string, address: string, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, phone: string, nickname: string, fullName: string, gender: string, address: string, avatar?: string | null | undefined, roleId: string, isActiveEmail: boolean } | null | undefined };

export const FarmMutationStatusFragmentDoc = gql`
    fragment farmMutationStatus on FarmMutationResponse {
  code
  success
  message
}
    `;
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
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
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