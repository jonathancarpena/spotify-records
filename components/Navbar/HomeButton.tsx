import useLightMode from '../../hooks/useLightMode';

import { BsHouse, BsHouseFill } from 'react-icons/bs';
import Button from '../Button';
import Link from 'next/link';

function HomeButton() {
	const lightMode = useLightMode();

	return (
		<Link href="/">
			<Button sx="text-2xl md:text-3xl drop-shadow-sm dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
				{lightMode ? <BsHouseFill /> : <BsHouse />}
			</Button>
		</Link>
	);
}

export default HomeButton;
