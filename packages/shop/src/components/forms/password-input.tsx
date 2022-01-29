
import { Eye, EyeSlash } from "@assets/icons";
import { forwardRef, useState } from "react";
import { InputProps } from "./input";



const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, label, name, type, placeholder, error, ...rest }, ref) => {
	let [show, setShow] = useState(false)
	return (
		<div className="flex flex-col text-sm mb-6">
			{label && (<label htmlFor={label} className="text-left mb-5">{label}</label>)}
			<div className="flex flex-row border border-gray-600/30 p-3 rounded-md">
				<input className='focus:outline-none w-full' name={name} type={show ? 'password' : 'text'} placeholder={placeholder} ref={ref} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" {...rest} />
				<button className="ml-4" type="button" onClick={() => setShow(!show)}>{show ? <Eye /> : <EyeSlash />}</button>

			</div>
			{error && <p className="text-left text-sm text-red-500 mt-1">
				{error}
			</p>}
		</div>
	)
})

export default PasswordInput;
