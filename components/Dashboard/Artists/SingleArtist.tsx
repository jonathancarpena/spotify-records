import React from 'react';
import { SpotifyArtist } from '../../../lib/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdMicrophone } from 'react-icons/io';

interface Props extends SpotifyArtist {
	idx: number;
}

function SingleArtist({
	external_urls,
	followers,
	genres,
	id,
	images,
	name,
	popularity,
	idx,
}: Props) {
	console.log(genres, external_urls);
	return (
		<Link
			href={
				external_urls.hasOwnProperty('spotify') ? external_urls.spotify : ''
			}
			target="_blank"
		>
			<div className="bg-white hover:bg-light-mainHover transition-all duration-200 p-5 rounded-lg h-full pb-10">
				<div className="drop-shadow-xl">
					<div className="relative rounded-full overflow-hidden h-[200px] w-[200px] mx-auto bg-neutral-300 flex justify-center items-center">
						{images[0] ? (
							<Image
								src={images[0].url}
								fill
								alt={`top-artist-${name}-${idx}`}
								style={{ objectFit: 'cover' }}
							/>
						) : (
							<IoMdMicrophone className="text-white text-8xl" />
						)}
					</div>
					<div className="bg-accent-500 absolute top-0 left-0 rounded-full p-4 h-[60px] w-[60px] flex justify-center items-center drop-shadow-md">
						<span className=" text-4xl font-black text-white ">{idx}</span>
					</div>
				</div>

				<div className="flex flex-col space-y-1">
					<p className="font-black text-lg mt-5 text-start">{name}</p>
					<p className="capitalize text-xs">
						{followers.total.toLocaleString('en-US')} followers
					</p>
					{genres.length > 0 && (
						<p className="capitalize text-xs italic">{genres[0]}</p>
					)}
				</div>
			</div>
		</Link>
	);
}

export default SingleArtist;
