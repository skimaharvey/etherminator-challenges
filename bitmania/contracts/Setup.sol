// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Bitmania.sol";
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
        BitMania instance = new BitMania();
        emit Creation(msg.sender, address(this), address(instance));
        userToInstance[msg.sender] = address(instance);
        return address(instance);
    }

    function levelStatus() external returns (bool) {
        if (BitMania(userToInstance[msg.sender]).isSolved()) {
            emit Completion(msg.sender, address(this));
            return true;
        } else {
            emit CompletionFailed(msg.sender, address(this));
            return false;
        }
    }
}
