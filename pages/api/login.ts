import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const code = req.body;

	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
		clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
		clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
	});

	let response = {};
	let status = 200;

	try {
		const auth = await spotifyApi.authorizationCodeGrant(code);
		console.log('Getting Access Token');
		response = {
			accessToken: auth.body.access_token,
			refreshToken: auth.body.refresh_token,
			expiresIn: auth.body.expires_in,
		};
	} catch (error) {
		status = 400;
	}

	res.status(status).json(response);
}

export default handler;
