// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract SendEther {
    uint amount;

    function setAmount(uint _amount) public {
        amount = _amount;
    }

    function getAmount() public view returns (uint) {
        return amount;
    }
}
