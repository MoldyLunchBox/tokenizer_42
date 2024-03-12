# Pong42 Smart Contract Documentation

## Pong42 Contract (`Pong42.sol`)

The `Pong42` contract implements an ERC20 token named "pong42" with the symbol "P42". It extends ERC20Capped to enforce a maximum cap on the total supply of tokens.

### Contract Structure

The contract consists of the following components:

- ERC20 token functionality for basic token operations.
- ERC20Capped extension to enforce a maximum cap on the total supply of tokens.

### Functions

#### Constructor

##### `constructor(uint256 cap)`

Initializes the Pong42 token contract.

- Parameters:
  - `cap`: The maximum cap for the total supply of tokens.

#### External Functions

##### `mintTokens(address to, uint256 amount)`

Mints new tokens and transfers them to the specified address.

- Parameters:
  - `to`: The address to which new tokens will be minted.
  - `amount`: The amount of tokens to mint.
- Modifier:
  - `onlyOwner`: Only the contract owner can call this function.

##### `myBalance() returns (uint256)`

Returns the balance of tokens held by the contract address.

#### Internal Functions

##### `_mint(address account, uint256 amount)`

Mints tokens and adds them to the specified address's balance.

- Parameters:
  - `account`: The address to which new tokens will be minted.
  - `amount`: The amount of tokens to mint.
- Modifier:
  - Ensures that the total supply does not exceed the maximum cap.

#### Modifiers

##### `onlyOwner`

Restricts access to specific functions to the contract owner.

### State Variables

- `owner`: The address of the contract owner.

### Usage

- Upon deployment, the contract mints tokens to the contract owner.
- The contract owner can mint additional tokens using the `mintTokens` function.
- The contract balance can be queried using the `myBalance` function.


## Summary

The `Faucet` contract provides a token dispensing mechanism, while the `Pong42` contract manages the supply of a capped ERC20 token with miner rewards. Both contracts are designed to ensure proper token management and reward distribution while enforcing security measures such as access control and supply limits.
