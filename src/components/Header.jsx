import React from "react";
import logo from "../assets/timeless.png";
import { connectWallet } from "../Blockchain.services";
import { useGlobalState } from "../store";

import { truncate } from "../store";

//md: nu kudutha athu desktop size ku illana mobile  size ku
//md la medium screen
const header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <div className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img className="w-32 cursor-pointer" src={logo} alt="logo" />
      </div>
      <ul className="text-white list-none md:flex-[0.5] md:flex  hidden flex-initial flex-row justify-between items-center">
        <li className="mx-4 cursor-pointer">Market</li>
        <li className="mx-4 cursor-pointer">Artist</li>
        <li className="mx-4 cursor-pointer">Features</li>
        <li className="mx-4 cursor-pointer">Community</li>
      </ul>

      {connectWallet ? (
        <button className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2 rounded-full ml-2">
          {truncate(connectedAccount, 4, 4, 11)}
          {console.log(truncate(connectedAccount, 4, 4, 11))}
        </button>
      ) : (
        <button
          className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2 rounded-full ml-2"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default header;
