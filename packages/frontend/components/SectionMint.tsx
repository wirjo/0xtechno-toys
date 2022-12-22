import Mint from '../components/nft/Mint';
import DappElement from '../components/DappElement';
import NftArtifact from '../artifacts/contracts/Toy.sol/Toy.json';
import { useContract } from '../hooks/useContract';
import contractConfig from '../conf/config';
import { useTypedSelector } from '../redux/store';

const SectionMint = (): JSX.Element => {
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);
  const currentContractConfig = contractConfig[currentNetworkChainId];
  const nftContract = useContract(currentContractConfig.nft, NftArtifact.abi);

  return (
    <>
      <section id="section-mint" className="py-10">
        <div className="container px-5 mx-auto max-w-screen-lg">
          <DappElement contract={nftContract}>
            {nftContract ? <Mint contract={nftContract} /> : <></>}
          </DappElement>
        </div>
      </section>
    </>
  );
};

export default SectionMint;
