import styled from "styled-components/native";
import { lightGray, primaryEnd } from "../../utils/colors";

export const TitlePage = styled.Text`
  text-align: center;
  font-size: 20px;
  color: palevioletred;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 15px;
`;
export const Title = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin: 15px;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.View`
  padding: 10px;
  /* background: papayawhip; */
`;

export const WrapperList = styled.View`
  padding: 10px;
  margin: 10px;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-radius: 10px;
  border-top-color: ${lightGray};
  border-bottom-color: ${lightGray};
  height: 75%;
  /* background: papayawhip; */
`;

export const AddButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${primaryEnd};
  position: absolute;
  bottom: 15;
  right: 15;
  margin: 10;
  padding: 10;
  justify-content: center;
  align-items: center;
`;

export const EditMoneyButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${primaryEnd};
  position: absolute;
  top: 15px;
  right: 15px;
  margin: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const TextAddButton = styled.TouchableOpacity`
  font-weight: bold;
  font-size: 25;
  text-align: center;
  color: "#fefefe";
`;
