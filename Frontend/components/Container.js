const Container = ({ children, className }) => {
  return (
    <div
      className={`m-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-[64px] z-10 relative ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
