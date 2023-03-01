import React, { useState } from "react";
const imgAddress =
  "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg";

import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
const UpdateNFT = () => {
  const [modal] = useGlobalState("updateModal");

  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!price) return;
    console.log("minted");
    closeModal();
  };

  const closeModal = () => {
    setGlobalState("updateModal", "scale-0");
    resetForm();
  };

  const resetForm = () => {
    setPrice("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}  `}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 h-7/12 md:w-2/5 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold">Add NFT</p>
            <button
              onClick={closeModal}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 h-20 w-20 rounded-xl overflow-hidden">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={imgAddress}
                alt="NFT"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              type="number"
              className="block w-full text-sm text-slate-500   focus:outline-none bg-transparent cursor-pointer border-0 focus:ring-0"
              required
              min={0.01}
              step={0.01}
              placeholder="Price (ETH)"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <button
            type="submit"
            className="shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd255f] rounded-full text-white p-2 mt-5"
          >
            Update Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNFT;
