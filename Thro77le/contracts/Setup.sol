// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Challenge.sol";
import "hardhat/console.sol";

contract Setup {
    mapping(address => address) private userToInstance;
    event Creation(
        address userAddress,
        address setupAddress,
        address instanceAddress
    );
    event Completion(address userAddress, address setupAddress);
    event CompletionFailed(address userAddress, address setupAddress);

    function createInstance() external payable returns (address) {
        Challenge instance = new Challenge(
            0xA4402Bf8Bd4d5825e66012D0e9175F8F76A0e811
        );
        emit Creation(msg.sender, address(this), address(instance));
        userToInstance[msg.sender] = address(instance);
        return address(instance);
    }

    function levelStatus() external returns (bool) {
        if (Challenge(userToInstance[msg.sender]).isSolved()) {
            emit Completion(msg.sender, address(this));
            return true;
        } else {
            emit CompletionFailed(msg.sender, address(this));
            return false;
        }
    }
}
