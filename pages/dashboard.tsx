import Dashboard from '../components/Dashboard';
import { useRouter } from 'next/router';

function DashboardPage() {
	const router = useRouter();
	return (
		<div>
			{router.query.code && <Dashboard code={router.query.code.toString()} />}
		</div>
	);
}

export default DashboardPage;
