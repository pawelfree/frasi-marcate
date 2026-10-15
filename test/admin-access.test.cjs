const { test, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const { AppController } = require("../dist/api/routes");

const originalPassword = process.env.ADMIN_PASSWORD;
afterEach(() => {
  if (originalPassword === undefined) delete process.env.ADMIN_PASSWORD;
  else process.env.ADMIN_PASSWORD = originalPassword;
});

function controller() {
  const store = {
    all: async (includeDrafts) => [{ id: "example", includeDrafts }],
    validate: (value) => ({ valid: Boolean(value), errors: [] }),
    save: async (value) => value,
    remove: async () => undefined,
  };
  return new AppController(store, {});
}

test("lista administracyjna jest dostępna bez hasła także po jego skonfigurowaniu", async () => {
  process.env.ADMIN_PASSWORD = "sekret";
  const app = controller();
  assert.deepEqual(await app.adminExamples(), [
    { id: "example", includeDrafts: true },
  ]);
  assert.deepEqual(app.adminConfig(), { passwordConfigured: true });
});

test("bez ADMIN_PASSWORD logowanie i modyfikacje są zablokowane", () => {
  delete process.env.ADMIN_PASSWORD;
  const app = controller();
  assert.deepEqual(app.adminConfig(), { passwordConfigured: false });
  assert.throws(
    () => app.adminLogin(undefined),
    /ADMIN_PASSWORD nie jest skonfigurowane/,
  );
  assert.throws(
    () => app.save(undefined, "pl", { id: "blocked" }),
    /ADMIN_PASSWORD nie jest skonfigurowane/,
  );
});

test("skonfigurowane hasło nadal chroni modyfikacje", () => {
  process.env.ADMIN_PASSWORD = "sekret";
  const app = controller();
  assert.throws(
    () => app.save(undefined, "pl", { id: "blocked" }),
    /Podaj hasło administratora/,
  );
});

test("poprawne hasło umożliwia logowanie i zapis", async () => {
  process.env.ADMIN_PASSWORD = "sekret";
  const app = controller();
  const header = `Basic ${Buffer.from("admin:sekret").toString("base64")}`;
  assert.deepEqual(app.adminLogin(header), { authenticated: true });
  assert.deepEqual(await app.save(header, "pl", { id: "saved" }), {
    id: "saved",
  });
});
