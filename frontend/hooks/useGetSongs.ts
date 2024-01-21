import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "@env";

async function fetchTopSongs() {
  console.log("fetching top songs")
  const response = await fetch(
    `${BACKEND_URL}/api/top-songs`
  );
  const data = await response.json();
  return data.topSongs
}

export function useGetTopGroups() {
  return useQuery({
    queryKey: ["top-songs"],
    queryFn: () => fetchTopSongs(),
  });
}