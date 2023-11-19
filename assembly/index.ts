// Grow memory by 1 page (64kb)
memory.grow(1);

const CHECKERBOARD_SIZE: i32 = 20;

export const CHECKERBOARD_BUFFER_POINTER: i32 = 0;
export const CHECKERBOARD_BUFFER_SIZE: i32 = CHECKERBOARD_SIZE * CHECKERBOARD_SIZE * 4;

export function generateCheckerBoard(
  darkValueRed: i32,
  darkValueGreen: i32,
  darkValueBlue: i32,
  lightValueRed: i32,
  lightValueGreen: i32,
  lightValueBlue: i32,
): void {
  for (let x: i32 = 0; x < CHECKERBOARD_SIZE; x++) {
    for (let y: i32 = 0; y < CHECKERBOARD_SIZE; y++) {
      let isDarkSquare: boolean = true;

      if (y % 2 === 0) {
        isDarkSquare = false;
      }

      if (x % 2 === 0) {
        isDarkSquare = !isDarkSquare;
      }

      let squareValueRed = darkValueRed;
      let squareValueGreen = darkValueGreen;
      let squareValueBlue = darkValueBlue;

      if (!isDarkSquare) {
        squareValueRed = lightValueRed;
        squareValueGreen = lightValueGreen;
        squareValueBlue = lightValueBlue;
      }

      // Calculate 1d index for our memory from the 2d checkboard.
      let squareNumber = y * CHECKERBOARD_SIZE + x;
      let squareRgbaIndex = squareNumber * 4;

      // Store the values.
      // Red
      store<u8>(CHECKERBOARD_BUFFER_POINTER + squareRgbaIndex + 0, squareValueRed);
      // Green
      store<u8>(CHECKERBOARD_BUFFER_POINTER + squareRgbaIndex + 1, squareValueGreen);
      // Blue
      store<u8>(CHECKERBOARD_BUFFER_POINTER + squareRgbaIndex + 2, squareValueBlue);
      // Alpha, which is always opague
      store<u8>(CHECKERBOARD_BUFFER_POINTER + squareRgbaIndex + 3, 255);
    }
  }
}
