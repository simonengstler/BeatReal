import { ScrollView, StyleSheet, View, Text } from "react-native";
import GroupCard from "../GroupCard";
import CreateGroupBtn from "../CreateGroupBtn";

const data = [
  { id: 1, name: 'Group 1' },
  { id: 2, name: 'Group 2' },
  { id: 3, name: 'Group 3' },
  { id: 4, name: 'Group 4' },
  // { id: 5, name: 'Group 5' },
  // { id: 6, name: 'Group 6' },
  // { id: 7, name: 'Group 7' },
  // { id: 8, name: 'Group 8' },
  // { id: 9, name: 'Group 9' },
  // { id: 10, name: 'Group 10' },
  // { id: 11, name: 'Group 11' },
  // { id: 12, name: 'Group 12' },
  // { id: 13, name: 'Group 13' },
  // { id: 14, name: 'Group 14' },
  // { id: 15, name: 'Group 15' },
]

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      {data.map(group => <GroupCard group={group} />)}
      <CreateGroupBtn />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})