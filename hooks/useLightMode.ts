import { useContext } from 'react';
import { LightModeContext } from '../context/LightMode';

function useLightMode() {
	return useContext(LightModeContext);
}

export default useLightMode;
