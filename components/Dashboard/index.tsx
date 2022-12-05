import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import Tracks from './Tracks';
import Artists from './Artists';
import { SpotifyTrack, SpotifyArtist } from '../../lib/interfaces';

type Props = {
	code: string;
};

type State = {
	user: {
		name: string;
		email: string;
		country: string;
		premium: boolean;
		url: string;
		followers: number;
		img?: {
			url: string;
			height: number;
			width: number;
		};
	};
	tracks: {
		shortTerm: SpotifyTrack[] | [];
		mediumTerm: SpotifyTrack[] | [];
		longTerm: SpotifyTrack[] | [];
	} | null;
	artists: {
		shortTerm: SpotifyArtist[] | [];
		mediumTerm: SpotifyArtist[] | [];
		longTerm: SpotifyArtist[] | [];
	} | null;
};
function Dashboard({ code }: Props) {
	const accessToken = useAuth(code);
	const [user, setUser] = useState<State['user']>();
	const [tracks, setTracks] = useState<State['tracks']>(null);
	const [artists, setArtists] = useState<State['artists']>();
	const [loading, setLoading] = useState(true);

	// USER PROFILE
	useEffect(() => {
		let ignore = false;
		if (!accessToken) return;

		if (!ignore) {
			ignore = true;

			// USER PROFILE
			fetch('/api/users-profile', { method: 'POST', body: accessToken })
				.then((res) => res.json())
				.then((data) => setUser(data))
				.catch((err) => alert(err));

			// TOP TRACKS
			fetch('/api/top-tracks', { method: 'POST', body: accessToken })
				.then((res) => res.json())
				.then((data) => setTracks(data))
				.catch((err) => alert(err));

			// TOP ARTISTS
			fetch('/api/top-artists', { method: 'POST', body: accessToken })
				.then((res) => res.json())
				.then((data) => setArtists(data))
				.catch((err) => alert(err));

			setLoading(false);
		}
	}, [accessToken]);

	if (loading) return <h1>Loading...</h1>;
	return (
		<div className="flex flex-col space-y-10 p-20">
			{user && (
				<div className="text-black ">
					<p>{user.premium ? 'Premium User' : 'Spotify User'}</p>
					<p>Email: {user.email}</p>
					<p>Username: {user.name}</p>
					<p>Followers: {user.followers}</p>
					<Link href={user.url} target="_blank">
						Open in Spotify
					</Link>
				</div>
			)}

			{tracks && <Tracks tracks={tracks} />}
			{artists && <Artists artists={artists} />}
		</div>
	);
}

export default Dashboard;
