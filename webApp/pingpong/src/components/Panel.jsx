import React, { useEffect, useState } from 'react'
import VanillaTilt from 'vanilla-tilt';
import AlertModal from './AlertModal';
import { TranferTokens } from './TranferTokens';
import { use } from 'matter-js';

const Panel = ({ rewards, setRewards, players, setPlayers, gameState, setGameState }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        const tiltElement = document.querySelector('.tilted-div');
        VanillaTilt.init(tiltElement, {
            max: 5,
            speed: 400,
            glare: true,
            'max-glare': 0.07
        });

        return () => {
            tiltElement.vanillaTilt.destroy(); // Cleanup on unmount
        };
    }, []);

useEffect(()=>{
    
},[players.you])
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        isOpen ? document.getElementById('my_modal_1').showModal() : console.log('')

    }, [isOpen])

    useEffect(()=>{
        if (error)
        setIsOpen(true);
        
    },[error])
    return (
        <div className='flex flex-col max-w-lg rounded bg-no-repeat bg-center bg-[#1e293b] tilted-div py-10 px-8 w-full text-white opacity-80'
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1645516484419-35a747c99474?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "100%" }} >
            <div className='flex flex-col gap-4'>
                <div className='text-xl font-bold mb-5'>Token: Pong42 (P42)</div>
                <div className='flex flex-row justify-between border-b'>
                    <div className='text-sm text-gray-400'>Your Balance</div>
                    <div className='flex flex-row items-center gap-1'>
                        <div className='text-lg font-bold text-white'>{rewards}</div>
                        <div className='text-sm text-gray-400'>P42</div>
                    </div>
                </div>
                <TranferTokens rewards={rewards} setRewards={setRewards} setSuccessMessage={setSuccessMessage} setError={setError} players={players} setPlayers={setPlayers} gameState={gameState} setGameState={setGameState} />
                <div className='flex flex-col'>
                    <div className='text-lg font-semibold text-blue-400'>Status</div>
                    <div> {successMessage}</div>
                </div>
            </div>
            <AlertModal text={error} />
        </div>
    )
}

export default Panel