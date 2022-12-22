import { ChainId } from '@usedapp/core';
import { useTypedSelector } from '../../redux/store';

const SaleContractDisplay = ({
  address,
  daoAddress,
}: {
  address: string;
  daoAddress?: string;
}): JSX.Element => {
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);
  const etherscanSubDomain = currentNetworkChainId == ChainId.Rinkeby ? 'rinkeby.' : '';
  const etherscanBaseUrl = `https://${etherscanSubDomain}etherscan.io/address/`;
  const network = currentNetworkChainId == 1 ? 'Mainnet' : 'Testnet';

  return (
    <div className="text-xs text-left opacity-20 text-center">
      Smart Contract ({network}):
      <a
        rel="noreferrer"
        target="_blank"
        className="underline hover:text-gray-800"
        href={`${etherscanBaseUrl}${address}`}
      >
        {address}
      </a>
      {daoAddress && (
        <div>
          Treasury:
          <a
            rel="noreferrer"
            target="_blank"
            className="underline hover:text-gray-800"
            href={`${etherscanBaseUrl}${daoAddress}`}
          >
            {daoAddress}
          </a>
        </div>
      )}
    </div>
  );
};

export default SaleContractDisplay;
