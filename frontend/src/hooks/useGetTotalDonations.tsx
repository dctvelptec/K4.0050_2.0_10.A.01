import { useReadContract } from "wagmi";
import { contractAddress, contractAddressAbi } from "../helpers/contracts";

export const useGetTotalDonations = () =>
  useReadContract({
    abi: contractAddressAbi,
    address: contractAddress,
    functionName: "totalDonations",
    query: { select: (data: any) => BigInt(data) },
  });
