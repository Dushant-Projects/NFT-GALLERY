import React, { useEffect } from "react";
import { speak } from "../utils/tts";

function extractImageName(url) {
  if (!url) return "unknown";
  try {
    const u = new URL(url, window.location.origin);
    const parts = u.pathname.split("/").filter(Boolean);
    let name = parts.length ? parts[parts.length - 1] : u.pathname;
    name = name.split("?")[0];
    return name || url;
  } catch (e) {
    const parts = url.split("/").filter(Boolean);
    let name = parts.length ? parts[parts.length - 1] : url;
    return name.split("?")[0];
  }
}

function NFTDetails({ nft, onBack }) {
  useEffect(() => {
    if (!nft) return;
    const imageName = extractImageName(nft.image || "unknown");
    const text = `Details: ${nft.name}, by ${nft.artist}. Price: ${nft.price} PKR. Image: ${imageName}.`;
    speak(text);
    return () => {
      // stop speaking when unmounting or changing
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [nft]);

  return (
    <div className="details">
      <button onClick={onBack}>Back</button>
      <h2>{nft.name}</h2>
      <img src={nft.image} alt={nft.name} />
      <p>Artist: {nft.artist}</p>
      <h3>Price: {nft.price} PKR</h3>
    </div>
  );
}

export default NFTDetails;
