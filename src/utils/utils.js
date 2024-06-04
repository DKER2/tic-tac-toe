function arrayIndiceToPyramidRowAndColumn(index){
    const row = Math.floor(Math.sqrt(index));
    const column = index - row * row;
    //Convert to 0 based index
    return [row, column];
}

function pyramidRowAndColumnToArrayIndex(row, column, height){
    if(row < 0 || column < 0 || row >= height || column >= (row+1)*2-1){
        return null;
    }
    return row * row + column;
}

const calculateWinner = (i, height, squares) => {
    const relativePositionOfTwoRemainBoxInARow = [
        [[1, 0], [-1, 0]], // North-East
        [[1, 0], [2, 0]], // North-East
        [[-1, 0], [-2, 0]], // North-East
        [[1, 1], [-1, -1]], // North-South
        [[1, 1], [2, 2]], // North-South
        [[-1, -1], [-2, -2]], // North-South
        [[1, 2], [-1, -2]], // North-West
        [[1, 2], [2, 4]], // North-West
        [[-1, -2], [-2, -4]], // North-West
        [[0, 1], [0, -1]],  // West-East
        [[0, 1], [0, 2]],  // West-East
        [[0, -1], [0, -2]],  // West-East
    ]
    const winnerFound = relativePositionOfTwoRemainBoxInARow.find(([[row1, column1], [row2, column2]]) => {
        const [row, column] = arrayIndiceToPyramidRowAndColumn(i);
        const firstBoxIndex = pyramidRowAndColumnToArrayIndex(row + row1, column + column1, height);
        const secondBoxIndex = pyramidRowAndColumnToArrayIndex(row + row2, column + column2, height);
        console.log(squares[firstBoxIndex], squares[i], squares[secondBoxIndex], firstBoxIndex, i, secondBoxIndex);
        return firstBoxIndex!=null && secondBoxIndex!=null && squares[i] === squares[firstBoxIndex] && squares[i] === squares[secondBoxIndex];
    });

    if(winnerFound) {
        return squares[i];
    } else {
        return null;
    }
};

module.exports = {calculateWinner};