import React, { useState } from "react";
const imgAddress =
  "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg";

import { FaTimes } from "react-icons/fa";
import { create } from "ipfs-http-client";

const auth =
  "Basic " +
  Buffer.from(
    "2Mx9vO2qo62VJsLcmFJKYSi6cZv" + ":" + "7e144896e30b0fb53891f0990949172b"
  ).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// const auth =
//   "Basic " +
//   Buffer.from(
//     "2Gg95YqQ672apEtGQbewfwGQANc" + ":" + "b2c85789868e83772bfbc59ddd6d09bb"
//   ).toString("base64");

// const client = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     authorization: auth,
//   },
// });
import {
  setAlert,
  setGlobalState,
  setLoadingMsg,
  useGlobalState,
} from "../store";

import { mintNFT } from ".././Blockchain.services";
const CreateNFT = () => {
  const [modal] = useGlobalState("modal");
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [fileUrl, setFileUrl] = useState("");

  const [imgBase64, setImgBase64] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price) return;
    setGlobalState("modal", "scale-0");
    setGlobalState("loading", {
      show: true,
      msg: "Uploading to IPFS.....",
    });
    setLoadingMsg("Uploaded, approve transaction now ");
    try {
      const created = await client.add(fileUrl);
      setLoadingMsg("Uploading to IPFS.....");

      const metadataURI = "https://ipfs.io/ipfs/${created.path}";
      const nft = { title, description, price, metadataURI };

      await mintNFT(nft);
      closeModal();

      setAlert("Minting Completed");
    } catch (error) {
      console.log("error uploading files", error);
      setAlert("Minting failed", "red");
    }
  };

  const changeImage = async (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };

  const closeModal = () => {
    setGlobalState("modal", "scale-0");
    resetForm();
  };

  const resetForm = () => {
    setDescription("");
    setPrice("");
    setFileUrl("");
    setTitle("");
    setImgBase64(null);
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
                src={imgBase64 || imgAddress}
                alt="NFT"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only">Choose Profile Photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm file:font-semibold focus:outline-none hover:file:bg-[#1d2631] file:border-0 cursor-pointer focus:ring-0"
                accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                onChange={changeImage}
                required
              />
            </label>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              type="text"
              className="block w-full text-sm text-slate-500   focus:outline-none bg-transparent cursor-pointer border-0 focus:ring-0"
              required
              placeholder="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
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
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <textarea
              type="text"
              className="block w-full text-sm text-slate-500   focus:outline-none bg-transparent cursor-pointer border-0 focus:ring-0 h-20 resize-none"
              required
              placeholder="Description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <button
            type="submit"
            className="shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd255f] rounded-full text-white p-2 mt-5"
          >
            Mint Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;
