import React, { useState } from "react";
import { CheckBox } from "react-native";
import { Wrapper, Texto, EditButton } from "./style";
import { TextWhite } from "../../../utils/styled";

export default function Conta(props) {
  const { title, bill, whenChecked, handleEditButton, paid } = props;
  const [state, setState] = useState({ checked: paid === true });

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
        R$ {bill ? bill : 0} -{" "}
      </Texto>
      <Texto decoration={state.checked ? "line-through" : "none"}>
        {title ? title : ""}
      </Texto>
      <EditButton onPress={handleEditButton}>
        <TextWhite>Edit</TextWhite>
      </EditButton>
    </Wrapper>
  );
}
