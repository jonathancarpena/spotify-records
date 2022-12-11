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

	try {
		const userData = await spotifyApi.getMe();

		response = {
			user_id: userData.body.id,
			name: userData.body.display_name,
			country: userData.body.country,
			email: userData.body.email,
			url: userData.body.external_urls.spotify,
			image: userData.body.images ? userData.body.images[0] : null,
			premium: userData.body.product === 'premium',
			followers: userData.body.followers ? userData.body.followers.total : 0,
		};
	} catch (error) {
		status = 400;
	}

	res.status(status).json(response);

	// spotifyApi
	// 	.getMe()
	// 	.then(({ body }) => {
	// 		res.status(200).json({
	// 			name: body.display_name,
	// 			country: body.country,
	// 			email: body.email,
	// 			url: body.external_urls.spotify,
	// 			image: body.images ? body.images[0] : null,
	// 			premium: body.product === 'premium',
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		res.status(400).json(err);
	// 	});
}

export default handler;
