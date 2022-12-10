type Image = {
	url: string;
	height: number;
	width: number;
};

export interface SpotifyTrack {
	id: any;
	album: any;
	artists: any;
	duration_ms: any;
	external_urls: any;
	name: string;
	explicit: boolean;
	preview_url?: string | null;
}

export interface SpotifyArtist {
	external_urls: any;
	followers: {
		href: null | string;
		total: number;
	};
	genres: string[];
	id: string;
	images: Image[] | [];
	name: string;
	popularity: number;
}

export type Terms = 'shortTerm' | 'mediumTerm' | 'longTerm';
