import Button from '../Button';
import { BsPlayBtn, BsPlayBtnFill } from 'react-icons/bs';
import useLightMode from '../../hooks/useLightMode';
import Link from 'next/link';

function DemoButton() {
	const lightMode = useLightMode();
	return (
		<Link href="/demo">
			<Button sx="text-2xl  md:text-3xl drop-shadow-sm  dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
				{lightMode ? <BsPlayBtnFill /> : <BsPlayBtn />}
			</Button>
		</Link>
	);
}

export default DemoButton;
