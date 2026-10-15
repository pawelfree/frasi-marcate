import type {
  ExampleRecord,
  Language,
  SpanAnnotation,
} from "./example-types.js";

type Translate = (key: string, variables?: Record<string, unknown>) => string;

export class InteractiveEditor {
  private record: ExampleRecord | null = null;

  constructor(
    private readonly root: HTMLElement,
    private readonly t: Translate,
    private readonly onChange: (record: ExampleRecord) => void,
    private readonly onOptionalVisibilityChange: () => void,
  ) {}

  setRecord(record: ExampleRecord | null): void {
    this.record = record;
    this.render();
  }

  render(): void {
    this.root.replaceChildren();
    if (!this.record) {
      this.root.append(this.element("p", "empty-form", this.t("noRecord")));
      this.onOptionalVisibilityChange();
      return;
    }

    this.root.append(
      this.renderBasics(),
      this.renderContext(),
      this.renderSource(),
      this.renderAnnotation(),
      this.renderSpans(),
      this.renderTranslations(),
    );
    this.onOptionalVisibilityChange();
  }

  allOptionalFieldsOpen(): boolean {
    const controls = this.optionalControls();
    return controls.length > 0 && controls.every((control) => !control.hidden);
  }

  setAllOptionalFields(open: boolean): void {
    this.root
      .querySelectorAll<HTMLElement>(".form-field[data-optional-field]")
      .forEach((field) => this.setOptionalFieldOpen(field, open));
    this.onOptionalVisibilityChange();
  }

  private renderBasics(): HTMLElement {
    const record = this.record!;
    return this.section("formBasics", "formBasicsHint", [
      this.field(
        "fieldSentence",
        true,
        this.textarea(record.sentence, (value) => (record.sentence = value)),
        "sentenceHint",
        true,
      ),
    ]);
  }

  private renderContext(): HTMLElement {
    const context = this.record!.context;
    return this.section("formContext", "formContextHint", [
      this.field(
        "fieldPreceding",
        false,
        this.textarea(
          context.preceding ?? "",
          (value) => (context.preceding = this.nullable(value)),
        ),
        undefined,
        true,
      ),
      this.field(
        "fieldFollowing",
        false,
        this.textarea(
          context.following ?? "",
          (value) => (context.following = this.nullable(value)),
        ),
        undefined,
        true,
      ),
      this.field(
        "fieldContextNote",
        true,
        this.textarea(
          context.context_note,
          (value) => (context.context_note = value),
        ),
        undefined,
        true,
      ),
    ]);
  }

  private renderSource(): HTMLElement {
    const source = this.record!.source;
    return this.section("formSource", "formSourceHint", [
      this.field(
        "fieldSourceType",
        true,
        this.select(
          source.source_type,
          [
            "constructed",
            "corpus",
            "press",
            "audiovisual",
            "literature",
            "other",
          ],
          (value) => (source.source_type = value),
        ),
      ),
      this.field(
        "fieldPublisher",
        false,
        this.input(
          source.publisher ?? "",
          (value) => (source.publisher = this.nullable(value)),
        ),
      ),
      this.field(
        "fieldTitle",
        false,
        this.input(
          source.title ?? "",
          (value) => (source.title = this.nullable(value)),
        ),
      ),
      this.field(
        "fieldUrl",
        false,
        this.input(
          source.url ?? "",
          (value) => (source.url = this.nullable(value)),
          { type: "url" },
        ),
      ),
      this.field(
        "fieldAccessedAt",
        false,
        this.input(
          source.accessed_at ?? "",
          (value) => (source.accessed_at = this.nullable(value)),
          { type: "date" },
        ),
      ),
      this.field(
        "fieldPublishedAt",
        false,
        this.input(
          source.published_at ?? "",
          (value) => (source.published_at = this.nullable(value)),
          { type: "date" },
        ),
      ),
      this.field(
        "fieldSpeaker",
        false,
        this.input(
          source.speaker ?? "",
          (value) => (source.speaker = this.nullable(value)),
        ),
      ),
      this.field(
        "fieldTimestamp",
        false,
        this.input(
          source.timestamp ?? "",
          (value) => (source.timestamp = this.nullable(value)),
        ),
      ),
      this.field(
        "fieldLicenseNote",
        true,
        this.textarea(
          source.license_note,
          (value) => (source.license_note = value),
        ),
        undefined,
        true,
      ),
      this.field(
        "fieldGenre",
        true,
        this.input(source.genre, (value) => (source.genre = value)),
      ),
      this.field(
        "fieldMedium",
        true,
        this.input(source.medium, (value) => (source.medium = value)),
      ),
    ]);
  }

