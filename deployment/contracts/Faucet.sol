// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/**
 * @title Faucet
 * @dev A token faucet contract allowing users to request tokens in exchange for ETH.
 */
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract Faucet {
    address payable owner;
    IERC20 public token;

    uint256 public withdrawalAmount =  (10**18);
    uint256 public lockTime = 1 minutes;

    event Withdrawal(address indexed to, uint256 indexed amount);
    event Deposit(address indexed from, uint256 indexed amount);

    mapping(address => uint256) nextAccessTime;

    /**
     * @dev Constructor to initialize the Faucet contract.
     * @param tokenAddress The address of the ERC20 token.
     */
    constructor(address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    /**
     * @dev Allows users to request tokens from the faucet.
     * @param amount The amount of tokens requested.
     * Requirements:
     * - Request must not originate from a zero account.
     * - Sufficient balance in the faucet for withdrawal request.
     * - Sufficient time elapsed since the last withdrawal.
     * - Maximum withdrawal amount is limited to 50 tokens per request.
     */
    function requestTokens(uint256 amount) public {
        require(msg.sender != address(0), "Request must not originate from a zero account");
        require(token.balanceOf(address(this)) >= withdrawalAmount, "Insufficient balance in faucet for withdrawal request");
        require(block.timestamp >= nextAccessTime[msg.sender], "Insufficient time elapsed since last withdrawal - try again later.");
        require(amount <= 50, "max amount is 50");

        nextAccessTime[msg.sender] = block.timestamp + lockTime;
        token.transfer(msg.sender, amount * withdrawalAmount);
    }

    /**
     * @dev Allows the contract to receive ETH.
     */
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @dev Returns the balance of tokens held by the faucet contract.
     */
    function getBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function setWithdrawalAmount(uint256 amount) public onlyOwner {
        withdrawalAmount = amount ;
    }

    /**
     * @dev Sets the lock time for token requests.
     * @param amount The new lock time in seconds.
     * Requirements:
     * - Only the contract owner can call this function.
     */
    function setLockTime(uint256 amount) public onlyOwner {
        lockTime = amount * 1 minutes;
    }

    /**
     * @dev Withdraws tokens from the faucet contract.
     * Requirements:
     * - Only the contract owner can call this function.
     */
    function withdraw() external onlyOwner {
        emit Withdrawal(msg.sender, token.balanceOf(address(this)));
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    /**
     * @dev Modifier to restrict access to functions to the contract owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }
}
