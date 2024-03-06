const hre = require("hardhat");

async function main() {
  const MyaToken = await hre.ethers.getContractFactory("MyaToken");
  const myaToken = await MyaToken.deploy(100000000, 50);

  await myaToken.deployed();

  console.log("myaToken  deployed: ", myaToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
