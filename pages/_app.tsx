import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import LightModeProvider from '../context/LightMode';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<LightModeProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</LightModeProvider>
	);
}

export default MyApp;
