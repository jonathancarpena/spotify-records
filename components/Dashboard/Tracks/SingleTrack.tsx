import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiSpotify } from 'react-icons/si';
import { BsPlayFill } from 'react-icons/bs';
import { AiFillCustomerService } from 'react-icons/ai';

type Props = {
	idx: number;
	album?: { name: string; url: string };
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
			} active:bg-light-mainActive grid grid-flow-col gap-3 md:gap-5 md:auto-cols-fr w-full  place-items-center justify-items-start py-1.5 md:py-2 rounded-md  select-none text-light-secondary dark:text-dark-secondary `}
		>
			{/* Index, Song Title*/}
			<div className="flex h-full truncate w-full  ">
				{/* Index */}
				<span className="flex justify-center items-center text-xs min-w-[35px]  md:min-w-[55px]  md:text-base ">
					{previewUrl ? (
						hover ? (
							<Link href={previewUrl} target="_blank">
								<BsPlayFill className="text-lg hover:text-xl active:text-lg md:text-2xl text-black dark:text-white md:hover:text-3xl md:active:text-2xl transition-all duration-150" />
							</Link>
						) : (
							idx
						)
					) : (
						idx
					)}
				</span>

				<div className="flex items-center flex-1 overflow-auto">
					{/* Image */}
					<div className="w-9 h-9 md:w-14 md:h-14  relative ">
						{image ? (
							<Image src={image} fill alt={`top-track-${songTitle}-${idx}`} />
						) : (
							<div className="bg-neutral-200 w-full h-full flex justify-center items-center">
								<AiFillCustomerService />
							</div>
						)}
					</div>

					{/* Song Title */}
					<div className="ml-3 md:ml-4 flex flex-col h-full justify-center md:justify-between flex-1 overflow-auto ">
						<Link href={spotifyUrl} target="_blank">
							<p className="cursor-pointer text-black dark:text-white md:font-semibold  truncate  text-xs md:text-lg ">
								{songTitle}
							</p>
						</Link>
						<div className="  truncate overflow-auto flex items-center text-sm md:text-base">
							{explicit && (
								<span className="mr-2 select-none cursor-default bg-neutral-400 py-0.5 px-1.5 text-white rounded-sm text-xs">
									E
								</span>
							)}
							<ul className=" space-x-1 inline-flex  flex-1  truncate">
								{artists.map((artist, idx) => (
									<Link
										key={`${songTitle}-artist-${idx}`}
										href={artist.url}
										target="_blank"
										className="after:content-[','] last:after:content-none  inline-block  truncate  "
									>
										<span
											className={`${
												hover ? 'dark:text-white text-black' : ''
											} cursor-pointer hover:underline text-2xs md:text-base`}
										>
											{artist.name}
										</span>
									</Link>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Album  */}
			{album && (
				<Link
					href={album.url}
					target="_blank"
					className="w-full hidden md:inline "
				>
					<p
						className={`${
							hover ? 'dark:text-white text-black' : ''
						} truncate font-medium cursor-pointer hover:underline`}
					>
						{album.name}
					</p>
				</Link>
			)}

			{/* Song Duration */}
			<div className="flex  h-full  md:space-x-3  items-center w-full justify-end md:pr-5">
				{/* External Link to Spotify */}
				<Link
					href={spotifyUrl}
					target="_blank"
					className="  text-black dark:text-white hover:scale-105 hover:brightness-105 active:brightness-90 active:scale-95 transition-all duration-150"
				>
					<button className=" md:px-3 md:py-1  md:bg-accent-500 w-full  font-semibold rounded-md md:rounded-lg flex md:space-x-2 items-center justify-center">
						<SiSpotify className="text-xs md:text-base md:text-inherit text-accent-500" />
						<span className="text-sm hidden md:inline">Open</span>
					</button>
				</Link>
				<span className="w-[35px] md:w-[55px] md:text-base text-2xs ml-1 md:ml-0 text-center">
					{songDuration}
				</span>
			</div>
		</div>
	);
}

export default SingleTrack;
