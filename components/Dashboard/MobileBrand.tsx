import { BsSpotify } from 'react-icons/bs';

function MobileHeader() {
	return (
		<h1 className="drop-shadow-md z-30 select-none  text-white   space-x-1.5 items-center flex fixed top-3 left-3     md:hidden ">
			<BsSpotify className="text-3xl " />
			<span className="text-xl font-bold tracking-tight">Records</span>
		</h1>
	);
}

export default MobileHeader;
