// Utils
import useLightMode from '../../hooks/useLightMode';

// Components
import Link from 'next/link';
import Popover from '../Popover';
import { BsHouse, BsHouseFill } from 'react-icons/bs';

function HomeButton() {
	const lightMode = useLightMode();

	return (
		<Popover message="Go Home">
			<Link href="/">
				<button className="bg-opacity-50 bg-neutral-500 rounded-xl p-2 text-xl md:text-3xl text-white">
					{lightMode ? <BsHouseFill /> : <BsHouse />}
				</button>
			</Link>
		</Popover>
	);
}

export default HomeButton;
