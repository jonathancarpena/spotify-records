import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Link from 'next/link';
import { BsHouseFill } from 'react-icons/bs';

export function Message() {
	return (
		<div className=" absolute top-[40%] -translate-y-1/2 left-1/2 -translate-x-1/2  flex flex-col justify-center items-center max-w-sm text-center">
			<h1 className="text-[15rem] font-black tracking-tighter text-neutral-500">
				404
			</h1>
			<h2 className="text-2xl font-black  -mt-10 mb-2">
				Oops! This is embarassing.
			</h2>
			<h3 className="text-2xl font-black  mb-4 ">You should probably</h3>

			<Button sx="mb-4">
				<Link
					href="/"
					className="flex space-x-2 items-center text-xl font-bold"
				>
					<BsHouseFill />
					<span>Go Home</span>
				</Link>
			</Button>
		</div>
	);
}
function Error() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push('/');
		}, 7000);
	});

	return <Message />;
}

export default Error;
