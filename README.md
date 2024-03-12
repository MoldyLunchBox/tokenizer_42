## General Overview

The provided smart contracts consist of two contracts: `Faucet.sol` and `Pong42.sol`.

- **Faucet Contract (`Faucet.sol`):** This contract allows users to request tokens from a predefined token supply. It provides a basic faucet functionality where users can request tokens after a specified time interval. The contract holds an ERC20 token and dispenses tokens to users upon request, subject to certain conditions such as time intervals and available token balance.

- **Pong42 Contract (`Pong42.sol`):** This contract implements an ERC20 token named `pong42` with the symbol `P42`. It extends `ERC20Capped` and `ERC20Burnable` from OpenZeppelin contracts. The token is capped, meaning its total supply cannot exceed a predefined limit. Additionally, the contract rewards miners with a specified amount of tokens for each block mined, subject to the total supply cap.

## webapp demo

The PingPong Game Web Application allows users to play a simple PingPong game and request tokens based on their game performance.

<div style="text-align:center">
  <img src="https://i.ibb.co/3T4fRtb/tokeni.gif" alt="Demo GIF" />
</div>

## Faucet Contract (`Faucet.sol`)

- **State Variables:**
  - `owner`: Address of the contract owner who can withdraw tokens.
  - `token`: Instance of the ERC20 token contract.
  - `withdrawalAmount`: Amount of tokens to be withdrawn by users per request.
  - `lockTime`: Time duration between consecutive withdrawal requests.
  - `nextAccessTime`: Mapping to track the next allowed withdrawal time for each user.

- **Constructor:**
  - Initializes the `token` address and sets the contract owner.

- **Functions:**
  - `requestTokens(uint256 amount)`: Allows users to request tokens. with Conditions : non-zero sender address, sufficient balance, and elapsed time since the last withdrawal, amount over 50.
  - `receive() external payable`: Allows the contract to receive Ether.
  - `getBalance() external view returns (uint256)`: Retrieves the token balance of the contract.
  - `setLockTime(uint256 amount) public onlyOwner`: Sets the lock time for withdrawal requests, accessible only by the contract owner.
  - `withdraw() external onlyOwner`: Allows the contract owner to withdraw remaining tokens.

- **Modifiers:**
  - `onlyOwner`: Restricts access to functions to the contract owner.

## Summary

The `Faucet` contract provides a token dispensing mechanism, while the `Pong42` contract manages the supply of a capped ERC20 token with miner rewards. Both contracts are designed to ensure proper token management and reward distribution while enforcing security measures such as access control and supply limits.
