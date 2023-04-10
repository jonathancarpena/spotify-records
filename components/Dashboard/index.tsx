// Utils
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

// Components
import Tracks from './Tracks';
import Artists from './Artists';
import User from './User';
import Sidebar from './Sidebar';
import CreatePlaylist from './CreatePlaylist';
import MobileBrand from './MobileBrand';
import SEO from '../SEO';

// Types
import type { SpotifyTrack, SpotifyArtist } from '../../lib/interfaces';
type Props = {
	code: string;
};

export type MenuOptions = 'Tracks' | 'Artists' | 'Create Playlist';

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
	} | null;
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
	menuOptions: MenuOptions;
};
function Dashboard({ code }: Props) {
	const accessToken = useAuth(code);
	const [user, setUser] = useState<State['user']>(null);
	const [tracks, setTracks] = useState<State['tracks']>(null);
	const [artists, setArtists] = useState<State['artists']>(null);
	const [loading, setLoading] = useState(true);
	const [menu, setMenu] = useState<State['menuOptions']>('Tracks');

	// Fetch Data
	useEffect(() => {
		let ignore = false;
		if (!accessToken) return;

		if (!ignore) {
			ignore = true;

			// USER PROFILE
			fetch('/api/users-profile', { method: 'POST', body: accessToken })
				.then((res) => res.json())
				.then((data) => {
					setUser(data);
				})
				.catch((err) => alert(err));

			// TOP TRACKS
			fetch('/api/top-tracks', { method: 'POST', body: accessToken })
				.then((res) => res.json())
				.then((data) => {
					setTracks(data);
				})
				.catch((err) => alert(err));

			// TOP ARTISTS
			fetch('/api/top-artists', { method: 'POST', body: accessToken })
				.then((res) => res.json())
				.then((data) => {
					setArtists(data);
				})
				.catch((err) => alert(err));

			setLoading(false);
		}
	}, [accessToken]);

	const handleSectionChange = (option: MenuOptions) => setMenu(option);

	return (
		<>
			<SEO
				title={
					user &&
					`${
						menu === 'Create Playlist'
							? 'Spotify Records - Create Playlist 🎶'
							: `${user.name}'s Top ${menu} ${menu === 'Tracks' ? '🎧' : '💖'}`
					}`
				}
			/>
			<div className="flex lg:px-0">
				<MobileBrand />
				<Sidebar
					menu={menu}
					handleMenuChange={handleSectionChange}
					user={user}
				/>
				{menu === 'Tracks' && <Tracks tracks={tracks} loading={loading} />}
				{menu === 'Artists' && <Artists artists={artists} loading={loading} />}
				{menu === 'Create Playlist' && (
					<CreatePlaylist
						tracks={tracks}
						loading={loading}
						accessToken={accessToken}
					/>
				)}
				{user && <User user={user} />}
			</div>
		</>
	);
}

export default Dashboard;
