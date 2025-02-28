import { isEmpty } from "lodash";
import { PinataSDK } from "pinata-web3";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDonate } from "../hooks/useDonate";

export const Donate = () => {
  const pinata = new PinataSDK({
    pinataJwt: import.meta.env.VITE_PINATA_JWT,
    pinataGateway: "azure-immediate-swordtail-576.mypinata.cloud",
  });

  const [isUploadintToIpfs, setIsUploadintToIpfs] = useState<boolean>(false);
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [donationAmount, setDonationAmount] = useState<bigint | null>(null);
  const [donationAmountEntered, setDonationAmountEntered] =
    useState<string>("");

  const donate = useDonate({ ipfs: ipfsHash, value: donationAmount });

  useEffect(() => {
    if (Boolean(BigInt(donationAmountEntered) > 0n)) {
      setDonationAmount(BigInt(donationAmountEntered));
    } else setDonationAmount(null);
  }, [donationAmountEntered]);

  useEffect(() => {
    if (donate.execution.isSuccess) {
      toast.success("🚀 We really appreciate your donation. Thank you ❤️");
      setIpfsHash("");
      setDonorName("");
      setProjectName("");
      setDonationAmount(null);
      setDonationAmountEntered("");
      donate.reset();
    }
  }, [donate.execution.isSuccess]);

  useEffect(() => {
    if (
      !isEmpty(ipfsHash) &&
      donate &&
      donate.isEnabled &&
      donate.isReady &&
      donate.write
    ) {
      donate.write();
      setIpfsHash("");
    }
  }, [ipfsHash, donate]);

  const handleDonate = () => {
    if (donorName && projectName) {
      setIsUploadintToIpfs(true);
      pinata.upload
        .json({
          donorName,
          projectName,
          donationTime: Date.now(),
        })
        .then(({ IpfsHash }) => {
          setIpfsHash(IpfsHash);
          setIsUploadintToIpfs(false);
        });
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <div className="text-2xl font-bold">Donate now:</div>
      <div className="flex flex-col gap-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Donation Amount</legend>
          <input
            type="number"
            placeholder="Enter amount in WEI"
            value={donationAmountEntered}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDonationAmountEntered(event.target.value)
            }
            className="input input-bordered w-full max-w-xs"
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Beneficial Project</legend>
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setProjectName(event.target.value)
            }
            className="input input-bordered w-full max-w-xs"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Your name</legend>
          <input
            type="text"
            placeholder="Firstname Lastname"
            value={donorName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDonorName(event.target.value)
            }
            className="input input-bordered w-full max-w-xs"
          />
        </fieldset>
        <fieldset className="fieldset">
          <button
            onClick={handleDonate}
            disabled={
              donate.execution.isPending ||
              isUploadintToIpfs ||
              !donationAmount ||
              donationAmount == 0n ||
              isEmpty(donorName) ||
              isEmpty(projectName)
            }
            className="btn"
          >
            {donate.execution.isPending || isUploadintToIpfs ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Donate NOW"
            )}
          </button>
        </fieldset>
      </div>
    </div>
  );
};
