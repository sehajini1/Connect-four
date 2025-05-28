import React from "react";
import { useMedia } from "react-use";

export default function GameBoardComponent({ board, dropToken, winningPositions }) {
    const isWinningCell = (row, col) =>
        winningPositions?.some(([r, c]) => r === row && c === col);

    const isExtraSmallMobile = useMedia('(max-width: 350px)');
    const isSmallMobile = useMedia('(max-width: 400px)');
    const isMobile = useMedia('(max-width: 530px)');

    const cellSize = isExtraSmallMobile
        ? 'w-7 h-7'
        : isSmallMobile
        ? 'w-9 h-9'
        : isMobile
        ? 'w-10 h-10'
        : 'w-14 h-14';

    const tokenSize = isExtraSmallMobile
        ? 'w-5 h-5'
        : isSmallMobile
        ? 'w-6 h-6'
        : isMobile
        ? 'w-7 h-7'
        : 'w-10 h-10';

    return (
        <div className="p-6 rounded-2xl shadow-xl bg-white/30 backdrop-blur-md border border-white/30">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 mb-2">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            onClick={() => dropToken(colIndex)}
                            className={`
                 ${cellSize} bg-blue-100 rounded-md cursor-pointer ring-2 ring-blue-500 ring-offset-0
                flex items-center justify-center hover:scale-105 transition-transform
              `}
                        >
                            {cell !== 0 && (
                                <div
                                    className={`
                    ${tokenSize} rounded-full
                    ${cell === 1 ? "bg-red-500" : "bg-yellow-400"}
                    ${isWinningCell(rowIndex, colIndex)
                                            ? "ring-4 ring-black animate-pulse"
                                            : ""}
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