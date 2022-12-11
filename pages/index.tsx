import { useRouter } from 'next/router';
import SpotifyOAuthButton from '../components/SpotifyOAuthButton';
import Dashboard from '../components/Dashboard';

function Home() {
	const router = useRouter();

	if (router.query.error) {
		router.push('/404');
	}

	return (
		<div>
			{router.query.code ? (
				<Dashboard code={router.query.code.toString()} />
			) : (
				<SpotifyOAuthButton />
			)}
		</div>
	);
}

export default Home;
