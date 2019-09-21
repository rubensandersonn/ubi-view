import React, { PureComponent } from "react";

import { Text, View } from "react-native";

import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton
} from "react-native-popup-dialog";
import { Wrapper, CenterView } from "./styles";

class Popup extends PureComponent {
  render() {
    const { visible, Content, onCancel, onConfirm } = this.props;

    return (
      <Wrapper>
        {/** pop up do encerrar */}
        <Dialog
          visible={visible}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom"
            })
          }
          dialogTitle={<DialogTitle title={""} />}
          footer={
            <DialogFooter>
              <DialogButton text="Cancelar" onPress={onCancel} />
              <DialogButton text="OK" onPress={onConfirm} />
            </DialogFooter>
          }
        >
          <DialogContent>
            <CenterView>
              <Content />
            </CenterView>
          </DialogContent>
        </Dialog>
      </Wrapper>
    );
  }
}

export default React.memo(Popup);
