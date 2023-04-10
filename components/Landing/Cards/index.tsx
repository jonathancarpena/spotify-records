// Components
import Card from './Card';
import Carousel from '../../Carousel';

interface Card {
	title: string;
	description: string;
}
function Cards() {
	const cards: Card[] = [
		{
			title: 'spotify users',
			description:
				'Only works with Spotify. (Sorry to the Apple Music listeners 😅) ',
		},
		{
			title: 'top tracks',
			description:
				"Discover what tracks you've been playing on repeat forever. 🎧",
		},
		{
			title: 'top artists',
			description: 'Find out who is your most loved Spotify artist. 💖',
		},
		{
			title: 'custom playlist',
			description:
				'Get a personalized playlist based on the your music taste. 📼',
		},
	];

	return (
		<Carousel auto={true} sx="  mx-auto">
			{cards.map((item) => (
				<Card
					key={item.title}
					title={item.title}
					description={item.description}
				/>
			))}
		</Carousel>
	);
}

export default Cards;
