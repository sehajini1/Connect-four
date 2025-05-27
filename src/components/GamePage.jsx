import React, { useState } from "react";
import InstructionsComponent from "./InstructionsComponent";
import GameBoardComponent from "./GameBoardComponent";
import GameStatusComponent from "./GameStatusComponent";

export default function GamePage(){
    const [board, setBoard] = useState(() =>
        Array(6).fill(null).map(() => Array(7).fill(0))
    );
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    const dropToken = (col) => {
        if (gameOver) return;

        let row = -1;
        for (let i = 5; i >= 0; i--) {
            if (board[i][col] === 0) {
                row = i;
                break;
            }
        }

        if (row === -1) return;

        const newBoard = board.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
        );

        setBoard(newBoard);

        if (checkWin(newBoard, row, col, currentPlayer)) {
            setWinner(currentPlayer);
            setGameOver(true);
        } else {
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
    };

    const checkWin = (board, row, col, player) => {
        const directions = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1],
        ];

        for (let [dx, dy] of directions) {
            let count = 1;

            let r = row + dx;
            let c = col + dy;
            while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === player) {
                count++;
                r += dx;
                c += dy;
            }

            r = row - dx;
            c = col - dy;
            while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === player) {
                count++;
                r -= dx;
                c -= dy;
            }

            if (count >= 4) return true;
        }

        return false;
    };

    const resetGame = () => {
        setBoard(Array(6).fill(null).map(() => Array(7).fill(0)));
        setCurrentPlayer(1);
        setGameOver(false);
        setWinner(null);
    };

    return(
        <div className="min-h-screen bg-blue-100 flex flex-col items-center pt-10 overflow-hidden">
            <h1 className="text-4xl font-bold mb-10 text-gray-800">Connect Four hello</h1>

            <div className="flex flex-row w-full max-w-7xl gap-6 px-4">
                <div className="w-1/4 min-w-[200px] bg-red-500">
                    <InstructionsComponent />
                </div>

                <div className="w-1/2 flex justify-center">
                    <GameBoardComponent 
                        board={board} 
                        dropToken={dropToken}
                    />
                </div>

                <div className="w-1/4 min-w-[200px]">
                    <GameStatusComponent
                        currentPlayer={currentPlayer}
                        winner={winner}
                        resetGame={resetGame}
                    />
                </div>
            </div>
        </div>
    );
}