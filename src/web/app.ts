import { I18n } from "./i18n.js";

const $ = (selector: string): any => document.querySelector(selector);
const t = (key: string, variables?: Record<string, unknown>) =>
  I18n.t(key, variables);
let examples = [],
  current = null,
  quiz = null,
  quizChecked = false;
function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls = "",
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}
function roleClass(span) {
  if (span.syntactic_role === "resumptive_clitic") return "clitic";
  if (span.information_role === "focus") return "focus";
  if (span.syntactic_role.startsWith("dislocated")) return "dislocated";
  return "other";
}
function description(example, key) {
  return example.descriptions?.[I18n.language]?.[key] || "";
}
function spanNote(example, span) {
  return example.descriptions?.[I18n.language]?.spans?.[span.id] || "";
}
function spanText(example, span) {
  return Array.from(example.sentence).slice(span.start, span.end).join("");
}
async function load() {
  try {
    const response = await fetch("/api/examples");
    if (!response.ok) throw Error();
    examples = await response.json();
    renderOptions();
    renderQuiz();
  } catch {
    $("#explorer").textContent = t("fetchExamplesError");
  }
}
function renderOptions() {
  const select = $("#example-filter"),
    filter = $("#construction-filter").value,
    selected = current?.id;
  select.replaceChildren();
  const rows = examples.filter(
    (x) => !filter || x.annotation.construction === filter,
  );
  for (const x of rows) {
    const option = el("option", "", x.sentence);
    option.value = x.id;
    select.append(option);
  }
  current = rows.find((x) => x.id === selected) || rows[0] || null;
  if (current) select.value = current.id;
  renderExplorer();
}
function renderExplorer() {
  const root = $("#explorer");
  root.replaceChildren();
  if (!current) {
    root.textContent = t("noExamples");
    return;
  }
  const x = current,
    a = x.annotation;
  const top = el("div", "eyeline");
  top.append(
    el("span", "", t("sentenceAnalysis")),
    el("span", "pill", t(a.construction)),
  );
  root.append(top);
  const sentence = el("div", "sentence-parts"),
    spans = [...a.spans].sort((p, q) => p.start - q.start),
    chars = Array.from(x.sentence);
  let cursor = 0;
  for (const span of spans) {
    if (span.start < cursor) continue;
    if (span.start > cursor)
      sentence.append(
        el("span", "plain-fragment", chars.slice(cursor, span.start).join("")),
      );
    const button = el("button", "segment", spanText(x, span));
    button.type = "button";
    button.dataset.role = roleClass(span);
    button.addEventListener("click", () => selectSpan(span, button));
    sentence.append(button);
    cursor = span.end;
  }
  if (cursor < chars.length)
    sentence.append(el("span", "plain-fragment", chars.slice(cursor).join("")));
  root.append(sentence);
  const translatedSentence = x.sentence_translations?.[I18n.language] || "";
  if (translatedSentence && translatedSentence !== x.sentence)
    root.append(
      el(
        "p",
        "sentence-translation",
        `${t("sentenceTranslation")}: ${translatedSentence}`,
      ),
    );
  const legend = el("div", "legend");
  for (const key of [
    "legendDislocated",
    "legendClitic",
    "legendFocus",
    "legendOther",
  ]) {
    const item = el("span");
    item.append(el("b"), document.createTextNode(t(key)));
    legend.append(item);
  }
  root.append(legend);
  const detail = el("div", "detail");
  detail.id = "span-detail";
  root.append(detail);
  const grid = el("div", "info-grid"),
    neutral = el("div", "info-card");
  neutral.append(
    el("div", "micro", t("neutralHeading")),
    el("h3", "", a.neutral_variant?.text || t("noProposal")),
    el("p", "", a.neutral_variant ? description(x, "neutral") : t("noVariant")),
  );
  const info = el("div", "info-card");
  info.append(
    el("div", "micro", t("infoHeading")),
    el("h3", "", description(x, "information") || t("unknownInterpretation")),
    el("p", "", description(x, "pragmatic")),
  );
  grid.append(neutral, info);
  root.append(grid);
  const structure = el("div", "structure");
  structure.append(el("h3", "", t("syntaxHeading")));
  const list = el("div", "structure-list");
  for (const span of spans) {
    const box = el("div", "structure-item " + roleClass(span));
    box.append(
      el("div", "", spanText(x, span)),
      el("small", "", t(span.syntactic_role)),
    );
    list.append(box);
  }
  structure.append(list);
  root.append(structure);
  const sourceValue =
    x.source.source_type === "constructed"
      ? t("constructed")
      : x.source.title || x.source.publisher || t("sourceMetadata");
  root.append(
    el(
      "div",
      "source-note",
      `${t("context")}: ${x.context.preceding || t("notProvided")} · ${t("source")}: ${sourceValue} · ${t("certainty")}: ${t(a.certainty)}. ${description(x, "prosody") || t("noProsody")}`,
    ),
  );
  const first = sentence.querySelector("button");
  if (first) first.click();
}
function selectSpan(span, button) {
  document
    .querySelectorAll(".segment")
    .forEach((node) => node.classList.remove("active"));
  button.classList.add("active");
  const related = current.annotation.spans.find(
    (s) => s.id === span.relation_to,
  );
  const detail = $("#span-detail");
  detail.replaceChildren();
  detail.append(
    el(
      "small",
      "",
      `${t("selectedElement")} · ${t(span.syntactic_role)} · [${span.start}, ${span.end})`,
    ),
    el(
      "p",
      "",
      spanNote(current, span) +
        (related ? ` ${t("relatedTo")}: „${spanText(current, related)}”.` : ""),
    ),
  );
}
$("#construction-filter").addEventListener("change", renderOptions);
$("#example-filter").addEventListener("change", (event) => {
  current = examples.find((x) => x.id === event.target.value);
  renderExplorer();
});
function apiError(status) {
  if (status === 400) return t("badInput");
  if (status === 503) return t("aiUnavailable");
  if (status === 502) return t("aiInvalid");
  return t("analysisError");
}
$("#analysis-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const box = $("#analysis-result");
  box.className = "feedback";
  box.textContent = t("analyzing");
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sentence: $("#analysis-sentence").value,
        context: $("#analysis-context").value,
        language: I18n.language,
      }),
    });
    const out = await response.json();
    if (!response.ok) throw Error(apiError(response.status));
    box.replaceChildren(
      el(
        "strong",
        "",
        `${t(out.construction)} · ${t("certainty")}: ${t(out.certainty)}`,
      ),
      el("p", "", out.descriptions?.evidence || out.explanation || ""),
      el("p", "", out.descriptions?.information || ""),
      el("small", "", `${t("automaticResult")} · ${out.model || ""}`),
    );
  } catch (error) {
    box.className = "feedback error";
    box.textContent = error.message || t("analysisError");
  }
});
function renderQuiz() {
  if (!examples.length) return;
  quiz = examples[Math.floor(Math.random() * examples.length)];
  quizChecked = false;
  $("#quiz-sentence").textContent = quiz.sentence;
  $("#quiz-class").value = "";
  const select = $("#quiz-span");
  select.replaceChildren();
  const empty = el("option", "", t("choose"));
  empty.value = "";
  select.append(empty);
  for (const span of quiz.annotation.spans) {
    const option = el("option", "", spanText(quiz, span));
    option.value = span.id;
    select.append(option);
  }
  $("#quiz-result").replaceChildren();
}
function showQuizResult() {
  if (!quiz) return;
  const correctClass = $("#quiz-class").value === quiz.annotation.construction,
    target = quiz.annotation.spans.find(
      (s) =>
        s.syntactic_role.startsWith("dislocated") ||
        s.syntactic_role === "cleft_focus",
    ),
    correctSpan = $("#quiz-span").value === target?.id,
    box = $("#quiz-result");
  box.className = "feedback" + (correctClass && correctSpan ? "" : " error");
  box.textContent =
    (correctClass && correctSpan ? t("quizCorrect") : t("quizRetry")) +
    `${t("construction")}: ${t(quiz.annotation.construction)}. ${t("keySegment")}: „${target ? spanText(quiz, target) : t("noneShort")}”. ${description(quiz, "evidence")}`;
  quizChecked = true;
}
$("#quiz-next").addEventListener("click", renderQuiz);
$("#quiz-check").addEventListener("click", showQuizResult);
document.addEventListener("languagechange", () => {
  if (examples.length) {
    renderOptions();
    if (quiz) {
      const empty = $('#quiz-span option[value=""]');
      if (empty) empty.textContent = t("choose");
      if (quizChecked) showQuizResult();
    }
  }
  $("#analysis-result").replaceChildren();
});
load();
