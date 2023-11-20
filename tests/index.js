import assert from "assert";
import { offsetFromCoordinate } from "../build/debug.js";

// offsetFromCoordinate
assert.strictEqual(offsetFromCoordinate(0, 0), 0);
assert.strictEqual(offsetFromCoordinate(49, 0), 196);
assert.strictEqual(offsetFromCoordinate(10, 2), 440);

console.log("ok");
