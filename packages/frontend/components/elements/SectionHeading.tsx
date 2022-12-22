const SectionHeading = ({
  className,
  children,
}: {
  className?: string;
  children: any;
}): JSX.Element => {
  return (
    <div
      className={'text-left text-white mb-5 uppercase font-bold text-xl md:text-2xl ' + className}
    >
      {children}
    </div>
  );
};

export default SectionHeading;
