interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: string;
  originalPrice: number;
  price?: number;
  stock?: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item) {
  const {
    id,
    name,
    slug,
    image1,
    price,
    originalPrice,
    stock,
    unit,
  } = item;
  return {
    id,
    name,
    slug,
    unit,
    image1,
    stock,
    price: Number(price ? price : originalPrice),
  };
}
