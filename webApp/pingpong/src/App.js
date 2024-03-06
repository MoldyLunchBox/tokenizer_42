import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

// Replace with your contract addresses
const faucetContractAddress = '0x64D7aDa96f62bED3818caEC2a6846568d7717543';
const oceanTokenAddress = '0x35aa621aC7771Ca27d0A90320A85dBf701d022F1';

// ABI of the Faucet contract
const faucetABI = {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        }
      ],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdrawal",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lockTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "requestTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "setLockTime",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "setWithdrawalAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawalAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
}

const TokenFaucet = () => {
  const [web3, setWeb3] = useState(null);
  const [faucetContract, setFaucetContract] = useState(null);
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize Web3 and contract instance
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const faucetContractInstance = new web3Instance.eth.Contract(faucetABI.abi, faucetContractAddress);
          setWeb3(web3Instance);
          setFaucetContract(faucetContractInstance);
        } catch (error) {
          console.error(error);
        }
      }
    };
    initWeb3();
  }, []);

  // Function to request tokens from the faucet
  const requestTokens = async () => {
    if (!web3 || !faucetContract) return;

    try {
      setLoading(true);
      setError('');
      
      const receipt = await faucetContract.methods.requestTokens('12').send({ from: account,gas: 3000000, });
      if (receipt.status) {
        setSuccessMessage('Tokens successfully requested and sent to your wallet.');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to request tokens');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Token Faucet</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <button onClick={requestTokens}>Request Tokens</button>
    </div>
  );
};

export default TokenFaucet;
