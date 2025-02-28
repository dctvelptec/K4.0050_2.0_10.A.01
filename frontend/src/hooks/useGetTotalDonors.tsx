import { useReadContract } from "wagmi";
import { contractAddress, contractAddressAbi } from "../helpers/contracts";

export const useGetTotalDonors = () =>
  useReadContract({
    abi: contractAddressAbi,
    address: contractAddress,
    functionName: "getDonorsLength",
  });
