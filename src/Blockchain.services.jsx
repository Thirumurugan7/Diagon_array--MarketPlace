import web3 from "web3";

import { setGlobalState, getGlobalState, setAlert } from "./store";

import abi from "./abis/TimelessNFT.json";

const { ethereum } = window;

window.web3 = new web3(ethereum);

window.web3 = new web3(window.web3.currentProvider);

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");
  if (connectedAccount) {
    const web3 = window.web3;

    const networkId = await web3.eth.net.getId();
    const networkData = abi.networks[networkId];
    if (networkData) {
      const contract = new web3.eth.contract(abi.abi, networkData.address);
      return contract;
    } else {
      return null;
    }
  } else {
    return getGlobalState("contract");
  }
};

const connectWallet = async () => {
  console.log("clicked");
  try {
    if (!ethereum) return alert("please install metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    setGlobalState("connectedAccount", accounts[0].toLowerCase());
    console.log(getGlobalState("connectedAccount"));
  } catch (error) {
    reportError(error);
  }
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("please install metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    window.ethereum.on("chainChange", async (chainId) => {
      window.location.reload();
    });
    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0].toLowerCase());
    } else {
      alert("Please Connect wallet");
      console.log("No Ethereum Account found");
    }
  } catch (error) {}
};

const reportError = (error) => {
  setAlert(JSON.stringify(error), "red");
  throw new Error("No ethereum object");
};

export { connectWallet, isWalletConnected };
