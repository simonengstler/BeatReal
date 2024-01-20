import { Text, StyleSheet, View } from "react-native";

interface IOwnProps {
  label: string;
}

export default function Message({ label }: IOwnProps) {
  return <View style={styles.container}>
    <Text>{label}</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center'
  }
})