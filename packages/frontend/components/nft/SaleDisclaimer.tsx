const Element = ({ handleClick }: { handleClick: () => void }): JSX.Element => (
  <div className="max-w-sm text-xs mx-auto mt-3 text-justify opacity-50 font-light">
    By clicking the button above, you are agreeing to the{' '}
    <span className="underline cursor-pointer" onClick={handleClick}>
      Terms of Service
    </span>
    .
  </div>
);

export default Element;
