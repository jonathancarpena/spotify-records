// Components
import Head from 'next/head';

type Props = {
	title?: string | undefined | null;
	description?: string | undefined | null;
	keywords?: string | undefined | null;
};

export const DEFAULT = {
	title: 'Spotify Records - View your Top Spotify Activity',
	description:
		'View your Top Spotify Tracks and Artists. Create a personalized playlist based on your most listened-to tracks over the past year.',
	keywords:
		'Spotify, Spotify Wrapped, Jonathan Carpena, Web Development, Front End Engineer',
};
function SEO({
	title = DEFAULT.title,
	description = DEFAULT.description,
	keywords = DEFAULT.keywords,
}: Props) {
	return (
		<Head>
			<title>{title ? title : DEFAULT.title}</title>
			<meta
				name="description"
				content={description ? description : DEFAULT.description}
			/>
			<meta name="keywords" content={keywords ? keywords : DEFAULT.keywords} />

			{/* Default */}
			<meta name="author" content="Jonathan Carpena"></meta>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			></meta>
			<meta charSet="UTF-8"></meta>

			{/* Favicon */}
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}

export default SEO;
