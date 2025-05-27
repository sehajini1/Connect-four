import React from "react";

export default function InstructionComponent(){
    return(
        <div className="p-4 bg-white rounded-lg shadow-md max-w-xs">
            <h3 className="font-bold mb-2">How to Play:</h3>
            <ul className="text-sm space-y-1">
                <li>• Click on any column to drop your token</li>
                <li>• Get 4 tokens in a row to win!</li>
                <li>• Red = Player 1, Yellow = Player 2</li>
            </ul>
        </div>
    );
}