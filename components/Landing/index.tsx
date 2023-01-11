import React from 'react';
import SpotifyOAuthButton from '../SpotifyOAuthButton';
import useLightMode from '../../hooks/useLightMode';
import useToggleLightMode from '../../hooks/useToggleLightMode';

function Landing() {
	const lightMode = useLightMode();
	const toggleLightMode = useToggleLightMode();
	return (
		<div className="relative h-screen w-screen bg-light-main dark:bg-dark-main">
			{lightMode ? <span>Light Mode ON</span> : <span>Light Mode OFF</span>}
			<button onClick={toggleLightMode} className="block">
				Toggle Light Mode
			</button>
			<button className="text-3xl font-black  rounded-lg absolute top-1/2 left-1/2 w-max bg-green-500 text-white px-6 py-4 h-max">
				<SpotifyOAuthButton />
			</button>
		</div>
	);
}

export default Landing;
