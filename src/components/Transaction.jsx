import React from "react";
import { BiTransfer } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";

const Transaction = () => {
  return (
    <div className="bg-[#151c25]">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          Latest Transactions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gaps-4 lg:gaps-2 py-2.5">
          {Array(3)
            .fill()
            .map((nft, i) => (
              <Transact keys={i} tx={i + 1} />
            ))}
        </div>
        <div className="text-center">
          <button className="shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd255f] rounded-full text-white p-2">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

const Transact = ({ tx }) => (
  <div
    key={tx.id}
    className="flex justify-between items-center border border-pink-500 text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3"
  >
    <div className="rounded-md shadow-sm shadow-pink-500 p-2">
      <BiTransfer />
    </div>
    <div>
      <h4 className="text-sm">#{tx} Fund Transferred</h4>
      <small className="flex justify-start items-center">
        <span className="mr-1">Received By</span>
        <a href="#" className="text-pint-500 mr-2" target="_blank">
          063463.....25235
        </a>
        <MdOpenInNew />
      </small>
    </div>
    <p className="text-sm font-medium">0.84 ETH</p>
  </div>
);

export default Transaction;
