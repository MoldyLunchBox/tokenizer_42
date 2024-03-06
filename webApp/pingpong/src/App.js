import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Game } from './components/Game';
import './App.css';

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

const App = () => {
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

      const receipt = await faucetContract.methods.requestTokens(players.you).send({ from: account, gas: 3000000, });
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


  // State to hold the token balance
  const [tokenBalance, setTokenBalance] = useState(0);


  const [players, setPlayers] = useState({ you: 12, comp: 0 })
  const [gameState, setGameState] = useState("")


  const handleStart = () => {
    setGameState("")
  }
  return (
    <div className="w-full h-[100vh] flex flex-col  bg-gradient-to-b from-black to-[#1e293b]">
      <h1 className="flex items-center text-2xl font-extrabold my-10 justify-center text-white dark:text-white sm:text-4xl lg:text-6xl lg:my-20" >Ping Pong<span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">But you can win</span></h1>

      {/* Panel to display token balance */}
      <div className='flex flex-row justify-center '>

        <div className="flex justify-center items-center bg-gray-800 text-white p-4 rounded-lg  mt-5">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Token Balance</h2>
            <p className="text-2xl font-bold">{players.you}</p>
            <button
              onClick={requestTokens}
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Withdraw Balance
            </button>
          </div>

        </div>
        <div className="flex justify-center items-center bg-gray-800 text-white p-4 rounded-lg   mt-5">
          <div className="text-center flex flex-col justify-around ">
            <h2 className="text-lg font-semibold mb-2">Stop the game</h2>
            
            <button
              onClick={handleStart}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition duration-300 ease-in-out"
            >
              Stop Game
            </button>
          </div>

        </div>

      </div>
      {/* Render your Game component */}
      <Game players={players} setPlayers={setPlayers} gameState={gameState} setGameState={setGameState} />
    </div>
  );
};

export default App;