import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function App() {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle token request
  const handleTokenRequest = async () => {
    try {
      // Make a POST request to your faucet endpoint
      const response = await axios.post('http://localhost:3001/faucet', {
        recipient: recipientAddress
      });

      // Handle response
      if (response.data.success) {
        setMessage('Tokens sent successfully!');
      } else {
        setMessage('Failed to send tokens. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred while requesting tokens:', error);
      setMessage('Error occurred while requesting tokens. Please try again.');
    }
  };

  return (
    <div>
      <h1>Faucet Application</h1>
      <input
        type="text"
        placeholder="Enter your wallet address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <button onClick={handleTokenRequest}>Request Tokens</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
