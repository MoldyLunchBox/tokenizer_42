import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Game } from './components/Game';
import './App.css';
// ABI of the Faucet contract
import faucetABI from './utils/Pong42.json'
import VanillaTilt from 'vanilla-tilt';
import Panel from './components/Panel';




const App = () => {

  const [players, setPlayers] = useState({ you: 0, comp: 0 })
  const [gameState, setGameState] = useState("")
  const [rewards, setRewards] = useState(0)

  useEffect(() => {
    const storedCount = localStorage.getItem('p42_rewards');
    if (storedCount) {
      if (parseInt(storedCount) > 50)
        setRewards(0);
      else
        setRewards(parseInt(storedCount));
    }
  }, [])


  useEffect(() => {
    if (players.you)
    setRewards(prevCount => prevCount + 1);
  }, [players.you])

  useEffect(() => {
    if (rewards)
    localStorage.setItem('p42_rewards', rewards.toString());
  }, [rewards])



  return (
    <div className="w-full h-full pb-[500px] flex flex-col  bg-gradient-to-b from-black to-[#1e293b]">
      <h1 className="flex items-center text-2xl font-extrabold my-10 justify-center text-white dark:text-white sm:text-4xl lg:text-6xl lg:my-20" >Ping Pong<span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">But you can win</span></h1>
      <div className='flex justify-center'>
        <Panel rewards={rewards} setRewards={setRewards} players={players} setPlayers={setPlayers} gameState={gameState} setGameState={setGameState} />
      </div>
      
      <Game players={players} setPlayers={setPlayers} gameState={gameState} setGameState={setGameState} />
    </div>
  );
};

export default App;