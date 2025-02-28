import { useCallback, useEffect, useState } from "react";
import { Abi, Address, decodeEventLog, isAddressEqual, Log } from "viem";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export type useExecuteFunctionProps = {
  address: Address;
  abi: Abi;
  functionName: string;
  args: any[];
  eventNames: string[];
  account?: Address;
  value?: bigint;
  enabled?: boolean;
  onEvent?: (event: any) => void;
  onEventMatch?: (event: any) => void;
  onError?: (errorSimulate: any, errorWrite: any) => void;
};

export const useExecuteFunction = ({
  address,
  abi,
  functionName,
  args,
  eventNames,
  account,
  value,
  enabled: _enabled,
  onEvent,
  onEventMatch,
  onError,
}: useExecuteFunctionProps) => {
  const { chainId } = useAccount();
  const [logs, setLogs] = useState<Log<any>[]>();

  const enabled = Boolean(
    address && chainId && abi && functionName && _enabled
  );

  const simulate = useSimulateContract({
    address,
    chainId,
    abi,
    functionName,
    args,
    query: { enabled },
    ...(account ? { account } : {}),
    ...(value && value > 0n ? { value } : {}),
  });

  const {
    data: dataSimulate,
    isSuccess: isSuccessSimulate,
    error: errorSimulate,
  } = simulate;

  const execution = useWriteContract();

  const {
    writeContract,
    data: hash,
    reset: resetWriteContract,
    error: errorWrite,
  } = execution;

  // write function that needs to be called
  const write = useCallback(() => {
    if (dataSimulate && dataSimulate.request && writeContract)
      writeContract(dataSimulate.request);
  }, [isSuccessSimulate, dataSimulate, writeContract]);

  const reset = useCallback(() => {
    setLogs([]);
    resetWriteContract && resetWriteContract();
  }, [resetWriteContract]);

  const waitForTransaction = useWaitForTransactionReceipt({ hash, chainId });
  const { data: txData, error: txError } = waitForTransaction;

  const parseLogs = useCallback(
    (logs: Log[] = []) =>
      logs
        .filter(() => eventNames && eventNames.length)
        .filter((log) => isAddressEqual(address, log.address))
        .forEach((log) => {
          const event = decodeEventLog({
            abi,
            data: log.data,
            topics: log.topics,
          }) as any;
          onEvent && onEvent(event);
          if (eventNames.indexOf(`${event.eventName}`) > -1)
            onEventMatch && onEventMatch(event);
        }),
    [logs, eventNames]
  );

  useEffect(() => {
    if (!txData && !txError) return;
    if (txData) setLogs(txData.logs);
    if (txError) console.log("[ERROR]", { reason: txError.message });
  }, [txData, txError]);

  useEffect(() => {
    if (logs && logs.length > 0) parseLogs(logs);
  }, [logs]);

  useEffect(() => {
    errorWrite && onError && onError(null, errorWrite);
    errorSimulate && onError && onError(errorSimulate, null);
  }, [errorWrite, errorSimulate]);

  return {
    write,
    reset,
    simulate,
    execution,
    isEnabled: enabled,
    isReady: isSuccessSimulate,
    hash,
    logs,
  };
};
