import React from "react";
import { ShimmerTable } from "react-shimmer-effects";

function Loader() {
  return <ShimmerTable row={5} col={5} />;
}

export default Loader;