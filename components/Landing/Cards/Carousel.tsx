import { useState, cloneElement } from 'react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

type SlideProps = {
	active: number;
	index: number;
	lastChild: number;
	children?: JSX.Element | JSX.Element[] | React.ReactNode;
};

function Slide({ active, index, lastChild, children }: SlideProps) {
	function generateStyles() {
		let styles = '';
		const inactive = 'absolute opacity-0 -translate-y-10 ';
		const left = '-translate-x-full ';
		const right = 'translate-x-full ';

		if (active === lastChild && index === 0) {
			styles += right + inactive;
		} else if (active === 0 && index === lastChild) {
			styles += left + inactive;
		} else if (index === active) {
			styles += 'translate-x-0 ';
		} else if (index < active) {
			styles += left + inactive;
		} else if (index > active) {
			styles += right + inactive;
		} else {
			styles = inactive;
		}

		return styles;
	}

	return (
		<li
			className={`${generateStyles()} w-auto h-96 aspect-[4/6] text-xl capitalize transition-all duration-500  text-center font-bold bg-white rounded-md p-3 drop-shadow-md`}
		>
			{children}
		</li>
	);
}

type Props = {
	children: JSX.Element[];
};
function Carousel({ children }: Props) {
	const [active, setActive] = useState(0);
	const cards = ['sign in', 'top tracks', 'top artists', 'create'];

	function handleActiveChange(input: boolean) {
		if (input && active < cards.length - 1) {
			setActive((prev) => prev + 1);
		}

		if (!input && active > 0) {
			setActive((prev) => prev - 1);
		}

		if (input && active === cards.length - 1) {
			setActive(0);
		}

		if (!input && active === 0) {
			setActive(cards.length - 1);
		}
	}

	return (
		<div className=" flex flex-col space-y-5 items-center relative">
			{children && children.length > 0 && (
				<ul className="flex">
					{children.map((item, index) => (
						<Slide
							active={active}
							index={index}
							lastChild={children.length - 1}
							key={`Slide-${index}`}
						>
							{item}
						</Slide>
					))}
				</ul>
			)}

			{/* Slider Nav Buttons */}
			<div className="flex justify-between w-[170%] absolute  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
				<button
					onClick={() => handleActiveChange(false)}
					className="text-3xl active:scale-90 hover:scale-110 transition-all duration-200 z-30"
				>
					<BiChevronLeft />
				</button>
				<button
					onClick={() => handleActiveChange(true)}
					className="text-3xl active:scale-90 hover:scale-110 transition-all duration-200 z-30"
				>
					<BiChevronRight />
				</button>
			</div>

			{/* Pagination */}
			<div className="flex space-x-2">
				{cards.map((item, idx) => (
					<span
						className={`w-2 h-2  rounded-full ${
							idx === active ? 'bg-accent-500' : 'bg-neutral-300'
						} `}
					></span>
				))}
			</div>
		</div>
	);
}

export default Carousel;
