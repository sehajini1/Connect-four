import React from "react";

export default function GameStatusComponent({ currentPlayer, winner, resetGame }) {
    return (
        <div className="flex flex-col items-center space-y-6">
      {winner ? (
        <>
          <h2 className="text-2xl font-bold text-green-600">Winner</h2>
          <div
            className={`w-12 h-12 rounded-full ${
              winner === 1 ? "bg-red-500" : "bg-yellow-400"
            }`}
          ></div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-700">Turn</h2>
          <div className="flex gap-6">
            {[1, 2].map((player) => (
              <div
                key={player}
                className={`w-14 h-14 rounded-md flex items-center justify-center ${
                  currentPlayer === player
                    ? "border-3 border-gray-700"
                    : "none"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    player === 1 ? "bg-red-500" : "bg-yellow-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold shadow-md"
      >
        New Game
      </button>
    </div>
    );
}