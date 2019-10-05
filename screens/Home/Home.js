import {
  Wrapper,
  Title,
  TitlePage,
  WrapperList,
  AddButton,
  EditMoneyButton,
  TextAddButton,
  TextInputName,
  TextInputValue,
  SaveButton,
  TitlePopup,
  RText,
  Total
} from "./styles";

import React, { Component, useCallback } from "react";

import { View, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  actionAddBill,
  actionDeleteBill,
  actionUpdateBill,
  actionUpdateAllBills
} from "../../store/bills";

import BillsHandler from "../../components/BillsHandler";
import AddForm from "../../components/AddForm";

import Popup from "../../components/Popup";
import Conta from "../../components/BillsHandler/Conta";
import { TextWhite } from "../../utils/styled";
import { darkGray } from "../../utils/colors";
import {
  getLocalStorageData,
  setLocalStorageData,
  LocalTypeKeys
} from "./LocalStorageHandler";
import { toast } from "../../utils/functions";

const { MONEY, BILLS } = LocalTypeKeys;

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    money: 0,
    showFormBill: false,
    visiblePopup: false,
    visiblePopupMoney: false,
    billHolder: {
      title: "",
      bill: 0,
      paid: false
    }
  };

  saveData = () => {
    // saving bills
    setLocalStorageData(BILLS, this.props.bills)
      .then(res => {
        toast("Contas salvas!");
      })
      .catch(error => {
        toast("Erro ao salvar as contas.");
      });
    // saving money
    setLocalStorageData(MONEY, this.state.money)
      .then(res => {
        toast("Dinheiro salvo!");
      })
      .catch(error => {
        toast("Erro ao salvar o dinheiro.");
      });
  };

  componentDidMount() {
    const { actionUpdateAllBills } = this.props;

    getLocalStorageData(BILLS)
      .then(Bills => {
        if (Bills) {
          actionUpdateAllBills(Bills);
        } else {
          actionUpdateAllBills([]);
        }
      })
      .catch(err => {
        console.log(err);
        actionUpdateAllBills([]);
      });

    // === getting money value ===

    getLocalStorageData(MONEY)
      .then(Money => {
        if (Money) {
          this.setState(state => ({
            ...state,
            money: Money
          }));
        } else {
          this.setState(state => ({ ...state, money: 0 }));
        }
      })
      .catch(err => {
        console.log(err);
        setMoney(0);
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

  Content = () =>
    useCallback(
      <View behavior="padding">
        <TitlePopup>Nome para a conta:</TitlePopup>
        <TextInputName
          onChangeText={text => {
            this.setState(state => ({
              ...state,
              billHolder: { ...state.billHolder, title: text }
            }));
          }}
          value={this.state.billHolder.title}
        />
        <TitlePopup>Valor da conta:</TitlePopup>
        <TextInputValue
          onChangeText={text => {
            this.setState(state => ({
              ...state,
              billHolder: { ...state.billHolder, bill: text }
            }));
          }}
          value={"" + this.state.billHolder.bill}
        />
      </View>,
      [this.state.billHolder]
    );

  ContentEditMoney = () =>
    useCallback(
      <View>
        <TitlePopup>Dinheiro do Mês:</TitlePopup>
        <TextInputValue
          onChangeText={text => {
            this.setState(state => ({
              ...state,
              money: text && text !== "" ? parseFloat(text) : 0
            }));
          }}
          value={"" + this.state.money}
        />
      </View>,
      [this.state.money]
    );

  render() {
    const { money, billHolder, visiblePopup, visiblePopupMoney } = this.state;
    const {
      bills,
      actionUpdateBill,
      actionAddBill,
      actionDeleteBill,
      actionUpdateAllBills
    } = this.props;

    return (
      <Wrapper behavior="padding">
        <View style={{ flexDirection: "row" }}>
          <Title>Dinheiro do Mês: {money}</Title>

          <EditMoneyButton
            onPress={() =>
              this.setState(state => ({ ...state, visiblePopupMoney: true }))
            }
          >
            <TextWhite>Edit</TextWhite>
          </EditMoneyButton>

          <SaveButton onPress={this.saveData}>
            <TextWhite>Save</TextWhite>
          </SaveButton>
        </View>
        <WrapperList>
          {bills && bills !== [] ? (
            bills.map((el, index) => {
              return (
                <View key={index}>
                  <Conta
                    title={el.title}
                    bill={el.bill}
                    handleEditButton={() => {
                      console.log("edit", index);
                    }}
                    whenChecked={() => {
                      actionUpdateBill({ ...el, paid: !el.paid }, el.id);
                    }}
                    paid={el.paid}
                  />
                </View>
              );
            })
          ) : (
            <RText>Nenhuma conta ainda...</RText>
          )}
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
            if (
              billHolder.title &&
              billHolder.title !== "" &&
              billHolder.bill &&
              billHolder.bill !== "" &&
              billHolder.bill > 0
            ) {
              actionAddBill({
                title: billHolder.title,
                paid: billHolder.paid,
                bill: billHolder.bill,
                id:
                  bills && bills.length !== 0
                    ? bills[bills.length - 1].id + 1
                    : 0
              });
            } else {
              toast("AM I JOKE TO YOU?");
            }
            //erase bill holder

            this.setState(state => ({ ...state, visiblePopup: false }));
          }}
          Content={this.Content}
        />

        {/* pop up edit money */}
        <Popup
          visible={visiblePopupMoney}
          onCancel={() => {
            this.setState(state => ({ ...state, visiblePopupMoney: false }));
          }}
          onConfirm={() => {
            this.setState(state => ({ ...state, visiblePopupMoney: false }));
          }}
          Content={this.ContentEditMoney}
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
