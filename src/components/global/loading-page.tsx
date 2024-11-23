import React from "react";
import Loading from "./loading";
import BlurPage from "./blur-page";

const LoadingPage = () => {
  return (
    <BlurPage>
      <div className="h-full w-full flex justify-center items-center">
        <Loading></Loading>
      </div>
    </BlurPage>
  );
};

export default LoadingPage;
