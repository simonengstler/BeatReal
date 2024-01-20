import { styled } from "nativewind";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  Pressable,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import * as Clipboard from "expo-clipboard";

type Props = {
  groupId: string;
};

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export function InviteFriendsButton({ groupId }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  console.log({ groupId });
  return (
    <>
      <StyledPressable
        className="mx-auto border-2 bg-white rounded-lg px-4 py-2"
        onPress={() => setModalVisible(true)}
      >
        <StyledText className="font-bold text-lg">Invite Friends</StyledText>
      </StyledPressable>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: "50%",
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: "white",
                }}
              >
                <StyledText className="text-center font-bold text-3xl pt-6 tracking-tighter">
                  Invite others to join your group!
                </StyledText>

                <StyledTextInput
                  className="border-slate-400 rounded-lg border-2 px-5 py-3 mb-3 mt-4 text leading-[0px] text-black"
                  textContentType="URL"
                  selectTextOnFocus={false}
                  value={`beatreal://group/${groupId}`}
                  autoCapitalize="none"
                />

                <StyledPressable
                  onPress={() =>
                    Clipboard.setStringAsync(`beatreal://group/${groupId}`)
                  }
                  className="bg-black px-4 py-3 rounded-lg mx-auto font-semibold"
                >
                  <StyledText className="text-white">
                    Copy to Clipboard
                  </StyledText>
                </StyledPressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
