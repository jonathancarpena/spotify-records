import React from 'react';

type Props = {
	title: string;
};

function Card({ title }: Props) {
	return (
		<div className="text-center font-bold bg-white dark:bg-dark-mainActive rounded-md drop-shadow-md text-xl capitalize w-auto h-[35rem] aspect-[4/6] overflow-hidden p-2">
			{title}
		</div>
	);
}

export default Card;
