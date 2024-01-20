import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Btn({ label, handleChange, isDisabled }) {
  return <TouchableOpacity
    style={styles.button}
    activeOpacity={0.7}
    onPress={handleChange}
    disabled={isDisabled}
  >
    <Text style={styles.text}>{ label }</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#575151',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    padding: 6,
    textAlign: 'center'
  },
})