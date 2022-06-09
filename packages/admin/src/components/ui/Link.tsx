import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
  children?: any;
  target?: string;
}
const Link: React.FC<LinkProps & { className?: string; title?: string }> = ({
  href,
  children,
  target,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a target={target} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
