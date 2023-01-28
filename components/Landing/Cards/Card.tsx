import React from 'react';
import Image from 'next/image';

type Props = {
	title: string;
	description: string;
	icon: string;
};

function Card({ title, icon, description }: Props) {
	return (
		<div className="hover:cursor-grab active:cursor-grabbing text-center bg-white dark:bg-dark-mainActive rounded-lg drop-shadow-xl dark:drop-shadow-[0_20px_13px_rgba(0,0,0,0.5)] items-center max-w-xs h-auto md:max-w-max md:w-auto  aspect-[3/5] md:h-[35rem]   py-8 px-5 flex flex-col justify-between mb-4">
			<p className=" text-2xl md:text-3xl font-bold uppercase text-dark-mainHover dark:text-light-main">
				{title}
			</p>
			<span className="text-black text-[12rem] dark:text-white ">{icon}</span>
			<p className="text-base md:text-xl font-bold dark:text-neutral-300 text-neutral-500">
				{description}
			</p>
		</div>
	);
}

export default Card;
