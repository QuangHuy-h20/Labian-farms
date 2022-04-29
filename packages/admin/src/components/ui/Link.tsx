import NextLink, { LinkProps as NextLinkProps } from "next/link";

interface LinkProps extends NextLinkProps {
  children?: any;
}
const Link: React.FC<LinkProps & { className?: string; title?: string }> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;
