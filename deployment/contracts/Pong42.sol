// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

/**
 * @title Pong42
 * @dev This contract implements an ERC20 token named "pong42" with the symbol "P42".
 * It extends ERC20Capped to enforce a maximum cap on the total supply of tokens.
 */
contract Pong42 is ERC20Capped {
    address payable public owner;

    /**
     * @dev Constructor to initialize the Pong42 token contract.
     * @param cap The maximum cap for the total supply of tokens.
     */
    constructor(uint256 cap) ERC20("pong42", "P42") ERC20Capped(cap * (10 ** decimals())) {
        owner = payable(msg.sender);
        // Mint tokens to the contract owner upon deployment
        _mint(owner, 70000000 * (10 ** decimals()));
    }

    /**
     * @dev Function to mint new tokens.
     * @param to The address to which new tokens will be minted.
     * @param amount The amount of tokens to mint.
     */
    function mintTokens(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint tokens");
        _mint(to, amount);
    }

    /**
     * @dev Function to retrieve the balance of tokens held by the contract address.
     * @return The balance of tokens held by the contract address.
     */
    function myBalance() public view returns (uint256) {
        return balanceOf(address(this));
    }

    /**
     * @dev Internal function to mint tokens.
     * @param account The address to which new tokens will be minted.
     * @param amount The amount of tokens to mint.
     */
    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    /**
     * @dev Modifier to restrict access to functions to the contract owner.
     */
    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}
