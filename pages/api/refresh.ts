import type { NextApiRequest, NextApiResponse } from 'next';

import SpotifyWebApi from 'spotify-web-api-node';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const refreshToken = req.body;

	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
		clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
		clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
		refreshToken: refreshToken,
	});

	spotifyApi
		.refreshAccessToken()
		.then((data) => {
			console.log(data.body);
			console.log('Access Token has been refreshed');

			// Save the access token so that it's used in future calls
			spotifyApi.setAccessToken(data.body['access_token']);
			return res.status(200).json({
				accessToken: data.body.access_token,
				expiresIn: data.body.expires_in,
			});
		})
		.catch((err) => {
			console.log('REFRESH TOKEN ERROR');
			return res.status(400).json({ error: err });
		});

	// const basic = Buffer.from(
	// 	`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
	// ).toString('base64');
	// const settings = {
	// 	method: 'POST',
	// 	headers: {
	// 		Authorization: `Basic ${basic}`,
	// 		'Content-Type': 'application/x-www-form-urlencoded',
	// 	},
	// 	body: convertToFormBody({
	// 		grant_type: 'refresh_token',
	// 		refresh_token: refreshToken,
	// 	}),
	// };

	// try {
	// 	const response = await fetch(ENDPOINT.TOKEN, settings);
	// 	const data = await response.json();
	// 	console.log('TOKEN REFRESH');
	// 	return res.status(200).json(data);
	// } catch (error) {
	// 	return res.status(400);
	// }
};

export default handler;
