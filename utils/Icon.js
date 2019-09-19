import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";

export default function Icon(props) {
  return (
    <FontAwesomeIcon
      style={{ marginLeft: 10, marginRight: 10 }}
      icon={props.i ? props.i : "exclamation-circle"}
    />
  );
}
