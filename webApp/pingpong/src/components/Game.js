import React, { useEffect, useState } from 'react'
import Matter from 'matter-js'
import { MatterJsModules } from '../utils/MatterJsModules';

export const Game = ({players, setPlayers, gameState, setGameState}) => {
    const aspect = 16 / 9
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(375 * aspect)
    const [matterjsInstance, setMatterjsInstance] = useState(null)
    const [ballSpeed, setBallSpeed] = useState(10)
    const [countDown, setCountDown] = useState(3)
    const [goal, setGoal] = useState(false)
    const maxSpeed = 25
    const divStyle = {
        height: `${height}px`,
    };
    useEffect(() => {
        if (matterjsInstance) {
            setCountDown(3)
            matterjsInstance.modules.Body.setVelocity(matterjsInstance.bodies.ball, { x: 0, y: 0 });
            matterjsInstance.modules.Body.setPosition(matterjsInstance.bodies.ball, { x: matterjsInstance.obj.divWidth / 2, y: matterjsInstance.obj.divHeight / 2 });
            setTimeout(() => {
                matterjsInstance.modules.Body.setPosition(matterjsInstance.bodies.ball, { x: matterjsInstance.obj.divWidth / 2, y: matterjsInstance.obj.divHeight / 2 });


            }, 500)
            setTimeout(() => {    // after seconds launch the ball again
                setGoal(false)
                matterjsInstance.modules.Body.setVelocity(matterjsInstance.bodies.ball, { x: 5, y: 6 });
            }, 5000);
            const interval = setInterval(() => {
                setCountDown((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [players])

    useEffect(() => {
        if (gameState == "started") {

            matterjsInstance.modules.Body.setVelocity(matterjsInstance.bodies.ball, { x: 5, y: 6 });

        }
        else if (matterjsInstance){
            matterjsInstance.modules.Body.setVelocity(matterjsInstance.bodies.ball, { x: 0, y: 0 });
            matterjsInstance.modules.Body.setPosition(matterjsInstance.bodies.ball, { x: matterjsInstance.obj.divWidth / 2, y: matterjsInstance.obj.divHeight / 2 });
 
        }
    }, [gameState])

    useEffect(() => {
        if (!matterjsInstance && height) {
            const MatterNode = new MatterJsModules(maxSpeed)
            setMatterjsInstance(MatterNode)
            MatterNode.createModules()
            MatterNode.createBodies()
            MatterNode.events()
            MatterNode.run()
            MatterNode.ballTracker(players, setPlayers, setBallSpeed, setGoal)
        }
    }, [height]); // Empty dependency array to run the effect only once

    useEffect(() => {
    }, [players])

    useEffect(() => {
        const matterContainer = document.querySelector("#matter-Container")
        if (matterContainer)
            setHeight(matterContainer.clientWidth / aspect)
        const handleResize = () => {

            setHeight(matterContainer?.clientWidth / aspect); // Update the width based on the window size
        };

        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize); // Clean up the event listener
        };
    }, []);

    useEffect(() => {
        matterjsInstance?.onWindowSizeChange()

    }, [height])

    const handleClickStart = () => {
        setGameState("started")
    }

    const containerStyle = {
        width: `${ballSpeed * 100 / maxSpeed}%`,
        height: `${ballSpeed * 100 / maxSpeed}%`,
    };

    return (
        <div className="flex px-10 justify-center relative w-full">
            <div className="flex  justify-center items-center flex-col w-full max-w-[900px]">
                {
                    goal ?
                        <span className="countdown absolute top-0  text-white font-mono text-6xl">
                            <span style={{ '--value': countDown }}></span>
                        </span>
                        : null
                }
                <div className='h-10 flex text-sm  flex-row my-5 text-white font-semibold items-center  w-full sm:text-lg lg:text-2xl'>
                    {!gameState.length ?

                        <div className="absolute inset-0 top-10  flex items-center justify-center">
                            <div className='w-1/3 h-1/3 max-w-[300px] backdrop-blur-sm  flex items-center gap-2 flex-col justify-center bg-white/30 sm:gap-11 rounded-lg bg-white'>

                                <div className='text-center bg-white bg-opacity-25 rounded-sm w-full font-extrabold text-xs  text-[#1e1b4b] sm:text-lg'>
                                    START THE GAME
                                </div>
                                <button onClick={handleClickStart} className='bg-[#60a5fa] bg-opacity-90  rounded-sm p-1 shadow sm:px-4 sm:p-2 hover:bg-[#93c5fd]'> Start</button>
                            </div>
                        </div>
                        : null

                    }
                    <div className='flex w-full justify-center '>
                        <div className='flex-col text-center'>
                            <div>
                                You
                            </div >
                            <div> {players.you}</div>
                        </div>
                    </div>
                    <div className='flex w-full justify-center '>
                        <div className='flex-col text-center'>
                            <div>
                                Comp
                            </div >
                            <div> {players.comp}</div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full ">
                    <div className="rounded border border-red-500 p-1">
                        <div className="flex h-6 p-2 items-center justify-center rounded bg-red-300 text-xs leading-none" style={containerStyle}>
                            <div className="absolute inset-0  flex items-center justify-center">
                                <span className="p-1 text-sm text-white">Ball speed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="matter-Container" style={divStyle} className={`border-4 border-white h-full flex  bg-gradient-to-r from-[#064e3b] to-[#312e81] w-full max-w-[990px]}`}>   </div>
            </div>
        </div>
    )
}
