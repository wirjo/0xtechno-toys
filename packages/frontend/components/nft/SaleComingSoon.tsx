import Countdown, { zeroPad } from 'react-countdown';

// const datePreSale = new Date("12 January 2022 23:00:00 GMT+0000");
const datePublicSale = new Date('13 January 2022 23:00:00 GMT+0000');

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  completed?: any;
}) => (
  <span>
    {zeroPad(days)}d {zeroPad(hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s
  </span>
);

const Element = (): JSX.Element => {
  return (
    <div className="bg-yellow-400 p-3 text-black text-center">
      <div className="mb-3">
        <div className="mb-0.5 font-light">Public Sale starting on 13 January 3PM PST</div>
        <div className="text-5xl font-medium">
          <Countdown date={datePublicSale} daysInHours={true} renderer={renderer} />
        </div>
      </div>
      <div>
        <div className="mt-0.5 font-light">Pre-sale for whitelisted members minting now</div>
      </div>
    </div>
  );
};

export default Element;
