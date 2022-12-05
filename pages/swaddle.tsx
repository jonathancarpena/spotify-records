import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { getCode } from '../lib/utils';

// export async function getStaticProps() {
// 	const client_id = process.env.SPOTIFY_CLIENT_ID;
// 	const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// 	console.log('Building...');
// 	return {
// 		props: { client_id, client_secret },
// 	};
// }

function Swaddle() {
	const [userData, setUserData] = useState(false);
	const router = useRouter();
	console.log(router.asPath);
	const accessToken = useAuth(getCode(router.asPath)[0]);
	// useEffect(() => {
	// 	let ignore = false;
	// 	async function fetchUserTracks() {
	// 		try {
	// 			const profileRes = await fetch('/api/users-profile', {
	// 				method: 'POST',
	// 				body: JSON.stringify({ code: getCode(router.asPath)[0] }),
	// 			});
	// 			const data = await profileRes.json();
	// 			console.log(data);
	// 			router.replace(router.asPath, '/swaddle');
	// 			setUserData(true);
	// 		} catch (error) {
	// 			router.push('/');
	// 		}
	// 	}

	// 	if (!ignore) {
	// 		console.log('RENDER');
	// 		fetchUserTracks();
	// 	}

	// 	return () => {
	// 		ignore = true;
	// 	};
	// }, []);

	return (
		<>
			<h1>Success Login</h1>
		</>
	);
}

export default Swaddle;
