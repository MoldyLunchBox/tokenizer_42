const ercToken = artifacts.require("MyToken");

module.exports = function(deployer) {
  const cap = 1000;

  deployer.deploy(ercToken);
};
