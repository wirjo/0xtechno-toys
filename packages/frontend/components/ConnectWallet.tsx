/* eslint-disable @next/next/no-img-element */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEthers } from '@usedapp/core';
import React, { useState } from 'react';
import { walletconnect, walletlink } from '../lib/connectors';
import Modal from './Modal';

function ConnectWallet(): JSX.Element {
  const { activate, activateBrowserWallet } = useEthers();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <button
          className="w-full items-center text-center px-4 py-2 shadow-sm text-white font-medium rounded-sm bg-black border border-black hover:bg-black hover:text-white hover:border hover:border-black"
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          <FontAwesomeIcon icon="wallet" className="mr-3" />
          Connect
        </button>
      </div>
      <Modal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      >
        <div className="flex flex-col">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => {
              activateBrowserWallet();
            }}
          >
            <img src="images/logo-metamask.png" className="w-5 mr-5" alt="metamask-logo" />
            MetaMask
          </button>
          <button
            className="inline-flex items-center px-4 py-2 mt-5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => {
              activate(walletconnect);
            }}
          >
            <img src="images/logo-walletconnect.svg" className="w-5 mr-5" alt="metamask-logo" />
            WalletConnect
          </button>

          <button
            className="inline-flex items-center px-4 py-2 mt-5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => {
              activate(walletlink);
            }}
          >
            <img src="images/logo-coinbase.png" className="w-5 mr-5" alt="walletlink-logo" />
            Coinbase Wallet &nbsp; <span className="text-xs">(via WalletLink)</span>
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ConnectWallet;
