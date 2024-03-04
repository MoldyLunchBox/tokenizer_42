import React from 'react'

export const WalletConnect = ({connected, connectWallet}) => {
  return (
    <div className="p-8 bg-white rounded shadow-md">
    <h2 className="text-xl font-bold mb-4">Connect to Your Wallet</h2>
    {connected ? (
        <div>
            <p className="text-green-600 mb-2">Wallet Connected!</p>
            {/* Add your application logic here */}
        </div>
    ) : (
        <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Connect to MetaMask
        </button>
    )}
</div>
  )
}
