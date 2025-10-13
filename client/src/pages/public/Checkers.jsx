import React, { useState } from "react";
import { IsValidMove } from "../../components/checkers/IsValidBoard";
import { GenerateInitialBoard } from "../../components/checkers/Board";


export function Checkers() {
  const initial = GenerateInitialBoard();
  const [board, setBoard] = useState(initial);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState("b");

  function onSquareClick(r, c) {
    const piece = board[r][c];

    if (selected) {
      const { r: sr, c: sc } = selected;

      if (piece && piece === board[sr][sc]) {
        setSelected({ r, c });
        return;
      }

      if (IsValidMove(board, sr, sc, r, c)) {
        const newBoard = board.map((row) => row.slice());

        // patikriname, ar tai kirtimas
        if (Math.abs(r - sr) === 2 && Math.abs(c - sc) === 2) {
          const midR = sr + (r - sr) / 2;
          const midC = sc + (c - sc) / 2;
          newBoard[midR][midC] = null; // pašalinam peršoktą figūrą
        }

        newBoard[r][c] = newBoard[sr][sc];
        newBoard[sr][sc] = null;
        setBoard(newBoard);
        setSelected(null);
        setTurn((prev) => (prev === "b" ? "w" : "b"));
      } else {
        setSelected(null);
      }
    } else {
      if (piece && piece === turn) {
        setSelected({ r, c });
      }
    }
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-auto text-center">
          <h3 className="mb-3">Šaškės</h3>
          <div className="mb-2">
            Eilė atlikti ėjimą: <strong>{turn === "b" ? "Juodi" : "Balti"}</strong>
          </div>
          <div className="board shadow-lg">
            {board.map((row, r) =>
              row.map((cell, c) => {
                const isDark = (r + c) % 2 === 1;
                const sqClass = isDark ? "square dark" : "square light";
                const isSelected = selected && selected.r === r && selected.c === c;

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`${sqClass} d-flex align-items-center justify-content-center ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => onSquareClick(r, c)}
                  >
                    {cell && (
                      <div
                        className={`piece ${cell === "b" ? "piece-black" : "piece-white"}`}
                      ></div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-3">
            <button
              className="btn btn-primary me-2"
              onClick={() => {
                setBoard(GenerateInitialBoard());
                setTurn("b");
                setSelected(null);
              }}
            >
              Nuo pradžių
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setBoard(board.map((row) => row.map(() => null)));
                setSelected(null);
              }}
            >
              Išvalyti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
