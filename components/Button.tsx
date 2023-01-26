import React from 'react';

type Props = {
	children?: JSX.Element | React.ReactNode | JSX.Element[];
	color?: string;
	onClick?: () => void;
	disabled?: boolean;
	sx?: string;
};

function Button({
	children,
	onClick,
	disabled = false,
	color = 'bg-accent-500',
	sx,
}: Props) {
	return (
		<button
			disabled={disabled}
			className={`text-white outline-none z-10 relative ${sx}`}
		>
			<div
				onClick={onClick}
				className={`flex justify-center items-center p-1.5 md:p-2 w-full h-full rounded-lg hover:brightness-105 active:translate-y-[10px] transition-transform ease-in duration-100 md:duration-200  select-none ${color}`}
			>
				{children}
			</div>

			<div
				className={`w-full h-full ${color}  brightness-[.7] absolute left-0 top-[10px] rounded-md -z-10`}
			></div>
		</button>
	);
}

export default Button;
