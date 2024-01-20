import { View, Text, StyleSheet } from "react-native";

export default function GroupCard({ group }) {
  return (
    <View style={styles.row}>
      <Text style={styles.heading}>{ group.name }</Text>
    </View>
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