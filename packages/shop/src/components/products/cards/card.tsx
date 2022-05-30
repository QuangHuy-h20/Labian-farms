import dynamic from "next/dynamic";
const Neon = dynamic(() => import("@components/products/cards/neon")); // grocery-two

interface ProductCardProps {
  product: any;
  className?: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  ...props
}) => {
  return <Neon product={product} {...props} className={className} />;
};
export default ProductCard;
