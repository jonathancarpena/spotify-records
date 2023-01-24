import Link from 'next/link';
import Button from '../Button';
import { BsSpotify } from 'react-icons/bs';

function SpotifyOAuthButton() {
	const ENDPOINT = 'https://accounts.spotify.com/authorize';
	const SCOPES = [
		'playlist-read-private',
		'playlist-modify-private',
		'playlist-modify-public',
		'user-library-read',
		'user-library-modify',
		'user-read-currently-playing',
		'user-read-playback-state',
		'user-read-recently-played',
		'user-read-private',
		'user-top-read',
		'user-read-email',
	];
	const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
	const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;

	let SCOPE_PARAM = SCOPES.join('%20');
	const LOGIN_LINK = `${ENDPOINT}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${SCOPE_PARAM}&response_type=code&show_dialog=true`;
	return (
		<Link href={LOGIN_LINK} className="mx-auto w-full max-w-sm  ">
			<Button
				sx="relative text-xl md:text-2xl w-full font-bold drop-shadow-lg dark:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
				color="bg-neutral-200 dark:bg-neutral-600 border-[1px] border-light-mainHover dark:border-0"
			>
				<BsSpotify className="mr-2 text-accent-500 " />
				<span className="dark:text-white text-dark-mainHover">LOGIN</span>
			</Button>
		</Link>
	);
}

export default SpotifyOAuthButton;
