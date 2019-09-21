import React, { useState } from "react";
import { CheckBox } from "react-native";
import { Wrapper, Texto, EditButton, TextWhite } from "./style";

export default function Conta(props) {
  const [state, setState] = useState({ checked: false });

  const { text, bill, whenChecked, handleEditButton } = props;

  return (
    <Wrapper>
      <CheckBox
        value={state.checked}
        onValueChange={() => {
          setState({ checked: !state.checked });

          // telling main when i was checked
          whenChecked();
        }}
      />
      <Texto decoration={state.checked ? "line-through" : "none"}>
        R$ {bill} -{" "}
      </Texto>
      <Texto decoration={state.checked ? "line-through" : "none"}>{text}</Texto>
      <EditButton onPress={handleEditButton}>
        <TextWhite>Edit</TextWhite>
      </EditButton>
    </Wrapper>
  );
}
