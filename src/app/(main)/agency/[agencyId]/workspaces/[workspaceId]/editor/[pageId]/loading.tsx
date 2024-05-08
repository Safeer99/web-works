import React from "react";

const Loading = () => {
  return (
    <div className="fixed w-full inset-0 z-[100] bg-background px-10 flex flex-col items-center justify-center gap-12">
      <div
        className="loader-bg-text relative w-full max-w-[250px] text-center text-3xl text-white"
        data-text="LOADING..."
      >
        LOADING...
      </div>
      <div className="loader-bg relative w-full max-w-[300px] h-4 ">
        <div className="editor-loader h-2 w-full"></div>
      </div>
    </div>
  );
};

export default Loading;
