import React, { useState } from "react";
import { View, CheckBox, Text } from "react-native";
import { Wrapper, Texto } from "./style";

// import { Container } from './styles';

export default function Conta(props) {
  const [state, setState] = useState({ checked: false });

  const { text, bill } = props;

  return (
    <Wrapper>
      <CheckBox
        value={state.checked}
        onValueChange={() => setState({ checked: !state.checked })}
      />
      <Texto decoration={state.checked ? "line-through" : "none"}>
        R$ {bill} -{" "}
      </Texto>
      <Texto decoration={state.checked ? "line-through" : "none"}>
        R$ {text}
      </Texto>
    </Wrapper>
  );
}
