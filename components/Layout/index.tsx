import React from 'react';

type Props = {
	children?: JSX.Element | JSX.Element[] | React.ReactNode;
};

function Layout({ children }: Props) {
	return (
		<>
			<div className=" bg-white">
				{/* <Navbar /> */}
				<main className="relative font-main">{children}</main>
				{/* <Footer /> */}
			</div>
		</>
	);
}

export default Layout;
