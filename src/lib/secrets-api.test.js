import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { listSecrets, saveSecret } from "./secrets-api.ts";

describe("secrets-api client", () => {
  it("exports list and save helpers", () => {
    assert.equal(typeof listSecrets, "function");
    assert.equal(typeof saveSecret, "function");
  });
});
