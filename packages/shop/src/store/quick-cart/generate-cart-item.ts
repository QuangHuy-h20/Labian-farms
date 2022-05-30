interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: string;
  originalPrice: number;
  price?: number;
  qty?: number;
  [key: string]: unknown;
}

export function generateCartItem(item: Item) {
  const {
    id,
    name,
    slug,
    image,
    price,
    originalPrice,
    qty,
    unit,
  } = item;
  return {
    id,
    name,
    slug,
    unit,
    image,
    stock: qty,
    price: Number(originalPrice ? originalPrice : price),
  };
}
