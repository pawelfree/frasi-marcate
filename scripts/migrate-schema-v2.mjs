import { readFile, writeFile } from "node:fs/promises";

const polishSentenceTranslations = {
  "ref-left-001": "Tę książkę kupiłem wczoraj.",
  "ref-right-001": "Kupiłem ją wczoraj, tę książkę.",
  "ref-cleft-001": "To Maria przygotowała kolację.",
  "ref-left-002": "Do Giulii napisałem dziś rano.",
};

function migrate(record) {
  if (record.schema_version === "2.0") {
    record.sentence_translations ??= {};
    if (record.descriptions?.pl?.sentence_translation)
      record.sentence_translations.pl =
        record.descriptions.pl.sentence_translation;
    for (const description of Object.values(record.descriptions ?? {}))
      delete description.sentence_translation;
    for (const span of record.annotation.spans)
      span.text ??= Array.from(record.sentence)
        .slice(span.start, span.end)
        .join("");
    return record;
  }
  const translations = record.translations ?? {};
  const descriptions = {};
  for (const language of ["pl", "it"]) {
    const source = translations[language] ?? {};
    descriptions[language] = {
      information:
        source.information_note ?? record.annotation.information_note ?? "",
      pragmatic:
        source.pragmatic_note ?? record.annotation.pragmatic_note ?? "",
      evidence: source.evidence_note ?? record.annotation.evidence_note ?? "",
      neutral:
        source.neutral_note ?? record.annotation.neutral_variant?.note ?? "",
      prosody: source.prosody_note ?? record.annotation.prosody_note ?? null,
      spans: Object.fromEntries(
        record.annotation.spans.map((span) => [
          span.id,
          source.span_notes?.[span.id] ?? span.note ?? "",
        ]),
      ),
    };
  }

  record.schema_version = "2.0";
  record.sentence_translations = {
    pl: polishSentenceTranslations[record.id] ?? "",
  };
  record.descriptions = descriptions;
  delete record.translations;
  delete record.annotation.information_note;
  delete record.annotation.pragmatic_note;
  delete record.annotation.evidence_note;
  delete record.annotation.prosody_note;
  if (record.annotation.neutral_variant)
    delete record.annotation.neutral_variant.note;
  for (const span of record.annotation.spans) {
    delete span.note;
  }
  return record;
}

for (const path of process.argv.slice(2)) {
  const records = JSON.parse(await readFile(path, "utf8"));
  await writeFile(
    path,
    `${JSON.stringify(records.map(migrate), null, 2)}\n`,
    "utf8",
  );
}
