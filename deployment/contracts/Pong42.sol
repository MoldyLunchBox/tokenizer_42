// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pong42 is ERC20, Ownable {
    constructor() ERC20("Pong42", "p42") {
        uint256 initialSupply =  42 * 1000000 * (10 ** uint(decimals()));
       
        _mint(msg.sender, initialSupply);
    }

    function transferTokens(address to, uint256 amount) external returns (bool) {
        _transfer(_msgSender(), to, amount);
        return true;
    }

    function transferTokensFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool) {
        _transfer(from, to, amount);
        _approve(
            from,
            _msgSender(),
            allowance(from, _msgSender()) - amount
        );
        return true;
    }

    function getTokenBalance(address account) external view returns (uint256) {
        return balanceOf(account);
    }

    function getTokenAllowance(address owner, address spender)
        external
        view
        returns (uint256)
    {
        return allowance(owner, spender);
    }
}
