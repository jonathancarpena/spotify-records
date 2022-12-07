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

function User({ user }: Props) {
	const [hover, setHover] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	function handleHover() {
		if (!menuOpen) {
			setTimeout(() => {
				setHover(true);
			}, 300);
		}
	}

	function handleMenuOpen() {
		if (hover) {
			setHover(false);
		}

		setMenuOpen(!menuOpen);
	}

	return (
		<div
			onMouseEnter={handleHover}
			onMouseLeave={() => setHover(false)}
			onClick={handleMenuOpen}
			className={`cursor-pointer flex space-x-2 items-center w-max absolute top-5 right-5 text-white bg-dark-menu pr-2 pl-1 py-1 rounded-full ${
				menuOpen ? '' : 'bg-opacity-80 hover:bg-opacity-100'
			}`}
		>
			{/* User Image */}
			<div className="cursor-pointer  rounded-full flex items-center justify-center overflow-hidden h-[30px] w-[30px]  bg-[#535353]">
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
			<h1 className=" lowercase">{user.name}</h1>

			{menuOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}

			{/* Hover Name Popup */}
			{!menuOpen && (
				<span
					className={`${
						hover ? 'opacity-100' : 'opacity-0'
					} cursor-default select-none transition-opacity duration-150 lowercase rounded-md py-1 px-2 drop-shadow-xl bg-dark-menu  text-white absolute top-[120%] left-1/2 -translate-x-1/2`}
				>
					{user.name}
				</span>
			)}

			{/* Menu */}
			{menuOpen && (
				<div
					className={`flex flex-col rounded-md p-1 drop-shadow-xl bg-dark-menu  text-white absolute top-[120%] right-0 min-w-full w-max`}
				>
					<p className="cursor-default px-2 py-3 text-start hover:bg-dark-menuHover flex items-center">
						<AiOutlineMail className="inline mr-2.5" />
						<span>{user.email}</span>
					</p>
					<p className=" cursor-default  px-2 py-3 text-start hover:bg-dark-menuHover flex items-center">
						<AiOutlineLineChart className="inline mr-2.5" />
						<span>{user.followers} Followers</span>
					</p>
					<p className="cursor-default px-2 py-3 text-start hover:bg-dark-menuHover flex items-center">
						<AiOutlineThunderbolt className="inline mr-2.5" />
						<span>{user.premium ? 'Premium User' : 'Free User'}</span>
					</p>

					<button className="px-2 py-3 text-start hover:bg-dark-menuHover flex items-center">
						<Link href={user.url} target="_blank">
							<SlSocialSpotify className="inline mr-2.5" />
							<span>View On Spotify</span>
						</Link>
					</button>

					<button className="px-2 py-3 text-start hover:bg-dark-menuHover flex items-center">
						<Link href={user.url} target="_blank">
							<AiOutlinePoweroff className="inline mr-2.5" />
							<span>Logout</span>
						</Link>
					</button>
				</div>
			)}
		</div>
	);
}

export default User;
