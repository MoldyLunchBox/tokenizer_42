const hre = require("hardhat");

async function main() {
  const Pong42 = await hre.ethers.getContractFactory("Pong42");
  const pong42 = await Pong42.deploy(100000000);

  await pong42.deployed();

  console.log("pong42  deployed: ", pong42.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
