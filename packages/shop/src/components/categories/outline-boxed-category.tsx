import { useRouter } from "next/router";
import cn from "classnames";
import { ArrowRight } from "@assets/icons";

interface CategoryItemProps {
  item: any;
}
const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  const router = useRouter();

  const { pathname, query } = router;
  const selectedQueries = query.category;

  const onCategoryClick = (slug: string) => {
    if (selectedQueries === slug) {
      const { category, ...rest } = query;
      router.push(
        {
          pathname,
          query: { ...rest },
        },
        undefined,
        {
          scroll: false,
        }
      );
      return;
    }
    router.push(
      {
        pathname,
        query: { ...query, category: slug },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  return (
    <div
      className={cn(
        "text-center rounded bg-white py-4 flex items-center justify-between relative overflow-hidden px-6 cursor-pointer",
        selectedQueries === item?.slug
          ? "text-emerald-600"
          : "text-gray-500"
      )}
      role="button"
      onClick={() => onCategoryClick(item?.slug!)}
    >
      <span className="text-sm font-semibold  text-heading text-center px-2.5 block">
        {item?.name}
      </span>
	  <ArrowRight height={20} width={20} fill={ selectedQueries === item?.slug ? 'rgba(5, 150, 105, 1)' : 'rgba(107, 114, 128, 1)' }/>
    </div>
  );
};

function OutlinedBoxedCategoryMenu({ items }: any) {
  return (
    <>
      {items?.map((item: any) => (
        <CategoryItem key={`${item.name}${item.slug}`} item={item} />
      ))}
    </>
  );
}

export default OutlinedBoxedCategoryMenu;
