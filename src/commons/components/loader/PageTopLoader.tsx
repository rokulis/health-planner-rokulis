export const PageTopLoader = () => {
  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 pointer-events-none h-1.5">
      <div className="h-1.5 w-full bg-transparent overflow-hidden">
        <div className="progress w-full h-full bg-primary left-right" />
      </div>
    </div>
  );
};
