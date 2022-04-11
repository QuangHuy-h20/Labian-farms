import { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
	label?: string
	name: string
	value?: string
	type?: string
	error?: string
	placeholder?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			label,
			name,
			value,
			error,
			children,
			disabled = false,
			type = 'text',
			...rest
		},
		ref
	) => {
		return (
			<div className="flex flex-col text-sm mb-6">
				{label && (
					<label
						htmlFor={name}
						className="text-left mb-1"
					>
						{label}
					</label>
				)}
				<div className="flex flex-row border border-gray-600/30 p-3 rounded-md">
					<input
						className='focus:outline-none w-full'
						id={name}
						name={name}
						value={value}
						type={type}
						ref={ref}
						disabled={disabled}
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
						{...rest}
					/>
				</div>
					{error && <p className="text-left text-sm text-red-500 mt-1">{error}</p>}

			</div>
		);
	}
);

export default Input;
