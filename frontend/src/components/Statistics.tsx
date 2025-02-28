import { formatEther } from "viem";
import { useGetTotalDonations } from "../hooks/useGetTotalDonations";
import { useGetTotalDonors } from "../hooks/useGetTotalDonors";

export const Statistics = () => {
  const {
    isLoading: isLoadingTotalDonations,
    error: errorTotalDonations,
    data: dataTotalDonations,
  } = useGetTotalDonations();

  const {
    isLoading: isLoadingTotalDonors,
    error: errorTotalDonors,
    data: dataTotalDonors,
  } = useGetTotalDonors();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">Statistics</div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span>Total Donations</span>
          <span className="font-bold text-lg">
            {isLoadingTotalDonations
              ? "loading..."
              : typeof dataTotalDonations == "bigint"
              ? `${formatEther(dataTotalDonations)} ETH`
              : `failed to load data: ${errorTotalDonations}`}
          </span>
        </div>
        <div className="flex flex-col">
          <span>Total Donors</span>
          <span className="font-bold text-lg">
            {isLoadingTotalDonors
              ? "loading..."
              : typeof dataTotalDonors == "bigint"
              ? `${dataTotalDonors}`
              : `failed to load data: ${errorTotalDonors}`}
          </span>
        </div>
      </div>
    </div>
  );
};
