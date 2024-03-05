// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pong42 is ERC20Capped, Ownable {
    constructor(uint256 cap) ERC20("Pong42", "P42") ERC20Capped(cap) {}

    function mintTokens(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
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
