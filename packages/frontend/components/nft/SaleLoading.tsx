import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = (): JSX.Element => (
  <div className="text-center py-5 px-10 flex items-center justify-center h-full">
    <div className="w-72 mx-auto text-5xl my-20">
      <FontAwesomeIcon icon="circle-notch" spin />
    </div>
  </div>
);

export default Loading;
