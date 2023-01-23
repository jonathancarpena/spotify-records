import { useState, useEffect } from 'react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

type Props = {
	children?: JSX.Element[] | JSX.Element;
	auto?: boolean;
	sx?: string;
};

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
		const left = '-translate-x-3/4 ';
		const right = 'translate-x-3/4 ';

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
		}

		// No Other Slides Available
		if (active === index && lastChild === index) {
			styles = 'translate-x-0';
		}

		return styles;
	}

	return (
		<li
			className={`${generateStyles()} list-none transition-all duration-500 m-1 `}
		>
			{children}
		</li>
	);
}

function Carousel({ children, auto = false, sx = '' }: Props) {
	const [active, setActive] = useState(0);
	const [autoSlide, setAutoSlide] = useState(auto);
	const [pointer, setPointer] = useState(0);

	function handleActiveChange(input: boolean, mouseClick: boolean = false) {
		if (Array.isArray(children)) {
			if (mouseClick && auto && autoSlide) {
				setAutoSlide(false);
			}

			if (input && active === children.length - 1) {
				setActive(0);
			} else if (!input && active === 0) {
				setActive(children.length - 1);
			} else if (input && active < children.length - 1) {
				setActive((prev) => prev + 1);
			} else if (!input && active > 0) {
				setActive((prev) => prev - 1);
			} else {
				setActive(0);
			}
		} else {
			setActive(0);
		}
	}

	useEffect(() => {
		let interval: any;
		if (autoSlide) {
			interval = setInterval(() => {
				handleActiveChange(true);
			}, 3000);
		}
		return () => clearInterval(interval);
	});

	function handlePointerDown(e: any) {
		setPointer(e.clientX);
	}

	function handlePointerUp(e: any) {
		const up = e.clientX;
		const pointerMove = pointer - up;
		if (pointerMove < 0) {
			// Swipe Left
			handleActiveChange(false, true);
		} else {
			// Swipe Right
			handleActiveChange(true, true);
		}

		setPointer(0);
	}
	return (
		<div
			// onMouseUp={() => alert('Mouse UP')}
			onPointerUp={handlePointerUp}
			onPointerDown={handlePointerDown}
			className={`flex flex-col relative hover:cursor-grab active:cursor-grabbing ${sx}`}
		>
			{Array.isArray(children) ? (
				<div className="relative">
					<ul className="flex select-none">
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

					{/* Navigation Buttons */}
					<div className="flex justify-between w-[130%] absolute  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-5xl z-30 text-neutral-600">
						<button
							onClick={() => handleActiveChange(false, true)}
							className=" active:scale-90 hover:scale-110 transition-all duration-200  outline-none"
						>
							<BiChevronLeft />
						</button>
						<button
							onClick={() => handleActiveChange(true, true)}
							className=" active:scale-90 hover:scale-110 transition-all duration-200  outline-none"
						>
							<BiChevronRight />
						</button>
					</div>
				</div>
			) : (
				<Slide active={active} index={0} lastChild={0}>
					{children}
				</Slide>
			)}

			{/* Pagination */}
			{Array.isArray(children) && (
				<div className="flex justify-center mt-5 space-x-2 w-full mx-auto">
					{children.map((item, idx) => (
						<span
							key={`pageination-${idx}`}
							className={`w-2 h-2  rounded-full ${
								idx === active ? 'bg-accent-500' : 'bg-neutral-300'
							} `}
						></span>
					))}
				</div>
			)}
		</div>
	);
}

export default Carousel;
