// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    mapping(address => bool) public isSigner;
    address[] public signerAddresses;
    mapping(uint256 => uint256) public approvalsNeeded;
    mapping(uint256 => mapping(address => bool)) public approvals;

    constructor() ERC20("MyToken42", "MT42") {
        _mint(msg.sender, 1000000 * 10 ** uint(decimals()));
        isSigner[msg.sender] = true;
        signerAddresses.push(msg.sender);
    }

    function addSigner(address _signer) public onlyOwner {
        isSigner[_signer] = true;
        signerAddresses.push(_signer);
    }

    function approveMint(uint256 tokenId) public {
        require(isSigner[msg.sender], "Not an authorized signer");
        approvals[tokenId][msg.sender] = true;
    }

    function mintToken(string memory tokenURI, uint256 signaturesRequired) public onlyOwner returns (uint256) {
        uint256 tokenId = totalSupply() + 1;
        approvalsNeeded[tokenId] = signaturesRequired;
        _mint(address(this), tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    function finalizeMint(uint256 tokenId) public {
        require(approvalsNeeded[tokenId] > 0, "Mint not initiated");
        uint256 count = 0;
        for (uint256 i = 0; i < signerAddresses.length; i++) {
            if (approvals[tokenId][signerAddresses[i]]) {
                count++;
            }
        }
        require(count >= approvalsNeeded[tokenId], "Not enough signatures");
        _transfer(address(this), msg.sender, tokenId);
    }
}