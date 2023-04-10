// Components
import Link from 'next/link';
import Button from '../Button';
import Popover from '../Popover';
import { BsPlayBtnFill } from 'react-icons/bs';

function DemoButton() {
	return (
		<Popover message="Live Demo">
			<Link href="/demo">
				<Button>
					<BsPlayBtnFill />
				</Button>
			</Link>
		</Popover>
	);
}

export default DemoButton;
