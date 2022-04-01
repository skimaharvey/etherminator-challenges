// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "./Factory.sol";

//for bytecode argument, feel free to use Dummy contract 0xd5064b7067EAfA6a30ef8b20BcD0bbDa82D0F21e

contract Challenge {
    bool public isSolved;
    Factory factory;

    constructor(address _factory) {
        factory = Factory(_factory);
    }

    function createContract(bytes memory bytecode, uint256 salt) public {
        isSolved = factory.createContract(bytecode, salt);
    }
}
