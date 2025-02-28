import { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { Address, formatUnits } from "viem";
import { useGetDonationsByDonor } from "../hooks/useGetDonationsByDonor";
import { useGetDonors } from "../hooks/useGetDonors";
import { useGetIpfsData } from "../hooks/useGetIpfsData";

export const DonorList = () => {
  const [ipfsDataToRequest, setIpfsDataToRequest] = useState<string[]>([]);
  const [ipfsDataCollection, setIpfsDataCollection] = useState<any[]>([]);
  const [showDonorAddress, setShowDonorAddress] = useState<Address | null>(
    null
  );
  const donors = useGetDonors();
  const donations = useGetDonationsByDonor(showDonorAddress!);
  const ipfsData = useGetIpfsData(ipfsDataToRequest);

  useEffect(() => {
    if (
      ipfsData &&
      ipfsData.data &&
      ipfsData.data.length > 0 &&
      ipfsDataCollection.length == 0
    ) {
      const promises = [];
      for (const ipfsResponse of ipfsData.data)
        promises.push(ipfsResponse.clone().json());
      Promise.all(promises).then(setIpfsDataCollection);
    }
  }, [ipfsData]);

  useEffect(() => {
    if (
      donations.data &&
      donations.data.length > 0 &&
      ipfsDataToRequest.length == 0
    )
      setIpfsDataToRequest(donations.data.map((data) => data.ipfs));
  }, [donations.data]);

  const handleClick = (donor: Address) => {
    setIpfsDataToRequest([]);
    setIpfsDataCollection([]);
    setShowDonorAddress(donor == showDonorAddress ? null : donor);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">Donor List</div>
      {!donors.data ? (
        <div>No data available</div>
      ) : (
        <div className="grid grid-cols-2 max-w-1/2 max-h-96 bg-base-200 rounded-2xl p-4">
          <div className="overflow-y-scroll flex flex-col gap-1 border-r border-r-black/20  pr-4">
            {donors.data.length > 0 ? (
              donors.data.map((donor, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(donor)}
                  type="button"
                  className="w-full text-left underline hover:no-underline cursor-pointer flex flex-row gap-2 items-center"
                >
                  {donor}{" "}
                  {donor == showDonorAddress && (
                    <IoMdEye className="shrink-0" />
                  )}
                </button>
              ))
            ) : (
              <span>No donors available</span>
            )}
          </div>
          <div className=" pl-4">
            {showDonorAddress && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-sm">
                  Donations of {showDonorAddress}
                </span>
                <div className="flex flex-col gap-2">
                  {donations && donations.data && donations.data.length ? (
                    donations.data.map((donation, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="font-bold">
                          Donation No. {i + 1} (by{" "}
                          {ipfsDataCollection[i] &&
                            ipfsDataCollection[i].donorName}
                          )
                        </span>
                        <span>
                          Date:{" "}
                          {ipfsDataCollection[i] &&
                            new Date(
                              ipfsDataCollection[i].donationTime
                            ).toLocaleString(navigator.language)}
                        </span>
                        <span>
                          Amount: {formatUnits(donation.amount, 18)} ETH
                        </span>
                        <span>
                          Beneficial Project:{" "}
                          {ipfsDataCollection[i] &&
                            ipfsDataCollection[i].projectName}
                        </span>
                        <span className="text-xs mt-3">ipfs://{donation.ipfs}</span>
                      </div>
                    ))
                  ) : (
                    <span>
                      loading...{donations.failureCount}
                      <span>
                        {donations.failureReason
                          ? donations.failureReason.message
                          : ""}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        // <div className="max-w-1/2">
        //   <ul className="list bg-base-200 rounded-box shadow-md">
        //     <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        //       {donors.data.length > 0
        //         ? `Select a donor address to get more information`
        //         : `No donators available yet`}
        //     </li>
        //     {donors.data.length > 0 &&
        //       donors.data.map((donor, i) => (
        //         <Fragment key={i}>
        //           <li className="list-row items-center">
        //             <div className="flex flex-col">
        //               <span>{donor}</span>
        //               {showDonorAddress == donor && (
        //                 <div>
        //                   <div className="overflow-x-auto">
        //                     <table className="table">
        //                       <thead>
        //                         <tr>
        //                           <th>Date</th>
        //                           <th>Amount</th>
        //                           <th>Project</th>
        //                         </tr>
        //                       </thead>
        //                       <tbody>
        //                         {donations.data &&
        //                           donations.data.map((donation, j) => (
        //                             <tr key={`${i}-${j}`}>
        //                               <td>
        //                                 {new Date(
        //                                   Number(donation.ts)
        //                                 ).toLocaleString(navigator.language)}
        //                               </td>
        //                               <td>
        //                                 {formatUnits(donation.amount, 18)}
        //                               </td>
        //                               <td>asdf</td>
        //                             </tr>
        //                           ))}
        //                       </tbody>
        //                     </table>
        //                   </div>
        //                 </div>
        //               )}
        //             </div>
        //             <div className="text-right">
        //               <button
        //                 onClick={() =>
        //                   setShowDonorAddress(
        //                     donor == showDonorAddress ? null : donor
        //                   )
        //                 }
        //                 className="btn btn-square btn-ghost"
        //               >
        //                 {showDonorAddress == donor ? (
        //                   <IoEyeOffOutline className="size-6" />
        //                 ) : (
        //                   <IoEyeOutline className="size-6" />
        //                 )}
        //               </button>
        //             </div>
        //           </li>
        //         </Fragment>
        //       ))}
        //   </ul>
        // </div>
      )}
    </div>
  );
};
