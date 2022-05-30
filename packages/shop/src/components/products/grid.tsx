
import cn from 'classnames';
import Button from '@components/ui/button';
import ProductLoader from '@components/loader/product-loader';
import rangeMap from '@lib/range-map';
import ProductCard from './cards/card';

const PRODUCTS_PER_PAGE = 8

interface Props {
  limit?: number;
  sortedBy?: string;
  orderBy?: string;
  column?: 'five' | 'auto';
  shopId?: string;
  gridClassName?: string;
  products: any[] | null;
  isLoading?: boolean;
  error?: any;
  loadMore?: any;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  className?: string;
}

export function Grid({
  className,
  gridClassName,
  products,
  isLoading,
  loadMore,
  isLoadingMore,
  hasMore,
  limit = PRODUCTS_PER_PAGE,
  column = 'auto',
}: Props) {

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          {
            'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3':
              column === 'auto',
            'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]':
              column === 'five',
          },
          gridClassName
        )}
      >
        {isLoading && !products?.length
          ? rangeMap(limit, (i) => (
              <ProductLoader key={i} uniqueKey={`product-${i}`} />
            ))
          : products?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center lg:mt-12">
          <Button
            loading={isLoadingMore}
            onClick={loadMore}
            className="h-11 text-sm font-semibold md:text-base"
          >
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
}


interface ProductsGridProps {
  className?: string;
  gridClassName?: string;
  products?: any;
  loading?:boolean;
  error?: any;
  column?: 'five' | 'auto';
}
export default function ProductsGrid({
  className,
  gridClassName,
  products,
  loading,
  error,
  column = 'auto',
}: ProductsGridProps) {
 
  
  return (
    <Grid
      products={products}
      isLoading={loading}
      error={error}
      className={className}
      gridClassName={gridClassName}
      column={column}
    />
  );
}
