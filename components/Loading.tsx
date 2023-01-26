import React from 'react';
import Image from 'next/image';
type Props = {
	sx?: string;
};
function Loading({ sx = '' }: Props) {
	return (
		<div
			className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center space-x-3 ${sx}`}
		>
			<span className="w-14 h-14 aspect-square relative animate-spin ">
				<Image
					src="/images/spotify-records.png"
					alt="logo"
					fill
					style={{ objectFit: 'cover' }}
					priority
				/>
			</span>

			<h1 className="text-5xl font-bold text-light-secondary dark:text-dark-secondary">
				LOADING...
			</h1>
		</div>
	);
}

export default Loading;
