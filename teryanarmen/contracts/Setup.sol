// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./Vault.sol";
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
        require(msg.value >= 10000000 gwei, "not enough sent");
        Vault instance = new Vault{value: 10000000 gwei}();
        emit Creation(msg.sender, address(this), address(instance));
        userToInstance[msg.sender] = address(instance);
        return address(instance);
    }

    function levelStatus() external returns (bool) {
        if (userToInstance[msg.sender].balance == 0) {
            emit Completion(msg.sender, address(this));
            return true;
        } else {
            emit CompletionFailed(msg.sender, address(this));
            return false;
        }
    }
}
