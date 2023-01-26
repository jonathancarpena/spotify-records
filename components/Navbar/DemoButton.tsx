import Button from '../Button';
import { BsPlayBtn, BsPlayBtnFill } from 'react-icons/bs';
import useLightMode from '../../hooks/useLightMode';
import Link from 'next/link';
import Popover from '../Popover';

function DemoButton() {
	const lightMode = useLightMode();
	return (
		<Popover message="Live Demo">
			<Link href="/demo">
				<Button sx="text-xl  md:text-3xl md:drop-shadow-sm  md:dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
					{lightMode ? <BsPlayBtnFill /> : <BsPlayBtn />}
				</Button>
			</Link>
		</Popover>
	);
}

export default DemoButton;