  private renderAnnotation(): HTMLElement {
    const annotation = this.record!.annotation;
    const fields = [
      this.field(
        "construction",
        true,
        this.select(
          annotation.construction,
          [
            "left_dislocation",
            "right_dislocation",
            "cleft",
            "none",
            "ambiguous",
          ],
          (value) => (annotation.construction = value),
          true,
        ),
      ),
      this.field(
        "certainty",
        true,
        this.select(
          annotation.certainty,
          ["high", "medium", "low"],
          (value) => (annotation.certainty = value),
          true,
        ),
      ),
      this.field(
        "fieldReviewStatus",
        true,
        this.select(
          annotation.review_status,
          ["draft", "reviewed"],
          (value) => (annotation.review_status = value),
          true,
        ),
      ),
      this.field(
        "fieldAnnotator",
        true,
        this.input(
          annotation.annotator_id,
          (value) => (annotation.annotator_id = value),
        ),
      ),
      this.field(
        "fieldInformationNote",
        true,
        this.textarea(
          annotation.information_note,
          (value) => (annotation.information_note = value),
        ),
        "baseNoteHint",
        true,
      ),
      this.field(
        "fieldPragmaticNote",
        true,
        this.textarea(
          annotation.pragmatic_note,
          (value) => (annotation.pragmatic_note = value),
        ),
        "baseNoteHint",
        true,
      ),
      this.field(
        "fieldEvidenceNote",
        true,
        this.textarea(
          annotation.evidence_note,
          (value) => (annotation.evidence_note = value),
        ),
        "baseNoteHint",
        true,
      ),
      this.field(
        "fieldProsodyNote",
        false,
        this.textarea(
          annotation.prosody_note ?? "",
          (value) => (annotation.prosody_note = this.nullable(value)),
        ),
        undefined,
        true,
      ),
      this.renderNeutralVariant(),
      this.renderStringList(
        "fieldPragmaticFunctions",
        annotation.pragmatic_function,
        "addPragmaticFunction",
      ),
    ];
    return this.section("formAnnotation", "formAnnotationHint", fields);
  }

  private renderNeutralVariant(): HTMLElement {
    const annotation = this.record!.annotation;
    const wrapper = this.element("div", "form-subsection");
    const toggleLabel = this.element("label", "toggle-field");
    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.checked = annotation.neutral_variant !== null;
    toggle.addEventListener("change", () => {
      annotation.neutral_variant = toggle.checked
        ? { text: "", status: "proposed_paraphrase", note: "" }
        : null;
      this.changed(true);
    });
    toggleLabel.append(
      toggle,
      document.createTextNode(this.t("fieldNeutralVariant")),
      this.badge(false),
    );
    wrapper.append(toggleLabel);
    if (annotation.neutral_variant) {
      wrapper.append(
        this.field(
          "fieldNeutralText",
          true,
          this.input(
            annotation.neutral_variant.text,
            (value) => (annotation.neutral_variant!.text = value),
          ),
        ),
        this.field(
          "fieldNeutralNote",
          true,
          this.textarea(
            annotation.neutral_variant.note,
            (value) => (annotation.neutral_variant!.note = value),
          ),
          undefined,
          true,
        ),
      );
    }
    return wrapper;
  }

  private renderStringList(
    labelKey: string,
    values: string[],
    addKey: string,
  ): HTMLElement {
    const wrapper = this.element("div", "form-subsection dynamic-list");
    wrapper.append(this.subheading(labelKey, false));
    values.forEach((value, index) => {
      const row = this.element("div", "dynamic-row");
      row.append(
        this.input(value, (next) => (values[index] = next)),
        this.actionButton("removeItem", "remove-button", () => {
          values.splice(index, 1);
          this.changed(true);
        }),
      );
      wrapper.append(row);
    });
    wrapper.append(
      this.actionButton(addKey, "add-button", () => {
        values.push("");
        this.changed(true);
      }),
    );
    return wrapper;
  }

  private renderSpans(): HTMLElement {
    const record = this.record!;
    const body = this.element("div", "span-list");
    record.annotation.spans.forEach((span, index) =>
      body.append(this.renderSpan(span, index)),
    );
    const add = this.actionButton("addSpan", "add-button", () => {
      const id = this.nextSpanId();
      record.annotation.spans.push({
        id,
        text: "",
        start: 0,
        end: 1,
        syntactic_role: "other",
        information_role: null,
        relation_to: null,
        note: "",
      });
      record.translations.pl.span_notes[id] = "";
      record.translations.it.span_notes[id] = "";
      this.changed(true);
    });
    return this.section("formSpans", "formSpansHint", [body, add]);
  }

