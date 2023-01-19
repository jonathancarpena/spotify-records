import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import Tracks from './Tracks';
import Artists from './Artists';
import User from './User';
import { SpotifyTrack, SpotifyArtist } from '../../lib/interfaces';
import Sidebar from './Sidebar';
import CreatePlaylist from './CreatePlaylist';
import MobileHeader from './MobileHeader';
import SEO from '../SEO';

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

	// USER PROFILE
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

	function handleMenuChange(option: MenuOptions) {
		setMenu(option);
	}

	return (
		<>
			<SEO
				title={
					user &&
					`${
						menu === 'Create Playlist'
							? 'Spotify Swaddle - Create Playlist'
							: `${user.name}'s Top ${menu}`
					}`
				}
			/>
			<div className=" flex lg:px-0">
				<MobileHeader />
				<Sidebar menu={menu} handleMenuChange={handleMenuChange} user={user} />
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
