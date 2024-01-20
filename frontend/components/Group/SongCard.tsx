import { View, Text, StyleSheet, Touchable } from "react-native";

export default function SongCard({ song }) {
  return (
    <View style={styles.row}>
      <Text style={styles.heading}>{ song.link }</Text>
      <Text style={styles.heading}>{ song.username }</Text>
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