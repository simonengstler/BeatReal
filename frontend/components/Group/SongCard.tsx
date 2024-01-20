import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { Song } from "../../types/database";

export default function SongCard({ song }: { song: Song }) {
  const [visible, setVisible] = useState(false);

  const onLongPressCard = () => {
    setVisible(true);
  };

  const onMenuOptionSelect = (value) => {
    alert(value);
    setVisible(false);
  };

  return (
    <TouchableOpacity onLongPress={onLongPressCard}>
      <MenuProvider>
        <View style={styles.row}>
          <Text style={styles.heading}>{song.username} shared a song!</Text>
          <Text>{song.songLink}</Text>
          <Menu opened={visible} onBackdropPress={() => setVisible(false)}>
            <MenuTrigger text="" />
            <MenuOptions
              customStyles={{ optionsWrapper: styles.menuOptionsWrapper }}
            >
              <MenuOption
                onSelect={() => onMenuOptionSelect("Option 1")}
                text="🤏"
              />
              <MenuOption
                onSelect={() => onMenuOptionSelect("Option 2")}
                text="👌"
              />
              <MenuOption
                onSelect={() => onMenuOptionSelect("Option 3")}
                text="👍"
              />
              <MenuOption
                onSelect={() => onMenuOptionSelect("Option 4")}
                text="🖤"
              />
            </MenuOptions>
          </Menu>
        </View>
      </MenuProvider>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#dee1ec",
    borderRadius: 6,
  },
  heading: {
    fontSize: 16,
    fontWeight: "500",
  },
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
