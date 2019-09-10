import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Wrapper, Title, TitlePage, WrapperList } from "./styles";

import Conta from "../../components/Conta";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { Total } from "../../components/Conta/style";
import Style from "../../utils/Style";
import { primaryEnd } from "../../utils/colors";

export default HomeScreen = props => {
  const bills = [
    {
      name: "Passagens",
      bill: 70
    },
    {
      name: "Cartão Americanas",
      bill: 25
    }
  ];

  /**
   * Mapeando as contas
   */
  const mapBills = bills.map((el, index) => {
    return (
      <View key={index}>
        <Conta text={el.name} bill={el.bill} />
      </View>
    );
  });

  return (
    <Wrapper>
      <Title>Dinheiro do Mês: 1500</Title>
      <WrapperList>
        <ScrollView>{mapBills}</ScrollView>
      </WrapperList>
      <Total>Total: R$ {sumAll(bills)}</Total>
      <Total>Saldo: R$ {1500 - sumAll(bills)}</Total>
      <TouchableHighlight
        onPress={() =>
          props.navigation.navigate("addNewBill", { onSubmit: () => {} })
        }
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
    </Wrapper>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: <Titulo />
};

function Titulo() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TitlePage>App de Contas</TitlePage>
    </View>
  );
}

const sumAll = bills => {
  let sum = 0;
  bills.forEach(el => {
    sum = sum + el.bill;
  });

  return sum;
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
