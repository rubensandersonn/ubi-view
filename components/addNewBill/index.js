import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import Style from "../../utils/Style";

// import { Container } from './styles';

export default function addNewBill(props) {
  const { onSubmit } = props;
  const [state, setState] = useState({ name: null, bill: null });
  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => setState(state => ({ ...state, name: text }))}
        value={state.name}
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => setState(state => ({ ...state, bill: text }))}
        value={state.bill}
      />
      <TouchableHighlight
        onPress={() => {
          onSubmit(state.name, state.bill);
          props.navigation.goBack();
        }}
        style={[
          Style.button.RoundButtonGreen,
          {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: primaryEnd,
            position: "absolute",
            bottom: 15,
            right: 10
          }
        ]}
      >
        <Text style={[Style.button.TextWhiteButton, { fontSize: 25 }]}>+</Text>
      </TouchableHighlight>
    </View>
  );
}
