declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;
  export const ReactComponent: React.FC<SvgProps>;
  declare module "*.mp3";
}
