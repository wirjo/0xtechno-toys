import Image from 'next/image';
import ImageShowcase from '../../public/images/toys/techno-punk.jpeg';

const SaleShowcase = (): JSX.Element => {
  return (
    <div className="p-1 mb-10 bg-white shadow-lg rounded-sm">
      <div
        className="bg-white max-w-full font-bold bg-1 border-gray-100 flex items-center justify-center"
        style={{ width: '450px', height: '450px' }}
      >
        <Image src={ImageShowcase}  alt="" />
      </div>
    </div>
  );
};

export default SaleShowcase;
