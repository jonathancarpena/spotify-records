import { useState } from 'react';
import { Terms } from '../../lib/interfaces';
import Image from 'next/image';

type Props = {
	term?: Terms;
	setTerm?: React.Dispatch<React.SetStateAction<Terms>>;
	title: string;
	img: string;
};
type TermOptions = {
	value: Terms;
	placeholder: string;
};

type ListOfTermsProps = {
	term: Terms;
	setTerm: React.Dispatch<React.SetStateAction<Terms>>;
};

const termPlaceholders = {
	shortTerm: 'Last 4 Weeks',
	mediumTerm: 'Last 6 Months',
	longTerm: 'All Time',
};

function ListOfTerms({ term, setTerm }: ListOfTermsProps) {
	const [active, setActive] = useState(term);

	const termOptions: TermOptions[] = [
		{
			value: 'shortTerm',
			placeholder: 'Last 4 Weeks',
		},
		{
			value: 'mediumTerm',
			placeholder: 'Last 6 Months',
		},
		{
			value: 'longTerm',
			placeholder: 'All Time',
		},
	];

	function handleButtonClick(value: Terms) {
		setActive(value);
		setTerm(value);
	}
	return (
		<ul className=" text-white z-30 w-max  flex items-center justify-center space-x-2 lg:text-base text-sm">
			<button
				disabled
				className="font-semibold bg-white bg-opacity-25 rounded-sm lg:rounded-md px-2"
			>
				{termPlaceholders[active]}
			</button>
			<span>|</span>
			{termOptions
				.filter((option) => option.value !== active)
				.map((item, idx) => (
					<button
						key={item.value}
						onClick={() => handleButtonClick(item.value)}
						className="font-light hover:underline  text-sm lg:text-base "
					>
						{`${item.placeholder}${idx === 0 ? ',' : ''}`}
					</button>
				))}
		</ul>
	);
}
function Header({ term, setTerm, title, img }: Props) {
	return (
		<header>
			<div className=" flex flex-col justify-end px-5 pb-2 h-[18.5rem] lg:h-[25.5rem] lg:px-10 lg:pt-10 md:pb-8 relative  bg-gradient-to-b from-accent-500">
				<div
					className={`absolute w-full h-[130%] md:h-[125%]  bg-cover bg-center left-0 top-0  z-20 `}
				>
					<Image
						src={`/images/banner/${img}`}
						alt={title}
						fill
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
							zIndex: '-10',
						}}
					/>
					<div className=" -z-10 w-full h-[100px] dark:h-[200px]  absolute bottom-0 bg-gradient-to-b from-transparent dark:to-dark-main to-light-main"></div>
				</div>

				<h2 className="text-5xl mb-4 text-white md:text-6xl lg:text-8xl font-black z-30 capitalize md:mb-6 lg:mb-8 drop-shadow-sm">
					{title}
				</h2>

				{term && setTerm && <ListOfTerms term={term} setTerm={setTerm} />}
			</div>
		</header>
	);
}

export default Header;
