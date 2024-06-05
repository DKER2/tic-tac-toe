import React, { useState } from "react";
import GameBoard from "./GameBoard";
import {calculateWinner} from "../utils/utils";

const Game = (props) => {
  const [height, setHeight] = useState(props.height || 3);
  const numberOfSquares = height * height;
  const [squares, setSquares] = useState(Array(numberOfSquares).fill(null));
  const [filledSquareCount, setFilledSquareCount] = useState(0);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (i) => {
    if(!squares[i] && !winner){
        const newSquares = squares.slice();
        newSquares[i] = isXNext ? "X" : "O";
        setSquares(newSquares);
        if(calculateWinner(i, height, newSquares)){
            setWinner(calculateWinner(i, height, newSquares));
        }
        setIsXNext(!isXNext);
        setFilledSquareCount(filledSquareCount + 1);
    } else if(winner) {
        alert("Winner Has Been Found!")
    } else if (squares[i]) {
        alert("Invalid Move!")
    }
  };
  
  const resetGame = () => {
    setSquares(Array(numberOfSquares).fill(null));
    setFilledSquareCount(0);
    setWinner(null);
    setIsXNext(true);
  }
  
  const handleChangHeightKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Change Height Triggered");
      if(e.target.value <= 10){
        setHeight(e.target.value);
      } else {
        alert("Please enter a height less than 10.");
      }
    }
  }
  
  var status = "";
  if(filledSquareCount===squares.length && !winner){
    status = "Draw!"
  } else if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (isXNext ? "X" : "O")
  }

  return (
    <div className="flex flex-col items-center text-sm md:text-xl lg:text-3xl">
        <div className="mb-4">{status}</div>
        <GameBoard squares={squares} height={height} onClick={handleSquareClick}/>
        <button className="font-semibold border-4 border-slate-950 rounded-md my-4 md:my-4 lg:my-4" style={{padding: "5px"}} onClick={() => resetGame()}>Reset</button>
        <div className="my-4 md:my-4 lg:my-4">
            <span>Game Board Height: </span><input type="text" className="w-12 bg-slate-200" defaultValue={height} onKeyDown={(e) => handleChangHeightKeyDown(e)}></input>
        </div>
    </div>
  );
};



export default Game;
