import { SpotifyTrack } from './interfaces';

export function openInNewTab(url: string) {
	const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
	if (newWindow) newWindow.opener = null;
}

export function convertToFormBody(details: any) {
	const formBody = [];
	for (var property in details) {
		let encodedKey = encodeURIComponent(property);
		let encodedValue = encodeURIComponent(details[property]);
		formBody.push(encodedKey + '=' + encodedValue);
	}
	return formBody.join('&');
}

export function toTitleCase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getCode(str: string): [string, string] {
	const [codePart, statePart] = str.split('?')[1].split('&');
	const code = codePart.split('=')[1];
	const state = statePart.split('=')[1];
	return [code, state];
}

export function convertMsToMinutesSeconds(ms: number) {
	type StrNum = string | number;

	let seconds: StrNum = Math.floor((ms / 1000) % 60);
	let minutes: StrNum = Math.floor((ms / (1000 * 60)) % 60);
	let hours: StrNum = Math.floor((ms / (1000 * 60 * 60)) % 24);

	if (hours > 0) {
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		return hours + ':' + minutes + ':' + seconds;
	} else {
		seconds = seconds < 10 ? '0' + seconds : seconds;
		return minutes + ':' + seconds;
	}
}

export function generatePlaylistDuration(tracks: SpotifyTrack[]) {
	let total = tracks.reduce(
		(accumulator, currentValue) => accumulator + currentValue.duration_ms,
		0
	);

	const time = convertMsToMinutesSeconds(total);
	const timeUnits = time.split(':');
	if (timeUnits.length === 3) {
		return `${timeUnits[0]} hour ${timeUnits[1]} min`;
	} else if (timeUnits.length === 2) {
		return `${timeUnits[0]} min ${timeUnits[1]} sec`;
	} else if (timeUnits.length === 1) {
		return `${timeUnits[0]} sec`;
	} else {
		return '0 sec';
	}
}

// export const toBase64 = (file: any) =>
// 	new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result);
// 		reader.onerror = (error) => reject(error);
// 	});
