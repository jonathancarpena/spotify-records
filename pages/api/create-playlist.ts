// Types
import type { NextApiRequest, NextApiResponse } from 'next';
import { SpotifyTrack } from '../../lib/interfaces';

// Utils
import SpotifyWebApi from 'spotify-web-api-node';
import moment from 'moment';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { accessToken, name, tracks } = JSON.parse(req.body);
	let description = name;

	if (name.includes('All Time')) {
		description += ` (as of ${moment().format('MMM YYYY')})`;
	}
	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
		clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
		clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
	});

	spotifyApi.setAccessToken(accessToken);
	let status = 200;
	let message = '';

	// Create Playlist
	try {
		const createRes = await spotifyApi.createPlaylist(name, {
			description: `${description} - Generated with Spotify Records (on ${moment().format(
				'MMMM DD, YYYY'
			)})`,
			public: true,
		});

		if (createRes.statusCode === 201) {
			const playlistId = createRes.body.id;
			const spotifyTracks = tracks.map((item: SpotifyTrack) => {
				if (item.hasOwnProperty('uri')) {
					return item.uri;
				}
			});

			// Adding Tracks to Playlist
			try {
				const addTracksRes = await spotifyApi.addTracksToPlaylist(
					playlistId,
					spotifyTracks
				);

				if (addTracksRes.statusCode === 201) {
					message = 'Playlist Successfully Created.';
				}
			} catch (error) {
				status = 400;
				message = 'Error: Adding Tracks to Playlist.';
			}
		}
	} catch (error) {
		status = 400;
		message = 'Error: Creating Playlist.';
	}

	res.status(status).json(message);
}

export default handler;
