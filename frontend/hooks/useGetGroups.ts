import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../components/context/AuthContext";
import { BACKEND_URL } from "@env";
import { Group } from "../types/database";

async function fetchMyGroups(username: string) {
  console.log("fetching private groups")
  const response = await fetch(
    `${BACKEND_URL}/api/groups?username=${username}`
  );
  const data = await response.json();
  // map id to groups
  return Object.entries(data).map(([id, group]) => {
    (group as Group & { id: string }).id = id;
    return group as Group & { id: string };
  });
}

async function fetchPublicGroups() {
  console.log("fetching top songs")
  const response = await fetch(
    `${BACKEND_URL}/api/top-songs`
  );
  const data = await response.json();
  return data.topSongs
}

export function useGetGroups() {
  const { username } = useAuth();
  return useQuery({
    queryKey: ["groups", username],
    queryFn: () => fetchMyGroups(username),
    enabled: username !== undefined,
  });
}

export function useGetPublicGroups() {
  return useQuery({
    queryKey: ["top-songs"],
    queryFn: () => fetchPublicGroups(),
  });
}
