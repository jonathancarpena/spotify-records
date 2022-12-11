import { useState } from 'react';
import { SpotifyTrack, Terms } from '../../../lib/interfaces';
import { convertMsToMinutesSeconds } from '../../../lib/utils';
import { AiOutlineClockCircle } from 'react-icons/ai';
import SingleTrack from './SingleTrack';

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

type TermOptions = {
	value: Terms;
	placeholder: string;
};
function Tracks({ tracks, loading }: Props) {
	const [term, setTerm] = useState<State['term']>('shortTerm');

	const termOptions: TermOptions[] = [
		{
			value: 'shortTerm',
			placeholder: 'Last 4 Weeks',
		},
		{
			value: 'mediumTerm',
			placeholder: 'Last 6 Months',
		},
		{
			value: 'longTerm',
			placeholder: 'All Time',
		},
	];
	return (
		<section className="select-none bg-light-main  w-full">
			<div className=" flex flex-col justify-end h-96   p-10 relative bg-red-500">
				<h2 className="text-black text-8xl font-black z-30">Top Tracks</h2>
				{/* Term Selection */}
				<ul className="flex space-x-4 mt-5 z-30">
					{termOptions.map((item, idx) => (
						<button
							key={idx}
							onClick={() => {
								setTerm(item.value);
							}}
							disabled={term === item.value}
							className={`${
								term === item.value ? 'bg-accent-500' : 'bg-neutral-400'
							} px-3 py-1  rounded-lg text-white`}
						>
							{item.placeholder}
						</button>
					))}
				</ul>
			</div>

			{/* Track Data */}
			<>
				{loading ? (
					<h3>Loading..</h3>
				) : tracks && tracks[term].length > 0 ? (
					<div className="max-w-[1500px] p-8  ">
						<div className=" grid grid-cols-[50px_minmax(350px,1fr)_1fr_0.5fr]  place-items-center justify-items-start pb-2 text-sm  font-semibold uppercase border-b-2 border-b-black ">
							<span className="flex w-full justify-center items-center">#</span>
							<span>Title</span>
							<span>Album</span>

							<AiOutlineClockCircle className="text-lg" />
						</div>
						<ul className="mt-3 flex flex-col  text-secondary-light  overflow-scroll  scrollbar-thumb-rounded-full scrollbar-thin  scrollbar-thumb-black  scrollbar-track-transparent relative  w-full ">
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
