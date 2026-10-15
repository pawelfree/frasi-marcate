import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import Ajv from "ajv";
import { copyFile, mkdir, readFile, rename, writeFile } from "fs/promises";
import { join } from "path";

export type Example = Record<string, any>;

@Injectable()
export class ExampleStore {
  private readonly file = join(process.cwd(), "data", "examples.json");
  private readonly seed = join(process.cwd(), "data", "seed.json");
  private readonly validator: ReturnType<Ajv["compile"]>;
  private queue: Promise<unknown> = Promise.resolve();

  constructor() {
    const schema = require(
      join(process.cwd(), "schema", "example.schema.json"),
    );
    this.validator = new Ajv({ allErrors: true }).compile(schema);
  }

  async all(includeDrafts = false): Promise<Example[]> {
    await this.queue;
    await this.ensureFile();
    const records: unknown = JSON.parse(await readFile(this.file, "utf8"));
    if (!Array.isArray(records))
      throw new Error("Magazyn przykładów nie jest tablicą.");
    return (records as Example[]).filter(
      (x) => includeDrafts || x.annotation.review_status === "reviewed",
    );
  }

  async one(id: string, includeDrafts = false): Promise<Example> {
    const item = (await this.all(includeDrafts)).find((x) => x.id === id);
    if (!item) throw new NotFoundException("Nie znaleziono przykładu.");
    return item;
  }

  validate(
    item: unknown,
    language: "pl" | "it" = "pl",
  ): { valid: boolean; errors: string[] } {
    const valid = this.validator(item);
    const errors = valid
      ? []
      : (this.validator.errors || []).map((e) => {
          const path = e.instancePath || "/";
          const field = String(
            (e.params as { missingProperty?: string }).missingProperty || "",
          );
          const messages: Record<string, [string, string]> = {
            required: [
              `brak wymaganego pola ${field}`,
              `manca il campo obbligatorio ${field}`,
            ],
            additionalProperties: [
              "niedozwolone dodatkowe pole",
              "campo aggiuntivo non consentito",
            ],
            type: ["niepoprawny typ wartości", "tipo di valore non valido"],
            enum: ["wartość spoza dozwolonego zbioru", "valore non consentito"],
            const: ["wartość musi być stała", "il valore deve essere costante"],
            pattern: [
              "niepoprawny format tekstu",
              "formato del testo non valido",
            ],
            minLength: ["tekst jest za krótki", "testo troppo corto"],
            maxLength: ["tekst jest za długi", "testo troppo lungo"],
            minimum: ["wartość jest za mała", "valore troppo piccolo"],
            maximum: ["wartość jest za duża", "valore troppo grande"],
            oneOf: [
              "wartość nie pasuje do żadnego wariantu",
              "il valore non corrisponde a nessuna variante",
            ],
          };
          return `${path}: ${messages[e.keyword]?.[language === "it" ? 1 : 0] || (language === "it" ? "valore non valido" : "niepoprawna wartość")}`;
        });
    if (!valid || !item || typeof item !== "object")
      return { valid: false, errors };
    const example = item as Example;
    const chars = Array.from(example.sentence);
    const ids = new Set<string>();
    for (const span of example.annotation.spans as Example[]) {
      if (ids.has(span.id))
        errors.push(
          `/annotation/spans: ${language === "it" ? "ID duplicato" : "powtórzony id"} ${span.id}`,
        );
      ids.add(span.id);
      if (
        span.start >= span.end ||
        span.end > chars.length ||
        chars.slice(span.start, span.end).join("") !== span.text
      ) {
        errors.push(
          `/annotation/spans/${span.id}: ${language === "it" ? "il testo non corrisponde all’intervallo [start,end) in punti di codice" : "tekst nie odpowiada zakresowi [start,end) w punktach kodowych"}`,
        );
      }
    }
    for (const span of example.annotation.spans as Example[]) {
      if (span.relation_to !== null && !ids.has(span.relation_to))
        errors.push(
          `/annotation/spans/${span.id}: ${language === "it" ? "relazione sconosciuta" : "nieznana relacja"} ${span.relation_to}`,
        );
      if (span.relation_to === span.id)
        errors.push(
          `/annotation/spans/${span.id}: ${language === "it" ? "relazione con sé stesso" : "relacja do samego siebie"}`,
        );
      for (const targetLanguage of ["pl", "it"]) {
        if (!example.descriptions[targetLanguage].spans[span.id]?.trim())
          errors.push(
            `/descriptions/${targetLanguage}/spans/${span.id}: ${language === "it" ? "manca la descrizione del segmento" : "brak opisu segmentu"}`,
          );
      }
    }
    return { valid: errors.length === 0, errors };
  }

  async save(item: unknown, language: "pl" | "it" = "pl"): Promise<Example> {
    const checked = this.validate(item, language);
    if (!checked.valid)
      throw new BadRequestException({
        message: "Błędny rekord",
        errors: checked.errors,
      });
    const record = item as Example;
    await this.mutate(async (records) => {
      const index = records.findIndex((x) => x.id === record.id);
      if (index < 0) records.push(record);
      else records[index] = record;
    });
    return record;
  }

  async remove(id: string): Promise<void> {
    await this.mutate(async (records) => {
      const index = records.findIndex((x) => x.id === id);
      if (index < 0) throw new NotFoundException("Nie znaleziono przykładu.");
      records.splice(index, 1);
    });
  }

  private async mutate(change: (records: Example[]) => Promise<void>) {
    const run = this.queue.then(async () => {
      await this.ensureFile();
      const records = JSON.parse(
        await readFile(this.file, "utf8"),
      ) as Example[];
      await change(records);
      const tmp = `${this.file}.${process.pid}.tmp`;
      await writeFile(tmp, JSON.stringify(records, null, 2) + "\n", "utf8");
      await rename(tmp, this.file);
    });
    this.queue = run.catch(() => undefined);
    return run;
  }

  private async ensureFile() {
    await mkdir(join(process.cwd(), "data"), { recursive: true });
    try {
      await readFile(this.file);
    } catch (e: any) {
      if (e.code !== "ENOENT") throw e;
      try {
        await copyFile(this.seed, this.file, 1);
      } catch (copyError: any) {
        if (copyError.code !== "EEXIST") throw copyError;
      }
    }
  }
}
