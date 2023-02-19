import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10">
      <div className="md:w-3/6 w-full">
        <div>
          <h1 className="text-white text-5xl font-bold">
            Buy and Sell <br /> Digital Arts, <br />{" "}
            <span className="text-gradient">NFTs</span>
            Collections
          </h1>
          <p className="text-gray-500 mt-3 font-semibold text-sm ">
            Mint and collect the hottest NFTs around
          </p>
        </div>
        <div className="flex mt-5">
          <button className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] rounded-full p-2">
            Create NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
