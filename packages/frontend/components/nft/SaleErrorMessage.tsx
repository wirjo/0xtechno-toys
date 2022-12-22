const SaleErrorMessage = ({ message }: { message: string }): JSX.Element => {
  if (message)
    return (
      <div className="mt-5 text-xs bg-red-100 text-red-800 p-3 max-w-full mx-auto">
        <b>Sorry, there is an error. Please try again!</b>
        <br />
        {message}
      </div>
    );

  return <></>;
};

export default SaleErrorMessage;
