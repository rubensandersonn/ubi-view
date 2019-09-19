import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";

import { Wrapper, Title, TitlePage, WrapperList, AddButton } from "./styles";

import { TextInput } from "react-native-gesture-handler";
import { Total } from "../../components/BillsHandler/Conta/style";

import Icon from "../../utils/Icon";
import BillsHandler from "../../components/BillsHandler";

export default HomeScreen = () => {
  // === STATES ===

  // setting general state
  const [state, setState] = useState({
    showFormBill: false,
    billHolder: {
      key: -1,
      name: null,
      bill: null,
      toSum: false
    }
  });

  // setting bills state
  const [bills, setBills] = useState([
    {
      key: 0,
      name: "Passagens",
      bill: 70,
      toSum: true
    },
    {
      key: 1,
      name: "Cartão Americanas",
      bill: 25,
      toSum: true
    }
  ]);

  const [money, setMoney] = useState(0);

  // === CALLBACKS ===

  /**
   * handle text changes to the new bill
   * @param {*} text
   */
  const handleChangeName = text => {
    let holder = state.billHolder;
    holder.name = text;
    setState(state => ({ ...state, billHolder: holder }));
  };

  /**
   * handle text changes to the new bill
   * @param {*} text
   */
  const handleChangeBill = text => {
    let holder = state.billHolder;
    holder.bill = parseFloat(text);
    setState(state => ({ ...state, billHolder: holder }));
  };

  /**
   * gets the bill holded on state and put it on bill list
   */
  const addNewBill = () => {
    let newBill = {
      key: bills.length,
      name: state.billHolder.name,
      bill: state.billHolder.bill,
      toSum: true
    };

    bills.push(newBill);
  };

  /**
   * Sums all bills
   * @param {*} bills
   */
  const sumAll = bills => {
    let sum = 0;
    bills.forEach(el => {
      if (el.toSum) {
        sum = sum + el.bill;
      }
    });
    return sum;
  };

  const toggleShowForm = () => {
    setState(state => ({ ...state, showFormBill: !state.showFormBill }));
  };

  return (
    <Wrapper>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Title>
          <Icon i={"calendar-check"} /> Dinheiro do Mês: {money}
          <EditMoneyButton>
            <Icon i={"pencil-alt"} />
          </EditMoneyButton>
        </Title>
        <WrapperList>
          <BillsHandler
            handleCheck={(index, isChecked) => {
              bills[index].toSum = isChecked === true;
            }}
          />
        </WrapperList>
        <Total>
          <Icon i={"money-check"} /> Total: R$ {sumAll(bills)}
        </Total>
        <Total>
          <Icon i={"wallet"} /> Saldo: R$ {money - sumAll(bills)}
        </Total>

        {state.showFormBill ? (
          <WrapperForm>
            <TextInput
              placeholder="Nome da Conta"
              onChangeText={handleChangeName}
            />
            <TextInput
              placeholder="Valor da Conta"
              onChangeText={handleChangeBill}
            />
            <AddButton
              onPress={() => {
                addNewBill();
                toggleShowForm();
              }}
            >
              <TextAddButton>Add</TextAddButton>
            </AddButton>
          </WrapperForm>
        ) : (
          <AddButton onPress={toggleShowForm}>
            <TextAddButton>
              <Icon i={"plus"} />
            </TextAddButton>
          </AddButton>
        )}
      </KeyboardAvoidingView>
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
