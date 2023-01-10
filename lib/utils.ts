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

function padTo2Digits(num: number) {
	return num.toString().padStart(2, '0');
}

export function convertMsToMinutesSeconds(ms: number) {
	const minutes = Math.floor(ms / 60000);
	const seconds = Math.round((ms % 60000) / 1000);

	return seconds === 60
		? `${minutes + 1}:00`
		: `${minutes}:${padTo2Digits(seconds)}`;
}

// export const toBase64 = (file: any) =>
// 	new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result);
// 		reader.onerror = (error) => reject(error);
// 	});

export function toBase64(file: File) {
	console.log('converting');
	const reader = new FileReader();
	let base64String = '';
	reader.onloadend = () => {
		if (typeof reader.result === 'string') {
			base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
		}
		console.log(base64String);
		reader.readAsDataURL(file);
	};
}
