import React from "react";
import { useMedia } from "react-use";

function GameStatus({ currentPlayer, winner, resetGame }) {
  const isMobile = useMedia("(max-width: 300px)");
  console.log("winner",winner)
  return (
    <div className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white w-full flex flex-col items-center space-y-6">
      {winner != null ? (
        winner === 0 ? (
          <h2
            className="text-4xl text-blue-300 drop-shadow-md"
            style={{ fontFamily: "'Chewy', cursive", letterSpacing: "0.2rem" }}
          >
            🤝 Draw!
          </h2>
        ):(
          <>
          <h2 className="text-4xl text-green-400 drop-shadow-md"
            style={{ fontFamily: "'Chewy', cursive", letterSpacing: "0.2rem" }}>🎉 Winner!</h2>
          <div
            className={`w-14 h-14 rounded-full shadow-md ${winner === 1 ? "bg-red-500" : "bg-yellow-400"
              }`}
          ></div>
        </>
        )
      ) : (
        <>
          <h2
            className={`${isMobile ? 'text-2xl' : 'text-4xl'} text-white drop-shadow-md`}
            style={{ fontFamily: "'Chewy', cursive", letterSpacing: "0.2rem" }}
          >
            Current Turn
          </h2>

          <div className="flex gap-6">
            {[1, 2].map((player) => (
              <div
                key={player}
                className={`w-14 h-14 rounded-md flex items-center justify-center transition-all duration-200 ${currentPlayer === player
                  ? "border-2 border-white shadow-lg scale-110 "
                  : "opacity-60"
                  }`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${player === 1 ? "bg-red-500" : "bg-yellow-400"
                    }`}
                />
              </div>
            ))}
          </div>
        </>
      )}
        
        

      <button
        onClick={resetGame}
        className="px-6 py-2 rounded-lg font-bold bg-gradient-to-r from-green-400 to-lime-500 text-black hover:scale-105 transition-transform shadow-lg"
      >
        🔄 New Game
      </button>
    </div>
  );
}

const GameStatusComponent = React.memo(GameStatus);
export default GameStatusComponent;