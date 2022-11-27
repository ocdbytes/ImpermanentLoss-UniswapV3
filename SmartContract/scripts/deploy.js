const hre = require("hardhat");

async function main() {
    console.log("Deploying....");
    // Getting contract
    const ExitPoolUniswap = await hre.ethers.getContractFactory("ExitPoolUniswap");
    // No contructor params
    const exitPoolUniswap = await ExitPoolUniswap.deploy()
    // Await deployemt
    await exitPoolUniswap.deployed();

    console.log("Exit Pool Uniswap contract deployed: ", exitPoolUniswap.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
