
import { Category, CreateProductInput, UpdateProductInput } from "@generated/graphql";

export type ProductFormValues = Omit<
  CreateProductInput,
  | "categoryId"
> & {
  categoryId?: Pick<Category, "id">;
}

export function getProductDefaultValues(product: any) {
  if (!product) {
    return {
      name: '',
      categoryId: '',
      image1: '',
      description: '',
      originalPrice: 0,
      price: 0,
      qty: 0,
      unit: '',
    }
  }
  return { ...product }
}

export function getProductInputValues(
  values: ProductFormValues,
  initialValues: any
) {
  const {
    categoryId,
    ...simpleValues

  } = values;
  return {
    ...simpleValues,
    categoryId: categoryId?.id
  };
}
