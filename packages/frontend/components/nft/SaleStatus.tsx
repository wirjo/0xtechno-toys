import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SaleNotice = ({
  icon,
  children,
}: {
  icon?: IconProp;
  children: string | JSX.Element;
}): JSX.Element => {
  const noticeClass = 'mb-10 bg-black bg-opacity-20 p-5 text-sm';

  return (
    <div className={noticeClass}>
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {children}
    </div>
  );
};

const SaleStatusClosed = (): JSX.Element => (
  <SaleNotice icon="info-circle">Sale is closed</SaleNotice>
);

const SaleWhitelistClaimed = (): JSX.Element => (
  <SaleNotice icon="info-circle">You have claimed your whitelist mint.</SaleNotice>
);

const SaleWhitelistEligible = (): JSX.Element => (
  <SaleNotice icon="check-circle">Congratulations, your wallet is whitelisted.</SaleNotice>
);

const SaleWhitelistNotEligible = (): JSX.Element => (
  <SaleNotice icon="exclamation-triangle">Sorry, you are not in the whitelist.</SaleNotice>
);

interface ISalePublicStatus {
  isSalePublicActive?: boolean;
  isSoldOut?: boolean;
}

interface ISaleWhitelistStatus {
  isSaleWhitelistActive?: boolean;
  isWhitelisted?: boolean;
  isWhitelistClaimed?: boolean;
}

interface ISaleStatus extends ISalePublicStatus, ISaleWhitelistStatus {}

const SaleStatus = ({ status }: { status: ISaleStatus }): JSX.Element => {
  const isSaleClosed = !status.isSalePublicActive && !status.isSaleWhitelistActive;

  if (isSaleClosed) return <SaleStatusClosed />;

  if (status.isSaleWhitelistActive) {
    if (!status.isWhitelisted) return <SaleWhitelistNotEligible />;
    else if (status.isWhitelisted && !status.isWhitelistClaimed) return <SaleWhitelistEligible />;
    else if (status.isWhitelisted && status.isWhitelistClaimed) return <SaleWhitelistClaimed />;
  }

  // By default, return no status
  return <></>;
};

export default SaleStatus;
