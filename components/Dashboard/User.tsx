import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
	AiFillCaretDown,
	AiFillCaretUp,
	AiOutlineUser,
	AiOutlineMail,
	AiOutlineThunderbolt,
	AiOutlinePoweroff,
	AiOutlineLineChart,
} from 'react-icons/ai';

import { SlSocialSpotify } from 'react-icons/sl';
import { BsSun, BsSunFill } from 'react-icons/bs';
import useToggleLightMode from '../../hooks/useToggleLightMode';
import useLightMode from '../../hooks/useLightMode';

type Props = {
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
	};
};

type MenuItemProps = {
	icon: any;
	placeholder: string;
	onClick?: () => void;
	sx?: string;
};

interface MenuLinkProps extends MenuItemProps {
	menuOpen: boolean;
	href: string;
}

const menuItemStyles =
	'text-xs md:text-sm lg:text-base p-3 lg:p-4 text-start hover:bg-light-menuHover active:bg-light-menuHover dark:active:bg-dark-menuHover  dark:hover:bg-dark-menuHover flex items-center  select-none w-full min-w-max';

function MenuLink({ href, menuOpen, icon, placeholder, sx }: MenuLinkProps) {
	return (
		<li className={`${menuItemStyles} ${sx}`}>
			{menuOpen ? (
				<Link
					href={href}
					target={href === '/' ? '' : '_blank'}
					className={`cursor-pointer w-full`}
				>
					<button className="flex items-center ">
						{icon}
						<span>{placeholder}</span>
					</button>
				</Link>
			) : (
				<button
					disabled={!menuOpen}
					className="flex items-center w-full cursor-default"
				>
					{icon}
					<span>{placeholder}</span>
				</button>
			)}
		</li>
	);
}
function MenuItem({ placeholder, icon, onClick, sx }: MenuItemProps) {
	return (
		<li
			onClick={onClick}
			className={`${menuItemStyles} ${sx} ${onClick ? 'cursor-pointer' : ''}  `}
		>
			{icon}
			<span>{placeholder}</span>
		</li>
	);
}

function User({ user }: Props) {
	const [menuOpen, setMenuOpen] = useState(false);
	const lightMode = useLightMode();
	const toggleLightMode = useToggleLightMode();

	function handleMenuOpen() {
		setMenuOpen(!menuOpen);
	}

	return (
		<div className="fixed top-3 right-3 md:top-5 md:right-5 z-30">
			<button
				onClick={handleMenuOpen}
				className={`active:scale-90 lg:active:scale-100 flex lg:space-x-2 items-center justify-center text-sm md:justify-start w-max  text-black bg-white dark:bg-dark-menu dark:text-white p-0.5 lg:pr-2 lg:pl-0.5 lg:py-0.5 rounded-full ${
					menuOpen ? '' : 'bg-opacity-80 hover:bg-opacity-100'
				} outline-none transition-all`}
			>
				{/* User Image */}
				<div className="relative cursor-pointer  rounded-full flex md:flex-row items-center justify-center overflow-hidden h-[30px] w-[30px]  bg-[#535353]">
					{user.image ? (
						<Image
							src={user.image.url}
							fill={true}
							alt={`spotify-profile-${user.name}-picture`}
						/>
					) : (
						<AiOutlineUser className="text-white text-xl" />
					)}
				</div>

				{/* Menu Button */}
				<h1 className=" hidden lg:inline lowercase  select-none">
					{user.name}
				</h1>

				<span className="hidden lg:inline">
					{menuOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
				</span>
			</button>

			{/* Menu */}
			<ul
				className={`${
					menuOpen
						? 'opacity-100 translate-y-0 '
						: 'opacity-0 -translate-y-6 cursor-default -z-50'
				}  flex flex-col rounded-md p-1 drop-shadow-xl bg-white bg-opacity-95 text-black dark:text-white dark:bg-dark-menu absolute top-[120%] right-0 min-w-full  transition-all duration-[400ms] `}
			>
				<MenuItem
					icon={<SlSocialSpotify className="inline mr-2.5" />}
					placeholder={user.name}
					sx={'lg:hidden'}
				/>

				<MenuItem
					icon={<AiOutlineMail className="inline mr-2.5" />}
					placeholder={user.email}
				/>
				<MenuItem
					icon={<AiOutlineLineChart className="inline mr-2.5" />}
					placeholder={`${user.followers} Followers`}
				/>

				<MenuItem
					icon={<AiOutlineThunderbolt className="inline mr-2.5" />}
					placeholder={`${user.premium ? 'Premium User' : 'Free User'}`}
				/>
				<MenuItem
					onClick={toggleLightMode}
					icon={
						lightMode ? (
							<BsSunFill className="inline mr-2.5" />
						) : (
							<BsSun className="inline mr-2.5" />
						)
					}
					placeholder={`Light Mode: ${lightMode ? 'On' : 'Off'}`}
				/>
				<MenuLink
					menuOpen={menuOpen}
					sx={'hidden md:inline'}
					href={user.url}
					icon={<SlSocialSpotify className="inline mr-2.5" />}
					placeholder={'View On Spotify'}
				/>

				<MenuLink
					menuOpen={menuOpen}
					href={'/'}
					sx="border-t-[1px] border-t-neutral-600"
					icon={<AiOutlinePoweroff className="inline mr-2.5" />}
					placeholder={'Logout'}
				/>
			</ul>
		</div>
	);
}

export default User;
