import { BACKEND_URL } from "@env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styled } from "nativewind";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useGetGroup } from "../../hooks/useGetGroup";
import { useAuth } from "../context/AuthContext";

interface Props {
  url: string;
}

const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

async function joinGroupRequest(username: string, groupId: string) {
  const response = await fetch(`${BACKEND_URL}/api/groups/${groupId}/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
  });
  const data = await response.json();
  if (!data.updatedGroup) {
    throw new Error("Joining group failed");
  }
  return data;
}

export function JoinGroupModal({ url }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const groupId = url.split("/").pop();

  const queryClient = useQueryClient();
  const { username } = useAuth();
  const { data: group } = useGetGroup(groupId);
  const { mutateAsync } = useMutation({
    mutationFn: () => joinGroupRequest(username, groupId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["groups", username],
      });
      setModalVisible(false);
    },
  });

  return (
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
                You were invited to join group {group.name}
              </StyledText>

              <StyledPressable
                onPress={async () => {
                  await mutateAsync();
                }}
                className="bg-black px-4 py-3 rounded-lg mx-auto font-semibold"
              >
                <StyledText className="text-white">Join Group</StyledText>
              </StyledPressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}