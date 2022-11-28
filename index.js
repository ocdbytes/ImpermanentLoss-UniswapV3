import { ethers } from "ethers";
import { CONTRACT_ADDRESS, TOKEN_ID_UNISWAP, RPC_URL, PRIVATE_KEY } from "./config/config";
import getImpermanentLoss from "./utils/getImpermanentLoss";
import ExitPoolUniswapABI from "./assets/ExitPoolUniswapABI.json";

console.log("Exit Pool upon loss 👋");

const exitFromPool = async () => {
    try {
        // declaring the key web3 vars
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        let wallet = new ethers.Wallet(PRIVATE_KEY, provider)

        // Getting the contract from address and ABI
        const ExitPoolUniswap = new ethers.ContractFactory(CONTRACT_ADDRESS, ExitPoolUniswapABI, wallet);

        const transaction = await ExitPoolUniswap.exitLiquidity(TOKEN_ID_UNISWAP);

        console.log("Transaction done :");
        console.log(transaction);
        console.log("Exited from liquidity successfully ✅");
    } catch (error) {
        console.log("There was some error : ", error);
    }
}

const main = () => {
    var bot = setInterval(() => {
        const res = getImpermanentLoss();
        if (res >= 0.5) {
            exitFromPool();
            clearInterval(bot);
            console.log("Your funds have been saved :)");
        }
    }, 5000);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});