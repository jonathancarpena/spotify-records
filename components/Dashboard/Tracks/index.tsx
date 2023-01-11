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
				banner="/images/tracks.jpg"
			/>

			{/* Track Data */}
			<>
				{loading ? (
					<h3>Loading..</h3>
				) : tracks && tracks[term].length > 0 ? (
					<div className=" flex-0  pb-7 relative h-full  overflow-auto scrollbar-thumb-rounded-full scrollbar-thin  dark:scrollbar-thumb-dark-menuHover scrollbar-thumb-light-menuHover  scrollbar-track-transparent">
						{/* Table Header */}
						<div className=" sticky top-0   flex-col">
							<div className=" pt-6 text-light-secondary bg-white dark:text-dark-secondary dark:bg-[#090909] px-5 grid grid-flow-col gap-5 auto-cols-fr  place-items-center justify-items-start pb-2 text-sm  font-semibold uppercase border-b-[1px] border-b-light-secondary dark:border-b-dark-secondary  ">
								<div className="flex">
									<span className="flex w-[55px] justify-center items-center">
										#
									</span>
									<span>Title</span>
								</div>

								<span>Album</span>

								<AiOutlineClockCircle className="text-lg justify-self-end mr-12" />
							</div>
							<div className="bg-gradient-to-b from-white dark:from-[#090909] to-transparent  w-full h-[50px]"></div>
						</div>

						{/* Tracks */}
						<ul className=" -mt-6 flex flex-col text-secondary-light w-full px-5">
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
				) : (
					<h3>No Track Data</h3>
				)}
			</>
		</section>
	);
}

export default Tracks;
