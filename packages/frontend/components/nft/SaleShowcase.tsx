// import Image from 'next/image';
// import ImageShowcase from '../../public/images/toys/techno-punk.jpeg';
import { WEBSITE_HOST_URL } from '../layout/Head';
import { useState } from 'react';
import Loading from './SaleLoading';

const SaleShowcase = ({ id }: any): JSX.Element => {
  return (
    <div className="p-1 mb-10 bg-white shadow-lg rounded-sm">
      <div
        className="bg-white relative max-w-full font-bold bg-1 border-gray-100 flex items-center justify-center"
        style={{ width: '500px', height: '500px' }}
      >
        <LiveImage id={id} />
      </div>
      <div className="my-2 text-center">Toys #{id}</div>
    </div>
  );
};

export default SaleShowcase;

const LiveImage = ({ id }: any): JSX.Element => {
  const urlLive = `${WEBSITE_HOST_URL}/api/toys/live-v1/` + id;
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 w-full h-full">
          <Loading />
        </div>
      )}
      <iframe
        id={`art-display-live-${id}`}
        className="art-display-live"
        width="100%"
        height="100%"
        src={urlLive}
        sandbox="allow-scripts allow-downloads allow-same-origin"
        loading="lazy"
        onLoad={() => setLoading(false)}
        allowFullScreen
        allow="fullscreen"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: '100%',
        }}
      ></iframe>
    </>
  );
};
