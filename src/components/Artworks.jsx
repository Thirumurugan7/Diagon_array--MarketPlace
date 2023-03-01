import React from "react";
import { setGlobalState } from "../store";
const imgAddress =
  "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg";

const Artworks = () => {
  return (
    <div className="bg=[#151c25] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto ">
        <h4 className="text-white uppercase font-bold text-3xl text-gradient">
          Latest Artworks
        </h4>
        <div className="grid gird-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-32 py-2.5 text-white">
          {Array(4)
            .fill()
            .map((nft, i) => (
              <Card key={i} nft={i + 1} />
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

const Card = ({ nft }) => (
  <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
    <img
      src={imgAddress}
      className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
      alt="NFT"
    />
    <h4 className="text-white font-semibold">NFT #{nft}</h4>
    <p className="text-gray-400 text-sm my-1">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem
      blanditiis voluptatibus tempora, sint dolor fugiat cum ut quasi,
      reiciendis maiores soluta perferendis laborum debitis accusantium nisi,
      autem repellat? Similique, qui?
    </p>
    <div className="flex  justify-between items-center mt-3 text-white">
      <div className="flex flex-col">
        <small className="text-xs">Current Price</small>
        <p className="text-sm font-semibold ">0.34 ETH</p>
      </div>
      <button
        className="shadow-lg shadow-black bg-[#e32970] hover:bg-[#bd255f] rounded-full py-1 px-1.5"
        onClick={() => setGlobalState("showModal", "scale-100")}
      >
        View Details
      </button>
    </div>
  </div>
);
export default Artworks;
