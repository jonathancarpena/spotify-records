// Utils
import { useState } from 'react';

// Types
type Direction = 'top' | 'bottom' | 'left' | 'right';
type Props = {
	children?: JSX.Element | JSX.Element[] | React.ReactNode;
	message: string;
	direction?: Direction;
};

function Popover({ children, message, direction = 'left' }: Props) {
	const [hover, setHover] = useState(false);
	const handleMouseEnter = () => setHover(true);
	const handleMouseLeave = () => setHover(false);
	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="relative w-max h-max"
		>
			<span
				className={`${
					hover ? ' right-[125%]' : 'right-0 opacity-0 scale-0'
				} hidden lg:inline-block absolute z-50 px-2 py-1  text-black bg-white drop-shadow-md dark:drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)] top-1/2  -translate-y-1/2 w-max rounded-md transition-all duration-300 delay-200`}
			>
				{message}
			</span>

			{children}
		</div>
	);
}

export default Popover;
