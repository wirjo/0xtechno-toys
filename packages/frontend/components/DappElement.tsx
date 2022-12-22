import { useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import { ChainId } from '@usedapp/core';
import { useTypedSelector } from '../redux/store';

const DappElement = ({
  children,
  contract,
}: {
  children: JSX.Element;
  contract?: Contract | null;
}): JSX.Element => {
  const { account, chainId } = useEthers();
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);

  const isCorrectChain = chainId === currentNetworkChainId;
  const correctNetworkName =
    currentNetworkChainId == ChainId.Rinkeby ? 'Rinkeby Test Network' : 'Ethereum Mainnet';

  const noticeClass = 'bg-black text-white p-4 rounded-sm text-md mb-10';

  const ErrorConnectToCorrectNetwork = () => (
    <div className={noticeClass}>
      <p className="text-center">
        Please change your wallet to connect to <b>{correctNetworkName}</b>.
      </p>
    </div>
  );

  const ErrorSmartContract = () => (
    <div className={noticeClass}>
      <p className="text-center">Error: smart contract is not available</p>
    </div>
  );

  if (!contract) return <ErrorSmartContract />;

  return (
    <div>
      {account && !isCorrectChain && <ErrorConnectToCorrectNetwork />}
      {children}
    </div>
  );
};

export default DappElement;
