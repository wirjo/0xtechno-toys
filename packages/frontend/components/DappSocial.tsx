import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { twitterUrl, openseaUrl, sansaUrl } from '../conf/content';
import Image from 'next/image';
import LogoOpenSea from '../../frontend/public/images/logo-opensea.svg';
import LogoSansa from '../../frontend/public/images/logo-sansa.svg';

const DappSocial = (): JSX.Element => {
  return (
    <div className="flex gap-2 socials">
      <div>
        {/*
        <a rel="noreferrer" target="_blank" href={discordUrl}>
          <FontAwesomeIcon
            icon={['fab', 'discord']}
            className="h-full"
            inverse
            fixedWidth
            size="lg"
          />
        </a>
        */}
      </div>
      <div>
        <a rel="noreferrer" target="_blank" href={twitterUrl}>
          <FontAwesomeIcon
            icon={['fab', 'twitter']}
            className="h-full"
            inverse
            fixedWidth
            size="lg"
          />
        </a>
      </div>
      <div>
        <a className="social-opensea" rel="noreferrer" target="_blank" href={openseaUrl}>
          <Image src={LogoOpenSea} alt="" width={23} className="block px-1" />
        </a>
      </div>
      <div>
        <a className="social-opensea" rel="noreferrer" target="_blank" href={sansaUrl}>
          <Image src={LogoSansa} alt="" width={23} className="block px-1" />
        </a>
      </div>
    </div>
  );
};

export default DappSocial;
