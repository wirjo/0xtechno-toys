import { Contract } from 'ethers';
import { useContractCall } from '@usedapp/core';

const useReadContract = (contract: Contract, method: string, args?: any[]): any => {
    const [v] = useContractCall({
        address: contract.address,
        abi: contract.interface,
        method: method,
        args: args ?? [],
    }) ?? [false];
    return v && v.toString();
};

export default useReadContract;
