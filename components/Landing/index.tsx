import SpotifyOAuthButton from './SpotifyOAuthButton';
import Cards from './Cards';
import SEO from '../SEO';
import LightModeButton from './LightModeButton';

function Landing() {
	return (
		<>
			<SEO />

			<div className="relative min-h-screen min-w-screen overflow-hidden dark:bg-dark-mainHover bg-light-main text-black dark:text-white   flex flex-col justify-center items-center ">
				<h1 className="font-black text-6xl text-center mb-5 ">
					Spotify Swaddle
				</h1>
				<Cards />
				<LightModeButton />
				<SpotifyOAuthButton />
			</div>
		</>
	);
}

export default Landing;
