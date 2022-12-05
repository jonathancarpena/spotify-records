import { useState } from 'react';
import { SpotifyArtist, Terms } from '../../../lib/interfaces';
import Link from 'next/link';

type Props = {
	artists: {
		shortTerm: SpotifyArtist[] | [];
		mediumTerm: SpotifyArtist[] | [];
		longTerm: SpotifyArtist[] | [];
	};
};

type State = {
	term: Terms;
};

type TermOptions = {
	value: Terms;
	placeholder: string;
};

function Artists({ artists }: Props) {
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
		<div className="ml-5 flex flex-col ">
			<h1 className="font-semibold text-lg">Top Artists</h1>
			<ul className="flex space-x-4 mb-2">
				{termOptions.map((item, idx) => (
					<button
						key={idx}
						onClick={() => {
							setTerm(item.value);
						}}
						disabled={term === item.value}
						className={`${
							term === item.value ? 'bg-accent-500' : 'bg-slate-500'
						} px-3 py-1  rounded-lg text-white`}
					>
						{item.placeholder}
					</button>
				))}
			</ul>

			{artists[term].length > 0 ? (
				<ul className="flex flex-col space-y-2">
					{artists[term].map((item, idx) => (
						<div
							key={`${term}-artist-${idx}`}
							className="flex space-x-1 text-xs"
						>
							<span>{item.name}</span>
							<span>{item.genres[0]}</span>
							<Link href={item.external_urls.spotify} target="_blank">
								Open On Spotify
							</Link>
						</div>
					))}
				</ul>
			) : (
				<h1>No Artist Data</h1>
			)}
		</div>
	);
}

export default Artists;
