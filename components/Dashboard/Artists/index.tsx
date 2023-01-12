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
		<section className=" select-none bg-light-main dark:bg-dark-main w-full flex flex-col  max-h-screen overflow-hidden relative  ">
			<Header
				term={term}
				setTerm={setTerm}
				title="top artists"
				banner="bg-artists"
			/>

			{/* Artist Data */}
			<>
				{loading ? (
					<h3>Loading...</h3>
				) : artists && artists[term].length > 0 ? (
					<ul className=" pt-2 z-50 grid  grid-cols-[repeat(auto-fill,_minmax(250px,250px))] grid-flow-dense gap-5  px-5  pb-7 relative h-full  overflow-auto scrollbar-thumb-rounded-full scrollbar-thin  dark:scrollbar-thumb-dark-menuHover scrollbar-thumb-light-menuHover  scrollbar-track-transparent">
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
		</section>
	);
}

export default Artists;
