import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";

export const AppProgress: React.FC<{}> = props => (
  <LinearProgress
    style={{
      position: "absolute",
      top: "4rem",
      left: "0",
      height: "0.4rem",
      width: "100%"
    }}
  />
);