import React from "react";
import InstructionsComponent from "./InstructionsComponent";
import GameBoardComponent from "./GameBoardComponent";
import GameStatusComponent from "./GameStatusComponent";

export default function GamePage(){
    return(
        <div className="min-h-screen bg-blue-100 flex flex-col items-center pt-10 overflow-hidden">
            <h1 className="text-4xl font-bold mb-10 text-gray-800">Connect Four</h1>

            <div className="flex flex-row w-full max-w-7xl gap-6 px-4">
                <div className="w-1/4 min-w-[200px] bg-red-500">
                    <InstructionsComponent />
                </div>

                <div className="w-1/2 flex justify-center bg-blue-400">
                    <GameBoardComponent />
                </div>

                <div className="w-1/4 min-w-[200px] bg-green-500">
                    <GameStatusComponent
                    />
                </div>
            </div>
        </div>
    );
}