import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");

const apiServicePath = resolve(repoRoot, "apps/api/app/services/source_owner_receipts.py");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");

const apiService = readFileSync(apiServicePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");

const apiHistory = extractApiHistory(apiService);
const uiHistory = extractUiHistory(sourcesPage);

const parityFields = [
  ["id", "id"],
  ["breach_type", "breachType"],
  ["owner_role", "owner"],
  ["action", "action"],
  ["resolution_status", "resolution"],
  ["raw_artifact_id", "rawArtifact"],
  ["checksum_sha256", "checksum"],
  ["ai_gate", "aiGate"],
  ["audit_note", "note"],
];

const failures = [];

if (apiHistory.length !== uiHistory.length) {
  failures.push(`history length mismatch: api=${apiHistory.length}, ui=${uiHistory.length}`);
}

for (const [index, apiReceipt] of apiHistory.entries()) {
  const uiReceipt = uiHistory[index];
  if (!uiReceipt) {
    continue;
  }

  for (const [apiField, uiField] of parityFields) {
    if (apiReceipt[apiField] !== uiReceipt[uiField]) {
      failures.push(
        `receipt[${index}] ${apiField}/${uiField} mismatch: api=${formatValue(apiReceipt[apiField])}, ui=${formatValue(uiReceipt[uiField])}`,
      );
    }
  }
}

const apiIds = apiHistory.map((receipt) => receipt.id).join(",");
const uiIds = uiHistory.map((receipt) => receipt.id).join(",");
if (apiIds !== uiIds) {
  failures.push(`history id order mismatch: api=${apiIds}, ui=${uiIds}`);
}

if (failures.length > 0) {
  console.error("FAIL source owner receipt history parity");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source owner receipt history parity (${apiHistory.length} rows)`);

function extractApiHistory(source) {
  const historyBlock = extractDelimitedBlock(source, "history = [", "[", "]");
  const itemBlocks = [...historyBlock.matchAll(/SourceOwnerReceiptHistoryItem\(([\s\S]*?)\),/g)].map((match) => match[1]);

  return itemBlocks.map((block) => ({
    id: readPythonStringField(block, "id"),
    breach_type: readPythonStringField(block, "breach_type"),
    owner_role: readPythonStringField(block, "owner_role"),
    action: readPythonStringField(block, "action"),
    resolution_status: readPythonStringField(block, "resolution_status"),
    raw_artifact_id: readPythonStringField(block, "raw_artifact_id"),
    checksum_sha256: readPythonStringField(block, "checksum_sha256"),
    ai_gate: readPythonStringField(block, "ai_gate"),
    audit_note: readPythonStringField(block, "audit_note"),
  }));
}

function extractUiHistory(source) {
  const historyBlock = extractDelimitedBlock(source, "const sourceOwnerReceiptHistory = [", "[", "]");
  const objectBlocks = [...historyBlock.matchAll(/\{\n([\s\S]*?)\n  \},/g)].map((match) => match[1]);

  return objectBlocks.map((block) => ({
    id: readTypescriptStringField(block, "id"),
    breachType: readTypescriptStringField(block, "breachType"),
    owner: readTypescriptStringField(block, "owner"),
    action: readTypescriptStringField(block, "action"),
    resolution: readTypescriptStringField(block, "resolution"),
    rawArtifact: readTypescriptStringField(block, "rawArtifact"),
    checksum: readTypescriptStringField(block, "checksum"),
    aiGate: readTypescriptStringField(block, "aiGate"),
    note: readTypescriptStringField(block, "note"),
  }));
}

function extractDelimitedBlock(source, marker, openChar, closeChar) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Marker not found: ${marker}`);
  }

  const start = source.indexOf(openChar, markerIndex);
  if (start === -1) {
    throw new Error(`Opening delimiter not found after marker: ${marker}`);
  }

  let depth = 0;
  for (let index = start; index < source.length; index += 1) {
    if (source[index] === openChar) {
      depth += 1;
    }
    if (source[index] === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return source.slice(start + 1, index);
      }
    }
  }

  throw new Error(`Closing delimiter not found after marker: ${marker}`);
}

function readPythonStringField(block, field) {
  return readStringField(block, `${field}\\s*=\\s*`);
}

function readTypescriptStringField(block, field) {
  return readStringField(block, `${field}:\\s*`);
}

function readStringField(block, prefixPattern) {
  const pattern = new RegExp(`${prefixPattern}"([^"]*)"`);
  const match = block.match(pattern);
  if (!match) {
    throw new Error(`String field not found by pattern ${pattern}`);
  }
  return match[1];
}

function formatValue(value) {
  return value === undefined ? "<missing>" : JSON.stringify(value);
}
