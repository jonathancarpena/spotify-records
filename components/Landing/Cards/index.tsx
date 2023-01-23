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
		{ title: 'sign in with spotify', description: 'check', image: 'image' },
		{ title: 'top tracks', description: 'check', image: 'image' },
		{ title: 'top artists', description: 'check', image: 'image' },
		{ title: 'tailored playlist', description: 'check', image: 'image' },
	];

	return (
		<Carousel auto={true}>
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
