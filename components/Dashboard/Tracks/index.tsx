// Utils
import { useState } from 'react';
import { convertMsToMinutesSeconds } from '../../../lib/utils';

// Components
import SectionHeader from '../SectionHeader';
import SingleTrack from './SingleTrack';
import Loading from '../../Loading';
import { AiOutlineClockCircle } from 'react-icons/ai';

// Types
import type { SpotifyTrack, Terms } from '../../../lib/interfaces';

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
		<section className="select-none bg-light-main dark:bg-dark-main w-full flex flex-col  max-h-screen min-h-screen overflow-hidden">
			<SectionHeader
				term={term}
				setTerm={setTerm}
				title="top tracks"
				img="tracks.jpg"
			/>

			{/* Track Data */}
			<div className="  relative flex flex-col overflow-hidden z-20 ">
				{loading ? (
					<Loading sx="mt-10" />
				) : tracks && tracks[term].length > 0 ? (
					<>
						{/* Table SectionHeader */}
						<div className=" w-full pt-4 md:pt-2 flex-col ">
							<div className=" text-white dark:text-neutral-200 pl-1.5  md:pl-0 grid gap-4 grid-cols-5 place-items-center justify-items-start  md:mx-4 lg:mx-5 border-b-[1px] border-t-dark-secondary  pb-2 text-xs md:text-sm  font-semibold uppercase ">
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
							<ul className="flex flex-col text-secondary-light w-full pl-1.5 pr-3.5 md:pl-5 md:pr-7">
								{tracks[term].map((item, idx) => (
									<SingleTrack
										key={`${term}-track-${item.id}`}
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
					</>
				) : (
					<h3 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-5xl font-bold text-light-secondary dark:text-dark-mainActive mt-10 w-max">
						No Track Data
					</h3>
				)}
			</div>
		</section>
	);
}

export default Tracks;
