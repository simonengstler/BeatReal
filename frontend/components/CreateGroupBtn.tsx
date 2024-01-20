import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CreateGroupBtn() {
  return <TouchableOpacity
    style={styles.button}
    activeOpacity={0.7}
    onPress={() => alert('Button pressed!')}
  >
    <Text style={styles.text}>Create New Group</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  button: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#575151',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    padding: 6,
    textAlign: 'center'
  },
})