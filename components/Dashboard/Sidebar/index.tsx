import Link from 'next/link';

import {
	AiOutlinePlusSquare,
	AiFillPlusSquare,
	AiOutlineCustomerService,
	AiFillCustomerService,
	AiOutlineHeart,
	AiFillHeart,
	AiOutlineLogout,
} from 'react-icons/ai';
import { BsSun, BsSunFill, BsSpotify } from 'react-icons/bs';

import { MenuOptions } from '..';
import SidebarItem from './SidebarItem';
import useLightMode from '../../../hooks/useLightMode';
import useToggleLightMode from '../../../hooks/useToggleLightMode';

type Props = {
	menu: string;
	handleMenuChange: (option: MenuOptions) => void;
	user: {
		name: string;
		email: string;
		country: string;
		premium: boolean;
		url: string;
		followers: number;
		image?: {
			url: string;
			height: number | null;
			width: number | null;
		};
	} | null;
};

function Sidebar({ menu, handleMenuChange, user }: Props) {
	const lightMode = useLightMode();
	const toggleLightMode = useToggleLightMode();
	// dark:text-white text-black
	return (
		<div className="z-40 w-screen h-20 fixed bottom-0 bg-gradient-to-b from-transparent to-white dark:to-black md:bg-white md:dark:bg-black   md:justify-between md:relative md:flex-col md:w-max md:h-screen  md:px-5">
			<div className="flex-1 md:w-44 lg:w-52 md:pt-6 h-full  ">
				<h1 className="hidden  select-none ml-1 mb-4 lg:mb-7    md:text-blue-500 lg:text-red-500  space-x-2 items-center md:flex">
					<BsSpotify className="text-[2.4rem] leading-5 " />
					<span className="text-2xl font-bold tracking-tight">Swaddle</span>
				</h1>
				<ul className="flex justify-around h-full items-center md:flex-col md:justify-start md:h-max md:items-start space-y-2 lg:space-y-1  md:border-b-[1px]  md:pb-3 md:border-b-light-secondary ">
					<SidebarItem
						menu={menu}
						handleMenuChange={handleMenuChange}
						value={'tracks'}
						inactive={<AiOutlineCustomerService className="text-3xl" />}
						active={<AiFillCustomerService className="text-3xl" />}
					/>
					<SidebarItem
						menu={menu}
						handleMenuChange={handleMenuChange}
						value={'artists'}
						inactive={<AiOutlineHeart className="text-3xl" />}
						active={<AiFillHeart className="text-3xl" />}
					/>
					<SidebarItem
						menu={menu}
						handleMenuChange={handleMenuChange}
						value={'create playlist'}
						inactive={<AiOutlinePlusSquare className="text-3xl" />}
						active={<AiFillPlusSquare className="text-3xl" />}
					/>

					{/* Light Mode Toggle */}
					<li
						onClick={toggleLightMode}
						className={`hidden md:flex select-none cursor-pointer py-1  items-center space-x-3 transition-all duration-200 active:scale-90 ${
							lightMode ? 'text-black' : 'text-dark-secondary hover:text-white '
						}`}
					>
						{lightMode ? (
							<BsSunFill className="text-3xl" />
						) : (
							<BsSun className="text-3xl" />
						)}

						<span
							className={` hidden md:inline text-xs lg:text-sm flex-1  font-bold capitalize `}
						>
							Light Mode: {lightMode ? 'on' : 'off'}
						</span>
					</li>
				</ul>
			</div>

			<Link
				href="/"
				className="hidden md:inline absolute bottom-0 left-1/2 -translate-x-1/2 w-10/12"
			>
				<button
					className={` text-white bg-accent-500 hover:brightness-110 hover:scale-105 active:brightness-90 w-full mx-auto cursor-pointer px-2 py-3 flex items-center space-x-3  mb-[3.25rem] transition-all duration-200 rounded-md `}
				>
					<AiOutlineLogout className="text-xl" />
					<span className={` text-sm  font-bold capitalize  `}>Logout</span>
				</button>
			</Link>
		</div>
	);
}

export default Sidebar;
