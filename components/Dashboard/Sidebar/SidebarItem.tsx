import React from 'react';
import { MenuOptions } from '..';

type Props = {
	menu: string;
	handleMenuChange: (option: MenuOptions) => void;
	value: MenuOptions;
	inactive: any;
	active: any;
};

function SidebarItem({
	menu,
	handleMenuChange,
	value,
	inactive,
	active,
}: Props) {
	return (
		<li
			onClick={() => handleMenuChange(value)}
			className={`select-none cursor-pointer p-1 flex items-center space-x-3  ${
				menu === value ? 'text-black' : 'text-secondary-light'
			}`}
		>
			{menu === value ? active : inactive}

			<span
				className={` text-sm flex-1  font-bold capitalize hover:text-black transition-colors duration-200`}
			>
				{value}
			</span>
		</li>
	);
}

export default SidebarItem;
