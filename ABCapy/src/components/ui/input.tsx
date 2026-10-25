
import React from "react";
import { TextInput } from "react-native";

type InputProps = {
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
};

export function Input(props: InputProps) {
  return (
    <TextInput
      value={props.value}
      
      placeholder={props.placeholder}
    />
  );
}


