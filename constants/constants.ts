export const URL = `http://localhost:3000/api/`;

const AUTH = {
	ENDPOINT: 'https://accounts.spotify.com/authorize',
	REDIRECT: '/swaddle',
	CLIENT_ID: '2e64dbb089554ea68ac58b85dc453f01',
	SCOPES: [
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
	],
};

let SPACE_DELIMITER = '%20';
let SCOPE_PARAM = AUTH.SCOPES.join(SPACE_DELIMITER);
export const LOGIN_LINK = `${AUTH.ENDPOINT}?client_id=${AUTH.CLIENT_ID}&redirect_uri=${AUTH.REDIRECT}&scope=${SCOPE_PARAM}&response_type=code&show_dialog=true`;
