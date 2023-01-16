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
					<div className="  flex flex-col h-full overflow-hidden z-50 ">
						{/* Table Header */}
						<div className=" w-full pt-4 md:pt-2 flex-col ">
							<div className=" text-light-secondary  dark:text-dark-secondary  pl-1.5 pr-3.5 md:pl-5 md:pr-7 grid grid-flow-col gap-5 auto-cols-fr  place-items-center justify-items-start pb-2 text-xs md:text-sm  font-semibold uppercase ">
								<div className="flex">
									<span className="flex w-[35px] md:w-[55px] justify-center items-center">
										#
									</span>
									<span>Title</span>
								</div>

								<span className="hidden md:inline">Album</span>

								<AiOutlineClockCircle className="text-lg justify-self-end mr-4 md:mr-10 " />
							</div>
						</div>

						<div className="backdrop-blur-md pt-2 md:pb-7 pb-20  relative h-full overflow-auto scrollbar-thumb-rounded-full scrollbar-thin  dark:scrollbar-thumb-dark-menuHover scrollbar-thumb-light-menuHover  scrollbar-track-transparent border-t-[1px] border-t-dark-secondary">
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
