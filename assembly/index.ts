// Grow memory by 1 page (64kb)
// memory.grow(1);

export const UNIVERSE_SIZE = 50;

/**
 * Convert from 2D coordinate to a 1D offset in our linear memory.
 */
export function offsetFromCoordinate(x: i32, y: i32, size = UNIVERSE_SIZE): i32 {
  return (x + y * size) * 4;
}
