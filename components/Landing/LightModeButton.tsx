import useLightMode from '../../hooks/useLightMode';
import useToggleLightMode from '../../hooks/useToggleLightMode';
import { BsSun, BsSunFill } from 'react-icons/bs';
import Button from '../Button';
// drop-shadow-[0px_5px_0px_#000]
function LightModeButton() {
	const lightMode = useLightMode();
	const toggleLightMode = useToggleLightMode();
	return (
		<Button sx="fixed top-5 right-5 text-3xl " onClick={toggleLightMode}>
			{lightMode ? <BsSunFill /> : <BsSun />}
		</Button>
	);
}

export default LightModeButton;
