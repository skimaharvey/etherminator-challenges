// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./SwissTreasury.sol";
import "../Setup.sol";
import "hardhat/console.sol";

contract SetupSwissTreasury is Setup {
    // SwissTreasury public instance;
    mapping(address => address) private userToInstance;

    function createInstance() external payable override returns (address) {
        require(msg.value >= 10000000 gwei, "not enough sent");
        address[] memory proposers = new address[](0);
        address[] memory executors = new address[](1);
        executors[0] = address(0);

        SwissTreasury instance = new SwissTreasury{value: 10000000 gwei}(
            1 days,
            proposers,
            executors
        );
        emit Creation(msg.sender, address(this), address(instance));
        userToInstance[msg.sender] = address(instance);
        return address(instance);
    }

    function levelStatus() external override returns (bool) {
        if (userToInstance[msg.sender].balance == 0) {
            emit Completion(msg.sender, address(this));
            return true;
        } else {
            emit CompletionFailed(msg.sender, address(this));
            return false;
        }
    }
}
