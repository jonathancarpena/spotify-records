import SpotifyOAuthButton from './SpotifyOAuthButton';
import Cards from './Cards';
import SEO from '../SEO';
import LightModeButton from './LightModeButton';

function Landing() {
	return (
		<>
			<SEO />

			<div className="relative min-h-screen max-h-screen  overflow-hidden md:max-w-7xl md:mx-auto text-black dark:text-white  h-full  justify-center flex flex-col md:w-full mx-5 ">
				<h1 className="font-black text-5xl md:text-6xl text-center tracking-tight ">
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
