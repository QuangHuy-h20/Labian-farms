import { Menu, Transition } from '@headlessui/react'

import { Fragment, ReactNode, useRef, useState } from 'react';
import Link from './link';


interface DropdownProps {
	subItems: any[],
	children: ReactNode
}

const Dropdown = ({ subItems, children }: DropdownProps) => {
	const buttonRef = useRef(null)

	const [show, setShow] = useState(false)

	const onHover = (open: boolean, action: string) => {
		if ((!open && !show && action === "onMouseEnter") ||
			(open && show && action === "onMouseLeave")) {
				setShow((show) => !show)
				buttonRef?.current?.click()
		}
	}

	return (
		<Menu as="div" className="relative mx-auto inline-block">
			{({ open }) => (
				<>
					<div className="flex flex-col"
						onMouseEnter={() => onHover(open, "onMouseEnter")}
						onMouseLeave={() => onHover(open, "onMouseLeave")}>
						<Menu.Button ref={buttonRef} >
							<div onClick={() => setShow(!open)}>
								{children}
							</div>
						</Menu.Button>
						<Transition
							show={open} as={Fragment}
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Menu.Items as="ul" className="absolute right-0 top-9 w-40 mt-3 z-50 bg-white drop-shadow-xl rounded-xl ring-offset-0"
								static>
								{subItems.map(item => (
									<Menu.Item key={item.name} onClick={() => setShow(!show)}>
										{({ active }) => (
											<Link href={item.href} className="cursor-pointer font-normal">
												<span className={`${active ? 'bg-emerald-600  text-white' : 'bg-white text-black'} inline-block text-left py-2 px-3 w-full`}>{item.name}</span>
											</Link>
										)}
									</Menu.Item>
								))}
							</Menu.Items>
						</Transition>
					</div>

				</>
			)}
		</Menu>
	)
};

export default Dropdown;
