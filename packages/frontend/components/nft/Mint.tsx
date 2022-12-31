import { utils, Contract } from 'ethers';
import { TransactionStatus, useContractFunction, useEthers } from '@usedapp/core';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nftName } from '../../conf/content';
import SaleProgressBar from './SaleProgressBar';
import SaleSupplyCount from './SaleSupplyCount';
import SaleContractDisplay from './SaleContractDisplay';
import SaleTermsModal from './SaleTermsModal';
import SaleLoading from './SaleLoading';
import useReadContract from '../../hooks/useReadContract';
import SaleStatus from './SaleStatus';
import SaleShowcase from './SaleShowcase';
import SaleErrorMessage from './SaleErrorMessage';
import SaleDisclaimer from './SaleDisclaimer';
import SalePrice from './SalePrice';
import handleMint from './handleMint';
import SaleBuyButton from './SaleBuyButton';
import useWhitelistProof from '../../hooks/useWhitelistProof';
import useSaleStatus from '../../hooks/useSaleStatus';

const Mint = ({ contract }: { contract: Contract }): JSX.Element => {
  /*
   * Declare React States
   */
  const [inputDisabled, setInputDisabled] = useState(false);
  const [numberToMint, setNumberToMint] = useState(2);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { account } = useEthers();

  /*
   * Get live data from contract
   * Using useDapp Custom Hooks
   */

  const sale = {
    price: '',
    priceInWei: useReadContract(contract, 'fixedPrice'),
    maxByMint: useReadContract(contract, 'maxByMint') as number,
    salePublicIsActive: useReadContract(contract, 'salePublicIsActive'),
    totalSupply: useReadContract(contract, 'totalSupply'),
    maxSupply: useReadContract(contract, 'maxSupply'),
    totalPublicSupply: useReadContract(contract, 'totalPublicSupply'),
    maxPublicSupply: useReadContract(contract, 'maxPublicSupply'),
    daoAddress: useReadContract(contract, 'daoAddress'),
    saleWhitelistIsActive: false,
    isWhitelistClaimed: false,
    // saleWhitelistIsActive: useReadContract(contract, 'saleWhitelistIsActive'),
    // isWhitelistClaimed: useReadContract(contract, 'isWhitelistClaimed', [account]),
    whitelistProof: '',
    status: {},
  };

  /*
   * Calculate sale statuses
   */
  sale.price = sale.priceInWei && utils.formatEther(sale.priceInWei);
  sale.whitelistProof = useWhitelistProof(account ?? '', sale.saleWhitelistIsActive);
  sale.status = useSaleStatus(sale);

  /*
   * General Mint State Handlers
   */
  const handleMintLoading = (): void => {
    setInputDisabled(true);
    setErrorMessage('');
  };

  const handleMintState = (state: TransactionStatus): void => {
    const { status, errorMessage } = state;
    if (status != 'Mining') setInputDisabled(false);
    if (errorMessage) setErrorMessage(errorMessage);
  };

  /*
   * Mint Public
   */
  const mintPublicCaller = useContractFunction(contract, 'mintPublic', {});
  useEffect(() => handleMintState(mintPublicCaller.state), [mintPublicCaller.state]);

  /*
   * Mint Whitelist
   */
  const mintWhitelistCaller = useContractFunction(contract, 'mintWhitelist', {});
  useEffect(() => handleMintState(mintWhitelistCaller.state), [mintWhitelistCaller.state]);

  /*
   * Route buy button to the appropriate mint
   */
  const handleBuy = () => {
    return handleMint(
      sale.saleWhitelistIsActive ? mintWhitelistCaller : mintPublicCaller,
      handleMintLoading,
      setErrorMessage,
      numberToMint,
      sale.price,
      sale.maxByMint,
      sale.saleWhitelistIsActive ? sale.whitelistProof : undefined,
    );
  };

  /*
   * Input Props
   */
  const SaleInputNumber = ({
    name,
    value,
    max,
    disabled,
  }: {
    name: string;
    value: number;
    max: number;
    disabled: boolean;
  }): JSX.Element => {
    const inputClass =
      'shadow-sm text-3xl bg-white text-black text-center block w-full border-black';

    const inputProps = {
      type: 'number',
      name: name,
      id: name,
      placeholder: `Enter 1 - ${max}`,
      autoComplete: 'off',
      value: value,
      onChange: (e: any) => {
        const { value, maxLength } = e.target;
        const v = value.slice(0, maxLength);
        setNumberToMint(parseInt(v));
      },
      min: 1,
      size: 2,
      maxLength: max.toString().length,
      max: max,
      disabled: disabled,
    };

    return (
      <div className="mb-5">
        <p className="mb-2 text-sm">Type amount to mint below</p>
        <input className={inputClass} {...inputProps} />
      </div>
    );
  };

  const displaySale = sale.maxByMint;

  if (!displaySale) return <SaleLoading />;
  else
    return (
      <div>
        <SaleSupplyCount status={sale.status} />
        <SaleProgressBar status={sale.status} />

        <div className="md:flex justify-center items-center gap-10 my-12">
          <div className="flex justify-center max-w-screen-xs">
            <SaleShowcase id={sale.totalSupply} />
          </div>

          <div className="flex flex-col justify-center w-xs text-center px-10">
            <SaleStatus status={sale.status} />
            <SalePrice price={sale.price} />
            <SaleInputNumber
              name="numberToMint"
              value={numberToMint}
              max={sale.maxByMint}
              disabled={!account || inputDisabled}
            />
            <SaleBuyButton handleBuy={handleBuy} loading={inputDisabled} status={sale.status} />
            <SaleErrorMessage message={errorMessage} />
            <SaleDisclaimer handleClick={() => setOpen(true)} />

            <div className="block text-sm mt-5">
              <div>Max. {sale.maxByMint} per mint &nbsp;</div>

              <div className="inline-block font-medium mt-1.5">
                <FontAwesomeIcon icon={'check-circle'} className="mr-1" /> Gas optimized smart
                contract
              </div>
            </div>
          </div>
        </div>

        <SaleTermsModal
          nftName={nftName}
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
        <SaleContractDisplay address={contract.address} daoAddress={sale.daoAddress} />
      </div>
    );
};

export default Mint;
