import React from 'react';
import useToggleLightMode from '../../../hooks/useToggleLightMode';
import useLightMode from '../../../hooks/useLightMode';
import { BsSun, BsSunFill, BsSpotify } from 'react-icons/bs';

type Props = {};

function MobileNavbar({}: Props) {
	const toggleLightMode = useToggleLightMode();
	const lightMode = useLightMode();
	return (
		<nav className="z-[60] flex item-center justify-between fixed top-0 w-screen   p-3 md:hidden ">
			<h1 className="  select-none   text-black dark:text-white  space-x-2 items-center flex">
				<BsSpotify className="text-3xl " />
				<span className="text-lg font-bold tracking-tight">Swaddle</span>
			</h1>
			<button
				onClick={toggleLightMode}
				className={` select-none cursor-pointer p-1  items-center space-x-3 transition-colors duration-200 ${
					lightMode ? 'text-black' : 'text-dark-secondary hover:text-white '
				}`}
			>
				{lightMode ? (
					<BsSunFill className="text-3xl" />
				) : (
					<BsSun className="text-3xl" />
				)}
			</button>
		</nav>
	);
}

export default MobileNavbar;
