
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
// ABI of the Faucet contract
import faucetABI from '../utils/Pong42.json'




export const TranferTokens = ({ rewards, setIsOpen, setRewards, setSuccessMessage, setError, players, setPlayers, gameState, setGameState }) => {

    const [web3, setWeb3] = useState(null);
    const [faucetContract, setFaucetContract] = useState(null);
    const [account, setAccount] = useState('');
    const [loading, setLoading] = useState(false);

    const faucetContractAddress = '0x127D1a717abE6F1a99AA0cdfD6550cC4F4A587f2';
    const oceanTokenAddress = '0x35aa621aC7771Ca27d0A90320A85dBf701d022F1';
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

            const receipt = await faucetContract.methods.requestTokens(rewards).send({ from: 0x0, gas: 3000000, });
            if (receipt.status) {
                setSuccessMessage('Tokens successfully requested and sent to your wallet.');
                localStorage.setItem('p42_rewards', 0);

            }
        } catch (error) {
            console.error(error);
            setError('Failed to request tokens');
            setIsOpen(true)
        } finally {
            setLoading(false);
        }
    };


    return (
        <button onClick={requestTokens} className="bg-[#1e293b] relative px-2 py-1 w-fit mx-auto inline-flex items-center justify-start overflow-hidden transition-all rounded hover:bg-[#1e293b] group">

            {/* purple box */}
            <span className="w-0 h-0 rounded bg-green-400 absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
            <span className="w-full transition-colors  font-semibold duration-300 text-green-400 ease-in-out group-hover:text-white z-10">
                CLAIM
            </span>
        </button>
    )
}
