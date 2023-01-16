import { BsSpotify } from 'react-icons/bs';

function MobileHeader() {
	return (
		<h1 className="drop-shadow-sm z-[60] select-none  text-white  space-x-2 items-center flex fixed top-0 w-[90vw]   p-3 md:hidden ">
			<BsSpotify className="text-3xl " />
			<span className="text-lg font-bold tracking-tight">Swaddle</span>
		</h1>
	);
}

export default MobileHeader;
