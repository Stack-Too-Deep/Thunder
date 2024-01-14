import { ethers } from "ethers";

export default async function getContract(contractAddress, abi) {
  const ethereum = window.ethereum;
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new ethers.providers.Web3Provider(ethereum)
  const walletAddress = accounts[0]
  const signer = provider.getSigner(walletAddress)
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
}