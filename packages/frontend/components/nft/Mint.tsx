import { utils, Contract } from 'ethers';
import { TransactionStatus, useContractFunction, useEthers } from '@usedapp/core';
import React, { useEffect, useState } from 'react';
import { nftName, sansaUrl, openseaUrl } from '../../conf/content';
import SaleContractDisplay from './SaleContractDisplay';
import SaleTermsModal from './SaleTermsModal';
import SaleLoading from './SaleLoading';
import useReadContract from '../../hooks/useReadContract';
import SaleShowcase from './SaleShowcase';
import handleMint from './handleMint';
import useWhitelistProof from '../../hooks/useWhitelistProof';
import useSaleStatus from '../../hooks/useSaleStatus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Mint = ({ contract }: { contract: Contract }): JSX.Element => {
  /*
   * Declare React States
   */
  const [inputDisabled, setInputDisabled] = useState(false);
  const [numberToMint, setNumberToMint] = useState(1);
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
    // saleWhitelistIsActive: false,
    // isWhitelistClaimed: false,
    saleWhitelistIsActive: useReadContract(contract, 'saleWhitelistIsActive'),
    isWhitelistClaimed: useReadContract(contract, 'isWhitelistClaimed', [account]),
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

  function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const [randToy, setRandToy] = useState(randomIntFromInterval(1, 569));

  if (!displaySale) return <SaleLoading />;
  else
    return (
      <div>
        <div className="md:flex justify-center items-center gap-10">
            <div className="">
                <div className="text-3xl mb-3">Mint Closed.</div>
                Thank you for all your support.<br/><br/>
                Buy on <a rel="noferrer" className="underline" href={sansaUrl}>Sansa</a> or <a rel="noferrer" className="underline" href={openseaUrl}>OpenSea</a>.<br/><br/>

                <a className="p-3 border border-black cursor-pointer mt-3 hover:bg-black hover:text-white inline-block" onClick={()=> { setRandToy(randomIntFromInterval(1, 569)) }}><FontAwesomeIcon icon="wave-square"></FontAwesomeIcon> Surf Collection #{randToy}</a>
            </div>
            <div className="flex justify-center max-w-screen-xs">
                <SaleShowcase id={randToy} />
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
