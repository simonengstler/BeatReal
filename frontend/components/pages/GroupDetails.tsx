import { View, Text, ScrollView } from "react-native";
import SongCard from "../Group/SongCard";

const mockData = [
  { link: 'spotify.com', username: 'sebastian' },
  { link: 'spotify.com', username: 'sebastian' },
  { link: 'spotify.com', username: 'sebastian' },
  { link: 'spotify.com', username: 'sebastian' },
]

export default function GroupDetailsPage({ route }) {

  const { songs } = route.params

  return (
    <View>
      <Text>List of songs shared</Text>
      <ScrollView>
        { mockData.map(song => <SongCard song={song} />) }
      </ScrollView>
    </View>
  );
}
