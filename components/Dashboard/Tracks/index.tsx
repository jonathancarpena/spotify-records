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
	};
};

type State = {
	term: Terms;
};

type TermOptions = {
	value: Terms;
	placeholder: string;
};
function Tracks({ tracks }: Props) {
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
		<section className="select-none">
			<div className="flex items-end justify-between">
				<h2 className="text-black text-8xl font-black mb-2  ">Top Tracks</h2>
				{/* Term Selection */}
				<ul className="flex space-x-4 mb-2">
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
			{tracks[term].length > 0 ? (
				<div>
					<div className=" bg-light-main grid grid-cols-[50px_500px_500px_auto_auto]  place-items-center justify-items-start  py-2 text-sm  font-semibold uppercase border-b-2 border-b-black ">
						<span className="flex w-full justify-center items-center">#</span>
						<span>Title</span>
						<span>Album</span>

						<AiOutlineClockCircle className="text-lg" />
					</div>
					<ul className="mt-3 flex flex-col  text-secondary-light h-[500px] overflow-auto  scrollbar-thumb-rounded-full scrollbar-thin  scrollbar-thumb-black  scrollbar-track-transparent relative ">
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
		</section>
	);
}

export default Tracks;
