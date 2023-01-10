import React, { useState, useEffect, useRef } from 'react';
import { SpotifyTrack, Terms } from '../../../lib/interfaces';
import Header from '../Header';
import Image from 'next/image';
import moment from 'moment';
import SingleTrack from '../Tracks/SingleTrack';
import { convertMsToMinutesSeconds } from '../../../lib/utils';

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
	const [name, setName] = useState(
		`Top Songs from ${moment()
			.subtract(4, 'weeks')
			.format('MMM YYYY')} - ${moment().format('MMM YYYY')}`
	);

	const prevTerm = useRef(term);
	const today = moment(Date.now());
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// TOP TRACKS
		if (tracks) {
			fetch('/api/create-playlist', {
				method: 'POST',
				body: JSON.stringify({
					accessToken,
					name,
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

	useEffect(() => {
		if (prevTerm.current !== term) {
			prevTerm.current = term;
			let newName = 'Top Songs ';
			let timeframe = '';

			if (term === 'shortTerm') {
				const before = moment().subtract(4, 'weeks');
				timeframe = `from ${before.format('MMM YYYY')} - ${today.format(
					'MMM YYYY'
				)}`;
			} else if (term === 'mediumTerm') {
				const before = moment().subtract(6, 'months');
				timeframe = `from ${before.format('MMM YYYY')} - ${today.format(
					'MMM YYYY'
				)}`;
			} else {
				timeframe = 'of All Time';
			}
			setName(newName + timeframe);
		}
	}, [term]);

	return (
		<section className="select-none bg-light-main w-full flex flex-col  max-h-screen overflow-hidden">
			<Header
				title="Create Playlist"
				term={term}
				setTerm={setTerm}
				banner="/images/create-playlist.jpg"
			/>
			{/* Track Data */}
			<>
				{loading ? (
					<h3>Loading..</h3>
				) : tracks && tracks[term].length > 0 ? (
					<div className=" m-7 flex-0 space-x-3 flex pb-7 relative h-full  overflow-hidden ">
						{/* Form */}
						<div className=" max-w-4xl bg-white  p-7 rounded-xl drop-shadow-md   ">
							<form
								onSubmit={handleSubmit}
								className="flex flex-col items-center justify-evenly"
							>
								{/* Playlist Cover */}

								<h2 className="text-4xl font-bold mb-5">{name}</h2>
								<div className="grid grid-cols-2">
									{tracks[term].slice(0, 4).map((item, idx) => (
										<Image
											key={`playlist-cover-${term}-${idx}`}
											src={item.album.images[0].url}
											width={125}
											height={125}
											alt={`top-track-${item.name}-${idx}`}
										/>
									))}
								</div>

								<button
									className="bg-accent-500 w-1/2 text-white py-5 rounded-md"
									type="submit"
								>
									Create
								</button>
							</form>
						</div>

						{/* Tracklist */}
						<div className="py-7 bg-white drop-shadow-md rounded-xl max-w-4xl">
							<div className=" px-7 bg-white  h-full  overflow-y-auto overflow-x-hidden scrollbar-thumb-rounded-full scrollbar-thin  scrollbar-thumb-dark-main  scrollbar-track-transparent">
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
										image={item.album.images[0].url}
										songTitle={item.name}
										songDuration={convertMsToMinutesSeconds(item.duration_ms)}
										spotifyUrl={item.external_urls.spotify}
										previewUrl={item.preview_url}
										explicit={item.explicit}
									/>
								))}
							</div>
						</div>
					</div>
				) : (
					<h3>No Track Data</h3>
				)}
			</>
		</section>
	);
}

export default CreatePlaylist;
