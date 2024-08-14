// const rpcUrl = "https://rpc.devnet.surge.dev";
// const privateKey =
//   "0x5179c9f334cca3df1546856093f8c19b5180e73560993e42cbc42c7db82365de";
// const recipientAddress = "0xF6dd8A30F4b3eD1c40c5C403A6b77B891f64e178";
// const sendAmountWei = "10000000000000000"; //
require("dotenv").config();
const { ethers } = require("ethers");
const { Wallet } = require("ethers");
const { Provider } = require("viem");

// Configuration
const rpcUrl = "http://143.110.253.230:12346";
const privateKey = process.env.PRIVATE_KEY;
const recipientAddress = process.env.RECIPIENT_ADDRESS;
const sendAmountWei = ethers.parseEther("0.0001"); // 0.01 ETH in wei

// Connect to the Ethereum network
const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new Wallet(privateKey, provider);

// Function to send a transaction
async function sendTransaction() {
  const tx = {
    to: recipientAddress,
    value: sendAmountWei,
    gasLimit: 21000,
    gasPrice: (await provider.getFeeData()).gasPrice,
  };

  const transactionResponse = await wallet.sendTransaction(tx);
  const receipt = await transactionResponse.wait();
  console.log({ receipt });
  console.log(`Transaction sent with hash: ${receipt.hash}`);
}

// Main loop to send transactions every 30 seconds
(async function main() {
  try {
    while (true) {
      await sendTransaction();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error(`Error sending transaction: ${error}`);
  }
})();
