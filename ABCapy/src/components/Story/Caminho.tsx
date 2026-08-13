import React from "react";
import Svg, { Path } from "react-native-svg";

export default function Caminho() {
  return (
    <Svg
      style={{ marginTop: 10 }}
      width="85%"
      height={1300}
      viewBox="0 0 360 1200"
    >
      <Path
        d="
          M115 20
          C70 80, 70 170, 185 170
          C295 170, 295 280, 115 300
          C10 320, 10 430, 205 430
          C345 430, 345 560, 115 580
          C10 600, 10 720, 205 720
          C345 720, 345 850, 115 870
          C10 890, 10 1010, 205 1030
          C310 1045, 310 1160, 125 1210
        "
        stroke="#C16E49"
        strokeWidth={70}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}