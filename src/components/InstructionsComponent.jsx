import React from "react";

export default function InstructionComponent(){
    return(
        <div className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white w-full flex flex-col items-start space-y-3 max-w-xs">
      <h3
        className="text-xl text-white font-bold drop-shadow"
        style={{ fontFamily: "'Chewy', cursive", letterSpacing: "0.1rem" }}
      >
        🕹️ How to Play:
      </h3>
      <ul className="text-sm text-white/90 space-y-2 list-disc list-inside">
        <li>Click on any column to drop your token.</li>
        <li>Connect 4 tokens in a row: horizontally, vertically, or diagonally to win!</li>
        <li><span className="text-red-400 font-bold">Red</span> = Player 1, <span className="text-yellow-300 font-bold">Yellow</span> = Player 2</li>
      </ul>
    </div>
    );
}