
export interface IIconProps {
	width?: string
	height?: string
	fill?: string
}

const Search = (props: IIconProps) => {
	return (
		<div>
			<svg width={props.width} height={props.height} viewBox="0 0 24 24" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
				<path d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z" fill={props.fill} />
				<path d="M21.9995 22.7514C21.8095 22.7514 21.6195 22.6814 21.4695 22.5314L19.4695 20.5314C19.1795 20.2414 19.1795 19.7614 19.4695 19.4714C19.7595 19.1814 20.2395 19.1814 20.5295 19.4714L22.5295 21.4714C22.8195 21.7614 22.8195 22.2414 22.5295 22.5314C22.3795 22.6814 22.1895 22.7514 21.9995 22.7514Z" fill={props.fill} />
			</svg>

		</div>
	)
};

export default Search;
