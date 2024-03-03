pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Pong42 is ERC20Capped, Ownable{
    constructor() Ownable(msg.sender) ERC20("pong42", "p42") ERC20Capped(1000) {
    }
    function minting(address addr, uint256 ammount) external {
        _mint(addr, ammount);
    }
}
