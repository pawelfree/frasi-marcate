import { InteractiveEditor } from "./admin-form.js";
import { createEmptyRecord, type ExampleRecord } from "./example-types.js";
import { I18n } from "./i18n.js";

const $ = (selector: string): any => document.querySelector(selector);
const t = (key: string, variables?: Record<string, unknown>) =>
  I18n.t(key, variables);

let records: ExampleRecord[] = [];
let selected = "";
let currentRecord: ExampleRecord | null = null;
let activeEditor: "json" | "form" = "json";
let schemaText = "";
let passwordConfigured = false;
let authenticated = false;

const interactiveEditor = new InteractiveEditor(
  $("#interactive-form"),
  t,
  (record) => {
    currentRecord = record;
    $("#json").value = JSON.stringify(record, null, 2);
    setSyncStatus("formSynced", false);
  },
  updateOptionalFieldsToggle,
);

function updateOptionalFieldsToggle(): void {
  const button = $("#toggle-optional-fields");
  const allOpen = interactiveEditor.allOptionalFieldsOpen();
  button.textContent = t(
    allOpen ? "closeAllOptionalFields" : "openAllOptionalFields",
  );
}

function status(message: string, bad = false): void {
  const node = $("#status");
  node.textContent = message;
  node.style.color = bad ? "#a43a38" : "#1d6d5b";
}

function setSyncStatus(key: string, bad: boolean): void {
  const node = $("#json-sync-status");
  node.textContent = t(key);
  node.classList.toggle("error", bad);
}

function auth(): string {
  return "Basic " + btoa("admin:" + $("#password").value);
}

