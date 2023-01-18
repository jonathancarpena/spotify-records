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
									? ' backdrop-blur-xl backdrop-brightness-90 dark:backdrop-brightness-100 text-black dark:text-white z-40'
									: '-z-0 text-transparent '
							} inset-0 w-screen fixed h-screen transition-all duration-300 block lg:hidden`}
						>
							<button
								disabled={!playlistOpen}
								onClick={() => setPlaylistOpen(!playlistOpen)}
								className="fixed  bottom-14 left-1/2 -translate-x-1/2 "
							>
								Close
							</button>
						</div>
						<div
							className={` mx-0 md:mx-4 lg:mx-5 mt-2 md:pt-0  pb-4 lg:pb-6  flex-0 lg:flex-row lg:space-x-5 flex relative h-full  overflow-hidden`}
						>
							{/* Form */}
							<div className="z-20 w-full  text-black dark:text-white pt-7 px-10 pb-10 lg:p-7 border-t-[1px] border-t-light-secondary dark:border-t-neutral-900 backdrop-blur-md md:bg-white md:dark:bg-[#181818]  md:rounded-lg md:drop-shadow-md  lg:w-max lg:min-w-[400px]">
								<form
									onSubmit={handleSubmit}
									className="flex flex-col h-5/6 md:h-full items-center md:justify-between  "
								>
									{/* Playlist Name */}
									<div className="flex flex-col items-center ">
										<h2 className="text-2xl font-black  flex flex-col items-center text-center  tracking-tight">
											<span>{name.substring(0, 14)}</span>
											<span>{name.substring(14)}</span>
										</h2>
										{/* Playlist Details */}
										<div className="hidden md:flex space-x-1.5 text-xs md:text-sm bg-neutral-500 px-1 md:px-3 py-1 rounded-md bg-opacity-10">
											<span className="font-semibold">
												{tracks[term].length} songs,
											</span>
											<span className="text-light-secondary dark:text-dark-secondary">
												{duration}
											</span>
										</div>
									</div>

									{/* Playlist Cover */}
									<div className="flex-1 grid grid-cols-2 my-5   aspect-square  bg-blue-500">
										{tracks[term].slice(0, 4).map((item, idx) => (
											<div className="relative w-full h-full  aspect-square">
												<Image
													key={`playlist-cover-${term}-${idx}`}
													src={item.album.images[0].url}
													fill
													alt={`top-track-${item.name}-${idx}`}
												/>
											</div>
										))}
									</div>

									{/* Create Button */}
									<div className="flex w-full max-w-[400px] space-x-2 ">
										<button
											onClick={() => setPlaylistOpen(!playlistOpen)}
											type="button"
											className="w-full lg:hidden active:brightness-90 py-2.5 bg-neutral-400 rounded-md text-sm font-bold text-white drop-shadow-md"
										>
											View
										</button>
										<button
											className=" bg-accent-500 w-full  text-white py-2.5 rounded-md lg:hover:brightness-110 lg:hover:scale-105 active:brightness-90 transition-all duration-200   drop-shadow-md "
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
								className={`bg-white bg-opacity-25 dark:bg-white  dark:bg-opacity-10 lg:h-full  lg:top-0 lg:translate-y-0 lg:left-0 lg:translate-x-0 lg:static py-2 lg:py-3 lg:px-2 lg:bg-white lg:dark:bg-[#181818] lg:drop-shadow-md rounded-lg  fixed lg:z-30 ${
									playlistOpen
										? 'top-1/2 -translate-y-1/2 duration-500 delay-75  dark:text-white text-black z-50'
										: 'top-[110%] duration-[400ms] text-transparent '
								}   left-1/2 -translate-x-1/2 w-11/12 transition-all  `}
							>
								<div className="lg:hidden fixed left-1/2 -translate-x-1/2 -top-[6.5rem] w-max flex flex-col items-center space-y-1">
									<h2 className="text-2xl  w-full font-black  flex flex-col items-center text-center   ">
										<span>{name.substring(0, 14)}</span>
										<span>{name.substring(14)}</span>
									</h2>

									<div className=" flex space-x-1.5 text-xs bg-white bg-opacity-25 dark:bg-white dark:bg-opacity-10 px-3 py-1 rounded-md lg:hidden ">
										<span className="font-semibold ">
											{tracks[term].length} songs,
										</span>
										<span className="">{duration}</span>
									</div>
								</div>

								<div className="pr-4  lg:h-full h-[500px] md:h-[600px] overflow-y-auto  scrollbar-thumb-rounded-full lg:scrollbar-thumb-rounded-none scrollbar-thin  dark:scrollbar-thumb-dark-menuHover scrollbar-thumb-light-menuHover  scrollbar-track-transparent">
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
												name: item.album.name,
												url: item.album.external_urls.spotify,
											}}
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
