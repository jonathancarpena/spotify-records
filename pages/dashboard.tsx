import Dashboard from '../components/Dashboard';
import { useRouter } from 'next/router';
import { Message } from './404';

function DashboardPage() {
	const router = useRouter();

	return (
		<div>
			{router.query.code ? (
				<Dashboard code={router.query.code.toString()} />
			) : (
				<Message />
			)}
		</div>
	);
}

export default DashboardPage;
