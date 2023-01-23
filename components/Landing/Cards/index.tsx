import React from 'react';
import Card from './Card';
import Carousel from '../../Carousel';

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
				'Only works with Spotify. (Sorry to the Apple Music listeners)',
			image: 'image',
		},
		{
			title: 'top tracks',
			description:
				"Discover what tracks you've been playing on repeat forever.",
			image: 'image',
		},
		{
			title: 'top artists',
			description: 'Find out who is your most loved Spotify artist.',
			image: 'image',
		},
		{
			title: 'tailored playlist',
			description: 'We create a custom playlist tailored to your music taste.',
			image: 'image',
		},
	];

	return (
		<Carousel auto={true} sx="my-5 md:mt-20 md:mb-10 md:mx-auto">
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
