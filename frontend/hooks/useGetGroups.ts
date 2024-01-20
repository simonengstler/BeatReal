import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../components/context/AuthContext";
import { BACKEND_URL } from "@env";
import { Group } from "../types/database";

async function fetchMyGroups(username: string) {
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

export function useGetGroups() {
  const { username } = useAuth();
  return useQuery({
    queryKey: ["groups", username],
    queryFn: () => fetchMyGroups(username),
    enabled: username !== undefined,
  });
}
