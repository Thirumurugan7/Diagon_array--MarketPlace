// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./ERC721.sol";
import "./ERC721Enumerable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract TimelessNFT is ERC721Enumerable, Ownable {
    using Strings for uint256; //convert int to string

    mapping(string => uint8) existingURIs;

    mapping(uint => address) public holderOf;

    address public artist;

    uint public royalityFee;

    uint public supply = 0;

    uint public totalTx = 0;

    uint public cost = 0.01 ether;

    event Sale(
        uint256 id,
        address indexed owner,
        uint cost,
        string metadataURI,
        uint timestamp
    );

    //indexed param helps to filter

    struct TransactionStruct {
        uint id;
        address owner;
        uint cost;
        string title;
        string description;
        string metadataURI;
        uint timestamp;
    }

    TransactionStruct[] transactions;

    TransactionStruct[] minted;

    constructor(
        string memory _name,
        string memory _symbol,
        uint _royalityFee,
        address _artist
    ) ERC721(_name, _symbol) {
        royalityFee = _royalityFee;
        artist = _artist;
    }

    function payToMint(
        string memory title,
        string memory description,
        string memory metadataURI,
        uint salesPrice
    ) external payable {
        require(msg.value >= cost, "Ether too low for minting");
        require(existingURIs[metadataURI] == 0, "This NFT is already minted");
        require(msg.sender != owner(), "sales not allowed");

        uint royality = (msg.value * royalityFee) / 100;

        payTo(artist, royality);

        payTo(owner(), (msg.value - royality));

        supply++;

        minted.push(
            TransactionStruct(
                supply,
                msg.sender,
                salesPrice,
                title,
                description,
                metadataURI,
                block.timestamp
            )
        );
        // metadataURI is img uri
        emit Sale(supply, msg.sender, msg.value, metadataURI, block.timestamp);
        //coming form erc721
        _safeMint(msg.sender, supply);
        existingURIs[metadataURI] = 1;
        holderOf[supply] = msg.sender;
    }

    function payToBuy(uint id) external payable {
        require(msg.value >= minted[id - 1].cost, "Ether too low for purchase");
        require(msg.sender != minted[id - 1].owner, "Operation not allowed!");

        uint256 royality = (msg.value * royalityFee) / 100;

        payTo(artist, royality);

        payTo(minted[id - 1].owner, (msg.value - royality));

        totalTx++;
        transactions.push(
            TransactionStruct(
                totalTx,
                msg.sender,
                msg.value,
                minted[id - 1].title,
                minted[id - 1].description,
                minted[id - 1].metadataURI,
                block.timestamp
            )
        );

        emit Sale(
            totalTx,
            msg.sender,
            msg.value,
            minted[id - 1].metadataURI,
            block.timestamp
        );
        minted[id - 1].owner = msg.sender;
    }

    function changePrice(uint256 id, uint256 newPrice) external returns (bool) {
        require(newPrice > 0 ether, "ether too low");
        require(msg.sender == minted[id - 1].owner, "operation not allowed");

        minted[id - 1].cost = newPrice;
        return true;
    }

    function payTo(address to, uint amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    //nft listing functions - returns all the nFts

    function getAllNFTs() external view returns (TransactionStruct[] memory) {
        return minted;
    }

    //returns specicfic nfts

    function getNFT(uint id) external view returns (TransactionStruct memory) {
        return minted[id - 1];
    }

    //return all the transactions

    function getAllTransactions()
        external
        view
        returns (TransactionStruct[] memory)
    {
        return transactions;
    }
}
