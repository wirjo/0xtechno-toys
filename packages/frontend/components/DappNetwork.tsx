import NetworkMenu from './NetworkMenu';
import { useDispatch } from 'react-redux';
import { setCurrentNetworkChainId } from '../redux/app';
import { useTypedSelector } from '../redux/store';
import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';

const DappNetwork = (): JSX.Element => {
  const { account, chainId } = useEthers();
  const dispatch = useDispatch();
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);

  // Change network according to wallet
  useEffect(() => {
    if (chainId) dispatch(setCurrentNetworkChainId(chainId));
  }, [dispatch, chainId]);

  if (!account || chainId == 1) return <></>;
  else
    return (
      <NetworkMenu
        setNetwork={(chainId) => {
          dispatch(setCurrentNetworkChainId(chainId));
        }}
        currentNetworkChainId={currentNetworkChainId}
      />
    );
};

export default DappNetwork;
