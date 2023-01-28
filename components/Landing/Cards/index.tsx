import React from 'react';
import Card from './Card';
import Carousel from '../../Carousel';
import { BsMusicPlayerFill, BsSpotify } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { RiPlayListFill } from 'react-icons/ri';

interface Card {
	title: string;
	description: string;
	icon: any;
}
function Cards() {
	const cards: Card[] = [
		{
			title: 'spotify users',
			description:
				'Only works with Spotify. (Sorry to the Apple Music listeners 😅) ',
			icon: <BsSpotify className="text-accent-500" />,
		},
		{
			title: 'top tracks',
			description:
				"Discover what tracks you've been playing on repeat forever. 🎧",
			icon: <BsMusicPlayerFill className="text-yellow-500" />,
		},
		{
			title: 'top artists',
			description: 'Find out who is your most loved Spotify artist. 💖',
			icon: <FaUsers className="text-blue-500" />,
		},
		{
			title: 'custom playlist',
			description: 'Create a custom playlist catered to your music taste. 🎶',
			icon: <RiPlayListFill className="text-purple-500" />,
		},
	];

	return (
		<Carousel auto={true} sx="  mx-auto">
			{cards.map((item, idx) => (
				<Card
					key={`card-${idx}`}
					title={item.title}
					description={item.description}
					icon={item.icon}
				/>
			))}
		</Carousel>
	);
}

export default Cards;
