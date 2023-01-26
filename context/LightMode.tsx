import { useEffect, useState, createContext } from 'react';

type Props = {
	children?: JSX.Element | JSX.Element[] | React.ReactNode;
};

// Context
export const LightModeContext = createContext(false);
export const LightModeUpdateContext = createContext(() => {});

function LightModeProvider({ children }: Props) {
	const [mount, setMount] = useState(false);
	const [isLight, setIsLight] = useState(false);

	useEffect(() => {
		let storage = null;
		if (localStorage.getItem('spotify-records')) {
			storage = JSON.parse(localStorage.getItem('spotify-records') || '');
		}

		if (!storage) {
			localStorage.setItem(
				'spotify-records',
				JSON.stringify({ LightMode: false })
			);
			storage = { LightMode: false };
		}

		if (!mount) {
			if (storage.LightMode) {
				document.documentElement.classList.remove('dark');
			} else {
				document.documentElement.classList.add('dark');
			}
			setIsLight(storage.LightMode);
			setMount(true);
		}
	});

	function toggleLightMode() {
		if (isLight) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		localStorage.setItem(
			'spotify-records',
			JSON.stringify({ LightMode: !isLight })
		);
		setIsLight((prevLightMode) => !prevLightMode);
	}

	return (
		<LightModeContext.Provider value={isLight}>
			<LightModeUpdateContext.Provider value={toggleLightMode}>
				{children}
			</LightModeUpdateContext.Provider>
		</LightModeContext.Provider>
	);
}

export default LightModeProvider;
