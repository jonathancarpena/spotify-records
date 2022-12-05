import React from 'react';
import { useRouter } from 'next/router';

function error() {
	const router = useRouter();
	setTimeout(() => {
		router.push('/');
	}, 3000);

	return (
		<div>
			<h1>404 Error</h1>
			<p>Oops, try logging in again.</p>
		</div>
	);
}

export default error;
