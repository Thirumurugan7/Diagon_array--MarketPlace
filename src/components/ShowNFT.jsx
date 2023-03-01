import React, { useState } from "react";
const imgAddress =
  "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg";
import Identicons from "react-identicons";
import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
const ShowNFT = () => {
  const [modal] = useGlobalState("showModal");

  const handleSubmit = (e) => {
    console.log("minted");
    closeModal();
  };
  const onChangePrice = () => {
    setGlobalState("showModal", "scale-0");
    setGlobalState("updateModal", "scale-100");
  };
  const closeModal = () => {
    setGlobalState("showModal", "scale-0");
    resetForm();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}  `}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 h-7/12 md:w-2/5 p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold">Lollipop NFT</p>
            <button
              onClick={closeModal}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 h-40 w-40 rounded-xl overflow-hidden">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={imgAddress}
                alt="NFT"
              />
            </div>
          </div>

          <div className="flex flex-col justify-start rounded-xl mt-5">
            <h4 className="text-white font-semibold">Title</h4>
            <p className="text-gray-400 text-xs my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              accusantium.
            </p>
            <div className="flex justify-between items-center mt-3 text-white">
              <div className="flex justify-start items-center">
                <Identicons
                  className="h-10 w-10 object-contain rounded-full mr-3"
                  string={"yqwe3shgxnfb"}
                  size={50}
                />
                <div className="flex flex-col justify-between items-start">
                  <small className="text-white font-bold">@owner</small>
                  <small className="text-pink-800 font-semibold">
                    0x31....342534s
                  </small>
                </div>
              </div>
              <div className="flex flex-col text-white">
                <small className="text-xs">Current Price</small>
                <p className="text-sm font-semibold">0.34 ETH</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center space-x-2">
            <button
              type="submit"
              className="shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd255f] rounded-full text-white p-2 mt-5 w-full"
            >
              Purchase
            </button>
            <button
              type="submit"
              className="shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd255f] rounded-full text-white p-2 mt-5 w-full"
              onClick={onChangePrice}
            >
              Change Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowNFT;
