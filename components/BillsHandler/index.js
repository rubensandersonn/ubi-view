import React from "react";
import { ScrollView } from "react-native";
import Conta from "./Conta";

export default function BillsHandler(props) {
  const { bills, handleCheck } = props;
  const mapBills = bills.map((el, index) => {
    return (
      <View key={index}>
        <Conta
          text={el.name}
          bill={el.bill}
          whenChecked={() => {
            handleCheck(index, isChecked);
          }}
        />
      </View>
    );
  });

  return <ScrollView>{mapBills}</ScrollView>;
}
