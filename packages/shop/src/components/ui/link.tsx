import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { FC } from 'react';
interface LinkProps extends NextLinkProps {
	className: string
}

const Link: FC<LinkProps> = ({ href, children, className, ...props }) => {
	return (
		<NextLink href={href}>
			<a className={className} {...props}>
				{children}
			</a>
		</NextLink>
	)
}

export default Link