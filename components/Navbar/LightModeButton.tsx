import useLightMode from '../../hooks/useLightMode';
import useToggleLightMode from '../../hooks/useToggleLightMode';
import { BsSun, BsSunFill } from 'react-icons/bs';
import Button from '../Button';
// drop-shadow-[0px_5px_0px_#000]
function LightModeButton() {
	const lightMode = useLightMode();
	const toggleLightMode = useToggleLightMode();
	return (
		<Button
			sx=" text-2xl md:text-3xl drop-shadow-sm  dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
			onClick={toggleLightMode}
		>
			{lightMode ? <BsSunFill /> : <BsSun />}
		</Button>
	);
}

export default LightModeButton;
