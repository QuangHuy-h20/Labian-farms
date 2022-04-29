import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link';
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';


interface DropdownProps {
	subItems: any[],
	children: ReactNode
}

const Dropdown = ({ subItems, children }: DropdownProps) => {
	const buttonRef = useRef(null)

	const [show, setShow] = useState(false)

	const onHover = (open, action) => {
		if ((!open && !show && action === "onMouseEnter") ||
			(open && show && action === "onMouseLeave")) {
			setShow(show => !show)
		}
	}

	return (
		<Menu as="div" className="relative inline-block">
			{({ open }) => (
				<>
					<div
						onMouseEnter={() => onHover(open, "onMouseEnter")}
						onMouseLeave={() => onHover(open, "onMouseLeave")}>
						<Menu.Button ref={buttonRef}
						>
							{children}
						</Menu.Button>
					</div>
					<Transition
						show={open} as={Fragment}
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Menu.Items as="ul" className="absolute right-0 top-10 w-40 mt-3 z-50 bg-white drop-shadow-xl rounded-xl"

							static>
							{subItems.map(item => (
								<Link href={item.href}>
									<Menu.Item as="li" key={item.name} className="cursor-pointer">
										{({ active }) => (
											<button className={`${active ? 'bg-emerald-600  text-white' : 'bg-white text-black'} text-left py-2 px-3 w-full`}>{item.name}</button>
										)}
									</Menu.Item>
								</Link>
							))}
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	)
};

export default Dropdown;
