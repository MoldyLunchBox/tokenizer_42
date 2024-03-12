# how to  deployment

This document provides a step-by-step guide to deploying the Pong42 token contract and the Faucet contract on the Sepolina test network using the Hardhat development environment. The deployment scripts utilize Hardhat to compile and deploy the contracts.

Deployment Steps:

- **Install Dependencies:** Before deploying the contracts, ensure that Node.js is installed on your system.
Navigate to the project directory in your terminal and run the command `npm install` to install the necessary dependencies specified in the package.json file.
- **Hardhat config:** Ensure that the Sepolina network is configured in the hardhat.config.js file with appropriate network settings.
- **Deploy**:  Run the command `npx hardhat run --network sepolia scripts/deploy.js` to deploy the Pong42 token contract.
Obtain the address where the Pong42 token contract was deployed and replace `"ADDRESS_WHERE_PONG42_WAS_DEPLOYED"` in `deployFaucet.js` with this address. Run the command `npx hardhat run --network sepolia scripts/deployFaucet.js` to deploy the Faucet contract.