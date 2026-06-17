import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");

const apiServicePath = resolve(repoRoot, "apps/api/app/services/ai_review.py");
const aiReviewPagePath = resolve(webRoot, "app/ai-review/page.tsx");

const apiService = readFileSync(apiServicePath, "utf8");
const aiReviewPage = readFileSync(aiReviewPagePath, "utf8");

const apiQueue = extractApiReviewQueue(apiService);
const uiQueue = extractUiReviewQueue(aiReviewPage);
const failures = [];

const parityFields = [
  ["fact_type", "fact"],
  ["owner_role", "owner"],
  ["required_action", "action"],
  ["status", "status"],
  ["confidence", "confidence"],
  ["threshold", "threshold"],
];

if (!aiReviewPage.includes("data-required-action={item.action}")) {
  failures.push("/ai-review cards must expose data-required-action for browser smoke and handoff traceability");
}

if (apiQueue.length !== uiQueue.length) {
  failures.push(`queue length mismatch: api=${apiQueue.length}, ui=${uiQueue.length}`);
}

for (const [index, apiItem] of apiQueue.entries()) {
  const uiItem = uiQueue[index];
  if (!uiItem) {
    continue;
  }

  for (const [apiField, uiField] of parityFields) {
    if (apiItem[apiField] !== uiItem[uiField]) {
      failures.push(
        `queue[${index}] ${apiField}/${uiField} mismatch: api=${formatValue(apiItem[apiField])}, ui=${formatValue(uiItem[uiField])}`,
      );
    }
  }
}

const apiMatrix = apiQueue.map((item) => `${item.fact_type}:${item.owner_role}:${item.required_action}`).join("\n");
const uiMatrix = uiQueue.map((item) => `${item.fact}:${item.owner}:${item.action}`).join("\n");
if (apiMatrix !== uiMatrix) {
  failures.push(`owner/action matrix mismatch:\napi:\n${apiMatrix}\nui:\n${uiMatrix}`);
}

if (failures.length > 0) {
  console.error("FAIL AI review action parity");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review action parity (${apiQueue.length} rows)`);

function extractApiReviewQueue(source) {
  const queueBlock = extractDelimitedBlock(source, "queue = [", "[", "]");
  const itemBlocks = [...queueBlock.matchAll(/_review_item\(([\s\S]*?)\),/g)].map((match) => match[1]);
  const threshold = readPythonNumberField(source, "CONFIDENCE_THRESHOLD");

  return itemBlocks.map((block) => {
    const confidence = readPythonNumberField(block, "confidence");
    return {
      fact_type: readPythonStringField(block, "fact_type"),
      owner_role: readPythonStringField(block, "owner_role"),
      required_action: readPythonStringField(block, "required_action"),
      status: confidence < 0.75 ? "blocked" : "review_required",
      confidence: String(Math.round(confidence * 100)),
      threshold: String(Math.round(threshold * 100)),
    };
  });
}

function extractUiReviewQueue(source) {
  const queueBlock = extractDelimitedBlock(source, "const lowConfidenceReviewQueue = [", "[", "]");
  const objectBlocks = [...queueBlock.matchAll(/\{\n([\s\S]*?)\n  \},/g)].map((match) => match[1]);

  return objectBlocks.map((block) => ({
    fact: readTypescriptStringField(block, "fact"),
    owner: readTypescriptStringField(block, "owner"),
    action: readTypescriptStringField(block, "action"),
    status: readTypescriptStringField(block, "status"),
    confidence: readPercentField(block, "confidence"),
    threshold: readPercentField(block, "threshold"),
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

function readPythonNumberField(block, field) {
  const pattern = new RegExp(`${field}\\s*=\\s*([0-9.]+)`);
  const match = block.match(pattern);
  if (!match) {
    throw new Error(`Number field not found by pattern ${pattern}`);
  }
  return Number(match[1]);
}

function readPercentField(block, field) {
  const value = readTypescriptStringField(block, field);
  if (!value.endsWith("%")) {
    throw new Error(`${field} must be formatted as a percent string`);
  }
  return value.slice(0, -1);
}

function formatValue(value) {
  return value === undefined ? "<missing>" : JSON.stringify(value);
}
