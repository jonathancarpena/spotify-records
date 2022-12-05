import { getPlaylist } from '../../../lib/spotify';

export default async (req, res) => {
    const response = await getPlaylist(req.query.id);
    const data = await response.json();

    let tracks = data.tracks.items.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        img: item.track.album.images[0].url,
        artist: {
            name: item.track.artists[0].name,
            id: item.track.artists[0].id
        },
        urls: {
            preview: item.track.preview_url,
            spotify: item.track.external_urls.spotify
        }

    }))

    let playlist = {
        id: data.id,
        name: data.name,
        description: data.description,
        img: data.images[0].url,
        urls: {
            spotify: data.external_urls.spotify
        },
        tracks,
    }

    return res.status(200).json(playlist);
};