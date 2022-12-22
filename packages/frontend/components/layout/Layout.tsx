import { Disclosure } from '@headlessui/react';
import { useNotifications } from '@usedapp/core';
import React from 'react';
import Snackbar, { SnackSeverity } from '../Snackbar';
import DappMenu from '../DappMenu';
import DappSocial from '../DappSocial';
import Footer from '../Footer';
import Image from 'next/image';
import ImageLogo from '../../public/images/toys/techno-punk.jpeg';
import Nav from '../Nav';
import DappNetwork from '../DappNetwork';

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any;
  }
}

const TRANSACTION_TITLES: Record<string, { text: string; type: SnackSeverity }> = {
  transactionStarted: { text: 'Transaction Started...', type: 'pending' },
  transactionSucceed: { text: 'Transaction Completed !', type: 'success' },
  transactionFailed: { text: 'Transaction Failed :(', type: 'error' },
  walletConnected: { text: 'Wallet Connected Successfully !', type: 'success' },
};

const Layout = ({
  children,
  hero = null,
}: {
  children: any;
  hero?: JSX.Element | null;
}): JSX.Element => {
  const { notifications } = useNotifications();

  return (
    <div className="flex flex-col overflow-hidden">
      <header className={hero ? 'hero-bg' : ''}>
        <div className="header">
          <div className="container max-w-screen-xl mx-auto">
            <Disclosure as="nav" className="px-1">
              {() => (
                <>
                  <div className="mx-auto px-2">
                    <div className="relative md:flex justify-center md:justify-between">
                      <div className="flex justify-center items-center">
                        <div className="logo">
                          <Image src={ImageLogo} width={70} height={70} alt="" />
                        </div>
                      </div>
                      <div className="md:flex md:items-center md:absolute md:inset-y-0 md:right-0 mt-5 md:mt-0">
                        <div className="hidden md:flex">
                          <Nav />
                        </div>
                        <div className="hidden md:flex">
                          <DappSocial />
                          <DappNetwork />
                        </div>
                        <div className="text-center mx-auto">
                          <DappMenu />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Disclosure>
          </div>
        </div>
        {hero}
      </header>

      <main className="flex-grow relative">
        {children}

        <div className="absolute bottom-0 left-0 w-full p-2 flex flex-col">
          {notifications.map((notif) => {
            const message = TRANSACTION_TITLES[notif.type].text;
            const severity = TRANSACTION_TITLES[notif.type].type;

            return (
              <div className="mt-2" key={notif.id}>
                <Snackbar message={message} severity={severity} />
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
