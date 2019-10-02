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

import React, { Component } from "react";

import { View, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  actionAddBill,
  actionDeleteBill,
  actionUpdateBill,
  actionUpdateAllBills
} from "../../store/bills";

import { Total } from "../../components/BillsHandler/Conta/style";

import BillsHandler from "../../components/BillsHandler";
import AddForm from "../../components/AddForm";
import {
  getLocalStorageData,
  setLocalStorageData
} from "../../components/LocalStorage";
import Popup from "../../components/Popup";
import Conta from "../../components/BillsHandler/Conta";

const LS_KEYS = {
  bills: "@bills",
  money: "@money"
};

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    money: 1500,
    showFormBill: false,
    visiblePopup: false,
    billHolder: {
      title: "",
      bill: 0,
      paid: false
    }
  };

  async setBillsOnLocalStorage(newBills) {
    try {
      await AsyncStorage.setItem(
        LS_KEYS.bills,
        JSON.stringify({ bills: newBills })
      );
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  async getBillsOnLocalStorage() {
    try {
      const Bills = await AsyncStorage.getItem(LS_KEYS.bills);
      if (Bills !== null) {
        console.log(Bills);
        actionUpdateAllBills(JSON.parse(Bills).bills);
      }
    } catch (error) {
      console.log("erro ao pegar o LS", error);
    }
  }

  componentDidMount() {
    const { actionUpdateAllBills } = this.props;

    this.getBillsOnLocalStorage();

    // console.log("bills", this.props.bills);
    getLocalStorageData("@bills")
      .then(Bills => {
        if (Bills) {
          console.log("@found");
          actionUpdateAllBills(JSON.parse(Bills).bills);
        } else {
          console.log("@not found");
          actionUpdateAllBills([]);
        }
      })
      .catch(err => {
        console.log(err);
        actionUpdateAllBills([]);
      });

    // === getting money value ===

    getLocalStorageData("@money")
      .then(Money => {
        if (Money) {
          this.setState(state => ({
            ...this.state,
            money: JSON.parse(Money).money
          }));
        } else {
          this.setState(state => ({ ...this.state, money: 0 }));
        }
      })
      .catch(err => {
        console.log(err);
        this.setState(state => ({ ...this.state, money: 0 }));
      });
  }

  sumAll = bills => {
    let sum = 0.0;
    if (bills) {
      bills.forEach(el => {
        if (!el.paid) {
          sum = sum + parseFloat(el.bill);
        }
      });
    }
    return sum;
  };

  toggleShowForm = () => {
    this.setState(state => ({ ...state, showFormBill: !state.showFormBill }));
  };

  render() {
    const { money, billHolder, visiblePopup } = this.state;
    const { bills, actionUpdateBill } = this.props;
    return (
      <Wrapper behavior="padding">
        <View>
          <Title>Dinheiro do Mês: {money}</Title>
        </View>
        <WrapperList>
          {bills.map((el, index) => {
            return (
              <View key={index}>
                <Conta
                  title={el.title}
                  bill={el.bill}
                  handleEditButton={() => {
                    // handleEditButton(index);
                    console.log("edit", index);
                  }}
                  whenChecked={() => {
                    // handleCheck(index);
                    console.log("check", index);
                    actionUpdateBill({ ...el, paid: !el.paid }, el.id);
                  }}
                  checked={el.paid}
                />
              </View>
            );
          })}
        </WrapperList>

        <Total>Dívida: R$ {this.sumAll(bills)}</Total>

        <Total>Restante: R$ {money - this.sumAll(bills)}</Total>

        <AddButton
          onPress={() => {
            this.setState(state => ({ ...state, visiblePopup: true }));
          }}
        >
          <TextAddButton>+</TextAddButton>
        </AddButton>

        <Popup
          visible={visiblePopup}
          onCancel={() => {
            this.setState(state => ({ ...state, visiblePopup: false }));
          }}
          onConfirm={() => {
            //validate bill
            actionAddBill({
              ...this.state.billHolder,
              id:
                bills && bills.length !== 0 ? bills[bills.length - 1].id + 1 : 0
            });
            //erase bill holder
            this.setState(state => ({ ...state, visiblePopup: false }));
          }}
          Content={() => (
            <View>
              <TextInputName
                onChangeText={text => {
                  this.setState(state => ({
                    ...state,
                    billHolder: { ...state.billHolder, title: text }
                  }));
                }}
                value={billHolder.title}
              />
              <TextInputValue
                onChangeText={text => {
                  this.setState(state => ({
                    ...state,
                    billHolder: { ...state.billHolder, bill: text }
                  }));
                }}
                value={"" + billHolder.bill}
              />
            </View>
          )}
        />
      </Wrapper>
    );
  }
}

Home.navigationOptions = {
  headerTitle: <Titulo />
};

function Titulo() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TitlePage>App de Contas</TitlePage>
    </View>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { actionUpdateBill, actionUpdateAllBills, actionAddBill, actionDeleteBill },
    dispatch
  );

const mapStateToProps = state => ({
  bills: state.billsState
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
