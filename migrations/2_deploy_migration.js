const TimelessNFT = artifacts.require("TimelessNFT");
//grabing the abi
module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts();
  //passing the params for constructor
  await deployer.deploy(TimelessNFT, "TimelessNFTs", "TNT", 10, accounts[1]);
};
