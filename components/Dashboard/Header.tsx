import { useState } from 'react';
import Image from 'next/image';
import { Terms } from '../../lib/interfaces';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';

type Props = {
	term: Terms;
	setTerm: React.Dispatch<React.SetStateAction<Terms>>;
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
	const [open, setOpen] = useState(false);
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
		<ul className=" z-50 w-max  flex items-center justify-center space-x-2 ">
			<button className="font-bold">{termPlaceholders[active]}</button>
			<span>|</span>
			{termOptions
				.filter((option) => option.value !== active)
				.map((item, idx) => (
					<button
						onClick={() => handleButtonClick(item.value)}
						className="font-light"
					>
						{`${item.placeholder}${idx === 0 ? ',' : ''}`}
					</button>
				))}
		</ul>
	);
}
function Header({ term, setTerm, title, banner }: Props) {
	return (
		<header>
			<div className=" flex flex-col justify-end h-[25rem] px-10 pt-10 pb-8 relative overflow-hidden">
				<div className="opacity-80">
					<Image
						src={banner}
						fill
						alt={`${title}-banner`}
						style={{ objectFit: 'cover' }}
					/>
				</div>

				<h2 className="text-black text-8xl font-black z-30 capitalize mb-8">
					{title}
				</h2>

				<TermDropdown term={term} setTerm={setTerm} />
			</div>
		</header>
	);
}

export default Header;
