import { useEthers } from '@usedapp/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConnectWallet from '../ConnectWallet';

const SaleBuyButton = ({
  handleBuy,
  loading,
  status,
}: {
  handleBuy: () => void;
  loading: boolean;
  status: Record<string, any>;
}): JSX.Element => {
  const { account } = useEthers();

  if (!account)
    return (
      <div className="text-3xl">
        <ConnectWallet />
      </div>
    );

  // Configure button style
  const mintButtonClassBase =
    'flex w-full items-center justify-center py-2 px-4 border border-transparent shadow-sm text-3xl';
  const mintButtonClassDisabled = ' bg-black bg-opacity-50 text-white cursor-default';
  const mintButtonClassActive = ' bg-green-700 hover:bg-opacity-80 text-white';

  // Check whether button should be disabled based on overall sale status
  const isSaleClosed = !status.isSalePublicActive && !status.isSaleWhitelistActive;
  const isSoldOut = status.isSoldOut;

  // If whitelist sale, check whether button should be disabled
  const isWhitelistNotEligible = status.isSaleWhitelistActive && !status.isWhitelisted;
  const isWhitelistClaimed = status.isWhitelistClaimed;

  // Construct disabled status
  const disabled =
    !account ||
    loading ||
    isSoldOut ||
    isSaleClosed ||
    isWhitelistNotEligible ||
    isWhitelistClaimed;

  // Construct button class
  const buttonClass =
    mintButtonClassBase + (disabled ? mintButtonClassDisabled : mintButtonClassActive);

  // Determine button text
  let text = 'Buy';

  if (isSaleClosed) text = 'Sale Closed';
  else if (status.isSoldOut) text = 'Sold Out';
  else if (status.isNotWhitelisted) text = 'Not Eligible';
  else if (status.isWhitelistClaimed) text = 'Claimed';

  return (
    <button type="submit" onClick={handleBuy} disabled={disabled} className={buttonClass}>
      <div className="flex">
        {loading && <FontAwesomeIcon icon="circle-notch" className="mr-2 mt-0.5" spin />}
      </div>
      <div className="flex">{text}</div>
    </button>
  );
};

export default SaleBuyButton;
