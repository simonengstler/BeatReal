import { View, Text, ScrollView, StyleSheet } from "react-native";
import SongCard from "../Group/SongCard";
import Btn from "../Btn";

const mockData = [
  { link: 'spotify.com', username: 'sebastian' },
  { link: 'spotify.com', username: 'sebastian' },
  { link: 'spotify.com', username: 'sebastian' },
  { link: 'spotify.com', username: 'sebastian' },
]

export default function GroupDetailsPage({ route }) {

  const { songs } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of songs shared</Text>
      <ScrollView>
        {mockData.map(song => <SongCard song={song} />)}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Btn
          label={'Invite user'}
          handleChange={() => null}
          isDisabled={false}
        />
        <Btn
          label={'Share a song'}
          handleChange={() => null}
          isDisabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
})