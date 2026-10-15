const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { ExampleStore } = require("../dist/api/store.js");

test("nowy rekord formularza ma pełną strukturę zgodną ze schematem", async () => {
  const source = readFileSync("dist/web/assets/example-types.js", "utf8");
  const module = await import(
    `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
  );
  const record = module.createEmptyRecord();
  record.sentence = "Ciao.";

  const store = new ExampleStore();
  const validation = store.validate(record);

  assert.equal(validation.valid, true, validation.errors?.join("\n"));
  assert.deepEqual(Object.keys(record.translations).sort(), ["it", "pl"]);
  assert.deepEqual(record.annotation.spans, []);
  assert.deepEqual(record.annotation.pragmatic_function, []);
});
