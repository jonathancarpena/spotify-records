import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const accessToken = req.body;

	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
		clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
		clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
	});

	spotifyApi.setAccessToken(accessToken);
	let response = {};
	let status = 200;

	// Short Term - Last 4 Weeks
	try {
		const shortRes = await spotifyApi.getMyTopArtists({
			limit: 18,
			time_range: 'short_term',
		});
		response = {
			...response,
			shortTerm: shortRes.body.items,
		};
	} catch (error) {
		status = 400;
	}

	// Medium Term - Last 6 months
	try {
		const mediumRes = await spotifyApi.getMyTopArtists({
			limit: 18,
			time_range: 'medium_term',
		});
		response = {
			...response,
			mediumTerm: mediumRes.body.items,
		};
	} catch (error) {
		status = 400;
	}

	// Long Term - Last 12 months
	try {
		const longRes = await spotifyApi.getMyTopArtists({
			limit: 18,
			time_range: 'long_term',
		});
		response = {
			...response,
			longTerm: longRes.body.items,
		};
	} catch (error) {
		status = 400;
	}

	res.status(status).json(response);
}

export default handler;
