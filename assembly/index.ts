// Grow the memory by enough to hold 2 universes (one primary which we read from, and one secondary
// that we'll write to without mutating the values).
//
// Each page is 64kb.
memory.grow(2);

export const UNIVERSE_SIZE: i32 = 250;
const MEMORY_SIZE = UNIVERSE_SIZE * UNIVERSE_SIZE;

/**
 * Convert from 2D coordinate to a 1D index in our linear memory.
 */
export function indexFromCoordinate(x: i32, y: i32): i32 {
  return x + y * UNIVERSE_SIZE;
}

export function getCell(x: i32, y: i32): u8 {
  return load<u8>(indexFromCoordinate(wrap(x), wrap(y)));
}

export function setCell(x: i32, y: i32, value: u8, offset: i32): void {
  store<u8>(indexFromCoordinate(wrap(x), wrap(y)) + offset, value);
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
      const currentState = getCell(x, y);
      const nextState = next(currentState, neighborCount)

      if (currentState !== nextState) {
        // Write the new cell value. Note that we actually write this to a copy of our universe, so
        // we don't overwrite cell values and mess up neighbor counts.
        setCell(x, y, nextState, MEMORY_SIZE);
      }
    }
  }

  // Copy the secondary copy we just wrote to back to the primary memory location we'll read from.
  copyToPrimary();
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

@inline
function copyToPrimary(): void {
  memory.copy(0, MEMORY_SIZE, MEMORY_SIZE);
}
