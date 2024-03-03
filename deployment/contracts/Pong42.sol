pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Pong42 is ERC20Capped, Ownable {
    constructor() ERC20("pong42", "p42") ERC20Capped(1000) Ownable() {
    }

    function minting(address addr, uint256 amount) external onlyOwner {
        _mint(addr, amount);
    }

    /**
     * @dev Returns the balance of tokens held by owner
     * @return The balance of tokens held by owner
     */
    function getMyBalance() external view returns (uint256) {
        return balanceOf(msg.sender);
    }


   /**
     * @dev Returns the balance of tokens held by the specified address.
     * @param account The address for which to check the balance.
     * @return The balance of tokens held by the specified address.
     */
    function getBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }

  /**
     * @dev Function to mint a certain amount of tokens.
     * @param recipient The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mintTokens(address recipient, uint256 amount) external onlyOwner {
        _mint(recipient, amount);
    }

}
