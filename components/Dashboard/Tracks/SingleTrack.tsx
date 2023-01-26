import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiSpotify } from 'react-icons/si';
import { BsPlayFill, BsMusicNote } from 'react-icons/bs';

type Props = {
	idx: number;
	album: { name: string; url: string };
	artists: { name: string; url: string }[];
	songTitle: string;
	explicit: boolean;
	songDuration: string;
	spotifyUrl: string;
	previewUrl?: string | null;
	image?: string | null;
};

function SingleTrack({
	idx,
	album,
	songTitle,
	artists,
	image,
	explicit,
	spotifyUrl,
	songDuration,
	previewUrl,
}: Props) {
	const [hover, setHover] = useState(false);

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className={`${
				hover ? 'bg-light-mainHover dark:bg-dark-mainHover' : ''
			} lg:grid lg:gap-4 flex items-center justify-between lg:grid-cols-5 lg:place-items-center lg:justify-items-start active:bg-light-mainActive dark:active:bg-dark-mainActive w-full   py-1.5 md:py-2 rounded-md  select-none text-light-secondary dark:text-dark-secondary `}
		>
			{/* Index, Song Title*/}
			<div className="flex h-full truncate w-full  lg:col-span-2   ">
				{/* Index */}
				<span className="flex justify-center items-center text-xs min-w-[35px]  md:min-w-[45px] md:text-sm lg:min-w-[55px]  lg:text-base ">
					{previewUrl ? (
						hover ? (
							<Link href={previewUrl} target="_blank">
								<BsPlayFill className="text-lg  md:text-xl lg:text-2xl text-black dark:text-white  transition-all duration-150 hover:scale-125 active:scale-90" />
							</Link>
						) : (
							idx
						)
					) : (
						idx
					)}
				</span>

				<div className="flex h-full  flex-1  ">
					{/* Image */}
					<div className="w-12 h-12  aspect-square relative ">
						{image ? (
							<Image
								src={image}
								fill
								alt={`top-track-${songTitle}-${idx}`}
								priority
							/>
						) : (
							<div className="bg-neutral-200 w-full h-full flex justify-center items-center">
								<BsMusicNote className="text-2xl" />
							</div>
						)}
					</div>

					{/* Song Title */}
					<div className="ml-3 md:ml-4 flex flex-col h-full justify-center md:justify-between flex-1 overflow-auto ">
						<Link href={spotifyUrl} target="_blank">
							<p className="cursor-pointer text-black dark:text-white md:font-semibold  truncate text-sm ">
								{songTitle}
							</p>
						</Link>
						<div className=" truncate w-3/4 flex items-center text-xs">
							{explicit && (
								<span className="mr-1 md:mr-2 select-none cursor-default bg-neutral-400 py-0.5 px-1  text-white rounded-sm text-2xs ">
									E
								</span>
							)}
							<p className=" space-x-1 flex  flex-1 truncate text-xs md:text-sm ">
								{artists.map((artist, idx) => (
									<Link
										key={`${songTitle}-artist-${idx}`}
										href={artist.url}
										target="_blank"
										className="after:content-[','] last:after:content-none "
									>
										<span
											className={`${
												hover ? 'dark:text-white text-black' : ''
											} cursor-pointer hover:underline   `}
										>
											{artist.name}
										</span>
									</Link>
								))}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Album  */}
			<Link
				href={album.url}
				target="_blank"
				className="w-full hidden  lg:inline col-span-2 "
			>
				<p
					className={`${
						hover ? 'dark:text-white text-black' : ''
					} truncate  font-medium cursor-pointer hover:underline text-sm `}
				>
					{album.name}
				</p>
			</Link>

			{/* Song Duration */}
			<div
				className={`lg:place-self-end inline-flex  h-full  md:space-x-3  items-center  justify-end lg:pr-5   `}
			>
				{/* External Link to Spotify */}
				<Link
					href={spotifyUrl}
					target="_blank"
					className="  text-black dark:text-white hover:scale-105 hover:brightness-105 active:brightness-90 active:scale-95 transition-all duration-150"
				>
					<button className=" lg:px-3 lg:py-1  lg:bg-accent-500 w-full  font-semibold rounded-md md:rounded-lg flex md:space-x-2 items-center justify-center">
						<SiSpotify className="text-lg lg:text-base lg:text-inherit text-accent-500" />
						<span className="text-sm hidden lg:inline">Open</span>
					</button>
				</Link>
				<span className="w-[45px] md:w-[55px] text-xs md:text-sm font-medium text-center">
					{songDuration}
				</span>
			</div>
		</div>
	);
}

export default SingleTrack;
