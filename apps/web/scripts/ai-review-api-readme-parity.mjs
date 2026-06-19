import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultBaseUrl = "http://127.0.0.1:4177";
const expectedApiHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-queue-contract";
const expectedWriteDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft";
const expectedApiReadmeAnchor = "AI Review Queue Contract";
const expectedApiRoute = "/v1/ai/review-queue";
const expectedApiSelector = "[data-testid='ai-review-receipt-api-link']";
const expectedWriteDeepLinkMarker = "ai-review-receipt-write-docs-deep-link";
const expectedWriteDeepLinkAnchor = "ai-review-receipt-write-docs-deep-link-anchor";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");

const baseUrl = getArgValue("--url") ?? defaultBaseUrl;
const planUrl = new URL("/plan", ensureTrailingSlash(baseUrl));
const aiReviewUrl = new URL("/ai-review", ensureTrailingSlash(baseUrl));
const apiReadme = readFileSync(apiReadmePath, "utf8");
const failures = [];

const [planResponse, aiReviewResponse] = await Promise.all([fetch(planUrl), fetch(aiReviewUrl)]);

if (!planResponse.ok) {
  fail(`/plan returned ${planResponse.status}`);
}

if (!aiReviewResponse.ok) {
  fail(`/ai-review returned ${aiReviewResponse.status}`);
}

const [planHtml, aiReviewHtml] = await Promise.all([planResponse.text(), aiReviewResponse.text()]);
const planMarker = findTag(planHtml, "section", "ai-review-schema-api-smoke-marker");
const aiReviewLoop = findTag(aiReviewHtml, "section", "ai-review-receipt-browser-loop");
const aiReviewLink = findTagWithBody(aiReviewHtml, "a", "ai-review-receipt-api-link");
const writePanel = findTag(aiReviewHtml, "section", expectedWriteDeepLinkMarker);
const writeLink = findTagWithBody(aiReviewHtml, "a", expectedWriteDeepLinkAnchor);

assert(planMarker, "/plan AI review schema API smoke marker must exist");
assert(aiReviewLoop, "/ai-review receipt browser loop marker must exist");
assert(aiReviewLink, "/ai-review API README link must exist");
assert(writePanel, "/ai-review receipt write docs deep-link panel must exist");
assert(writeLink, "/ai-review receipt write docs deep-link anchor must exist");
assert(
  apiReadme.includes(`## ${expectedApiReadmeAnchor}`),
  "apps/api/README.md must keep AI Review Queue Contract heading",
);
assert(
  apiReadme.includes("data-testid=\"ai-review-receipt-api-link\""),
  "apps/api/README.md must document ai-review-receipt-api-link",
);
assert(
  apiReadme.includes("data-api-route=\"/v1/ai/review-queue\""),
  "apps/api/README.md must document /v1/ai/review-queue route marker",
);

if (planMarker) {
  assert(getAttribute(planMarker.openingTag, "data-api-href") === expectedApiHref, "/plan must expose API README href");
  assert(
    getAttribute(planMarker.openingTag, "data-api-readme-anchor") === expectedApiReadmeAnchor,
    "/plan must expose API README anchor title",
  );
  assert(
    getAttribute(planMarker.openingTag, "data-api-readme-path") === "apps/api/README.md",
    "/plan must expose API README path",
  );
  assert(getAttribute(planMarker.openingTag, "data-api-route") === expectedApiRoute, "/plan must expose AI review API route");
  assert(
    getAttribute(planMarker.openingTag, "data-api-selector") === expectedApiSelector,
    "/plan must point to the /ai-review API link selector",
  );
}

if (aiReviewLoop) {
  assert(
    getAttribute(aiReviewLoop.openingTag, "data-api-href") === expectedApiHref,
    "/ai-review loop must expose the same API README href",
  );
  assert(
    getAttribute(aiReviewLoop.openingTag, "data-api-route") === expectedApiRoute,
    "/ai-review loop must expose the same API route",
  );
}

