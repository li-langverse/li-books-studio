import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { APP_NAME } from "./index.js";

describe("li-books-studio scaffold", () => {
  it("exports app name", () => {
    assert.equal(APP_NAME, "li-books-studio");
  });
});
