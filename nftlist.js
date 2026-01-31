import React from "react";
import NFTCard from "./NFTCard";

function NFTList({ nfts, onSelect }) {
  return (
    <div className="grid">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default NFTList;
