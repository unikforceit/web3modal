import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCoreChains,
  WagmiCore
} from "https://unpkg.com/@web3modal/ethereum";

import { Web3Modal } from "https://unpkg.com/@web3modal/html";

//import { configureChains, createConfig, getAccount, readContract } from "https://unpkg.com/@wagmi/core";

import { nft } from "./abi.js";

// Equivalent to importing from @wagmi/core
const { configureChains, createConfig, getAccount, readContract } = WagmiCore

 // Equivalent to importing from @wagmi/core/chains
 const { mainnet } = WagmiCoreChains

const chains = [mainnet];
const projectId = "210b371a0406d0aa02a6c3a56fb9dda5";

let account;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
const web3modal = new Web3Modal({ projectId }, ethereumClient);
let accounts = await getAccount();
    account = accounts?.address;
    const toxic = await readContract({
    address: "0x5ca8dd7f8E1Ee6D0c27a7BE6d9F33ef403fbcDD8",
    abi: nft.abi,
    functionName: "balanceOf",
    args: [String(account)],
  });
  const som = await readContract({
    address: "0x32e14d6f3dda2b95e505b14eb4552fd3eeaa1f0d",
    abi: nft.abi,
    functionName: "balanceOf",
    args: [String(account)],
  });
// document.getElementById("my-button").addEventListener("click", async () => {
//   await web3modal.openModal();
//   // gets the account address
//   let accounts = await getAccount();
//   account = accounts?.address;
//   document.getElementById("address").innerText = account;
//   console.log(accounts);
// });

// document.getElementById("balance-button").addEventListener("click", async () => {
//   // gets balance of user
//   console.log(nft);
//   const toxic = await readContract({
//     address: "0x5ca8dd7f8E1Ee6D0c27a7BE6d9F33ef403fbcDD8",
//     abi: nft.abi,
//     functionName: "balanceOf",
//     args: [String(account)],
//   });
//   const som = await readContract({
//     address: "0x32e14d6f3dda2b95e505b14eb4552fd3eeaa1f0d",
//     abi: nft.abi,
//     functionName: "balanceOf",
//     args: [String(account)],
//   });

//   // console.info(isError, isLoading);
//   document.getElementById("balance").innerText = Number(toxic);
//   document.getElementById("som").innerText = Number(som);
//   console.log(Number(toxic));
//   console.log(Number(som));
// });
$(document).ready(function() {
  function showOverlayText() {
    if (accounts?.isConnected) {
      $("#tsc-nft").text(toxic);
      $("#som-nft").text(som);
      $("#overlay").fadeIn().delay(1000).fadeOut();
    }
  }
  showOverlayText();
});