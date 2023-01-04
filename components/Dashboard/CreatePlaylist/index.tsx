import React from 'react';
import { SpotifyTrack } from '../../../lib/interfaces';
import Header from '../Header';

type Props = {
	tracks: {
		shortTerm: SpotifyTrack[] | [];
		mediumTerm: SpotifyTrack[] | [];
		longTerm: SpotifyTrack[] | [];
	} | null;
	loading: boolean;
};

function CreatePlaylist({}: Props) {
	return (
		<section className="select-none bg-light-main w-full flex flex-col  max-h-screen overflow-hidden">
			<Header
				title="Create Playlist"
				subheader={'Based on Your Top Tracks'}
				banner="/images/create-playlist.jpg"
			/>
		</section>
	);
}

export default CreatePlaylist;
