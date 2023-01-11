import { useRouter } from 'next/router';

import Dashboard from '../components/Dashboard';
import Landing from '../components/Landing';

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
				<Landing />
			)}
		</div>
	);
}

export default Home;
