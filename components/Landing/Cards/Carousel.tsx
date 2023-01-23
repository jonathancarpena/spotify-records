import { useState, cloneElement } from 'react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

type Props = {
	children?: JSX.Element[] | JSX.Element;
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
		}

		// No Other Slides Available
		if (active === index && lastChild === index) {
			styles = 'translate-x-0';
		}

		return styles;
	}

	return (
		<li
			className={`${generateStyles()} list-none transition-all duration-500 m-1`}
		>
			{children}
		</li>
	);
}

function Carousel({ children }: Props) {
	const [active, setActive] = useState(0);

	function handleActiveChange(input: boolean) {
		if (Array.isArray(children)) {
			if (input && active < children.length - 1) {
				setActive((prev) => prev + 1);
			}

			if (!input && active > 0) {
				setActive((prev) => prev - 1);
			}

			if (input && active === children.length - 1) {
				setActive(0);
			}

			if (!input && active === 0) {
				setActive(children.length - 1);
			}
		}
	}

	return (
		<div className="flex flex-col relative h-full ">
			{Array.isArray(children) ? (
				<div className="relative">
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

					{/* Navigation Buttons */}
					<div className="flex justify-between w-[150%] absolute  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
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
				</div>
			) : (
				<Slide active={active} index={0} lastChild={0}>
					{children}
				</Slide>
			)}

			{/* Pagination */}
			{Array.isArray(children) && (
				<div className="flex justify-center my-4 space-x-2 w-full mx-auto">
					{children.map((item, idx) => (
						<span
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
