import { BACKEND_URL } from "@env";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Btn from "../Btn";
import GroupCard from "../Group/GroupCard";
import Message from "../Group/Message";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../routes/RootNavigator";

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  EMPTY_RESULTS = "empty_results",
  ERROR = "error",
}

type Props = BottomTabScreenProps<RootStackParamList, "My Groups">;

export default function MyGroupsPage({ navigation }: Props) {
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [data, setData] = useState([]);
  const { user } = useAuth();

  async function fetchData() {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/groups?userId=${user.uid}`
      );
      const data = await response.json();
      if (data !== undefined) {
        setData(Object.values(data));
        setStatus(Status.SUCCESS);
      } else {
        setStatus(Status.EMPTY_RESULTS);
      }
    } catch (e) {
      setStatus(Status.ERROR);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {status === Status.LOADING && <Message label="Loading..." />}
        {status === Status.ERROR && (
          <Message label="Oops! Something went wrong in the server. Please try again later." />
        )}
        {status === Status.EMPTY_RESULTS && (
          <Message label="So empty... Start a new group below!" />
        )}
        {status === Status.SUCCESS &&
          data.map((group, index) => (
            <GroupCard key={index} group={group} navigation={navigation} />
          ))}
      </ScrollView>

      <View>
        <Btn
          label={"Create New Group"}
          handleChange={() => navigation.navigate("CreateGroup")}
          isDisabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});
