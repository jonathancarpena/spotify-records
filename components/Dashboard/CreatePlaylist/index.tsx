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
	const [playlistOpen, setPlaylistOpen] = useState(false);

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
		<section className="select-none bg-light-main dark:bg-dark-main w-full flex flex-col  min-h-screen md:max-h-screen overflow-hidden">
			<Header
				title="Create Playlist"
				term={term}
				setTerm={setTerm}
				banner="bg-create-playlist"
			/>
			{/* Track Data */}
			<>
				{loading ? (
					<h3>Loading..</h3>
				) : tracks && tracks[term].length > 0 ? (
					<>
						{/* Blur Overlay */}
						<div
							className={`${
								playlistOpen
									? ' backdrop-blur-xl text-white z-50'
									: '-z-20 text-transparent '
							} inset-0 w-screen fixed h-screen transition-all duration-200`}
						>
							<button
								disabled={!playlistOpen}
								onClick={() => setPlaylistOpen(!playlistOpen)}
								className="fixed  bottom-10 left-1/2 -translate-x-1/2 "
							>
								Close
							</button>
						</div>
						<div
							className={`z-20 md:mx-5 mt-2 md:pt-0 md:mt-6 md:pb-6 pb-16 flex-0   md:flex-row md:space-x-5 flex relative md:h-full  overflow-hidden`}
						>
							{/* Form */}
							<div className=" min-w-[300px]  text-black dark:text-white  rounded-lg md:mx-0 mx-auto p-7 bg-white dark:bg-[#181818]  md:rounded-lg drop-shadow-md  md:w-max md:min-w-[400px] ">
								<form
									onSubmit={handleSubmit}
									className="flex flex-col h-full items-center justify-between "
								>
									{/* Playlist Name */}
									<div className="  flex flex-col items-center ">
										<h2 className="text-lg md:text-2xl font-black  flex flex-col items-center text-center mb-2 tracking-tight">
											<span>{name.substring(0, 14)}</span>
											<span>{name.substring(14)}</span>
										</h2>
										{/* Playlist Details */}
										<div className="flex space-x-1.5 text-xs md:text-sm bg-neutral-500 px-1 md:px-3 py-1 rounded-md bg-opacity-10">
											<span className="font-semibold">
												{tracks[term].length} songs,
											</span>
											<span className="text-light-secondary dark:text-dark-secondary">
												{duration}
											</span>
										</div>
									</div>

									{/* Playlist Cover */}
									<div className="grid grid-cols-2 my-5 ">
										{tracks[term].slice(0, 4).map((item, idx) => (
											<div className="relative h-[100px] w-[100px] md:w-[150px] md:h-[150px]">
												<Image
													key={`playlist-cover-${term}-${idx}`}
													src={item.album.images[0].url}
													fill
													alt={`top-track-${item.name}-${idx}`}
												/>
											</div>
										))}
									</div>

									<div className="flex w-full space-x-2 ">
										<button
											onClick={() => setPlaylistOpen(!playlistOpen)}
											type="button"
											className="w-full md:hidden py-2.5 bg-neutral-400 rounded-md text-sm font-bold text-white drop-shadow-md"
										>
											View
										</button>
										<button
											className=" bg-accent-500 w-full  text-white py-2.5 rounded-md md:hover:brightness-110 md:hover:scale-105 md:active:brightness-90 transition-all duration-200   drop-shadow-md "
											type="submit"
										>
											{createLoading ? (
												<AiOutlineLoading3Quarters className="mx-auto text-2xl animate-spin" />
											) : (
												<span className="text-sm font-bold">Create</span>
											)}
										</button>
									</div>
								</form>
							</div>

							{/* Tracklist */}
							<div
								className={`md:h-full md:static md:py-3 md:px-2 md:bg-white md:dark:bg-[#181818] drop-shadow-md rounded-lg transition-all duration-300 `}
							>
								<div className="pr-4 absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2 w-11/12 h-[500px] md:h-full  overflow-y-auto  scrollbar-thumb-rounded-full scrollbar-thin  dark:scrollbar-thumb-dark-menuHover scrollbar-thumb-light-menuHover  scrollbar-track-transparent">
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
					</>
				) : (
					<h3>No Track Data</h3>
				)}
			</>
		</section>
	);
}

export default CreatePlaylist;
