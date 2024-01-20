import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import GroupCard from "../Group/GroupCard";
import Btn from "../Btn";
import Message from "../Group/Message";
import { useAuth } from "../context/AuthContext";
import { BACKEND_URL } from "@env";

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  EMPTY_RESULTS = "empty_results",
  ERROR = "error",
}

const mockData = [
  { id: 1, name: 'Group 1' },
  { id: 2, name: 'Group 2' },
  { id: 3, name: 'Group 3' },
  { id: 4, name: 'Group 4' },
  { id: 5, name: 'Group 5' },
  { id: 6, name: 'Group 6' },
]

const API_ENDPOINT = "https://beatreal-production.up.railway.app/api/groups"

export default function HomePage({ navigation }) {
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [data, setData] = useState([]);
  const { user } = useAuth();

  async function fetchData() {
    try {
      const response = await fetch(`${BACKEND_URL}/api/groups?userId=Simon`);
      const data = await response.json();
      console.log(data);
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
        {status === Status.ERROR && <Message label="Oops! Something went wrong in the server. Please try again later." />}
        {status === Status.EMPTY_RESULTS && <Message label="So empty... Start a new group below!" />}
        {status === Status.SUCCESS && data.map((group, index) => <GroupCard key={index} group={group} navigation={navigation}/>)}
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