async function api(path: string, method = "GET", body?: unknown): Promise<any> {
  const headers: Record<string, string> = {
    "accept-language": I18n.language,
    ...(body ? { "content-type": "application/json" } : {}),
  };
  if (passwordConfigured) headers.authorization = auth();
  const response = await fetch("/api/admin/" + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data: any;
  try {
    data = await response.json();
  } catch {
    data = {};
  }
  if (!response.ok) {
    if (response.status === 401) throw Error(t("unauthorized"));
    if (response.status === 400 && data.errors)
      throw Error(data.errors.join("\n"));
    throw Error(t("serverError") + ` (HTTP ${response.status})`);
  }
  return data;
}

function setRecord(record: ExampleRecord): void {
  currentRecord = record;
  $("#json").value = JSON.stringify(record, null, 2);
  if (activeEditor === "form") interactiveEditor.setRecord(record);
  setSyncStatus("editorsSynced", false);
}

function parseJsonEditor(): ExampleRecord {
  try {
    return JSON.parse($("#json").value) as ExampleRecord;
  } catch (error) {
    throw Error(`${t("jsonSyntaxError")}: ${(error as Error).message}`);
  }
}

function showList(): void {
  const root = $("#records");
  root.replaceChildren();
  for (const record of records) {
    const button = document.createElement("button");
    button.textContent = `${record.annotation.review_status === "reviewed" ? "●" : "○"} ${record.sentence}`;
    button.className = record.id === selected ? "active" : "";
    button.onclick = () => {
      selected = record.id;
      setRecord(record);
      showList();
      status(`${t("loadedRecord")} ${record.id}`);
    };
    root.append(button);
  }
}

async function load(): Promise<void> {
  try {
    records = await api("examples");
    if (!records.some((record) => record.id === selected))
      selected = records[0]?.id || "";
    const record = records.find((item) => item.id === selected);
    if (record) setRecord(record);
    else {
      currentRecord = null;
      $("#json").value = "";
      interactiveEditor.setRecord(null);
    }
    showList();
    status(t("loadedRecords", { count: records.length }));
  } catch (error) {
    status((error as Error).message, true);
  }
}

function setAuthenticated(value: boolean): void {
  authenticated = value;
  $("#save").disabled = !value;
  $("#delete").disabled = !value;
  $("#auth-status").textContent = value
    ? t("loggedIn")
    : passwordConfigured
      ? t("notLoggedIn")
      : t("loginUnavailable");
  $("#auth-status").classList.toggle("authenticated", value);
}

async function initialize(): Promise<void> {
  try {
    const config = await api("config");
    passwordConfigured = config.passwordConfigured;
    const field = $("#password");
    field.disabled = !passwordConfigured;
    field.placeholder = passwordConfigured
      ? "ADMIN_PASSWORD"
      : t("passwordNotConfigured");
    field.title = passwordConfigured ? "" : t("passwordDisabledHint");
    $("#login").disabled = !passwordConfigured || !field.value;
    setAuthenticated(false);
  } catch (error) {
    status((error as Error).message, true);
  }
  await load();
}

function switchEditor(next: "json" | "form"): void {
  if (next === "form") {
    try {
      currentRecord = parseJsonEditor();
      interactiveEditor.setRecord(currentRecord);
      setSyncStatus("editorsSynced", false);
    } catch (error) {
      status((error as Error).message, true);
      setSyncStatus("jsonInvalidForForm", true);
      return;
    }
  }
  activeEditor = next;
  $("#json-panel").hidden = next !== "json";
  $("#form-panel").hidden = next !== "form";
  document.querySelectorAll<HTMLElement>("[data-editor-tab]").forEach((tab) => {
    const active = tab.dataset.editorTab === next;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
}

document.querySelectorAll<HTMLElement>("[data-editor-tab]").forEach((tab) => {
  tab.addEventListener("click", () =>
    switchEditor(tab.dataset.editorTab === "form" ? "form" : "json"),
  );
});

$("#toggle-optional-fields").onclick = () => {
  interactiveEditor.setAllOptionalFields(
    !interactiveEditor.allOptionalFieldsOpen(),
  );
};

$("#json").addEventListener("input", () => {
  try {
    currentRecord = parseJsonEditor();
    setSyncStatus("jsonReadyToSync", false);
  } catch {
    setSyncStatus("jsonHasErrors", true);
  }
});

$("#load").onclick = load;
$("#password").addEventListener("input", () => {
  setAuthenticated(false);
  $("#login").disabled = !passwordConfigured || !$("#password").value;
});
$("#password").addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter" && !$("#login").disabled) $("#login").click();
});
$("#login").onclick = async () => {
  try {
    const result = await api("login", "POST");
    setAuthenticated(Boolean(result.authenticated));
    status(t("loginSuccess"));
  } catch (error) {
    setAuthenticated(false);
    status((error as Error).message, true);
  }
};
$("#new").onclick = () => {
  selected = "";
  setRecord(createEmptyRecord());
  showList();
  status(t("newRecordHint"));
};
$("#validate").onclick = async () => {
  try {
    const result = await api("validate", "POST", parseJsonEditor());
    status(
      result.valid ? t("recordValid") : result.errors.join("\n"),
      !result.valid,
    );
  } catch (error) {
    status((error as Error).message, true);
  }
};
$("#save").onclick = async () => {
  try {
    const result = await api("examples", "POST", parseJsonEditor());
    selected = result.id;
    await load();
    status(`${t("savedRecord")} ${selected}`);
  } catch (error) {
    status((error as Error).message, true);
  }
};
$("#delete").onclick = async () => {
  try {
    if (!selected) throw Error(t("selectRecordFirst"));
    if (!confirm(t("deleteConfirm", { id: selected }))) return;
    await api("examples/" + encodeURIComponent(selected), "DELETE");
    selected = "";
    await load();
    status(t("recordDeleted"));
  } catch (error) {
    status((error as Error).message, true);
  }
};
$("#show-schema").onclick = async () => {
  const dialog = $("#schema-dialog");
  dialog.showModal();
  if (schemaText) return;
  try {
    const response = await fetch("/example.schema.json");
    if (!response.ok) throw Error(`HTTP ${response.status}`);
    schemaText = JSON.stringify(await response.json(), null, 2);
    $("#schema-content").removeAttribute("data-i18n");
    $("#schema-content").textContent = schemaText;
    $("#copy-schema").disabled = false;
  } catch (error) {
    $("#schema-content").textContent =
      `${t("schemaLoadError")}: ${(error as Error).message}`;
  }
};
$("#copy-schema").onclick = async () => {
  try {
    await navigator.clipboard.writeText(schemaText);
    $("#schema-status").textContent = t("copied");
  } catch {
    $("#schema-status").textContent = t("copyError");
  }
};
$("#schema-dialog").addEventListener("click", (event: MouseEvent) => {
  if (event.target === event.currentTarget)
    (event.currentTarget as HTMLDialogElement).close();
});
document.addEventListener("languagechange", () => {
  status("");
  $("#schema-status").textContent = "";
  if (schemaText) $("#schema-content").textContent = schemaText;
  const field = $("#password");
  field.placeholder = passwordConfigured
    ? "ADMIN_PASSWORD"
    : t("passwordNotConfigured");
  field.title = passwordConfigured ? "" : t("passwordDisabledHint");
  setAuthenticated(authenticated);
  if (activeEditor === "form" && currentRecord)
    interactiveEditor.setRecord(currentRecord);
  updateOptionalFieldsToggle();
});

initialize();
