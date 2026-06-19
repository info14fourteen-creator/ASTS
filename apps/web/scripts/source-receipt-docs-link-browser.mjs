const defaultBaseUrl = "http://127.0.0.1:4177";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-contract";
const expectedWriteDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft";
const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedWriteDeepLinkMarker = "source-owner-receipt-write-docs-deep-link";
const expectedWriteDeepLinkAnchor = "source-owner-receipt-write-docs-deep-link-anchor";

const baseUrl = getArgValue("--url") ?? defaultBaseUrl;
const sourcesUrl = new URL("/sources", ensureTrailingSlash(baseUrl));
const failures = [];

const response = await fetch(sourcesUrl);

if (!response.ok) {
  fail(`/sources returned ${response.status}`);
}

const html = await response.text();
const panel = findTag(html, "section", "source-owner-receipt-history-browser-loop");
const link = findTagWithBody(html, "a", "source-owner-receipt-docs-link");
const writePanel = findTag(html, "section", expectedWriteDeepLinkMarker);
const writeLink = findTagWithBody(html, "a", expectedWriteDeepLinkAnchor);

assert(panel, "source owner receipt history browser loop panel must exist");
assert(link, "source owner receipt docs link must exist");
assert(writePanel, "source owner receipt write docs deep-link panel must exist");
assert(writeLink, "source owner receipt write docs deep-link anchor must exist");

if (panel) {
  assert(
    getAttribute(panel.openingTag, "data-docs-href") === expectedDocsHref,
    "browser loop panel must expose the source owner receipt docs href",
  );
  assert(
    getAttribute(panel.openingTag, "data-api-route") === expectedApiRoute,
    "browser loop panel must expose the source owner receipts API route",
  );
  assert(
    getAttribute(panel.openingTag, "data-history-count") === "4",
    "browser loop panel must expose all 4 owner receipt history rows",
  );
}

if (link) {
  assert(getAttribute(link.openingTag, "href") === expectedDocsHref, "docs link href must target API README contract");
  assert(
    getAttribute(link.openingTag, "data-api-route") === expectedApiRoute,
    "docs link must keep data-api-route for backend traceability",
  );
  assert(normalizeText(link.body).includes("API README / owner receipts"), "docs link text must stay visible");
}

if (writePanel) {
  assert(
    getAttribute(writePanel.openingTag, "data-docs-href") === expectedWriteDocsHref,
    "write docs deep-link panel must expose the source owner receipt write docs href",
  );
  assert(
    getAttribute(writePanel.openingTag, "data-api-route") === expectedApiRoute,
    "write docs deep-link panel must expose the source owner receipts API route",
  );
  assert(getAttribute(writePanel.openingTag, "data-method") === "POST", "write docs deep-link panel must pin POST method");
  assert(getAttribute(writePanel.openingTag, "data-status") === "draft", "write docs deep-link panel must pin draft status");
  assert(
    getAttribute(writePanel.openingTag, "data-expected-request-field-count") === "10",
    "write docs deep-link panel must expose all 10 request fields",
  );
  assert(
    getAttribute(writePanel.openingTag, "data-source-marker-selector") ===
      "[data-testid='source-owner-receipt-write-api-draft']",
    "write docs deep-link panel must point back to the write draft marker",
  );
}

if (writeLink) {
  assert(
    getAttribute(writeLink.openingTag, "href") === expectedWriteDocsHref,
    "write docs deep-link href must target API README write draft anchor",
  );
  assert(
    getAttribute(writeLink.openingTag, "data-api-route") === expectedApiRoute,
    "write docs deep-link must keep data-api-route for backend traceability",
  );
  assert(getAttribute(writeLink.openingTag, "data-method") === "POST", "write docs deep-link must keep POST method");
  assert(normalizeText(writeLink.body).includes("API README / write draft"), "write docs link text must stay visible");
}

if (failures.length > 0) {
  console.error("FAIL source receipt docs link browser assertion");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source receipt docs link browser assertion (${sourcesUrl.href})`);

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
