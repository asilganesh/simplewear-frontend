import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="flex flex-col justify-center items-center "
      style={{ height: "calc(100vh - 20vh)" }}
    >
      <BeatLoader size={20} />
    </div>
  );
};

export default Loader;
