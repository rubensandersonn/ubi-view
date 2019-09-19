import styled from "styled-components/native";
import { darkGray } from "../../../utils/colors";

export const Texto = styled.Text.attrs(props => ({
  decoration: props.decoration
}))`
  font-size: 18px;
  text-align: center;
  color: ${darkGray};
  text-decoration: ${props => props.decoration || "none"};
`;

export const Total = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-left: 2%;
  padding: 2%;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.View`
  padding: 10px;
  flex-direction: row;
  /* background: papayawhip; */
`;
