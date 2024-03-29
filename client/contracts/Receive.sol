// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract ReceiveEther {
    address public owner;

    constructor() {
        owner = msg.sender; //* Set the contract deployer as the owner of the contract
    }

    //* This function  allows anyone to send ether to this contract by using its address
    ////////////////////////////////////////////////////////////////////////////////////
    receive() external payable {}

    //* Allow withdrawal of all Ether by the owner
    //////////////////////////////////////////////
    function withdraw() public {
        //* Check whether the person calling this function is the owner
        /////////////////////////////////////////////////////////////
        require(msg.sender == owner, "Only the owner can withdraw.");
        uint amount = address(this).balance;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }

    //* Allow checking the contract's balance
    /////////////////////////////////////////
    function checkBalance() public view returns (uint) {
        require(msg.sender == owner, "Only the owner can check the balance.");
        return address(this).balance;
    }
}
