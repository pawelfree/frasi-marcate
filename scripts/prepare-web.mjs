import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const workspace = process.cwd();
const output = join(workspace, "dist", "web");

await rm(output, { recursive: true, force: true });
await mkdir(join(output, "assets"), { recursive: true });
await cp(join(workspace, "src", "web", "public"), output, {
  recursive: true,
});
await cp(
  join(workspace, "schema", "example.schema.json"),
  join(output, "example.schema.json"),
);
