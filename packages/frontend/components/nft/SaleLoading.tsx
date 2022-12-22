import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = (): JSX.Element => (
  <div className="text-center py-5 px-10 mt-20">
    <div className="w-72 mx-auto text-5xl">
      <FontAwesomeIcon icon="spinner" spin />
    </div>
  </div>
);

export default Loading;
