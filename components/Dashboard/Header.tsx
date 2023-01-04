import { useState } from 'react';
import Image from 'next/image';
import { Terms } from '../../lib/interfaces';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';

type Props = {
	term?: Terms;
	setTerm?: React.Dispatch<React.SetStateAction<Terms>>;
	subheader?: string;
	title: string;
	banner: string;
};
type TermOptions = {
	value: Terms;
	placeholder: string;
};

type TermDropdownProps = {
	term: Terms;
	setTerm: React.Dispatch<React.SetStateAction<Terms>>;
};

const termPlaceholders = {
	shortTerm: 'Last 4 Weeks',
	mediumTerm: 'Last 6 Months',
	longTerm: 'All Time',
};

function TermDropdown({ term, setTerm }: TermDropdownProps) {
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
		<ul className=" text-white z-50 w-max  flex items-center justify-center space-x-2 ">
			<button
				disabled
				className="font-bold bg-white bg-opacity-25 rounded-md px-2"
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
						className="font-light hover:underline"
					>
						{`${item.placeholder}${idx === 0 ? ',' : ''}`}
					</button>
				))}
		</ul>
	);
}
function Header({ term, setTerm, title, banner, subheader }: Props) {
	return (
		<header>
			<div className=" flex flex-col justify-end h-[25rem] px-10 pt-10 pb-8 relative overflow-hidden">
				<div className="opacity-80 inset-0 absolute w-full h-full">
					<Image
						src={banner}
						fill
						alt={`${title}-banner`}
						style={{ objectFit: 'cover' }}
						priority
					/>
				</div>

				<h2 className="text-white text-8xl font-black z-30 capitalize mb-8 drop-shadow-sm">
					{title}
				</h2>
				{subheader && (
					<p className="z-50 text-white font-bold relative bg-white bg-opacity-25 px-2 w-max rounded-md">
						{subheader}
					</p>
				)}
				{term && setTerm && <TermDropdown term={term} setTerm={setTerm} />}
			</div>
		</header>
	);
}

export default Header;
