import React from 'react';
import Card from './Card';
import Carousel from './Carousel';

function Cards() {
	const cards = ['sign in', 'top tracks', 'top artists', 'create'];
	return (
		<Carousel>
			{cards.map((item) => (
				<Card title={item} />
			))}
		</Carousel>
	);
}

export default Cards;
