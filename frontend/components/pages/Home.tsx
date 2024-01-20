import { useState, useEffect } from "react"
import { ScrollView, StyleSheet, View, Text } from "react-native";
import GroupCard from "../GroupCard";
import CreateGroupBtn from "../CreateGroupBtn";

const data = [
  { id: 1, name: 'Group 1' },
  { id: 2, name: 'Group 2' },
  { id: 3, name: 'Group 3' },
  { id: 4, name: 'Group 4' },
  { id: 5, name: 'Group 5' },
  { id: 6, name: 'Group 6' },
]

export default function HomePage() {

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map(group => <GroupCard group={group} />)}
      </ScrollView>
      <View>
        <CreateGroupBtn />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  }
})