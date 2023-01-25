import React from 'react';
import Card from './Card';
import Carousel from '../../Carousel';
import Image from 'next/image';

interface Card {
	title: string;
	description: string;
	image: string;
}
function Cards() {
	const cards: Card[] = [
		{
			title: 'sign in with spotify',
			description:
				'Only works with Spotify. (Sorry to the Apple Music listeners 😅) ',
			image: 'login.png',
		},
		{
			title: 'top tracks',
			description:
				"Discover what tracks you've been playing on repeat forever. 🎧",
			image: 'top-tracks.png',
		},
		{
			title: 'top artists',
			description: 'Find out who is your most loved Spotify artist. 💖',
			image: 'top-artists.png',
		},
		{
			title: 'tailored playlist',
			description:
				'We create a custom playlist tailored to your music taste. 🎶',
			image: 'tailor-playlist.png',
		},
	];

	return (
		<Carousel auto={true} sx="my-10 md:mt-20 md:mb-10 mx-auto">
			{cards.map((item, idx) => (
				<Card
					key={`card-${idx}`}
					title={item.title}
					description={item.description}
					image={item.image}
				/>
			))}
		</Carousel>
	);
}

export default Cards;
