import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import { useRouter } from 'next/router';
import { Message } from './404';
import Loading from '../components/Loading';

function DashboardPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	});

	return (
		<div className="min-h-screen min-w-screen">
			{loading ? (
				<Loading />
			) : router.query.code ? (
				<Dashboard code={router.query.code.toString()} />
			) : (
				<Message />
			)}
		</div>
	);
}

export default DashboardPage;
