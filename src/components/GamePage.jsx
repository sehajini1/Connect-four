import React, { useState, useRef, useEffect } from "react";
import InstructionsComponent from "./InstructionsComponent";
import GameBoardComponent from "./GameBoardComponent";
import GameStatusComponent from "./GameStatusComponent";
import confetti from 'canvas-confetti';
import { useMedia } from "react-use";

export default function GamePage() {
  const [board, setBoard] = useState(() =>
    Array(6).fill(null).map(() => Array(7).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningPositions, setWinningPositions] = useState([]);

  const isSmallMobile = useMedia("(max-width: 400px)");
  const isTab = useMedia('(max-width: 950px)');

  const headingSize = isSmallMobile
        ? 'text-2xl'
        : isTab
        ? 'text-4xl'
        : 'text-6xl';

  const confettiIntervalRef = useRef(null); 

  const startConfetti = () => {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    confettiIntervalRef.current = setInterval(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
    }, 250);
  };

  const stopConfetti = () => {
    if (confettiIntervalRef.current) {
      clearInterval(confettiIntervalRef.current);
      confettiIntervalRef.current = null;
    }
  };

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

    const result = checkWin(newBoard, row, col, currentPlayer);
    if (result) {
      setWinner(currentPlayer);
      setWinningPositions(result);
      setGameOver(true);
      startConfetti(); 
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
      let positions = [[row, col]];

      let r = row + dx;
      let c = col + dy;
      while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === player) {
        positions.push([r, c]);
        r += dx;
        c += dy;
      }

      r = row - dx;
      c = col - dy;
      while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === player) {
        positions.push([r, c]);
        r -= dx;
        c -= dy;
      }

      if (positions.length >= 4) {
        return positions;
      }
    }

    return false;
  };

  const resetGame = () => {
    stopConfetti(); 
    setBoard(Array(6).fill(null).map(() => Array(7).fill(0)));
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner(null);
    setWinningPositions([]);
  };

  useEffect(() => {
    return () => stopConfetti();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 overflow-hidden bg-gradient-to-br from-black via-blue-900 to-black relative">
      <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-0"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <h1
        className={`${headingSize} mb-10 text-white text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)]`}
        style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.2rem" }}
      >
        🎯 Connect Four 🎲
      </h1>

        <div
        className={`w-full max-w-7xl gap-6 px-4 flex ${
          isTab  ? 'flex-col items-center' : 'flex-row'
        }`}
      >
          <div className={`${isTab  ? 'w-full ' : 'w-1/4'} min-w-[200px]`}>
          <InstructionsComponent />
        </div>

          <div className={`${isTab  ? 'w-full ' : 'w-1/2'} flex justify-center`}>
            <GameBoardComponent
              board={board}
              dropToken={dropToken}
              winningPositions={winningPositions}
            />
          </div>

          <div className={`${isTab  ? 'w-full' : 'w-1/4'} min-w-[200px]`}>
            <GameStatusComponent
              currentPlayer={currentPlayer}
              winner={winner}
              resetGame={resetGame}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
