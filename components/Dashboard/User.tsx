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
import { MdOutlineAlternateEmail } from 'react-icons/md';

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
	mobile?: boolean;
	onClick?: () => void;
};

interface MenuLinkProps extends MenuItemProps {
	menuOpen: boolean;
	href: string;
}

const menuItemStyles =
	'text-sm md:text-base px-1.5 py-2 md:px-2 md:py-3 text-start hover:bg-light-menuHover active:bg-light-menuHover dark:active:bg-dark-menuHover  dark:hover:bg-dark-menuHover flex items-center  select-none w-full min-w-max';

function MenuLink({ href, menuOpen, icon, placeholder }: MenuLinkProps) {
	return (
		<li className={menuItemStyles}>
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
function MenuItem({ placeholder, icon, mobile, onClick }: MenuItemProps) {
	return (
		<li
			onClick={onClick}
			className={`${menuItemStyles} ${mobile ? 'md:hidden' : ''} ${
				onClick ? 'cursor-pointer' : ''
			}  `}
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
		<div className="fixed top-3 right-3 md:top-5 md:right-5 z-50">
			<button
				onClick={handleMenuOpen}
				className={`flex md:space-x-2 items-center justify-center text-sm md:justify-start w-max  text-black bg-light-menu dark:bg-dark-menu dark:text-white p-1 md:pr-2 md:pl-1 md:py-1 rounded-full ${
					menuOpen ? '' : 'bg-opacity-80 hover:bg-opacity-100'
				}`}
			>
				{/* User Image */}
				<div className="cursor-pointer  rounded-full flex md:flex-row items-center justify-center overflow-hidden h-[30px] w-[30px]  bg-[#535353]">
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
				<h1 className=" hidden md:inline lowercase  select-none">
					{user.name}
				</h1>

				<span className="hidden md:inline">
					{menuOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
				</span>
			</button>

			{/* Menu */}
			<ul
				className={`${
					menuOpen
						? 'opacity-100 translate-y-0 '
						: 'opacity-0 -translate-y-6 cursor-default -z-50'
				}  flex flex-col rounded-md p-1 drop-shadow-xl bg-light-menu  text-black dark:text-white dark:bg-dark-menu absolute top-[120%] right-0 min-w-full  transition-all duration-[400ms]`}
			>
				<MenuItem
					mobile
					icon={<MdOutlineAlternateEmail className="inline mr-2.5" />}
					placeholder={user.name}
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
					mobile
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
					href={user.url}
					icon={<SlSocialSpotify className="inline mr-2.5" />}
					placeholder={'View On Spotify'}
				/>
				<MenuLink
					menuOpen={menuOpen}
					href={'/'}
					icon={<AiOutlinePoweroff className="inline mr-2.5" />}
					placeholder={'Logout'}
				/>
			</ul>
		</div>
	);
}

export default User;
