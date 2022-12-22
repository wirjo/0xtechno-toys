interface IStatusProgress {
  saleProgress?: number;
}

const SaleTrancheProgressBar = ({ status }: { status: IStatusProgress }): JSX.Element => (
  <div id="sale-progress-bar" className="text-center mb-3 max-w-screen-xl mx-auto">
    <div className="relative">
      <div className="overflow-hidden h-3 text-xs flex rounded bg-black bg-opacity-10">
        <div
          style={{ width: status.saleProgress + '%' }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"
        ></div>
      </div>
    </div>
  </div>
);

export default SaleTrancheProgressBar;
