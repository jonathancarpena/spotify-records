import React from 'react';
import SpotifyOAuthButton from '../SpotifyOAuthButton';
import useLightMode from '../../hooks/useLightMode';
import useToggleLightMode from '../../hooks/useToggleLightMode';

function Landing() {
	const lightMode = useLightMode();
	const toggleLightMode = useToggleLightMode();
	return (
		<div className="relative h-screen w-screen bg-dark-main">
			{lightMode ? <span>Light Mode ON</span> : <span>Light Mode OFF</span>}
			<button onClick={toggleLightMode} className="block">
				Toggle Light Mode
			</button>

			<div className="w-[500px] h-[500px]   m-10 bg-tracks bg-cover bg-center relative">
				<div className="bg-gradient-to-b from-transparent to-dark-main border-0 border-red-200 w-full h-[300px] absolute -bottom-[0rem]"></div>
			</div>
			{/* <div className="flex flex-col justify-center -space-y-14 m-10">
				<div className="mix-blend-multiply bg-pink-400 w-[200px] h-[200px]"></div>
			</div> */}

			<button className="text-3xl font-black  rounded-lg absolute top-1/2 left-1/2 w-max bg-green-500 text-white px-6 py-4 h-max">
				<SpotifyOAuthButton />
			</button>
		</div>
	);
}

export default Landing;
