import { useState } from 'react';
import { SpotifyTrack, Terms } from '../../../lib/interfaces';
import Header from '../Header';

type Props = {
	tracks: {
		shortTerm: SpotifyTrack[] | [];
		mediumTerm: SpotifyTrack[] | [];
		longTerm: SpotifyTrack[] | [];
	} | null;
	loading: boolean;
	accessToken: string | undefined;
};
type State = {
	term: Terms;
};

function CreatePlaylist({ tracks, loading, accessToken }: Props) {
	const [term, setTerm] = useState<State['term']>('shortTerm');
	const [name, setName] = useState('Your Top Songs ');
	const [description, setDescription] = useState('');
	const [visible, setVisible] = useState(false);

	function createPlaylist() {
		// TOP TRACKS
		if (tracks) {
			fetch('/api/create-playlist', {
				method: 'POST',
				body: JSON.stringify({
					accessToken,
					name,
					description,
					visible,
					tracks: tracks[term],
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					alert(data);
				})
				.catch((err) => alert(err));
		}
	}
	return (
		<section className="select-none bg-light-main w-full flex flex-col  max-h-screen overflow-hidden">
			<Header
				title="Create Playlist"
				subheader={'Based on Your Top Tracks'}
				banner="/images/create-playlist.jpg"
			/>
			{/* Track Data */}
			<>
				{loading ? (
					<h3>Loading..</h3>
				) : tracks && tracks[term].length > 0 ? (
					<div className=" flex-0  pb-7 relative h-full  overflow-auto scrollbar-thumb-rounded-full scrollbar-thin  scrollbar-thumb-dark-main  scrollbar-track-transparent">
						{/* Table Header */}
						<button onClick={() => createPlaylist('test')}>Create</button>
						{/* Tracks */}
						{/* <ul className=" -mt-6 flex flex-col text-secondary-light w-full px-5">
							{tracks[term].map((item, idx) => (
								<SingleTrack
									key={`${term}-track-${idx}`}
									idx={idx + 1}
									artists={item.artists.map((artist: any) => {
										return {
											name: artist.name,
											url: artist.external_urls.spotify,
										};
									})}
									album={{
										image: item.album.images[0].url,
										name: item.album.name,
										url: item.album.external_urls.spotify,
									}}
									songTitle={item.name}
									songDuration={convertMsToMinutesSeconds(item.duration_ms)}
									spotifyUrl={item.external_urls.spotify}
									previewUrl={item.preview_url}
									explicit={item.explicit}
								/>
							))}
						</ul> */}
					</div>
				) : (
					<h3>No Track Data</h3>
				)}
			</>
		</section>
	);
}

export default CreatePlaylist;
