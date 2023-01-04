import { useState } from 'react';
import { SpotifyArtist, Terms } from '../../../lib/interfaces';
import Link from 'next/link';
import Header from '../Header';
import SingleArtist from './SingleArtist';

type Props = {
	artists: {
		shortTerm: SpotifyArtist[] | [];
		mediumTerm: SpotifyArtist[] | [];
		longTerm: SpotifyArtist[] | [];
	} | null;
	loading: boolean;
};

type State = {
	term: Terms;
};

function Artists({ artists, loading }: Props) {
	const [term, setTerm] = useState<State['term']>('shortTerm');
	console.log(artists);
	return (
		<section className="select-none bg-light-main w-full flex flex-col  max-h-screen overflow-hidden relative ">
			<Header
				term={term}
				setTerm={setTerm}
				title="top artists"
				banner="/images/artists.jpg"
			/>

			{/* Artist Data */}
			<>
				{loading ? (
					<h3>Loading...</h3>
				) : artists && artists[term].length > 0 ? (
					<ul className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] grid-flow-dense gap-5  px-5 pt-6 pb-7 relative h-full  overflow-auto scrollbar-thumb-rounded-full scrollbar-thin  scrollbar-thumb-dark-main  scrollbar-track-transparent">
						{artists[term].map((item, idx) => (
							<SingleArtist
								key={`${term}-artist-${idx}`}
								idx={idx + 1}
								name={item.name}
								external_urls={item.external_urls}
								followers={item.followers}
								genres={item.genres}
								id={item.id}
								images={item.images}
								popularity={item.popularity}
							/>
						))}
					</ul>
				) : (
					<span>No Artist Data</span>
				)}
			</>
			{/* <ul className="flex space-x-4 mb-2">
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
			)} */}
		</section>
	);
}

export default Artists;
