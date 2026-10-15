const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');

test('wszystkie stałe etykiety interfejsu mają polską i włoską wersję', () => {
  const files = ['public/index.html', 'public/admin.html', 'public/app.js', 'public/admin.js'];
  const keys = new Set();
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(/data-i18n(?:-placeholder|-aria)?="([^"]+)"/g)) keys.add(match[1]);
    for (const match of source.matchAll(/\bt\('([^']+)'/g)) keys.add(match[1]);
  }
  const selected = new Map();
  const storage = { getItem: () => selected.get('frasi-language'), setItem: (key, value) => selected.set(key, value) };
  const context = { localStorage: storage, document: { body: { dataset: {} }, documentElement: {}, querySelectorAll: () => [], dispatchEvent: () => {}, title: '' }, CustomEvent: class {}, window: {} };
  vm.runInNewContext(readFileSync('public/i18n.js', 'utf8'), context);
  for (const language of ['pl', 'it']) {
    selected.set('frasi-language', language);
    vm.runInNewContext(readFileSync('public/i18n.js', 'utf8'), context);
    for (const key of keys) assert.notEqual(context.window.I18n.t(key), key, `${language}: ${key}`);
  }
});

test('przykłady mają komplet objaśnień w obu językach', () => {
  const examples = JSON.parse(readFileSync('data/seed.json', 'utf8'));
  for (const example of examples) for (const language of ['pl', 'it']) {
    const translation = example.translations[language];
    for (const key of ['information_note', 'pragmatic_note', 'evidence_note', 'neutral_note']) assert.ok(translation[key], `${example.id} ${language} ${key}`);
    for (const span of example.annotation.spans) assert.ok(translation.span_notes[span.id], `${example.id} ${language} ${span.id}`);
  }
});
