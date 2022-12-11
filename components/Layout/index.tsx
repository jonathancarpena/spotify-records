import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
	children?: JSX.Element | JSX.Element[] | React.ReactNode;
};

function Layout({ children }: Props) {
	const router = useRouter();
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
