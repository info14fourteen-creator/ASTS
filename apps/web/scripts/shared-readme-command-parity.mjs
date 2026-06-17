import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");

const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const readmePath = resolve(repoRoot, "packages/shared/README.md");

const planPage = readFileSync(planPagePath, "utf8");
const readme = readFileSync(readmePath, "utf8");
const failures = [];

const planCommands = extractPlanCommands(planPage);
const readmeCommands = extractReadmeCommands(readme);

assert(planCommands.length === 4, "/plan fixture checklist must keep 4 local validation commands");
assert(readmeCommands.length === 4, "shared README must keep 4 local validation commands");
assert(
  planCommands.join("\n") === readmeCommands.join("\n"),
  "/plan fixture checklist commands must match packages/shared/README.md Local validation commands exactly",
);
assert(
  planPage.includes('data-testid="shared-readme-command-parity-smoke"'),
  "/plan must expose shared-readme-command-parity-smoke marker",
);
assert(
  planPage.includes('data-readme-path={sharedReadmeCommandParitySmoke.readmePath}'),
  "/plan command parity marker must expose shared README path",
);
assert(
  planPage.includes("npm run smoke:shared-readme-commands"),
  "/plan must show the shared README command parity smoke command",
);

if (failures.length > 0) {
  console.error("FAIL shared README command parity");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  console.error(`  /plan commands: ${JSON.stringify(planCommands)}`);
  console.error(`  README commands: ${JSON.stringify(readmeCommands)}`);
  process.exit(1);
}

console.log(`PASS shared README command parity (${readmeCommands.length} commands)`);

function extractPlanCommands(source) {
  const objectMatch = source.match(/const fixtureSchemaChecklistSmoke = \{[\s\S]*?\n\};/);
  if (!objectMatch) {
    fail("fixtureSchemaChecklistSmoke object is missing from /plan");
    return [];
  }

  const commandsMatch = objectMatch[0].match(/commands:\s*\[([\s\S]*?)\],\n\s*surfaces:/);
  if (!commandsMatch) {
    fail("fixtureSchemaChecklistSmoke.commands array is missing from /plan");
    return [];
  }

  return extractQuotedLines(commandsMatch[1]);
}

function extractReadmeCommands(source) {
  const commandsBlockMatch = source.match(/Local validation commands:\n\n```bash\n([\s\S]*?)\n```/);
  if (!commandsBlockMatch) {
    fail("Local validation commands bash block is missing from packages/shared/README.md");
    return [];
  }

  return commandsBlockMatch[1]
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function extractQuotedLines(source) {
  return [...source.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function fail(message) {
  failures.push(message);
}
