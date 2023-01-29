import { useState } from 'react';
import SEO from '../components/SEO';
import { AiOutlineClockCircle } from 'react-icons/ai';

type TimeStamp = {
	start: string;
	end: string;
	title: string;
};
function Demo() {
	const [timeStamp, setTimeStamp] = useState(0);
	const youtubeID = 'https://youtu.be/nS968h4e8Rs'.split('/')[3];
	const timeStamps: TimeStamp[] = [
		{
			start: '0:00',
			end: '0:15',
			title: 'Landing Page',
		},
		{
			start: '0:16',
			end: '0:32',
			title: 'Spotify User Dropdown',
		},
		{
			start: '0:33',
			end: '1:32',
			title: 'Top Tracks',
		},
		{
			start: '1:33',
			end: '2:03',
			title: 'Top Artists',
		},
		{
			start: '2:04',
			end: '2:35',
			title: 'Create a Playlist',
		},
		{
			start: '2:36',
			end: '2:58',
			title: 'Light Mode: Landing Page',
		},
		{
			start: '2:59',
			end: '3:21',
			title: 'Light Mode: Top Tracks',
		},
		{
			start: '3:22',
			end: '3:36',
			title: 'Light Mode: Top Artists',
		},
		{
			start: '3:37',
			end: '3:52',
			title: 'Light Mode: Create a Playlist',
		},
		{
			start: '3:53',
			end: '4:11',
			title: 'Tablet: Landing Page',
		},
		{
			start: '4:12',
			end: '4:44',
			title: 'Tablet: Top Tracks',
		},
		{
			start: '4:45',
			end: '5:12',
			title: 'Tablet: Top Artists',
		},
		{
			start: '5:13',
			end: '5:43',
			title: 'Tablet: Create a Playlist',
		},
		{
			start: '5:44',
			end: '6:06',
			title: 'Mobile: Landing Page',
		},
		{
			start: '6:07',
			end: '6:31',
			title: 'Mobile: Top Tracks',
		},
		{
			start: '6:32',
			end: '6:55',
			title: 'Mobile: Top Artists',
		},
		{
			start: '6:56',
			end: '7:28',
			title: 'Mobile: Create a Playlist',
		},
	];

	function generateStart(time: string) {
		const timeSplit = time.split(':');
		const minutes = parseInt(timeSplit[0]) * 60;
		const seconds = parseInt(timeSplit[1]);
		return minutes + seconds;
	}

	function videoSeek(time: string) {
		const startTime = generateStart(time);
		setTimeStamp(startTime);
	}

	return (
		<>
			<SEO title={'Spotify Records - 🎥 Live Demo '} />

			<h1 className="font-black text-5xl md:text-6xl text-center tracking-tight flex flex-col space-y-2 items-center justify-center ">
				🎥 Live Demo
			</h1>

			{/* Player and Chapter */}
			<div className=" flex-1 flex flex-col space-y-5  mt-12 md:mx-7 lg:mx-0 lg:mt-0 lg:justify-center  lg:items-center lg:space-x-10 lg:space-y-0 lg:flex-row  overflow-hidden">
				<iframe
					id="player"
					className="aspect-video w-full  lg:w-fit lg:mx-0 lg:h-[30rem] flex-0 lg:drop-shadow-xl lg:dark:drop-shadow-[0_20px_13px_rgba(0,0,0,0.5)]"
					src={`https://www.youtube.com/embed/${youtubeID}?start=${timeStamp}&autoplay=1&enablejsapi=1`}
				/>

				<div className="overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin  dark:scrollbar-thumb-dark-menuHover scrollbar-thumb-white  scrollbar-track-transparent w-full  py-2 px-1 bg-light-mainHover dark:bg-dark-main rounded-lg lg:drop-shadow-xl lg:dark:drop-shadow-[0_20px_13px_rgba(0,0,0,0.5)] lg:w-max lg:block lg:h-[30rem] ">
					<ul className={` text-lighter space-y-2 pt-3 pb-4 pl-5 pr-6`}>
						{timeStamps.map((time, idx) => (
							<li key={`timestamp-${idx}`} className="drop-shadow-md">
								<button
									onClick={() => videoSeek(time.start)}
									className={` bg-white dark:bg-dark-mainHover text-start hover:scale-105 hover:bg-accent-500 dark:hover:bg-accent-500 hover:text-white active:bg-accent-600 active:scale-95 active:text-white transition-all duration-150 ease-in-out rounded-lg w-full flex flex-col items-start p-3`}
								>
									<p>{time.title}</p>
									<span className="flex items-center space-x-2">
										<AiOutlineClockCircle />
										<span>
											{time.start}-{time.end}
										</span>
									</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default Demo;
