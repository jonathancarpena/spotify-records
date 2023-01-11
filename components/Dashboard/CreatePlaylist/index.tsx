import React, { useState, useEffect, useRef } from 'react';
import { SpotifyTrack, Terms } from '../../../lib/interfaces';
import Header from '../Header';
import Image from 'next/image';
import moment from 'moment';
import SingleTrack from '../Tracks/SingleTrack';
import {
	convertMsToMinutesSeconds,
	generatePlaylistDuration,
} from '../../../lib/utils';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
		`Your Top Songs ${moment()
			.subtract(4, 'weeks')
			.format('MMM YYYY')} - ${moment().format('MMM YYYY')}`
	);
	const [duration, setDuration] = useState(() => {
		if (tracks) {
			if (tracks[term].length > 0) {
				return generatePlaylistDuration(tracks[term]);
			} else {
				return '0:00';
			}
		}
	});
	const [createLoading, setCreateLoading] = useState(false);

	const prevTerm = useRef(term);
	const today = moment();
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setCreateLoading(true);
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
					setCreateLoading(false);
				})
				.catch((err) => {
					alert(err);
					setCreateLoading(false);
				});
		}
		// setCreateLoading(false);
	}

	useEffect(() => {
		if (prevTerm.current !== term) {
			prevTerm.current = term;
			let newName = 'Your Top Songs ';
			let timeframe = '';

			if (term === 'shortTerm') {
				const before = moment().subtract(4, 'weeks');
				timeframe = ` ${before.format('MMM YYYY')} - ${today.format(
					'MMM YYYY'
				)}`;
			} else if (term === 'mediumTerm') {
				const before = moment().subtract(6, 'months');
				timeframe = ` ${before.format('MMM YYYY')} - ${today.format(
					'MMM YYYY'
				)}`;
			} else {
				timeframe = 'of All Time';
			}
			setName(newName + timeframe);
			if (tracks) {
				setDuration(generatePlaylistDuration(tracks[term]));
			}
		}
	}, [term]);

	return (
		<section className="select-none bg-light-main dark:bg-dark-main w-full flex flex-col  max-h-screen overflow-hidden">
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
					<div className=" mx-5 mt-6 pb-6 flex-0 space-x-5 flex relative h-full  overflow-hidden">
						{/* Form */}
						<div className=" text-black dark:text-white bg-white dark:bg-[#181818]  p-7 rounded-lg drop-shadow-md  min-w-[400px] ">
							<form
								onSubmit={handleSubmit}
								className="flex flex-col items-center h-full justify-between"
							>
								{/* Playlist Name */}
								<div className=" flex flex-col items-center">
									<h2 className="text-2xl font-black  flex flex-col items-center text-center mb-2 tracking-tight">
										<span>{name.substring(0, 14)}</span>
										<span>{name.substring(14)}</span>
									</h2>
									{/* Playlist Details */}
									<div className="flex space-x-1.5 text-sm bg-neutral-500 px-3 py-1 rounded-md bg-opacity-10">
										<span className="font-semibold">
											{tracks[term].length} songs,
										</span>
										<span className="text-light-secondary dark:text-dark-secondary">
											{duration}
										</span>
									</div>
								</div>

								{/* Playlist Cover */}
								<div className="grid grid-cols-2">
									{tracks[term].slice(0, 4).map((item, idx) => (
										<Image
											key={`playlist-cover-${term}-${idx}`}
											src={item.album.images[0].url}
											width={150}
											height={150}
											alt={`top-track-${item.name}-${idx}`}
										/>
									))}
								</div>

								<button
									className="bg-accent-500 w-full text-white py-2.5 rounded-md hover:brightness-110 hover:scale-105 active:brightness-90 transition-all duration-200   drop-shadow-md "
									type="submit"
								>
									{createLoading ? (
										<AiOutlineLoading3Quarters className="mx-auto text-2xl animate-spin" />
									) : (
										<span className="text-sm font-bold">Create</span>
									)}
								</button>
							</form>
						</div>

						{/* Tracklist */}
						<div className="py-3 px-2 bg-white dark:bg-[#181818] drop-shadow-md rounded-lg ">
							<div className="pr-4 pl-1  h-full  overflow-y-auto  scrollbar-thumb-rounded-full scrollbar-thin  dark:scrollbar-thumb-dark-menuHover scrollbar-thumb-light-menuHover  scrollbar-track-transparent">
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
