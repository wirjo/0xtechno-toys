const useSaleStatus = (sale: any): Record<string, boolean | number> => {
  const {
    salePublicIsActive,
    saleWhitelistIsActive,
    whitelistProof,
    isWhitelistClaimed,
    totalSupply,
    maxSupply,
    totalPublicSupply,
    maxPublicSupply,
  } = sale;

  const saleStatus = {
    isSalePublicActive: salePublicIsActive,
    isSaleWhitelistActive: saleWhitelistIsActive,
    isWhitelisted: saleWhitelistIsActive && whitelistProof.length > 0,
    isWhitelistClaimed: saleWhitelistIsActive && isWhitelistClaimed,
    isSoldOut: parseInt(totalPublicSupply) >= parseInt(maxPublicSupply),
    saleRemaining: (parseInt(maxPublicSupply) - parseInt(totalPublicSupply)) as number,
    saleProgress: ((parseInt(totalSupply) / parseInt(maxSupply)) * 100) as number,
  };

  return saleStatus;
};

export default useSaleStatus;
