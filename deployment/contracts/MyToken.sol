// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000000000000000000000); // Mint 1,000 tokens to the contract deployer
    }

    function giveTokens(address recipient, uint256 amount) public {
        _transfer(msg.sender, recipient, amount);
    }
}
