 export function GenerateInitialBoard() {
const b = Array.from({ length: 8 }, () => Array(8).fill(null));
for (let r = 0; r < 3; r++) {
for (let c = 0; c < 8; c++) {
if ((r + c) % 2 === 1) b[r][c] = 'w';
}
}
for (let r = 5; r < 8; r++) {
for (let c = 0; c < 8; c++) {
if ((r + c) % 2 === 1) b[r][c] = 'b';
}
}
return b;
}