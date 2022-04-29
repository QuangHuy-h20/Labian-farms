import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useEffect, useState } from 'react';



interface TreeMenuItemProps {
  item: any;
  className?: string;
  depth?: number;
}
const TreeMenuItem: React.FC<TreeMenuItemProps> = ({
  className,
  item,
  depth = 0,
}) => {
  const router = useRouter();
  const active = router?.query?.category;
  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { slug, name, children: items, icon } = item;

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  function onClick() {
    const { pathname, query } = router;
    const navigate = () =>
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
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
      navigate();
    } else {
      navigate();
    }
  }

  let expandIcon;

  return (
    <>
      <motion.li
        initial={false}
        animate={{ backgroundColor: '#ffffff' }}
        onClick={onClick}
        className="py-1 rounded-md"
      >
        <button
          className={cn(
            'flex items-center w-full py-2 text-start outline-none text-body-dark font-semibold  focus:outline-none focus:ring-0 focus:text-emerald-500 transition-all ease-in-expo',
            isOpen ? 'text-emerald-500' : 'text-body-dark',
            className ? className : 'text-sm'
          )}
        >
          <span>{name}</span>
        </button>
      </motion.li>
      <AnimatePresence initial={false}>
        {Array.isArray(items) && isOpen ? (
          <li>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="ms-4 text-xs"
            >
              {items.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <TreeMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn('text-sm text-body ms-5')}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
      </AnimatePresence>
    </>
  );
};
interface TreeMenuProps {
  items: any[];
  className?: string;
}

function TreeMenu({ items, className }: TreeMenuProps) {
  return (
    <ul className={cn('text-xs', className)}>
      {items?.map((item: any) => (
        <TreeMenuItem key={`${item.name}${item.slug}`} item={item} />
      ))}
    </ul>
  );
}

export default TreeMenu;