  private renderSpan(span: SpanAnnotation, index: number): HTMLElement {
    const card = this.element("article", "span-editor");
    const header = this.element("div", "span-editor-header");
    header.append(
      this.element("h4", "", `${this.t("spanLabel")} ${index + 1}`),
      this.actionButton("removeSpan", "remove-button", () =>
        this.removeSpan(index),
      ),
    );
    const fields = this.element("div", "form-grid");
    fields.append(
      this.field(
        "fieldSpanText",
        true,
        this.input(span.text, (value) => (span.text = value)),
      ),
      this.field(
        "fieldStart",
        true,
        this.numberInput(span.start, (value) => (span.start = value)),
      ),
      this.field(
        "fieldEnd",
        true,
        this.numberInput(span.end, (value) => (span.end = value)),
      ),
      this.field(
        "fieldSyntacticRole",
        true,
        this.input(
          span.syntactic_role,
          (value) => (span.syntactic_role = value),
        ),
      ),
      this.field(
        "fieldInformationRole",
        false,
        this.input(
          span.information_role ?? "",
          (value) => (span.information_role = this.nullable(value)),
        ),
      ),
      this.field("fieldRelationTo", false, this.relationSelect(span)),
      this.field(
        "fieldSpanNote",
        true,
        this.textarea(span.note, (value) => (span.note = value)),
        "baseNoteHint",
        true,
      ),
      this.field(
        "fieldSpanNotePl",
        true,
        this.textarea(
          this.record!.translations.pl.span_notes[span.id] ?? "",
          (value) => (this.record!.translations.pl.span_notes[span.id] = value),
        ),
        undefined,
        true,
      ),
      this.field(
        "fieldSpanNoteIt",
        true,
        this.textarea(
          this.record!.translations.it.span_notes[span.id] ?? "",
          (value) => (this.record!.translations.it.span_notes[span.id] = value),
        ),
        undefined,
        true,
      ),
    );
    card.append(
      header,
      fields,
      this.actionButton("findOffsets", "text-action", () =>
        this.findOffsets(span),
      ),
    );
    return card;
  }

  private renderTranslations(): HTMLElement {
    const items: HTMLElement[] = [];
    for (const language of ["pl", "it"] as Language[]) {
      const translation = this.record!.translations[language];
      const group = this.element("div", "translation-group");
      group.append(
        this.element(
          "h4",
          "",
          this.t(language === "pl" ? "translationPl" : "translationIt"),
        ),
      );
      const grid = this.element("div", "form-grid");
      grid.append(
        this.field(
          "fieldInformationNote",
          true,
          this.textarea(
            translation.information_note,
            (value) => (translation.information_note = value),
          ),
          undefined,
          true,
        ),
        this.field(
          "fieldPragmaticNote",
          true,
          this.textarea(
            translation.pragmatic_note,
            (value) => (translation.pragmatic_note = value),
          ),
          undefined,
          true,
        ),
        this.field(
          "fieldEvidenceNote",
          true,
          this.textarea(
            translation.evidence_note,
            (value) => (translation.evidence_note = value),
          ),
          undefined,
          true,
        ),
        this.field(
          "fieldNeutralNote",
          true,
          this.textarea(
            translation.neutral_note,
            (value) => (translation.neutral_note = value),
          ),
          undefined,
          true,
        ),
        this.field(
          "fieldProsodyNote",
          false,
          this.textarea(
            translation.prosody_note ?? "",
            (value) => (translation.prosody_note = this.nullable(value)),
          ),
          undefined,
          true,
        ),
      );
      group.append(grid);
      items.push(group);
    }
    return this.section("formTranslations", "formTranslationsHint", items);
  }

  private section(
    titleKey: string,
    hintKey: string,
    children: HTMLElement[],
  ): HTMLElement {
    const section = this.element("section", "form-section");
    section.append(
      this.element("h3", "", this.t(titleKey)),
      this.element("p", "form-section-hint", this.t(hintKey)),
      ...children,
    );
    return section;
  }

