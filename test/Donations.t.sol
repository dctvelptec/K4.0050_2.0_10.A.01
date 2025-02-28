// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {Donations} from "../src/Donations.sol";

contract CounterTest is Test {
    Donations public donations;

    string ipfsHash = "randomstring";
    address donorA;
    address donorB;

    function setUp() public {
        donations = new Donations();
        donorA = makeAddr("donorA");
        donorB = makeAddr("donorB");
        vm.deal(donorA, 1e18);
        vm.deal(donorB, 1e18);
    }

    function testDonateHappyPath() public {
        Donations.Donation memory _donation = Donations.Donation({
            amount: 1e16,
            ipfs: ipfsHash
        });

        vm.prank(donorA);
        vm.expectEmit(true, false, false, true, address(donations));
        emit Donations.Donated(donorA, _donation);
        donations.donate{value: 1e16}(ipfsHash);

        assertEq(donations.totalDonations(), 1e16);
        assertEq(donations.getDonorsLength(), 1);
        assertEq(donations.donors(0), donorA);
    }

    function testMultipleDonations() public {
        vm.prank(donorA);
        donations.donate{value: 1e16}(ipfsHash);

        vm.prank(donorB);
        donations.donate{value: 2e16}(ipfsHash);

        assertEq(donations.totalDonations(), 3e16);
        assertEq(donations.getDonorsLength(), 2);
        assertEq(donations.donors(0), donorA);
        assertEq(donations.donors(1), donorB);

        address[] memory _donors = donations.getDonors();
        assertEq(_donors.length, 2);
        assertEq(_donors[1], donorB);
        assertEq(_donors[1], donorB);
    }

    function testRevertMissingValueDonate() public {
        vm.prank(donorA);
        vm.expectRevert("missing value");
        donations.donate{value: 0}(ipfsHash);
    }

    function testRevertMissingIpfsHashDonate() public {
        vm.prank(donorA);
        vm.expectRevert("missing ipfs hash");
        donations.donate{value: 1e16}("");
    }

    function testGetDonationsByDonor() public {
        vm.prank(donorA);
        donations.donate{value: 1e16}(ipfsHash);
        vm.prank(donorA);
        donations.donate{value: 2e16}(ipfsHash);

        Donations.Donation[] memory _donations = donations.getDonationsByDonor(
            donorA
        );

        assertEq(_donations.length, 2);
        assertEq(_donations[0].amount, 1e16);
        assertEq(_donations[0].ipfs, ipfsHash);
        assertEq(_donations[1].amount, 2e16);
        assertEq(_donations[1].ipfs, ipfsHash);

        assertEq(donations.totalDonations(), 3e16);
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
}
