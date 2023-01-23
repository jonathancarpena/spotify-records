import React from 'react';

type Props = {
	children?: JSX.Element | React.ReactNode | JSX.Element[];
	onClick?: () => void;
	disabled?: boolean;
	sx?: string;
};

function Button({ children, onClick, disabled = false, sx }: Props) {
	return (
		<button
			disabled={disabled}
			className={`text-white outline-none z-10 ${sx}`}
		>
			<div
				onClick={onClick}
				className="p-2 bg-accent-500 rounded-lg hover:brightness-105 active:translate-y-[10px] transition-transform ease-in-out duration-200 border-2 border-[#19ba51] "
			>
				{children}
			</div>

			<div className="w-full h-full bg-[#149140] absolute left-0 top-[10px] rounded-md -z-10"></div>
		</button>
	);
}

export default Button;