if (aiReviewLink) {
  assert(getAttribute(aiReviewLink.openingTag, "href") === expectedApiHref, "/ai-review link href must match /plan marker");
  assert(
    getAttribute(aiReviewLink.openingTag, "data-api-route") === expectedApiRoute,
    "/ai-review link data-api-route must match /plan marker",
  );
  assert(normalizeText(aiReviewLink.body).includes("API / AI review queue"), "/ai-review API link text must stay visible");
}

if (writePanel) {
  assert(
    getAttribute(writePanel.openingTag, "data-docs-href") === expectedWriteDocsHref,
    "/ai-review write docs deep-link panel must expose the AI review write docs href",
  );
  assert(
    getAttribute(writePanel.openingTag, "data-api-route") === expectedApiRoute,
    "/ai-review write docs deep-link panel must expose the AI review API route",
  );
  assert(getAttribute(writePanel.openingTag, "data-method") === "POST", "/ai-review write docs panel must pin POST method");
  assert(getAttribute(writePanel.openingTag, "data-status") === "draft", "/ai-review write docs panel must pin draft status");
  assert(
    getAttribute(writePanel.openingTag, "data-expected-request-field-count") === "11",
    "/ai-review write docs panel must expose all 11 request fields",
  );
  assert(
    getAttribute(writePanel.openingTag, "data-source-marker-selector") ===
      "[data-testid='ai-review-receipt-write-api-draft']",
    "/ai-review write docs panel must point back to the write draft marker",
  );
}

if (writeLink) {
  assert(
    getAttribute(writeLink.openingTag, "href") === expectedWriteDocsHref,
    "/ai-review write docs deep-link href must target API README write draft anchor",
  );
  assert(
    getAttribute(writeLink.openingTag, "data-api-route") === expectedApiRoute,
    "/ai-review write docs deep-link must keep data-api-route for backend traceability",
  );
  assert(getAttribute(writeLink.openingTag, "data-method") === "POST", "/ai-review write docs deep-link must keep POST method");
  assert(normalizeText(writeLink.body).includes("API README / AI write draft"), "/ai-review write docs link text must stay visible");
}

if (planMarker && aiReviewLoop && aiReviewLink) {
  assert(
    getAttribute(planMarker.openingTag, "data-api-href") === getAttribute(aiReviewLink.openingTag, "href"),
    "/plan API href must match /ai-review API link href",
  );
  assert(
    getAttribute(planMarker.openingTag, "data-api-route") === getAttribute(aiReviewLink.openingTag, "data-api-route"),
    "/plan API route must match /ai-review API link route",
  );
  assert(
    getAttribute(planMarker.openingTag, "data-api-href") === getAttribute(aiReviewLoop.openingTag, "data-api-href"),
    "/plan API href must match /ai-review browser loop API href",
  );
}

if (failures.length > 0) {
  console.error("FAIL AI review API README DOM parity");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review API README DOM parity (${planUrl.href} <-> ${aiReviewUrl.href})`);

function findTag(html, tagName, testId) {
  const pattern = new RegExp(`<${tagName}\\b(?=[^>]*data-testid="${escapeRegExp(testId)}")[^>]*>`, "i");
  const match = html.match(pattern);
  return match ? { openingTag: match[0] } : null;
}

function findTagWithBody(html, tagName, testId) {
  const pattern = new RegExp(
    `<${tagName}\\b(?=[^>]*data-testid="${escapeRegExp(testId)}")[^>]*>([\\s\\S]*?)<\\/${tagName}>`,
    "i",
  );
  const match = html.match(pattern);
  return match ? { openingTag: match[0].split(">")[0] + ">", body: match[1] } : null;
}

function getAttribute(tag, name) {
  const pattern = new RegExp(`${escapeRegExp(name)}="([^"]*)"`, "i");
  const match = tag.match(pattern);
  return match ? decodeHtml(match[1]) : null;
}

function getArgValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function fail(message) {
  failures.push(message);
}

function normalizeText(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
