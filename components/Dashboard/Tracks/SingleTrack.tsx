import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiSpotify } from 'react-icons/si';
import { BsPlayFill } from 'react-icons/bs';

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
			} active:bg-light-mainActive grid grid-flow-col gap-5 auto-cols-fr w-full  place-items-center justify-items-start  py-2 rounded-md  select-none text-light-secondary dark:text-dark-secondary`}
		>
			{/* Index, Song Title*/}
			<div className="flex items-center truncate w-full  ">
				<span className="flex justify-center items-center  min-w-[55px]   ">
					{previewUrl ? (
						hover ? (
							<Link href={previewUrl} target="_blank">
								<BsPlayFill className="text-2xl text-black dark:text-white hover:text-3xl active:text-2xl transition-all duration-150" />
							</Link>
						) : (
							idx
						)
					) : (
						idx
					)}
				</span>

				<div className="flex flex-1  overflow-auto">
					{image ? (
						<Image
							src={image}
							width={50}
							height={50}
							alt={`top-track-${songTitle}-${idx}`}
						/>
					) : (
						<div></div>
					)}

					<div className="ml-4 flex flex-col justify-between flex-1 overflow-auto  ">
						<Link href={spotifyUrl} target="_blank">
							<p className="cursor-pointer text-black dark:text-white font-semibold  truncate  ">
								{songTitle}
							</p>
						</Link>
						<div className="  truncate overflow-auto flex items-center">
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
											} cursor-pointer hover:underline`}
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
				<Link href={album.url} target="_blank" className=" w-full  ">
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
			<div className="flex space-x-3  items-center w-full justify-end pr-5">
				{/* External Link to Spotify */}
				<Link
					href={spotifyUrl}
					target="_blank"
					className="  text-black dark:text-white hover:scale-105 hover:brightness-105 active:brightness-90 active:scale-95 transition-all duration-150"
				>
					<button className=" px-3  bg-accent-500 w-full py-1 font-semibold rounded-lg flex space-x-2 items-center justify-center">
						<SiSpotify />
						<span className="text-sm ">Open</span>
					</button>
				</Link>
				<span className="w-[55px]  text-center">{songDuration}</span>
			</div>
		</div>
	);
}

export default SingleTrack;
