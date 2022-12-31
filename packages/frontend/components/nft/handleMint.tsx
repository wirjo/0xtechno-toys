import { utils, ethers } from 'ethers';
import { TransactionStatus } from '@usedapp/core';

const handleMint = async (
  contractCaller: {
    send: (...args: any[]) => Promise<void>;
    state: TransactionStatus;
    events: utils.LogDescription[] | undefined;
  },
  handleMintLoading: () => void,
  handleMintError: (arg: string) => void,
  numberToMint: number,
  price: string,
  maxByMint: number,
  proof?: string,
): Promise<void> => {
  // const safeGasLimitPerMint = 250000;

  if (numberToMint > maxByMint) {
    return handleMintError(`You can only mint ${maxByMint} at a time.`);
  }

  handleMintLoading();

  const options = {
    value: utils.parseEther(price).mul(numberToMint),
    // gasLimit: safeGasLimitPerMint * numberToMint,
    maxFeePerGas: ethers.utils.parseUnits('25', 'gwei'),
    maxPriorityFeePerGas: ethers.utils.parseUnits('2.5', 'gwei'),
  };

  await contractCaller.send(numberToMint, ...(proof ? [proof] : []), options);
};

export default handleMint;
