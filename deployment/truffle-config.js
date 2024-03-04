const HDWalletProvider = require('@truffle/hdwallet-provider');
const MNEMONIC = 'blossom define october shove strong ill property lava lizard gate bike satoshi';
const PROJECT_ID = 'dd70ee3202a940b0913a754438747de1'


module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 1337,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://sepolia.infura.io/v3/${PROJECT_ID}`),
      network_id: '*', // Match any network id
      gas: 5500000, // Gas limit used for deploys
      gasPrice: 25000000000, // Gas price used for deploys
    },
  },
  compilers: {
    solc: {
      version:'0.8.0',
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
