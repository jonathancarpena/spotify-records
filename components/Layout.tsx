import React from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

type Props = {
  children?: JSX.Element | JSX.Element[] | React.ReactNode;
};

function Layout({ children }: Props) {
  const router = useRouter();
  const nonDashboardStyles =
    'relative min-h-screen space-y-8 md:space-y-16 lg:space-y-20 overflow-hidden md:max-w-7xl md:mx-auto text-black dark:text-white justify-center flex flex-col md:w-full  px-5 py-12 md:py-20';

  return (
    <>
      <div className=' bg-light-main dark:bg-dark-mainHover font-main'>
        {router.asPath.includes('dashboard') ? (
          <main>{children}</main>
        ) : (
          <>
            <Navbar />
            <main className={nonDashboardStyles}>{children}</main>
          </>
        )}
      </div>
    </>
  );
}

export default Layout;
