import { Abi } from "viem";

export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const contractAddressAbi: Abi = [
  {
    type: "function",
    name: "donate",
    inputs: [{ name: "_ipfs", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "donations",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "ipfs", type: "string", internalType: "string" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "donors",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDonationsByDonor",
    inputs: [{ name: "_donor", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "_donations",
        type: "tuple[]",
        internalType: "struct Donations.Donation[]",
        components: [
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "ipfs", type: "string", internalType: "string" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDonors",
    inputs: [],
    outputs: [
      { name: "_donors", type: "address[]", internalType: "address[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDonorsLength",
    inputs: [],
    outputs: [{ name: "_length", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalDonations",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Donated",
    inputs: [
      {
        name: "donor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "donation",
        type: "tuple",
        indexed: false,
        internalType: "struct Donations.Donation",
        components: [
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "ipfs", type: "string", internalType: "string" },
        ],
      },
    ],
    anonymous: false,
  },
];