  private field(
    labelKey: string,
    required: boolean,
    control: HTMLElement,
    hintKey?: string,
    wide = false,
  ): HTMLElement {
    const label = this.element("label", `form-field${wide ? " wide" : ""}`);
    const heading = this.element("span", "field-heading");
    heading.append(document.createTextNode(this.t(labelKey)));

    const indicators = this.element("span", "field-indicators");
    indicators.append(this.badge(required));
    if (!required) {
      label.dataset.optionalField = "true";
      control.classList.add("optional-control");
      if (this.controlIsEmpty(control)) control.hidden = true;
      const toggle = this.element("button", "optional-toggle");
      toggle.type = "button";
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.setOptionalFieldOpen(label, control.hidden);
        if (!control.hidden) control.focus();
        this.onOptionalVisibilityChange();
      });
      indicators.append(toggle);
    }
    heading.append(indicators);
    label.append(heading, control);
    if (!required) this.setOptionalFieldOpen(label, !control.hidden);
    if (hintKey)
      label.append(this.element("small", "field-hint", this.t(hintKey)));
    return label;
  }

  private subheading(labelKey: string, required: boolean): HTMLElement {
    const heading = this.element("div", "field-heading");
    heading.append(
      document.createTextNode(this.t(labelKey)),
      this.badge(required),
    );
    return heading;
  }

  private badge(required: boolean): HTMLElement {
    return this.element(
      "span",
      required ? "required-badge" : "optional-badge",
      required ? this.t("requiredShort") : this.t("optionalShort"),
    );
  }

  private controlIsEmpty(control: HTMLElement): boolean {
    if (
      control instanceof HTMLInputElement ||
      control instanceof HTMLTextAreaElement ||
      control instanceof HTMLSelectElement
    )
      return control.value.trim() === "";
    return false;
  }

  private optionalControls(): HTMLElement[] {
    return Array.from(
      this.root.querySelectorAll<HTMLElement>(".optional-control"),
    );
  }

  private setOptionalFieldOpen(field: HTMLElement, open: boolean): void {
    const control = field.querySelector<HTMLElement>(".optional-control");
    const toggle = field.querySelector<HTMLButtonElement>(".optional-toggle");
    if (!control || !toggle) return;
    control.hidden = !open;
    field.classList.toggle("optional-collapsed", !open);
    toggle.textContent = open ? "−" : "+";
    const fieldName =
      field.querySelector(".field-heading")?.firstChild?.textContent;
    toggle.setAttribute(
      "aria-label",
      this.t(open ? "closeOptionalField" : "openOptionalField", {
        field: fieldName ?? "",
      }),
    );
  }

  private input(
    value: string,
    update: (value: string) => void,
    options: { type?: string } = {},
  ): HTMLInputElement {
    const input = document.createElement("input");
    input.type = options.type ?? "text";
    input.value = value;
    input.addEventListener("input", () => {
      update(input.value);
      this.changed();
    });
    return input;
  }

  private numberInput(
    value: number,
    update: (value: number) => void,
  ): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "1";
    input.value = String(value);
    input.addEventListener("input", () => {
      update(Number.parseInt(input.value, 10) || 0);
      this.changed();
    });
    return input;
  }

  private textarea(
    value: string,
    update: (value: string) => void,
  ): HTMLTextAreaElement {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.rows = 3;
    textarea.addEventListener("input", () => {
      update(textarea.value);
      this.changed();
    });
    return textarea;
  }

  private select(
    value: string,
    options: string[],
    update: (value: string) => void,
    translateOptions = false,
  ): HTMLSelectElement {
    const select = document.createElement("select");
    for (const optionValue of options) {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = translateOptions ? this.t(optionValue) : optionValue;
      select.append(option);
    }
    select.value = value;
    select.addEventListener("change", () => {
      update(select.value);
      this.changed();
    });
    return select;
  }

  private relationSelect(span: SpanAnnotation): HTMLSelectElement {
    const select = document.createElement("select");
    select.append(new Option(this.t("noRelation"), ""));
    for (const [index, candidate] of this.record!.annotation.spans.entries()) {
      if (candidate === span) continue;
      const text = candidate.text.trim();
      const label = `${this.t("spanLabel")} ${index + 1}${text ? ` — ${text}` : ""}`;
      select.append(new Option(label, candidate.id));
    }
    select.value = span.relation_to ?? "";
    select.addEventListener("change", () => {
      span.relation_to = this.nullable(select.value);
      this.changed();
    });
    return select;
  }

  private actionButton(
    labelKey: string,
    className: string,
    action: () => void,
  ): HTMLButtonElement {
    const button = this.element("button", className, this.t(labelKey));
    button.type = "button";
    button.addEventListener("click", action);
    return button;
  }

  private element<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className = "",
    text?: string,
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  private nullable(value: string): string | null {
    return value.trim() === "" ? null : value;
  }

  private changed(render = false): void {
    this.onChange(this.record!);
    if (render) this.render();
  }

  private nextSpanId(): string {
    const used = new Set(this.record!.annotation.spans.map((span) => span.id));
    let number = 1;
    while (used.has(`s${number}`)) number += 1;
    return `s${number}`;
  }

  private removeSpan(index: number): void {
    const [removed] = this.record!.annotation.spans.splice(index, 1);
    for (const language of ["pl", "it"] as Language[])
      delete this.record!.translations[language].span_notes[removed.id];
    for (const span of this.record!.annotation.spans)
      if (span.relation_to === removed.id) span.relation_to = null;
    this.changed(true);
  }

  private findOffsets(span: SpanAnnotation): void {
    const start = Array.from(this.record!.sentence).join("").indexOf(span.text);
    if (start < 0 || !span.text) return;
    span.start = Array.from(this.record!.sentence.slice(0, start)).length;
    span.end = span.start + Array.from(span.text).length;
    this.changed(true);
  }
}
