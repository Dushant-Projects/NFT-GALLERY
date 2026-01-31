import React from "react";

function NFTCard({ nft, onSelect }) {
  return (
    <div className="card" onClick={() => onSelect(nft)}>
      <img src={nft.image} alt={nft.name} />
      <h3>{nft.name}</h3>
      <h1>Artist: {nft.artist}</h1>
      <h3>Price: {nft.price} PKR</h3>
    </div>
  );
}

export default NFTCard;
