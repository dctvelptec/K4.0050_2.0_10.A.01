import { Address } from "viem";
import { useReadContract } from "wagmi";
import { contractAddress, contractAddressAbi } from "../helpers/contracts";

export const useGetDonors = () =>
  useReadContract({
    abi: contractAddressAbi,
    address: contractAddress,
    functionName: "getDonors",
    query: { select: (data) => data as Address[] },
  });
