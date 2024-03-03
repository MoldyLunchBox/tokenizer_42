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
     * @dev Returns the balance of tokens held by the specified address.
     * @param account The address for which to check the balance.
     * @return The balance of tokens held by the specified address.
     */
    function getBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }
}
