import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiSpotify } from 'react-icons/si';
import { BsPlayFill } from 'react-icons/bs';

type Props = {
	idx: number;
	album: { image: string; name: string; url: string };
	artists: { name: string; url: string }[];
	songTitle: string;
	explicit: boolean;
	songDuration: string;
	spotifyUrl: string;
	previewUrl?: string | null;
};

function SingleTrack({
	idx,
	album,
	songTitle,
	artists,
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
				hover ? 'bg-light-mainHover' : 'bg-light-main'
			} active:bg-light-mainActive grid grid-cols-[50px_500px_500px_auto_auto]  place-items-center justify-items-start  py-2 rounded-md  select-none`}
		>
			{/* Index, Preview Button*/}
			<span className="flex justify-center items-center w-full h-full  ">
				{previewUrl && hover && (
					<Link href={previewUrl} target="_blank">
						<BsPlayFill className="text-2xl text-black hover:text-3xl active:text-2xl transition-all duration-150" />
					</Link>
				)}
				{!hover && idx}
				{!previewUrl && !hover && idx}
			</span>

			{/* Image, Song Title, Artist(s) Name */}
			<div className="flex space-x-4 ">
				<Image
					src={album.image}
					width={50}
					height={50}
					alt={`top-track-${songTitle}-${idx}`}
				/>
				<div className="flex flex-col justify-between">
					<p className="cursor-default text-black font-bold max-w-[400px] truncate text-ellipsis">
						{songTitle}
					</p>
					<div className="max-w-[400px] truncate text-ellipsis">
						{explicit && (
							<span className="mr-2 select-none cursor-default bg-neutral-400 py-0.5 px-1.5 text-white rounded-sm text-xs">
								E
							</span>
						)}
						<ul className=" space-x-1 inline-flex">
							{artists.map((artist) => (
								<Link
									href={artist.url}
									target="_blank"
									className="after:content-[','] last:after:content-none"
								>
									<span className="text-secondary-light font-medium cursor-pointer hover:underline">
										{artist.name}
									</span>
								</Link>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Album  */}
			<Link href={album.url} target="_blank">
				<p className="max-w-[400px] truncate text-ellipsis font-medium cursor-pointer hover:underline">
					{album.name}
				</p>
			</Link>

			{/* Song Duration */}
			<span className="">{songDuration}</span>

			{/* External Link to Spotify */}
			<Link
				href={spotifyUrl}
				target="_blank"
				className="justify-self-end mx-4  hover:scale-105 hover:brightness-105 active:brightness-90 active:scale-95 transition-all duration-150"
			>
				<button className=" px-4 bg-accent-500 w-full py-1 font-semibold rounded-lg flex space-x-2 items-center justify-center">
					<span>Open</span>
					<SiSpotify />
				</button>
			</Link>
		</div>
	);
}

export default SingleTrack;
