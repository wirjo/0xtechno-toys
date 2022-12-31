import DappSocial from './DappSocial';
import { footerDisclaimer } from '../conf/content';

const Section = (): JSX.Element => {
  return (
    <footer className="p-10 text-sm text-center text-black" style={{ backgroundColor: '#cd2826' }}>
      <div className="mx-auto text-center">
        <div className="flex justify-center">
          <DappSocial />
        </div>
      </div>
      <div className="text-xs my-5 max-w-screen-md mx-auto text-white opacity-70">
        {footerDisclaimer}
      </div>
    </footer>
  );
};

export default Section;
