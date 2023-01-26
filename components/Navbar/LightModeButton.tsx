import useLightMode from '../../hooks/useLightMode';
import useToggleLightMode from '../../hooks/useToggleLightMode';
import { BsSun, BsSunFill } from 'react-icons/bs';
import Button from '../Button';
import Popover from '../Popover';

function LightModeButton() {
	const lightMode = useLightMode();
	const toggleLightMode = useToggleLightMode();
	return (
		<Popover message={`Light Mode: ${lightMode ? 'On' : 'Off'}`}>
			<Button
				sx="text-xl md:text-3xl md:drop-shadow-sm  md:dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
				onClick={toggleLightMode}
			>
				{lightMode ? <BsSunFill /> : <BsSun />}
			</Button>
		</Popover>
	);
}

export default LightModeButton;
