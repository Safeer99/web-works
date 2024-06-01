import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed w-full inset-0 z-[100] bg-background px-10 flex flex-col items-center justify-center gap-12">
      <div className="w-full max-w-[250px] flex items-center justify-center">
        <Image src="/logo.svg" alt="logo" width={150} height={150} />
      </div>
      <div className="loader-bg relative w-full max-w-[300px] h-4">
        <div className="editor-loader h-1 w-full"></div>
      </div>
    </div>
  );
};

export default Loading;
