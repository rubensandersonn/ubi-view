import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useCallback } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";

import {
  Wrapper,
  Title,
  TitlePage,
  WrapperList,
  AddButton,
  EditMoneyButton,
  TextAddButton,
  TextWhite,
  TextInputName,
  TextInputValue
} from "./styles";

import { Total } from "../../components/BillsHandler/Conta/style";

import BillsHandler from "../../components/BillsHandler";
import AddForm from "../../components/AddForm";
import {
  getLocalStorageData,
  setLocalStorageData
} from "../../components/LocalStorage";
import Popup from "../../components/Popup";

export default HomeScreen = () => {
  // === STATES ===

  // setting general state
  const [state, setState] = useState({
    showFormBill: false,
    showFormMonthMoney: false,
    moneyHolder: 0,
    visibleEditPopup: false,
    indexDaVez: -1,
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
  const handleChangeMonthMoney = text => {
    setState(state => ({ ...state, moneyHolder: text }));
  };

  /**
   * handle text changes to the new bill
   * @param {*} text
   */
  const handleEditName = text => {
    let holder = state.billHolder;
    holder.bill = text.nativeEvent.text;
    setState(state => ({ ...state, billHolder: holder }));
  };

  /**
   * handle text changes to the new bill
   * @param {*} text
   */
  const handleEditBill = text => {
    let holder = state.billHolder;
    holder.bill = text.nativeEvent.text;

    setState(state => ({ ...state, billHolder: holder }));
  };

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

  const updateConta = () => {
    let holder = bills;
    holder[state.indexDaVez].name = state.billHolder.name;
    holder[state.indexDaVez].bill = state.billHolder.bill;
    setBills(holder);

    updateBillsOnLocalStorage();
  };

  /**
   * gets the bill holded on state and put it on bill list
   */
  const addNewBill = () => {
    let newBill = {
      key: bills ? bills.length : 0,
      name: state.billHolder.name,
      bill: state.billHolder.bill,
      toSum: true
    };

    bills ? bills.push(newBill) : setBills([newBill]);
    updateBillsOnLocalStorage();
  };

  /**
   * gets the bill holded on state and put it on bill list
   */
  const updateMoney = () => {
    setMoney(state.moneyHolder);
    updateMoneyOnLocalStorage();
  };

  /**
   * Sums all bills
   * @param {*} bills
   */
  const sumAll = bills => {
    let sum = 0;
    if (bills) {
      bills.forEach(el => {
        if (el.toSum) {
          sum = sum + el.bill;
        }
      });
    }
    return sum;
  };

  const toggleShowForm = () => {
    setState(state => ({ ...state, showFormBill: !state.showFormBill }));
  };

  const toggleShowFormMoney = () => {
    setState(state => ({
      ...state,
      showFormMonthMoney: !state.showFormMonthMoney
    }));
  };

  const updateMoneyOnLocalStorage = () => {
    setLocalStorageData("@money", JSON.stringify({ money: money }))
      .then(res => {
        console.log("salvou money?", res);
      })
      .catch(err => console.log(err));
  };

  const updateBillsOnLocalStorage = () => {
    setLocalStorageData("@bills", JSON.stringify({ bills: bills }))
      .then(res => {
        console.log("salvou bill?", res);
      })
      .catch(err => console.log(err));
  };

  // === retrieving data from local storage ===
  useEffect(() => {
    // === getting bills ===
    getLocalStorageData("@bills")
      .then(Bills => {
        if (Bills) {
          setBills(JSON.parse(Bills).bills);
        } else {
          setBills(null);
        }
      })
      .catch(err => {
        console.log(err);
        setBills(null);
      });

    // === getting money value ===

    getLocalStorageData("@money")
      .then(Money => {
        if (Money) {
          setMoney(JSON.parse(Money).money);
        } else {
          setMoney(0);
        }
      })
      .catch(err => {
        console.log(err);
        setMoney(0);
      });
  }, []);

  return (
    <Wrapper behavior="padding">
      <View>
        <Title>Dinheiro do Mês: {money}</Title>
        <EditMoneyButton onPress={toggleShowFormMoney}>
          <TextWhite>Edit</TextWhite>
        </EditMoneyButton>
      </View>

      {/* add new bill */}

      <AddForm
        show={state.showFormBill}
        inputList={[
          {
            placeholder: "Nome da Conta",
            handleChange: handleChangeName
          },
          {
            placeholder: "Valor da Conta",
            handleChange: handleChangeBill
          }
        ]}
        onCancel={() => {
          toggleShowForm();
        }}
        onConfirm={() => {
          addNewBill();
          toggleShowForm();
        }}
      />

      {/* edit money */}
      <AddForm
        show={state.showFormMonthMoney}
        inputList={[
          {
            placeholder: "Dinheiro do Mês",
            handleChange: handleChangeMonthMoney
          }
        ]}
        onCancel={() => {
          toggleShowFormMoney();
        }}
        onConfirm={() => {
          updateMoney();
          toggleShowFormMoney();
        }}
      />

      <WrapperList>
        <BillsHandler
          bills={bills}
          handleCheck={index => {
            bills[index].toSum = !bills[index].toSum;
          }}
          handleEditButton={index => {
            const holder = bills[index];

            setState(state => ({
              ...state,
              visibleEditPopup: true,
              billHolder: holder,
              indexDaVez: index
            }));
          }}
        />
      </WrapperList>

      <Total>Dívida: R$ {sumAll(bills)}</Total>

      <Total>Restante: R$ {money - sumAll(bills)}</Total>

      {!state.showFormBill && (
        <AddButton onPress={toggleShowForm}>
          <TextAddButton>
            <Text>+</Text>
          </TextAddButton>
        </AddButton>
      )}

      {/* edit popup */}
      <Popup
        visible={state.visibleEditPopup}
        onCancel={() => {
          setState(state => ({ ...state, visibleEditPopup: false }));
        }}
        onConfirm={() => {
          setState(state => ({ ...state, visibleEditPopup: false }));
          updateConta();
        }}
        Content={useCallback(
          () => (
            <View>
              <TextInputName
                onChangeText={handleChangeName}
                value={state.billHolder.name ? "" + state.billHolder.name : ""}
              />
              <TextInputValue
                onChangeText={handleChangeBill}
                value={state.billHolder.bill ? "" + state.billHolder.bill : "0"}
              />
            </View>
          ),
          [state.visibleEditPopup]
        )}
      />
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
