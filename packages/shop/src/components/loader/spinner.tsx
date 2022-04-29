import cn from 'classnames'
interface SpinnerProps {
	className?: string
	size: "small" | "large"
}
const classes = {
	root: 'loader ease-linear rounded-full inline border-4 border-t-4 border-gray-200',
	large: 'h-12 w-12',
	small: 'h-6 w-6'
}
const Spinner = (props: SpinnerProps) => {
	const { className, size = "small" } = props
	const classesName = cn(classes.root, {
		[classes.small]: size === 'small',
		[classes.large]: size === 'large',
	}, className)
	return <div className="flex justify-center items-center">
		<div className={classesName}></div>

	</div>
};

export default Spinner;
