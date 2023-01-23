import React from 'react';
import Image from 'next/image';

type Props = {
	title: string;
	description: string;
	image: string;
};

function Card({ title, image, description }: Props) {
	return (
		<div className="text-center bg-white md:dark:bg-dark-mainActive rounded-lg drop-shadow-xl  w-auto md:h-[35rem] aspect-[4/6]  py-10 px-5 flex flex-col justify-between">
			<p className="text-xl md:text-3xl font-bold capitalize">{title}</p>
			<p>{image}</p>
			<p className="text-base md:text-xl font-bold dark:text-neutral-300 text-neutral-500">
				{description}
			</p>
		</div>
	);
}

export default Card;
