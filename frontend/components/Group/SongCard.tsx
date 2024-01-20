import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { Song } from "../../types/database";
import { styled } from "nativewind";
import { Entypo } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { BACKEND_URL } from "@env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

const StyledView = styled(View);
const StyledText = styled(Text);

async function reactToSong(
  groupId: string,
  songId: string,
  username: string,
  reaction: string
) {
  const response = await fetch(
    `${BACKEND_URL}/api/groups/${groupId}/shared-songs/${songId}/reactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        reaction,
      }),
    }
  );
  const data = await response.json();
  if (!data.updatedGroup) {
    throw new Error("Joining group failed");
  }
  return data;
}

interface Props {
  song: Song;
  groupId: string;
}

export default function SongCard({ song, groupId }: Props) {
  const [visible, setVisible] = useState(false);
  const bgColor = useRef(new Animated.Value(0)).current;

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 0.2, 0.4, 0.7, 1],
    outputRange: [
      "rgb(190, 242, 100)",
      "rgb(150, 202, 80)",
      "rgb(110, 162, 60)",
      "rgb(70, 122, 40)",
      "rgb(30, 82, 20)",
    ],
  });

  const { username } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (reaction: string) =>
      reactToSong(groupId, song.sharedSongId, song.username, reaction),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["groups", username],
      });
    },
  });

  const onLongPressCard = () => {
    Animated.timing(bgColor, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setVisible(true);
      Animated.timing(bgColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const onMenuOptionSelect = async (value: string) => {
    await mutateAsync(value);
    setVisible(false);
  };

  return (
    <Animated.View
      style={{ backgroundColor, marginBottom: 12, borderRadius: 8 }}
    >
      <TouchableOpacity onLongPress={onLongPressCard}>
        <StyledView className="bg-lime-300/80 rounded-lg px-4 py-3">
          <StyledView className="flex flex-row justify-between">
            <StyledText className="font-bold pb-2 text-lg">
              {song.username}
              <StyledText className="font-normal"> shared a song!</StyledText>
            </StyledText>
            <Entypo.Button
              backgroundColor={"transparent"}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                padding: 0,
              }}
              name="spotify"
              size={36}
              color="black"
              onPress={() => {
                Linking.openURL(song.songLink);
              }}
            />
          </StyledView>
          <StyledView className="flex flex-row space-x-2 flex-wrap">
            {song.reactions !== undefined &&
              Object.entries(
                song.reactions.reduce<Record<string, number>>(
                  (counts, reaction) => {
                    counts[reaction.reaction] =
                      (counts[reaction.reaction] || 0) + 1;
                    return counts;
                  },
                  {}
                )
              ).map(([reaction, count]) => (
                <StyledView
                  key={reaction}
                  className="rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white/50"
                >
                  <StyledText className="font-semibold text-xs">
                    {reaction} {count}
                  </StyledText>
                </StyledView>
              ))}
          </StyledView>
        </StyledView>
        <Menu opened={visible} onBackdropPress={() => setVisible(false)}>
          <MenuTrigger text="" />
          <MenuOptions
            customStyles={{ optionsWrapper: styles.menuOptionsWrapper }}
          >
            <MenuOption onSelect={() => onMenuOptionSelect("🤏")} text="🤏" />
            <MenuOption onSelect={() => onMenuOptionSelect("👌")} text="👌" />
            <MenuOption onSelect={() => onMenuOptionSelect("👍")} text="👍" />
            <MenuOption onSelect={() => onMenuOptionSelect("🖤")} text="🖤" />
          </MenuOptions>
        </Menu>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menuOption: {
    fontSize: 16,
  },
  menuOptionsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
});
