// Utils
import { useRouter } from 'next/router';
import { useState } from 'react';

// Components
import DemoButton from './DemoButton';
import LightModeButton from './LightModeButton';
import HomeButton from './HomeButton';
import { FiMoreVertical } from 'react-icons/fi';

function Navbar() {
	const router = useRouter();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuButtonClick = () => setMenuOpen(!menuOpen);
	return (
		<>
			<nav className="md:hidden fixed top-4 right-4 md:absolute md:right-3 md:top-3 flex flex-col md:space-y-5 z-50 w-max">
				<button
					onClick={handleMenuButtonClick}
					className="active:scale-75 transition-all ease-in duration-100 bg-white dark:bg-dark-mainActive drop-shadow-md flex justify-center items-center p-1 rounded-full text-2xl"
				>
					<FiMoreVertical />
				</button>

				<div
					className={`absolute top-[130%] left-1/2 ${
						menuOpen ? '-translate-x-1/2' : 'translate-x-full'
					}  flex flex-col space-y-5 bg-white dark:bg-dark-mainActive shadow-md pt-3 pb-5 rounded-lg px-2 transition-all ease-in-out duration-300`}
				>
					<LightModeButton />
					{router.pathname === '/404' ? (
						<></>
					) : router.asPath.includes('demo') ? (
						<HomeButton />
					) : (
						<DemoButton />
					)}
				</div>
			</nav>
			<nav className="hidden md:flex absolute right-5 top-5  flex-col space-y-5 z-50">
				<LightModeButton />
				{router.pathname === '/404' ? (
					<></>
				) : router.asPath.includes('demo') ? (
					<HomeButton />
				) : (
					<DemoButton />
				)}
			</nav>
		</>
	);
}

export default Navbar;
