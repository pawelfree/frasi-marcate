const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");

test("wszystkie stałe etykiety interfejsu mają polską i włoską wersję", async () => {
  const files = [
    "src/web/public/index.html",
    "src/web/public/admin.html",
    "dist/web/assets/app.js",
    "dist/web/assets/admin.js",
    "dist/web/assets/admin-form.js",
  ];
  const keys = new Set();
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const match of source.matchAll(
      /data-i18n(?:-placeholder|-aria)?="([^"]+)"/g,
    ))
      keys.add(match[1]);
    for (const match of source.matchAll(/\bt\(["']([^"']+)["']/g))
      keys.add(match[1]);
  }
  const selected = new Map();
  global.localStorage = {
    getItem: () => selected.get("frasi-language"),
    setItem: (key, value) => selected.set(key, value),
  };
  global.document = {
    body: { dataset: {} },
    documentElement: {},
    querySelectorAll: () => [],
    dispatchEvent: () => {},
    title: "",
  };
  global.CustomEvent = class {};
  const source = readFileSync("dist/web/assets/i18n.js", "utf8");
  for (const language of ["pl", "it"]) {
    selected.set("frasi-language", language);
    const module = await import(
      `data:text/javascript;base64,${Buffer.from(source).toString("base64")}#${language}`
    );
    for (const key of keys)
      assert.notEqual(module.I18n.t(key), key, `${language}: ${key}`);
  }
  delete global.localStorage;
  delete global.document;
  delete global.CustomEvent;
});

test("przykłady mają komplet opisów i tłumaczeń w obu językach", () => {
  const examples = JSON.parse(readFileSync("data/seed.json", "utf8"));
  for (const example of examples)
    for (const language of ["pl", "it"]) {
      const description = example.descriptions[language];
      for (const key of ["information", "pragmatic", "evidence", "neutral"])
        assert.ok(description[key], `${example.id} ${language} ${key}`);
      for (const span of example.annotation.spans)
        assert.ok(
          description.spans[span.id],
          `${example.id} ${language} ${span.id}`,
        );
    }
  for (const example of examples)
    assert.ok(example.sentence_translations.pl, `${example.id} pl sentence`);
});
