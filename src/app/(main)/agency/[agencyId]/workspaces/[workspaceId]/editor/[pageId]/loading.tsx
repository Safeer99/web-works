import React from "react";

const Loading = () => {
  return (
    <div className="fixed w-full top-0 bottom-0 left-0 right-0 z-[100] bg-background flex flex-col items-center justify-center gap-6">
      <div className="editor-loader h-3 border-[1px] border-muted max-w-[300px] w-full mx-10 "></div>
    </div>
  );
};

export default Loading;
