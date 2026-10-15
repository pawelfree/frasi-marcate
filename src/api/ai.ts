import {
  Injectable,
  ServiceUnavailableException,
  BadGatewayException,
} from "@nestjs/common";

@Injectable()
export class AiService {
  async analyze(sentence: string, context: string, language: "pl" | "it") {
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
      throw new ServiceUnavailableException(
        "Analiza AI wymaga OPENAI_API_KEY i OPENAI_MODEL w .env.",
      );
    }
    const instructions = `Analizuj współczesne zdanie włoskie. Klasy: left_dislocation, right_dislocation, cleft, none, ambiguous. Oddziel widoczną składnię od hipotezy pragmatycznej. Jeśli brak kontekstu, użyj niepewności. Zwróć wyłącznie JSON z polami: construction, certainty (high/medium/low), spans (id,text,start,end,syntactic_role,information_role,relation_to,note), neutral_variant (string|null), information_note, pragmatic_note, evidence_note, needs_more_context (boolean). Offsety to punkty kodowe Unicode [start,end). Nie wymyślaj źródła ani prozodii. Wszystkie opisy w polach note, information_note, pragmatic_note i evidence_note napisz ${language === "it" ? "po włosku" : "po polsku"}.`;
    let response: Response;
    try {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL,
          store: false,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: JSON.stringify({ sentence, context }) },
          ],
        }),
        signal: AbortSignal.timeout(30000),
      });
    } catch {
      throw new ServiceUnavailableException(
        "Nie udało się połączyć z usługą AI.",
      );
    }
    if (!response.ok)
      throw new BadGatewayException(
        `Usługa AI zwróciła HTTP ${response.status}.`,
      );
    const raw: any = await response.json();
    let result: any;
    try {
      result = JSON.parse(raw.choices[0].message.content);
    } catch {
      throw new BadGatewayException("Usługa AI nie zwróciła poprawnego JSON.");
    }
    const classes = [
      "left_dislocation",
      "right_dislocation",
      "cleft",
      "none",
      "ambiguous",
    ];
    const certainty = ["high", "medium", "low"];
    if (
      !result ||
      typeof result !== "object" ||
      !classes.includes(result.construction) ||
      !certainty.includes(result.certainty) ||
      !Array.isArray(result.spans) ||
      typeof result.needs_more_context !== "boolean" ||
      typeof result.evidence_note !== "string" ||
      typeof result.information_note !== "string" ||
      typeof result.pragmatic_note !== "string" ||
      !(
        typeof result.neutral_variant === "string" ||
        result.neutral_variant === null
      )
    ) {
      throw new BadGatewayException("Odpowiedź AI ma niepoprawny schemat.");
    }
    const chars = Array.from(sentence);
    for (const span of result.spans) {
      if (
        typeof span.id !== "string" ||
        typeof span.syntactic_role !== "string" ||
        !(
          typeof span.information_role === "string" ||
          span.information_role === null
        ) ||
        !(typeof span.relation_to === "string" || span.relation_to === null) ||
        typeof span.note !== "string" ||
        !Number.isInteger(span.start) ||
        !Number.isInteger(span.end) ||
        span.start < 0 ||
        span.start >= span.end ||
        chars.slice(span.start, span.end).join("") !== span.text
      ) {
        throw new BadGatewayException(
          "Odpowiedź AI zawiera niezgodne offsety.",
        );
      }
    }
    return { ...result, automatic: true, model: process.env.OPENAI_MODEL };
  }
}
