import React from 'react';
import { View } from 'react-native';

import ImagemCapivara from '../../assets/images/Group.svg'; 

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 200, height = 200 }: LogoProps) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      
      <ImagemCapivara width={width} height={height} />
    </View>
  );
}
