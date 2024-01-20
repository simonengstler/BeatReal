import { useQuery } from "@tanstack/react-query";

async function getGroup(groupId: string) {
  const res = await fetch(`/api/groups/${groupId}`);
  return res.json();
}

export function useGetGroup(groupId: string) {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroup(groupId),
    enabled: !!groupId,
  });
}
