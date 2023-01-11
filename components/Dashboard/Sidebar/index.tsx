import Link from 'next/link';

import {
	AiOutlinePlusSquare,
	AiFillPlusSquare,
	AiOutlineCustomerService,
	AiFillCustomerService,
	AiOutlineHeart,
	AiFillHeart,
	AiOutlineLogout,
	AiFillBulb,
	AiOutlineBulb,
} from 'react-icons/ai';
import { BsSun, BsSunFill } from 'react-icons/bs';

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
	return (
		<div className="  h-screen bg-white py-6 px-5 w-64 min-w-[16rem] relative flex flex-col justify-between">
			<div>
				<h1 className="select-none font-black text-3xl block mb-6 tracking-tight">
					Swaddle
				</h1>
				<ul className="flex flex-col space-y-1 border-b-2 pb-3">
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

					<li
						onClick={toggleLightMode}
						className={`select-none cursor-pointer p-1 flex items-center space-x-3  ${
							lightMode ? 'text-black' : 'text-secondary-light'
						}`}
					>
						{lightMode ? (
							<BsSunFill className="text-3xl" />
						) : (
							<BsSun className="text-3xl" />
						)}

						<span
							className={` text-sm flex-1  font-bold capitalize hover:text-black transition-colors duration-200`}
						>
							Light Mode: {lightMode ? 'on' : 'off'}
						</span>
					</li>
				</ul>
			</div>

			<Link href="/">
				<button
					className={` sticky bottom-0 text-white drop-shadow-md bg-accent-500 hover:brightness-110 hover:scale-105 active:brightness-90 w-full cursor-pointer px-2 py-3 flex items-center space-x-3  mb-3 transition-all duration-200 rounded-md border-[1px]`}
				>
					<AiOutlineLogout className="text-3xl" />
					<span className={` text-sm  font-bold capitalize  `}>Logout</span>
				</button>
			</Link>
		</div>
	);
}

export default Sidebar;
