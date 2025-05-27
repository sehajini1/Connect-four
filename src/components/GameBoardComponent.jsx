import React from "react";

export default function GameBoardComponent({ board, dropToken }){
    return(
        <div className="bg-blue-600 p-4 rounded-lg shadow-lg">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 mb-2">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              onClick={() => dropToken(colIndex)}
              className={`
                w-14 h-14 bg-blue-300 rounded-md cursor-pointer
                flex items-center justify-center hover:scale-105 transition-transform
              `}
            >
              {cell !== 0 && (
                <div
                  className={`
                    w-10 h-10 rounded-full
                    ${cell === 1 ? "bg-red-500" : "bg-yellow-400"}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
    );
}