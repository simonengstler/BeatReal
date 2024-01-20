import { useState } from "react"
import { StyleSheet, Text, View, TextInput } from "react-native";
import Btn from "../Btn";

const API_ENDPOINT = ''

export default function CreateGroupPage({ navigation }) {

  async function createGroupRequest() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        user_id: 1,
        group_name: groupName
      })
    }
    try {
      const response = await fetch(API_ENDPOINT, options)
      const data = await response.json()
      if (data) {
        return true
      }
      return false
    } catch (e) {
      return false
    } 
  }

  async function handleChange() {
    const isSuccessful = await createGroupRequest()
    if (isSuccessful) {
      navigation.navigate(``)
    }
  }

  const [groupName, setGroupName] = useState('');
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Create Group</Text>
      <TextInput
        style={styles.input}
        onChangeText={setGroupName}
        value={groupName}
      />
      <Btn 
        label={'Start new group'}
        handleChange={() => alert(groupName)}
        isDisabled={groupName === ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    height: 50,
    margin: 12,
    width: '80%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
})