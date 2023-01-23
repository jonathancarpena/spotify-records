import React from 'react';
import Image from 'next/image';

type Props = {
	title: string;
	description: string;
	image: string;
};

function Card({ title, image, description }: Props) {
	return (
		<div className="text-center bg-white dark:bg-dark-mainActive rounded-lg drop-shadow-xl capitalize w-auto h-[35rem] aspect-[4/6] overflow-hidden py-6 px-2 flex flex-col justify-between">
			<p className="text-3xl font-bold">{title}</p>
			<p>{image}</p>
			<p>{description}</p>
		</div>
	);
}

export default Card;
