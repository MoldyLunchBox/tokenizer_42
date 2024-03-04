import logo from './logo.svg';
import './App.css';
import { Game } from './components/Game';
import { useEffect, useState } from 'react';
import { WalletConnect } from './components/WalletConnect';

function App() {

  const [connected, setConnected] = useState(false);

const connectWallet = async () => {
  if (window.ethereum) {
      try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setConnected(true);
      } catch (error) {
          console.error('User denied wallet connection');
      }
  } else {
      console.error('MetaMask is not installed');
  }
};

// useEffect(() => {
//   console.log(window.ethereum.selectedAddress)
//   const walletIsConnected = async()=>{
//     const ret = await window.ethereum.request({method: 'eth_accounts'})
//     return ret.length ? true : false
//   }
//   if (window.ethereum) {
//     const  wallet  = walletIsConnected()
//     console.log(wallet)
//     if (walletIsConnected())
//       setConnected(true);
//   }
// }, []);

  return (
    <div className="w-full h-[100vh] flex flex-col  bg-gradient-to-b from-black to-[#1e293b]">
        <WalletConnect connected={connected} connectWallet={connectWallet} />
      <h1 className="flex items-center text-2xl font-extrabold my-10 justify-center text-white dark:text-white sm:text-4xl lg:text-6xl lg:my-20" >Ping Pong<span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">But you can win</span></h1>

      <Game />
    </div>
  );
}

export default App;
