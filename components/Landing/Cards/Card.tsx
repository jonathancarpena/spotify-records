import React from 'react';
import Image from 'next/image';

type Props = {
	title: string;
	description: string;
	image: string;
};

function Card({ title, image, description }: Props) {
	return (
		<div className="hover:cursor-grab active:cursor-grabbing text-center bg-white dark:bg-dark-mainActive rounded-lg drop-shadow-xl dark:drop-shadow-[0_20px_13px_rgba(0,0,0,0.5)] max-w-sm h-auto md:max-w-max md:w-auto  aspect-[4/5.5] md:h-[35rem] md:aspect-[4/6]  py-10 px-5 flex flex-col justify-between mb-4">
			<p className="text-2xl md:text-3xl font-bold capitalize text-dark-mainHover dark:text-light-main">
				{title}
			</p>
			<div className="relative  w-full h-auto md:w-auto md:h-full my-3 md:aspect-[4/6] aspect-[4/5.5] ">
				<Image
					src={`/images/landing/${image}`}
					alt={`${image}`}
					fill
					style={{ objectFit: 'contain' }}
				/>
			</div>
			<p className="text-base md:text-xl font-bold dark:text-neutral-300 text-neutral-500">
				{description}
			</p>
		</div>
	);
}

export default Card;
