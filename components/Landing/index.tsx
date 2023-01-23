import { useState } from 'react';
import SpotifyOAuthButton from '../SpotifyOAuthButton';
import Cards from './Cards';

import SEO from '../SEO';

function Landing() {
	// drop-shadow-[0px_5px_0px_#000]
	return (
		<>
			<SEO />
			<div className="relative min-h-screen min-w-screen overflow-hidden dark:bg-dark-main bg-light-main text-black dark:text-white  space-y-5 flex flex-col justify-center items-center  ">
				<h1 className="font-black text-6xl text-center ">Spotify Swaddle</h1>
				<Cards />
				<SpotifyOAuthButton>
					<button className="bg-accent-500 tracking-tight py-2 px-4 rounded-sm text-white font-bold text-3xl">
						Login
					</button>
				</SpotifyOAuthButton>
			</div>
		</>
	);
}

export default Landing;
