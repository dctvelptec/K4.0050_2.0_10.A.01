import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

export const useGetIpfsData = (hashes: string[]) =>
  useQuery({
    queryKey: [hashes],
    queryFn: async () => {
      const promises = [];
      for (const hash of hashes)
        promises.push(fetch(`https://ipfs.io/ipfs/${hash}`));
      return await Promise.all(promises);
    },
    enabled: !isEmpty(hashes),
  });
