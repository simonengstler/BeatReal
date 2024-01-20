import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function GroupCard({ group, navigation }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate("GroupDetails", { songs: group.songs })}
    >
      <Text style={styles.heading}>{group.name}</Text>
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
    backgroundColor: '#c5e3f6',
    borderRadius: 6,
  },
  heading: {
    fontSize: 16,
    fontWeight: "500",
  }
})