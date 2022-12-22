import useSWR from 'swr';

const useWhitelistProof = (account: string, saleWhitelistIsActive: boolean): string => {
  /*
   * Whitelist Sale: Get Merkle Proof from API
   */
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const apiUrl = saleWhitelistIsActive ? `/api/merkle/${account}` : null;
  const { data: proof } = useSWR(apiUrl, fetcher);
  return proof ?? '';
};

export default useWhitelistProof;
