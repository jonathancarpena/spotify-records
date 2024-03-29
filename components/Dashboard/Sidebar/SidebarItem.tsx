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
	const handleClick = () => handleMenuChange(value);
	return (
		<li
			onClick={handleClick}
			className={`active:scale-90 select-none cursor-pointer py-1 flex flex-col   items-center  hover:text-black dark:hover:text-white transition-all duration-200 w-full  ${
				menu === value
					? 'text-black dark:text-white'
					: 'text-light-secondary dark:text-dark-secondary'
			} md:flex-row md:space-x-3 `}
		>
			{menu === value ? active : inactive}

			<span
				className={`text-center md:text-start text-sm   flex-1  font-bold capitalize `}
			>
				{value}
			</span>
		</li>
	);
}

export default SidebarItem;
