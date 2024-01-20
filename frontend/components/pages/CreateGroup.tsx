import { useState } from "react"
import { StyleSheet, Text, View, TextInput } from "react-native";
import Btn from "../Btn";
import { useAuth } from "../context/AuthContext";

const API_ENDPOINT = "https://beatreal-production.up.railway.app/api/groups"

export default function CreateGroupPage({ navigation }) {

  const [groupName, setGroupName] = useState('');
  const { user } = useAuth()

  async function createGroupRequest() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: groupName,
        userId: user.uid
      })
    }
    try {
      const response = await fetch(API_ENDPOINT, options)
      const data = await response.json()
      if (data.id) {
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
      // navigation.navigate(``)
      alert('Created group successfully')
    } else {
      alert('Group creation failed. Please try again later.')
    }
  }

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
        handleChange={handleChange}
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