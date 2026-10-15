const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { ExampleStore } = require("../dist/api/store");

test("każdy przykład startowy przechodzi schemat i kontrolę offsetów", () => {
  const store = new ExampleStore();
  const examples = JSON.parse(readFileSync("data/seed.json", "utf8"));
  assert.equal(examples.length, 4);
  for (const example of examples)
    assert.deepEqual(store.validate(example), { valid: true, errors: [] });
});

test("rozbieżność offsetu i tekstu jest odrzucana", () => {
  const store = new ExampleStore();
  const example = JSON.parse(readFileSync("data/seed.json", "utf8"))[0];
  example.annotation.spans[0].end--;
  assert.equal(store.validate(example).valid, false);
});

test("błąd walidacji jest opisany w wybranym języku", () => {
  const store = new ExampleStore();
  const example = JSON.parse(readFileSync("data/seed.json", "utf8"))[0];
  example.annotation.spans[0].end--;
  assert.match(
    store.validate(example, "it").errors.join(" "),
    /il testo non corrisponde/,
  );
});

test("niepełny rekord zwraca błędy schematu zamiast wyjątku", () => {
  const store = new ExampleStore();
  assert.equal(store.validate({ sentence: "Ciao." }).valid, false);
});

test("zapis i usunięcie nie naruszają innych rekordów", async () => {
  const store = new ExampleStore();
  const before = await store.all(true);
  const example = JSON.parse(readFileSync("data/seed.json", "utf8"))[0];
  example.id = "test-temporary-example";
  example.annotation.review_status = "draft";
  try {
    await store.save(example);
    assert.equal(
      (await store.one(example.id, true)).sentence,
      example.sentence,
    );
    assert.equal(
      (await store.all()).some((x) => x.id === example.id),
      false,
    );
  } finally {
    await store.remove(example.id);
  }
  assert.equal((await store.all(true)).length, before.length);
});
