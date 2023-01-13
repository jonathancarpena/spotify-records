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
			className={`select-none cursor-pointer p-1 flex flex-col   items-center  hover:text-black dark:hover:text-white transition-colors duration-200 w-full ${
				menu === value
					? 'text-black dark:text-white'
					: 'text-light-secondary dark:text-dark-secondary'
			} md:flex-row md:space-x-3 md:w-max`}
		>
			{menu === value ? active : inactive}

			<span
				className={`text-center md:text-start text-xs md:text-sm flex-1  font-bold capitalize `}
			>
				{value}
			</span>
		</li>
	);
}

export default SidebarItem;
