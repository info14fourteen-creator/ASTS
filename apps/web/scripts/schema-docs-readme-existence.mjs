import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedAnchor = "packages/shared/README.md#shared-schema-index";
const expectedAnchorSlug = "shared-schema-index";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/packages/shared/README.md#shared-schema-index";
const expectedHeading = "Shared Schema Index";
const expectedReadmePath = "packages/shared/README.md";
const expectedSchemaIds = [
  "ai-schemas/tender-position-extraction.schema.json",
  "ai-schemas/supplier-quote-normalization.schema.json",
  "fixture-schemas/source-owner-receipts.schema.json",
  "fixture-schemas/fns-connector-gate.schema.json",
  "fixture-schemas/ai-review-queue.schema.json",
];

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const readmePath = resolve(repoRoot, expectedReadmePath);

const planPage = readFileSync(planPagePath, "utf8");
const readme = readFileSync(readmePath, "utf8");
const failures = [];

assert(readme.includes(`## ${expectedHeading}`), "shared README must keep Shared Schema Index heading");
assert(slugifyGithubHeading(expectedHeading) === expectedAnchorSlug, "expected README heading slug must stay shared-schema-index");
assert(
  planPage.includes("data-testid=\"schema-docs-readme-existence-smoke\""),
  "/plan must expose schema-docs-readme-existence-smoke marker",
);
assert(planPage.includes(`anchorSlug: "${expectedAnchorSlug}"`), "/plan schema docs marker must expose anchor slug");
assert(planPage.includes(`readmeHeading: "${expectedHeading}"`), "/plan schema docs marker must expose README heading");
assert(planPage.includes(`readmePath: "${expectedReadmePath}"`), "/plan schema docs marker must expose README path");
assert(planPage.includes(expectedDocsHref), "/plan must keep schema docs GitHub href");
assert(planPage.includes(expectedAnchor), "/plan must keep schema docs relative anchor");

const indexSection = extractSection(readme, `## ${expectedHeading}`);
assert(indexSection, "shared README must include a readable Shared Schema Index section");

if (indexSection) {
  for (const schemaId of expectedSchemaIds) {
    assert(indexSection.includes(schemaId), `Shared Schema Index must include ${schemaId}`);
  }
}

if (failures.length > 0) {
  console.error("FAIL schema docs README existence");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS schema docs README existence (${expectedSchemaIds.length} schema rows)`);

function extractSection(source, heading) {
  const start = source.indexOf(heading);
  if (start < 0) {
    return null;
  }

  const rest = source.slice(start + heading.length);
  const nextHeading = rest.search(/\n## /);
  return nextHeading >= 0 ? rest.slice(0, nextHeading) : rest;
}

function slugifyGithubHeading(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
