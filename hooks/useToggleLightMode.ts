import { useContext } from 'react';
import { LightModeUpdateContext } from '../context/LightMode';

function useToggleLightMode() {
	return useContext(LightModeUpdateContext);
}

export default useToggleLightMode;
