import { useState } from 'react';
import { SpotifyArtist, Terms } from '../../../lib/interfaces';
import Header from '../Header';
import SingleArtist from './SingleArtist';
import Loading from '../../Loading';

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
					<div className="relative flex flex-col h-full overflow-hidden z-20">
						<Loading sx="mt-10" />
					</div>
				) : artists && artists[term].length > 0 ? (
					<ul className=" z-20 mt-2  flex flex-col    md:grid md:grid-flow-dense md:grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] md:auto-rows-auto md:gap-5  md:px-4 lg:px-5   pb-20 md:pb-4 lg:pb-7  relative h-full  overflow-auto  scrollbar-thin  dark:scrollbar-thumb-dark-menuHover scrollbar-thumb-light-menuHover  scrollbar-track-transparent">
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
					<h3 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-5xl font-bold text-light-secondary dark:text-dark-mainActive mt-10 w-max">
						No Track Data
					</h3>
				)}
			</>
		</section>
	);
}

export default Artists;
