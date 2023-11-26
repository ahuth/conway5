// Grow the memory by enough to hold our universe. Each page is 64kb.
memory.grow(1);

export const UNIVERSE_SIZE: i32 = 250;

/**
 * Convert from 2D coordinate to a 1D offset in our linear memory.
 */
export function offsetFromCoordinate(x: i32, y: i32): i32 {
  return x + y * UNIVERSE_SIZE;
}

export function getCell(x: i32, y: i32): u8 {
  return load<u8>(offsetFromCoordinate(wrap(x), wrap(y)));
}

export function setCell(x: i32, y: i32, value: u8): void {
  store<u8>(offsetFromCoordinate(wrap(x), wrap(y)), value);
}

export function wrap(value: i32): i32 {
  if (value < 0) { return UNIVERSE_SIZE - 1; }
  if (value >= UNIVERSE_SIZE) { return 0; }
  return value;
}

export function next(current: u8, neighbors: u8): u8 {
  if (neighbors === 3) { return 1; }
  if (neighbors === 2) { return current; }
  return 0;
}

export function evolveCells(): void {
  for (let x: i32 = 0; x < UNIVERSE_SIZE; x++) {
    for (let y: i32 = 0; y < UNIVERSE_SIZE; y++) {
      const neighborCount = countNeighbors(x, y);
      const current = getCell(x, y);
      setCell(x, y, next(current, neighborCount));
    }
  }
}

function countNeighbors(x: i32, y: i32): u8 {
  return getCell(x - 1, y - 1)
    + getCell(x - 1, y)
    + getCell(x - 1, y + 1)
    + getCell(x, y - 1)
    + getCell(x, y + 1)
    + getCell(x + 1, y - 1)
    + getCell(x + 1, y)
    + getCell(x + 1, y + 1);
}
