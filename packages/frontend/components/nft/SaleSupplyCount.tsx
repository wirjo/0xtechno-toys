interface IStatusSupply {
  isSoldOut?: boolean;
  saleRemaining?: number;
}

const SaleSupplyCount = ({ status }: { status: IStatusSupply }): JSX.Element => {
  const { isSoldOut, saleRemaining } = status;

  return (
    <div className="block mb-1.5 mx-auto w-full text-center text-lg font-light">
      {isSoldOut ? (
        <span>Sold Out</span>
      ) : (
        <span>
          <b className="font-medium">{saleRemaining && saleRemaining.toLocaleString()}</b> NFTs
          remaining
        </span>
      )}
    </div>
  );
};

export default SaleSupplyCount;
