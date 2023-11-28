import {test, expect} from "vitest";
import {
  memory,
  indexFromCoordinate,
  getCell,
  setCell,
  wrap,
  next,
} from "../build/debug.js";

test("indexFromCoordinate", () => {
  expect(indexFromCoordinate(0, 0)).toEqual(0);
  expect(indexFromCoordinate(49, 0)).toEqual(49);
  expect(indexFromCoordinate(10, 2)).toEqual(510);
})

test("get / set", () => {
  expect(getCell(2, 2)).toEqual(0);
  setCell(2, 2, 1, 0);
  expect(getCell(2, 2)).toEqual(1);
});

test("read memory directly", () => {
  const mem = new Uint8Array(memory.buffer);
  setCell(2, 2, 10, 0);
  expect(mem[2 + 2 * 250]).toEqual(10);
  expect(mem[3 + 2 * 250]).toEqual(0);
});

test("wrap", () => {
  expect(wrap(25)).toEqual(25);
  expect(wrap(250)).toEqual(0);
  expect(wrap(-1)).toEqual(249);
});

test("next", () => {
  expect(next(0, 0)).toEqual(0);
  expect(next(1, 0)).toEqual(0);

  expect(next(0, 1)).toEqual(0);
  expect(next(0, 2)).toEqual(0);
  expect(next(0, 3)).toEqual(1);
  expect(next(0, 4)).toEqual(0);

  expect(next(1, 1)).toEqual(0);
  expect(next(1, 2)).toEqual(1);
  expect(next(1, 3)).toEqual(1);
  expect(next(1, 4)).toEqual(0);
});
