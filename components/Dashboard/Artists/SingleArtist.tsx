import { useState } from 'react';
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
	const [hover, setHover] = useState(false);
	return (
		<Link
			href={
				external_urls.hasOwnProperty('spotify') ? external_urls.spotify : ''
			}
			target="_blank"
		>
			<div
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				className="bg-white   dark:bg-[#181818]   transition-all duration-200 p-5 rounded-lg h-full pb-10 drop-shadow-md relative overflow-hidden "
			>
				<div
					className={`${
						hover ? 'w-[105%] h-[105%] rounded-lg' : ' h-[50px] w-[50px] '
					} absolute  bg-accent-500 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 -z-0 transition-all duration-[400ms] `}
				></div>

				{/* Image */}
				<div className="drop-shadow-xl ">
					<div
						className={`${!images[0] ? 'bg-neutral-300' : ''} ${
							hover ? 'scale-110 ' : ' '
						} relative rounded-full overflow-hidden h-[200px] w-[200px] mx-auto  flex justify-center items-center transition-all duration-200`}
					>
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

					{/* Ranking Top */}
					<div
						className={`${
							hover ? '-translate-y-[150%]' : ''
						} bg-accent-500 absolute top-0 left-0 rounded-full p-4 h-[60px] w-[60px] flex justify-center items-center drop-shadow-md transition-all duration-200 delay-150`}
					>
						<span className=" text-4xl font-black text-white ">{idx}</span>
					</div>
				</div>

				{/* Name, Followers, Genre */}
				<div className="flex flex-col space-y-1 z-20 relative  ">
					<p
						className={`font-black text-lg mt-5 text-start transition-all duration-300 ${
							hover ? 'text-white ' : 'text-black dark:text-white'
						} `}
					>
						{name}
					</p>
					<p
						className={`${
							hover
								? 'text-transparent'
								: 'text-light-secondary dark:text-dark-secondary'
						} capitalize text-xs transition-colors duration-100"`}
					>
						{followers.total.toLocaleString('en-US')} followers
					</p>
					{genres.length > 0 && (
						<p
							className={`capitalize text-xs italic transition-colors duration-100 ${
								hover
									? 'text-transparent'
									: 'text-light-secondary dark:text-dark-secondary'
							}`}
						>
							{genres[0]}
						</p>
					)}
				</div>

				{/* Ranking Bottom */}
				<div
					className={`${
						hover
							? '-translate-y-[100%] text-white delay-300'
							: 'text-transparent'
					}  absolute -bottom-[150px] right-2 rounded-full   flex justify-center items-center drop-shadow-md transition-all ease-out duration-200 `}
				>
					<span className=" text-9xl font-black  ">{idx}</span>
				</div>
			</div>
		</Link>
	);
}

export default SingleArtist;
