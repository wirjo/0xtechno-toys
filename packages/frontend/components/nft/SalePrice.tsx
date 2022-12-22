import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Element = ({ price }: { price: string }): JSX.Element => {
  if (parseFloat(price) > 0)
    return (
      <div className="mb-8 text-6xl">
        <FontAwesomeIcon icon={['fab', 'ethereum']} /> {price}{' '}
        <span className="text-lg">per NFT</span>
      </div>
    );
  else
    return (
      <div className="mb-8 text-6xl">
        <FontAwesomeIcon icon={['fab', 'ethereum']} /> Free Mint
        <div className="text-xs mt-2">
          *This is a free mint. Pay only for Ethereum transaction (gas) costs.
        </div>
      </div>
    );
};

export default Element;
