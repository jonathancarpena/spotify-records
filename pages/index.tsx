import { useRouter } from 'next/router';
import Landing from '../components/Landing';

function Home() {
	const router = useRouter();

	if (router.query.error) {
		router.push('/404');
	}

	return <Landing />;
}

export default Home;
