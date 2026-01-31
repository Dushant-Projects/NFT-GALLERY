import React from "react";
import nftData from "../data";
import { speak, stop } from "../utils/tts";

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

export default function VoiceAssistant({ selectedNFT }) {
  const describeProject = async () => {

    try {
      const res = await fetch("/description.txt");
      if (res.ok) {
        const text = await res.text();
        speak(text);
        return;
      }
    } catch (e) {
   
    }

    const description = `This is an NFT Gallery built with Create React App. It displays NFT cards showing name, artist, price, and an image. There are ${nftData.length} items in the gallery.`;
    speak(description);
  };

  const listNFTNames = () => {
    const names = nftData.map((n) => n.name).join(", ");
    const text = `The NFTs in this project are: ${names}.`;
    speak(text);
  };

  const listImageNames = () => {
    const imageNames = nftData.map((n) => extractImageName(n.image || "unknown")).join(", ");
    const text = `The image file names or URLs used are: ${imageNames}.`;
    speak(text);
  };

  const readSelectedNFT = () => {
    if (!selectedNFT) {
      speak("No NFT is currently selected.");
      return;
    }
    const n = selectedNFT;
    const text = `Selected NFT: ${n.name}, by ${n.artist}. Price: ${n.price} ETH.`;
    speak(text);
  };

  const stopSpeaking = () => {
    stop();
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h2>🔊 Voice Assistant</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={describeProject}>Describe Project</button>
        <button onClick={listNFTNames}>List NFT Names</button>
        <button onClick={listImageNames}>List Image Names</button>
        <button onClick={readSelectedNFT}>Read Selected NFT</button>
        <button onClick={stopSpeaking}>Stop</button>
      </div>
      <p style={{ marginTop: 8, color: "#555" }}>
      Click any button once to allow the browser to enable speech output.
      </p>
    </div>
  );
}
