require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/dd70ee3202a940b0913a754438747de1',
      accounts: [
        'ac0b748c21d721efb7f829fc39d2e67e147e3c1140810f0de11733ad81f3d441'
        // Add more accounts if needed
      ]
    }
  }
};
