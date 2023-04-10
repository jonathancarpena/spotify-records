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
			onClick={onClick}
			disabled={disabled}
			className="lg:transition-all duration-75 active:scale-90 bg-accent-500  md:bg-opacity-50 md:bg-neutral-500 rounded-xl p-2.5 text-xl md:text-3xl text-white"
		>
			{children}
		</button>
	);
}

export default Button;
