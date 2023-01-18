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
			className="md:drop-shadow-md  md:aspect-[3/4] "
		>
			<div
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				className={`w-full bg-white dark:bg-[#181818] flex items-center  md:inline-block transition-all duration-200   md:rounded-lg h-max md:h-full md:pt-5 md:px-5 md:pb-10  relative overflow-hidden  dark:border-b-neutral-800 border-b-2  `}
			>
				{/* Animation Expanding Div */}
				<div
					className={`${
						hover
							? 'md:w-[105%] md:h-[105%] md:rounded-lg'
							: ' h-[50px] w-[50px] '
					} absolute  bg-accent-500 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 -z-0 transition-all duration-[400ms] hidden md:inline-block `}
				></div>

				{/* Image */}
				<div className="md:drop-shadow-xl md:inline-block ">
					<div
						className={`${!images[0] ? 'bg-neutral-300' : ''} ${
							hover ? 'md:scale-110 ' : ' '
						}  relative w-[90px] h-[90px] md:rounded-full  overflow-hidden md:h-[200px] md:w-[200px] mx-auto  flex justify-center items-center transition-all duration-200`}
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
							hover ? 'md:-translate-y-[150%]' : ''
						} md:bg-accent-500 absolute ${
							idx > 9 ? 'right-5' : 'right-1'
						}  top-1/2 -translate-y-[50%] md:translate-y-0 md:top-0 md:left-0 rounded-full p-4 h-[60px] w-[60px] flex justify-center items-center md:drop-shadow-md transition-all duration-200 delay-150 `}
					>
						<span className="text-6xl md:text-4xl font-black text-accent-500 md:text-white  ">
							{idx}
						</span>
					</div>
				</div>

				{/* Name, Followers, Genre */}
				<div className="flex flex-col space-y-1 z-20 relative md:pl-0 pl-2  w-full md:mr-0 mr-20  ">
					<p
						className={`font-black text-sm md:text-lg md:mt-5 text-start transition-all duration-300 text-black dark:text-white ${
							hover ? ' md:text-white ' : 'text-black dark:text-white'
						} `}
					>
						{name}
					</p>
					<p
						className={`text-light-secondary dark:text-dark-secondary ${
							hover
								? 'text-transparent'
								: 'text-light-secondary dark:text-dark-secondary'
						} capitalize text-xs transition-colors duration-100 hidden md:inline`}
					>
						{followers.total.toLocaleString('en-US')} followers
					</p>
					{genres.length > 0 && (
						<p
							className={`text-light-secondary dark:text-dark-secondary capitalize text-2xs md:text-xs italic transition-colors duration-100 ${
								hover
									? 'md:text-transparent'
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
					}  absolute -bottom-[10px] right-2 rounded-full justify-center items-center drop-shadow-md transition-all ease-out duration-200 hidden md:flex `}
				>
					<span className=" text-9xl font-black  ">{idx}</span>
				</div>
			</div>
		</Link>
	);
}

export default SingleArtist;
