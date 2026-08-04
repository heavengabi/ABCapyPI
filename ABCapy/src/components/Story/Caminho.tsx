import React from "react";
import Svg, { Path } from "react-native-svg";

export default function Caminho() {
  return (
    <Svg
      style={{ marginTop: 10 }}
      width="90%"
      height={1500}
      viewBox="0 0 371 1247"
    >
      <Path
        d="
      M110 20
      C60 80, 60 170, 185 170
      C310 170, 310 280, 110 300
      C-10 320, -10 430, 210 430
      C380 430, 380 560, 110 580
      C-10 600, -10 720, 210 720
      C380 720, 380 850, 110 870
      C-10 890, -10 1010, 210 1030
      C340 1045, 340 1160, 120 1210
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
