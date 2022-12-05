import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useAuth(code: string) {
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState(3600);
	const router = useRouter();

	// Fetch Access Token
	useEffect(() => {
		fetch('/api/login', { method: 'POST', body: code })
			.then((res) => res.json())
			.then((data) => {
				setAccessToken(data.accessToken);
				setRefreshToken(data.refreshToken);
				setExpiresIn(data.expiresIn);
				router.replace(router.asPath, '/');
			})
			.catch(() => {
				router.push('/');
			});
	}, [code]);

	// Automatic Refresh
	useEffect(() => {
		if (!refreshToken || !expiresIn) return;

		const interval = setInterval(() => {
			fetch('/api/refresh', { method: 'POST', body: refreshToken })
				.then((res) => res.json())
				.then((data) => {
					setAccessToken(data.access_token);
					setExpiresIn(data.expires_in);
				})
				.catch(() => router.push('/'));
		}, (expiresIn - 60) * 1000);

		return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);

	// useEffect(() => {
	// 	const storage = {
	// 		accessToken: accessToken,
	// 		refreshToken: refreshToken,
	// 		expiresIn: expiresIn * 1000,
	// 		tokenReceived: Date.now(),
	// 		code: code,
	// 	};
	// 	console.log(storage);
	// 	localStorage.setItem('swaddle-auth', JSON.stringify(storage));
	// }, [accessToken, refreshToken, expiresIn]);

	return accessToken;
}
