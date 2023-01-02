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
            <div className="text-center my-20">
                <p className="text-5xl uppercase">Mint is now closed.</p><br/>Appreciate the support from everyone and cannot wait to explore the mints. Thank you!
                <br/><br/>
                <a className="underline" target="_blank" rel="noreferrer" href="https://twitter.com/0xTechno/status/1609727832984518656?cxt=HHwWgIDQ4e6789YsAAAA">Please your feedback and comments on Twitter.</a>
            </div>
          </DappElement>
        </div>
      </section>
    </>
  );
};

export default SectionMint;
