import { useRouter } from 'next/router';
import DemoButton from './DemoButton';
import LightModeButton from './LightModeButton';
import HomeButton from './HomeButton';

function Navbar() {
	const router = useRouter();

	return (
		<nav className="absolute right-3 top-3 flex flex-col space-y-5 z-50">
			<LightModeButton />
			{router.pathname === '/404' ? (
				<></>
			) : router.asPath.includes('demo') ? (
				<HomeButton />
			) : (
				<DemoButton />
			)}
		</nav>
	);
}

export default Navbar;
