import { Address, isAddress } from "viem";
import { useReadContract } from "wagmi";
import { contractAddress, contractAddressAbi } from "../helpers/contracts";

export const useGetDonationsByDonor = (donor: Address) =>
  useReadContract({
    abi: contractAddressAbi,
    address: contractAddress,
    functionName: "getDonationsByDonor",
    args: [donor],
    query: {
      select: (data) => data as any[],
      enabled: Boolean(donor && isAddress(donor)),
    },
  });
