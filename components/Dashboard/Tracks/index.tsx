import { useState } from 'react';
import { SpotifyTrack, Terms } from '../../../lib/interfaces';
import { convertMsToMinutesSeconds } from '../../../lib/utils';
import { AiOutlineClockCircle } from 'react-icons/ai';
import SingleTrack from './SingleTrack';
import Image from 'next/image';
import Header from '../Header';

type Props = {
	tracks: {
		shortTerm: SpotifyTrack[] | [];
		mediumTerm: SpotifyTrack[] | [];
		longTerm: SpotifyTrack[] | [];
	} | null;
	loading: boolean;
};

type State = {
	term: Terms;
};

function Tracks({ tracks, loading }: Props) {
	const [term, setTerm] = useState<State['term']>('shortTerm');

	return (
		<section className="select-none bg-light-main dark:bg-dark-main w-full flex flex-col  max-h-screen overflow-hidden">
			<Header
				term={term}
				setTerm={setTerm}
				title="top tracks"
				banner="bg-tracks"
			/>

			{/* Track Data */}
			<>
				{loading ? (
					<h3>Loading..</h3>
				) : tracks && tracks[term].length > 0 ? (
					<div className="  flex flex-col h-full overflow-hidden z-20 ">
						{/* Table Header */}
						<div className=" w-full pt-4 md:pt-2 flex-col ">
							<div className=" text-light-secondary  dark:text-dark-secondary  pl-1.5  md:pl-0 grid gap-4 grid-cols-5 place-items-center justify-items-start  md:mx-4 lg:mx-5 border-b-[1px] border-t-dark-secondary  pb-2 text-xs md:text-sm  font-semibold uppercase ">
								<div className="flex col-span-4 lg:col-span-2">
									<span className="flex w-[35px] md:w-[50px] lg:w-[55px] justify-center items-center">
										#
									</span>
									<span>Title</span>
								</div>

								<span className="hidden lg:inline col-span-2">Album</span>

								<AiOutlineClockCircle className="text-lg justify-self-end mr-5 lg:mr-9   col-span-1 w-[45px] md:w-[55px]" />
							</div>
						</div>

						<div className="backdrop-blur-md pt-2  pb-20 md:pb-4 lg:pb-7 relative h-full overflow-auto  scrollbar-thin  dark:scrollbar-thumb-dark-menuHover scrollbar-thumb-light-menuHover  scrollbar-track-transparent ">
							{/* Tracks */}
							<ul className="  flex flex-col text-secondary-light w-full pl-1.5 pr-3.5 md:pl-5 md:pr-7">
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
							</ul>
						</div>
					</div>
				) : (
					<h3>No Track Data</h3>
				)}
			</>
		</section>
	);
}

export default Tracks;
