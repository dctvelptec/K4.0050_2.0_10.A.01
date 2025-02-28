// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

/// @title Donation Collection Smart Contract
/// @author Daniel
contract Donations {
    /// @notice summarizes all donations that have happened
    uint256 public totalDonations;

    /// @notice sorted storage for donations
    mapping(address => Donation[]) public donations;

    address[] public donors;

    /// @notice donation data structure
    struct Donation {
        uint256 amount;
        string ipfs;
    }

    /// Emits when a donation happends. Important for filtering donations of a specific donor
    /// @param donor address of the donor
    /// @param donation donation data
    event Donated(address indexed donor, Donation donation);

    /// Donates a sent amount
    /// @param _ipfs ipfs hash for donation information
    function donate(string calldata _ipfs) external payable {
        if (msg.value == 0) revert("missing value");
        if (bytes(_ipfs).length == 0) revert("missing ipfs hash");
        if (donations[msg.sender].length == 0) donors.push(msg.sender);
        Donation storage _donation = donations[msg.sender].push();
        _donation.ipfs = _ipfs;
        _donation.amount = msg.value;
        totalDonations += _donation.amount;
        emit Donated(msg.sender, _donation);
    }

    function getDonationsByDonor(address _donor) external view returns (Donation[] memory _donations) {
        uint256 _length = donations[_donor].length;
        if (_length == 0) return _donations;
        _donations = new Donation[](_length);
        _donations = donations[_donor];
    }

    function getDonorsLength() external view returns (uint256 _length) {
        _length = donors.length;
    }

    function getDonors() external view returns (address[] memory _donors) {
        _donors = donors;
    }
}
