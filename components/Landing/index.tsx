import React from 'react';
import SpotifyOAuthButton from '../SpotifyOAuthButton';

import SEO from '../SEO';

function Landing() {
	return (
		<>
			<SEO />
			<div className="relative min-h-screen min-w-screen dark:bg-dark-main bg-light-main text-black dark:text-white flex flex-col items-center  py-20">
				<div className="dark:bg-dark-menu bg-light-menu p-10 rounded-md drop-shadow-md">
					<h1>Spotfiy Swaddle</h1>
					<SpotifyOAuthButton />
				</div>
			</div>
		</>
	);
}

export default Landing;
