export type Language = "pl" | "it";

export interface SpanAnnotation {
  id: string;
  text: string;
  start: number;
  end: number;
  syntactic_role: string;
  information_role: string | null;
  relation_to: string | null;
}

export interface Description {
  information: string;
  pragmatic: string;
  evidence: string;
  neutral: string;
  prosody: string | null;
  spans: Record<string, string>;
}

export interface ExampleRecord {
  id: string;
  schema_version: "2.0";
  sentence: string;
  context: {
    preceding: string | null;
    following: string | null;
    context_note: string;
  };
  source: {
    source_type: string;
    publisher: string | null;
    title: string | null;
    url: string | null;
    accessed_at: string | null;
    published_at: string | null;
    speaker: string | null;
    timestamp: string | null;
    license_note: string;
    genre: string;
    medium: string;
  };
  annotation: {
    construction: string;
    certainty: string;
    spans: SpanAnnotation[];
    neutral_variant: {
      text: string;
      status: "proposed_paraphrase";
    } | null;
    pragmatic_function: string[];
    annotator_id: string;
    review_status: string;
  };
  sentence_translations: Partial<Record<Language, string>>;
  descriptions: Record<Language, Description>;
}

export function createEmptyRecord(): ExampleRecord {
  const description = (): Description => ({
    information: "",
    pragmatic: "",
    evidence: "",
    neutral: "",
    prosody: null,
    spans: {},
  });

  return {
    id: `ref-${crypto.randomUUID()}`,
    schema_version: "2.0",
    sentence: "",
    context: { preceding: null, following: null, context_note: "" },
    source: {
      source_type: "constructed",
      publisher: null,
      title: null,
      url: null,
      accessed_at: null,
      published_at: null,
      speaker: null,
      timestamp: null,
      license_note: "",
      genre: "constructed_example",
      medium: "text",
    },
    annotation: {
      construction: "ambiguous",
      certainty: "low",
      spans: [],
      neutral_variant: null,
      pragmatic_function: [],
      annotator_id: "",
      review_status: "draft",
    },
    sentence_translations: { pl: "" },
    descriptions: { pl: description(), it: description() },
  };
}
