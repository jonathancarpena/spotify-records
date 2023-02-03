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
      <Button onClick={toggleLightMode}>
        {lightMode ? <BsSunFill /> : <BsSun />}
      </Button>
    </Popover>
  );
}

export default LightModeButton;
