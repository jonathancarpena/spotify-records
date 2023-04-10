// Utils
import { convertToFormBody } from './utils';
import SpotifyWebApi from 'spotify-web-api-node';

export const ENDPOINT = {
	AUTHORIZE: 'https://accounts.spotify.com/authorize',
	TOKEN: `https://accounts.spotify.com/api/token`,
	GET_USERS_PROFILE: `https://api.spotify.com/v1/me`,
	GET_USERS_TRACKS: `https://api.spotify.com/v1/me/tracks?limit=`,
	GET_ARTIST: `https://api.spotify.com/v1/artists/`,
	GET_SEVERAL_ARTIST: `https://api.spotify.com/v1/artists?ids=`,
	GET_NEW_SONGS: `https://api.spotify.com/v1/recommendations?limit=6&market=US&seed_genres=`,
	GET_PLAYLIST: `https://api.spotify.com/v1/playlists/`,
	PUT_LIKE_SONG: `https://api.spotify.com/v1/me/tracks?ids=`,
};

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const SCOPES = [
	'playlist-read-private',
	'playlist-modify-private',
	'playlist-modify-public',
	'user-library-read',
	'user-library-modify',
	'user-read-currently-playing',
	'user-read-playback-state',
	'user-read-recently-played',
	'user-read-private',
	'user-top-read',
	'user-read-email',
].join(',');

export const LOGIN_LINK = `${ENDPOINT.AUTHORIZE}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code&show_dialog=true`;

const spotifyApi = new SpotifyWebApi({
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	redirectUri: REDIRECT_URI,
});

export default spotifyApi;

const getAccessToken = async (code: string) => {
	const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
	const settings = {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: convertToFormBody({
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: REDIRECT_URI,
		}),
	};

	const response = await fetch(ENDPOINT.TOKEN, settings);
	const data = await response.json();

	return data;
};

/** 
	API Calls 
*/

// User Profile Data
export const getUsersProfile = async (code: string) => {
	const { access_token } = await getAccessToken(code);
	const settings = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${access_token}`,
		},
	};
	try {
		const data = await fetch(ENDPOINT.GET_USERS_PROFILE, settings);
		const result = await data.json();
		console.log('GET USER PROFILE JSON: ', result);
	} catch (error) {
		console.log('Error ', error);
	}
};

// User Tracks
export const getUsersTracks = async (code: string) => {
	const { access_token } = await getAccessToken(code);

	const res = await fetch(`${ENDPOINT.GET_USERS_TRACKS}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	return res;
};
