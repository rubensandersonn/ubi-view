import styled from "styled-components/native";
import { gray, darkGray, white } from "../../utils/colors";

export const Texto = styled.Text.attrs(props => ({
  decoration: props.decoration
}))`
  font-size: 18px;
  text-align: center;
  color: ${darkGray};
  text-decoration: ${props => props.decoration || "none"};
`;

export const TextWhite = styled.Text`
  font-size: 14px;
  margin-left: 2%;
  color: ${white};
  padding: 2%;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: row;
  /* background: papayawhip; */
`;

export const EditButton = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
  border-radius: 10px;
  background-color: ${gray};
  position: absolute;
  right: 10px;
  top: 8px;

  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const Line = styled.ScrollView`
  max-width: 70%;
`;
