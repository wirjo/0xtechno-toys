import { useEthers } from '@usedapp/core';
import { Contract, ethers } from 'ethers';
import { useMemo } from 'react';

export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
): T | null {
  const { library } = useEthers();

  return useMemo(() => {
    if (!address) return null;

    if (library) {
      return new ethers.Contract(address, ABI, library && library.getSigner()) as T;
    } else {
      return { address: address, interface: ABI } as T;
    }
  }, [ABI, address, library]);
}
