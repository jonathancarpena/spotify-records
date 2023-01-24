import SpotifyOAuthButton from './SpotifyOAuthButton';
import Cards from './Cards';
import SEO from '../SEO';

function Landing() {
	return (
		<>
			<SEO />
			<h1 className="font-black text-5xl  md:text-6xl text-center tracking-tight ">
				Spotify Swaddle
			</h1>
			<Cards />
			<SpotifyOAuthButton />
		</>
	);
}

export default Landing;
