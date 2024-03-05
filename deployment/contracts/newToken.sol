// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TokenFaucet {
    IERC20 public token;
    mapping(address => uint256) public lastAccessTime;
    uint256 public cooldown;

    constructor(address _token, uint256 _cooldown) {
        token = IERC20(_token);
        cooldown = _cooldown;
    }

    function requestTokens() external {
        require(block.timestamp - lastAccessTime[msg.sender] >= cooldown, "Cooldown period has not elapsed");
        
        token.transfer(msg.sender, 100 * 10**18); // Sending 100 tokens (change the amount as per your requirement)
        lastAccessTime[msg.sender] = block.timestamp;
    }
}