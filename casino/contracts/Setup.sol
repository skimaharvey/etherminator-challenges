// SPDX-License-Identifier: MIT
pragma solidity 0.7.3;

import "./Casino.sol";
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
        Casino instance = new Casino();
        emit Creation(msg.sender, address(this), address(instance));
        userToInstance[msg.sender] = address(instance);
        return address(instance);
    }

    function levelStatus() external returns (bool) {
        Casino casino = Casino(userToInstance[msg.sender]);
        bool condition1 = address(casino).balance >
            casino.totalDeposits() +
                casino.totalPrize() +
                casino.totalJackpot();
        bool condition2 = address(casino).balance >
            casino.totalDeposits() +
                (casino.totalPrize() * 25) /
                100 +
                casino.totalJackpot();
        bool gameOn = casino.gameOn();
        if ((gameOn && condition1) || (!gameOn && condition2)) {
            emit Completion(msg.sender, address(this));
            return true;
        } else {
            emit CompletionFailed(msg.sender, address(this));
            return false;
        }
    }
}
