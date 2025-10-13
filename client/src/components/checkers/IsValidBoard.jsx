export function IsValidMove(board, sr, sc, tr, tc) {
  const piece = board[sr][sc];
  if (!piece) return false;

  const dr = tr - sr;
  const dc = tc - sc;

  // paprastas ėjimas – 1 langelis įstrižai
  if (Math.abs(dr) === 1 && Math.abs(dc) === 1) {
    if (board[tr][tc] === null) {
      return true; // nebegriežtina krypties
    }
  }

  // kirtimas – šuolis per 2 langelius
  if (Math.abs(dr) === 2 && Math.abs(dc) === 2) {
    const midR = sr + dr / 2;
    const midC = sc + dc / 2;
    const middlePiece = board[midR][midC];

    if (
      board[tr][tc] === null &&
      middlePiece &&
      middlePiece !== piece
    ) {
      return true;
    }
  }

  return false;
}