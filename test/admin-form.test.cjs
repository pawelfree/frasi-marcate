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
  const anotherRecord = module.createEmptyRecord();
  record.sentence = "Ciao.";

  const store = new ExampleStore();
  const validation = store.validate(record);

  assert.equal(validation.valid, true, validation.errors?.join("\n"));
  assert.match(record.id, /^ref-[a-z0-9-]{3,63}$/);
  assert.notEqual(record.id, anotherRecord.id);
  assert.equal(record.schema_version, "2.0");
  assert.deepEqual(Object.keys(record.sentence_translations), ["pl"]);
  assert.deepEqual(Object.keys(record.descriptions).sort(), ["it", "pl"]);
  assert.deepEqual(record.annotation.spans, []);
  assert.deepEqual(record.annotation.pragmatic_function, []);
});
