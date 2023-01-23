import Link from 'next/link';
import Button from './Button';

type Props = {
	children?: JSX.Element | JSX.Element[] | React.ReactNode;
};

function SpotifyOAuthButton({ children }: Props) {
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
		<Link href={LOGIN_LINK}>
			<Button sx="relative text-2xl">Login</Button>
		</Link>
	);
}

export default SpotifyOAuthButton;
