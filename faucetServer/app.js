const express = require('express');
const { Web3 } = require('web3');
const cors = require('cors'); // Import the cors package


const MyTokenABI = require('./MyToken.json'); // Import the ABI of your ERC20 contract
const PROJECT_ID = 'dd70ee3202a940b0913a754438747de1'

const app = express();
const web3 = new Web3(`https://sepolia.infura.io/v3/${PROJECT_ID}`);  
const contractAddress = '0x12C87D62da8F80634833aaAab6B3fE98DaFdB9a5';  
const contract = new web3.eth.Contract(MyTokenABI.abi, contractAddress);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
// Faucet endpoint
app.post('/faucet', async (req, res) => {
    const { recipient } = req.body;

    try {
        // Call the giveTokens function of your ERC20 contract
        const transaction = await contract.methods.giveTokens(recipient, '1000000000000000000').send({ from: '0x3e76c7e4C5454c322fb2e5b07FEefc2B75299476' });
        res.json({ success: true, transactionHash: transaction.transactionHash });
    } catch (error) {
        console.error("Error occurred while transferring tokens:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});