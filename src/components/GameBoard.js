import React from "react";
import "../styles/components.gameboard.css";

const GameBoard = ({ squares, height, onClick }) => {
  const rowStartAndEndIndicess = Array.from({ length: height }, (_, index) => {
    const startIndice = index * index;
    const endIndice = (index + 1) * (index + 1) - 1;
    return [startIndice, endIndice];
  });

  const renderSquare = (i) => {
    const baseClasses = "w-8 h-8 md:w-15 md:h-15 lg:w-20 lg:h-20 border-2 border-white font-bold square";
  
    var conditionalClasses = "";
    if(squares[i]==='X'){
        conditionalClasses="text-orange-300 clicked";
    } else if(squares[i]==='O'){
        conditionalClasses="text-lime-300 clicked";
    }
  
    const className = `${baseClasses} ${conditionalClasses}`;
  
    return (
      <button
        className={className}
        onClick={() => onClick(i)}
      >
        {squares[i]}
      </button>
    );
  };
  
  const row = (start, end) => {
    const indices = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    return (
      <div className="flex justify-center">
        {indices.map((i) => renderSquare(i))}
      </div>
    );
  }

  return (
    <div>
        <div>
            {rowStartAndEndIndicess.map(([start, end], index) => (
                <div key={index}>{row(start, end)}</div>
            ))}
        </div>
    </div>
  );
};

export default GameBoard;
