export type Language = "pl" | "it";

export interface SpanAnnotation {
  id: string;
  text: string;
  start: number;
  end: number;
  syntactic_role: string;
  information_role: string | null;
  relation_to: string | null;
  note: string;
}

export interface DisplayTranslation {
  information_note: string;
  pragmatic_note: string;
  evidence_note: string;
  neutral_note: string;
  prosody_note: string | null;
  span_notes: Record<string, string>;
}

export interface ExampleRecord {
  id: string;
  schema_version: "1.0";
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
      note: string;
    } | null;
    pragmatic_function: string[];
    pragmatic_note: string;
    information_note: string;
    prosody_note: string | null;
    evidence_note: string;
    annotator_id: string;
    review_status: string;
  };
  translations: Record<Language, DisplayTranslation>;
}

export function createEmptyRecord(): ExampleRecord {
  const translation = (): DisplayTranslation => ({
    information_note: "",
    pragmatic_note: "",
    evidence_note: "",
    neutral_note: "",
    prosody_note: null,
    span_notes: {},
  });

  return {
    id: `ref-${crypto.randomUUID()}`,
    schema_version: "1.0",
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
      pragmatic_note: "",
      information_note: "",
      prosody_note: null,
      evidence_note: "",
      annotator_id: "",
      review_status: "draft",
    },
    translations: { pl: translation(), it: translation() },
  };
}
