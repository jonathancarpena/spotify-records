const ENDPOINTS = {
	TOKEN: `https://accounts.spotify.com/api/token`,
	GET_USERS_PROFILE: `https://api.spotify.com/v1/me`,
	GET_USERS_TRACKS: `https://api.spotify.com/v1/me/tracks?limit=5`,
	GET_ARTIST: `https://api.spotify.com/v1/artists/`,
	GET_SEVERAL_ARTIST: `https://api.spotify.com/v1/artists?ids=`,
	GET_NEW_SONGS: `https://api.spotify.com/v1/recommendations?limit=6&market=US&seed_genres=`,
	GET_PLAYLIST: `https://api.spotify.com/v1/playlists/`,
	PUT_LIKE_SONG: `https://api.spotify.com/v1/me/tracks?ids=`,
};

export default ENDPOINTS;
