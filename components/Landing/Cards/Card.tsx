import React from 'react';

type Props = {
	title: string;
};

function Card({ title }: Props) {
	return <div>{title}</div>;
}

export default Card;
