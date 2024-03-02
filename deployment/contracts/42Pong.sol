pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Pong42 is ERC20{
    constructor() ERC20("pong42", "p42"){
        _mint(msg.sender, 10000);
    }

}