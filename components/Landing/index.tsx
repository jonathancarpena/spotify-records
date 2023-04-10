// Components
import SEO from '../SEO';
import SpotifyOAuthButton from './SpotifyOAuthButton';
import Cards from './Cards';
import { BsSpotify } from 'react-icons/bs';

function Landing() {
	return (
		<>
			<SEO />

			{/* Title */}
			<h1 className="space-x-2 flex items-center justify-center font-black text-5xl  md:text-6xl text-center tracking-tight select-none">
				<span className="text-accent-500 text-6xl md:text-7xl">
					<BsSpotify />
				</span>
				<span>Records</span>
			</h1>
			<Cards />
			<SpotifyOAuthButton />
		</>
	);
}

export default Landing;
