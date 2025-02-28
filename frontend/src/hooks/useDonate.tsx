import { isEmpty, isNull } from "lodash";
import { contractAddress, contractAddressAbi } from "../helpers/contracts";
import { useExecuteFunction } from "./useExecuteFunction";

type UseDonateParams = {
  value: bigint | null;
  ipfs: string;
};

export const useDonate = ({ ipfs, value }: UseDonateParams) =>
  useExecuteFunction({
    abi: contractAddressAbi,
    address: contractAddress,
    functionName: "donate",
    args: [ipfs],
    eventNames: ["Donated"],
    value: value || 0n,
    enabled: !isEmpty(ipfs) && !isNull(value) && BigInt(value) > 0n,
  });
