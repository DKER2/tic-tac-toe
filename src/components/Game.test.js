import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Game from './Game'; // Adjust the import path according to your structure

test('allows a player to mark an empty square', () => {
  render(<Game />);
  const firstSquare = screen.getAllByRole('button')[0];
  fireEvent.click(firstSquare);
  expect(firstSquare).toHaveTextContent('X'); // Assuming 'X' is the mark for the first player
});

test('prevents marking a taken square', () => {
    render(<Game />);
    const firstSquare = screen.getAllByRole('button')[0];
    fireEvent.click(firstSquare); // Mark the square the first time
    fireEvent.click(firstSquare); // Try marking the same square again
    expect(firstSquare).toHaveTextContent('X'); // Should still contain only the first mark
});

test('checks if a player has won the game', () => {
    render(<Game />);
    // Simulate a winning move, adjust indices based on your game logic
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]); // Player X
    fireEvent.click(squares[1]); // Player O
    fireEvent.click(squares[5]); // Player X
    fireEvent.click(squares[2]); // Player O
    fireEvent.click(squares[6]); // Player X 
    fireEvent.click(squares[3]); // Player O (winning move)
  
    expect(screen.getByText(/Winner: O/i)).toBeInTheDocument(); // Adjust based on your winning message
});

test('checks if the game is a draw', () => {
    render(<Game />);
    // Simulate a draw
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[2]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[4]); // X
    fireEvent.click(squares[5]); // O
    fireEvent.click(squares[7]); // X
    fireEvent.click(squares[6]); // O
    fireEvent.click(squares[8]); // X
  
    expect(screen.getByText(/Draw!/i)).toBeInTheDocument(); // Adjust based on your draw message
});