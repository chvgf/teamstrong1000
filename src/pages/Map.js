import { Container as MapDiv } from "react-naver-maps";
import { NavermapsProvider } from "react-naver-maps";
import React, { useEffect, useRef } from "react";
import MapSetting from "../components/MapSetting";

function Map() {
  return (
    <NavermapsProvider ncpClientId="f00j7bpxaw">
      <MapDiv
        style={{
          position: "relative",
          width: "530px",
          height: "100vh",
          // ypjs3qi2oz 강
        }}
      >
        <MapSetting />
      </MapDiv>
    </NavermapsProvider>
  );
}

export default Map;
