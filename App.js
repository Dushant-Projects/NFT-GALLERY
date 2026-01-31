import React, { useState } from "react";
import nftData from "./data";
import NFTList from "./components/nftlist";
import NFTDetails from "./components/NFTDetails";
import "./App.css";
import VoiceAssistant from "./components/VoiceAssistant";
import { speak } from "./utils/tts";

function App() {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [filter, setFilter] = useState("");

  const handleSelect = (nft) => {
    setSelectedNFT(nft);
    if (nft) {
      speak(`Selected ${nft.name}, by ${nft.artist}. Price ${nft.price} ETH.`);
    }
  };

  const filteredNFTs = nftData.filter((nft) =>
    nft.artist.toLowerCase().includes(filter.toLowerCase())
  );

  if (selectedNFT) {
    return (
      <NFTDetails
        nft={selectedNFT}
        onBack={() => setSelectedNFT(null)}
      />
    );
  }

  return (
    <div className="container">
      <h1>NFT Gallery</h1>

      <input
        type="text"
        placeholder="Filter by artist name"
        onChange={(e) => setFilter(e.target.value)}
      />

      <NFTList nfts={filteredNFTs} onSelect={handleSelect} />

      <VoiceAssistant selectedNFT={selectedNFT} />
    </div>
  );
}

export default App;
