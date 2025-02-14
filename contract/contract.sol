// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract Contract {
    uint256 public totalSupply;
    mapping(address => uint) public balance;

    constructor() {}

    function stake(uint256 amount) public payable {
        require(amount > 0, "amount must be more than 0");
        require(msg.value == amount, "Amount must be equal to msg.value");
        totalSupply += amount;
        balance[msg.sender] += amount;
    }

    function unstake(uint256 amount) public payable {
        require(amount <= balance[msg.sender], "Not enough balance");
        totalSupply -= amount;
        balance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
