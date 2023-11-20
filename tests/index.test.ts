import {test, expect} from "vitest";
import {offsetFromCoordinate} from "../build/debug.js";

test("offsetFromCoordinate", () => {
  expect(offsetFromCoordinate(0, 0)).toEqual(0);
  expect(offsetFromCoordinate(49, 0)).toEqual(196);
  expect(offsetFromCoordinate(10, 2)).toEqual(440);
})
