import React from "react";
import Loading from "./loading";
import BlurPage from "./blur-page";

const LoadingPage = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <BlurPage>
        <div className="flex flex-row justify-center !mt-25 items-center">
          <Loading></Loading>
        </div>
      </BlurPage>
    </div>
  );
};

export default LoadingPage;
