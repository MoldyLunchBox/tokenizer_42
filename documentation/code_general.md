# Pong42 Smart Contract Documentation

## General Overview

The provided smart contracts consist of two contracts: `Faucet.sol` and `Pong42.sol`.

- **Faucet Contract (`Faucet.sol`):** This contract allows users to request tokens from a predefined token supply. It provides a basic faucet functionality where users can request tokens after a specified time interval. The contract holds an ERC20 token and dispenses tokens to users upon request, subject to certain conditions such as time intervals and available token balance.

- **Pong42 Contract (`Pong42.sol`):** This contract implements an ERC20 token named `pong42` with the symbol `P42`. It extends `ERC20Capped` and `ERC20Burnable` from OpenZeppelin contracts. The token is capped, meaning its total supply cannot exceed a predefined limit. Additionally, the contract rewards miners with a specified amount of tokens for each block mined, subject to the total supply cap.

## Detailed Explanation

### Faucet Contract (`Faucet.sol`)

- **State Variables:**
  - `owner`: Address of the contract owner who can withdraw tokens.
  - `token`: Instance of the ERC20 token contract.
  - `withdrawalAmount`: Amount of tokens to be withdrawn by users per request.
  - `lockTime`: Time duration between consecutive withdrawal requests.
  - `nextAccessTime`: Mapping to track the next allowed withdrawal time for each user.

- **Constructor:**
  - Initializes the `token` address and sets the contract owner.

- **Functions:**
  - `requestTokens(uint256 amount)`: Allows users to request tokens. Conditions such as non-zero sender address, sufficient balance, and elapsed time since the last withdrawal are enforced.
  - `receive() external payable`: Allows the contract to receive Ether.
  - `getBalance() external view returns (uint256)`: Retrieves the token balance of the contract.
  - `setWithdrawalAmount(uint256 amount) public onlyOwner`: Sets the withdrawal amount, accessible only by the contract owner.
  - `setLockTime(uint256 amount) public onlyOwner`: Sets the lock time for withdrawal requests, accessible only by the contract owner.
  - `withdraw() external onlyOwner`: Allows the contract owner to withdraw remaining tokens.

- **Modifiers:**
  - `onlyOwner`: Restricts access to functions to the contract owner.

### MyaToken Contract (`MyaToken.sol`)

- **State Variables:**
  - `owner`: Address of the contract owner who can control the token supply and rewards.
  - `blockReward`: Reward amount for miners per block.

- **Constructor:**
  - Initializes the token with a capped supply and mints tokens to the contract owner.

- **Functions:**
  - `_mintMinerReward() internal`: Mints tokens as rewards for miners.
  - `_beforeTokenTransfer(address from, address to, uint256 value) internal virtual override`: Overrides ERC20 hook function to mint miner rewards before token transfers under certain conditions.
  - `setBlockReward(uint256 reward) public onlyOwner`: Sets the block reward amount, accessible only by the contract owner.
  - `destroy() public onlyOwner`: Destroys the contract and transfers remaining balance to the owner.

- **Modifiers:**
  - `onlyOwner`: Restricts access to functions to the contract owner.

## Summary

The `Faucet` contract provides a token dispensing mechanism, while the `MyaToken` contract manages the supply of a capped ERC20 token with miner rewards. Both contracts are designed to ensure proper token management and reward distribution while enforcing security measures such as access control and supply limits.
