import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");

const apiServicePath = resolve(repoRoot, "apps/api/app/services/connectors.py");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");

const apiService = readFileSync(apiServicePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");

const apiGate = extractApiFnsGate(apiService);
const uiGate = extractUiFnsGate(sourcesPage);
const failures = [];

for (const field of ["status", "owner", "ciPolicy", "safeTestPairRequired"]) {
  if (apiGate[field] !== uiGate[field]) {
    failures.push(`${field} mismatch: api=${formatValue(apiGate[field])}, ui=${formatValue(uiGate[field])}`);
  }
}

if (apiGate.requiredApprovals.length !== uiGate.requiredApprovals.length) {
  failures.push(
    `approval count mismatch: api=${apiGate.requiredApprovals.length}, ui=${uiGate.requiredApprovals.length}`,
  );
}

const apiApprovalList = apiGate.requiredApprovals.join("\n");
const uiApprovalList = uiGate.requiredApprovals.join("\n");
if (apiApprovalList !== uiApprovalList) {
  failures.push(`approval list mismatch:\napi:\n${apiApprovalList}\nui:\n${uiApprovalList}`);
}

if (failures.length > 0) {
  console.error("FAIL FNS approvals parity");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS FNS approvals parity (${apiGate.requiredApprovals.length} approvals)`);

function extractApiFnsGate(source) {
  const approvalsBlock = extractDelimitedBlock(source, "REAL_NETWORK_SMOKE_APPROVALS = [", "[", "]");
  const fnsConnectorBlock = extractDelimitedBlock(
    source,
    'SourceConnector(\n                connector_id="fns-egrul-nalog-ru"',
    "(",
    ")",
  );
  const networkGateBlock = extractDelimitedBlock(fnsConnectorBlock, "network_smoke_gate=ConnectorNetworkSmokeGate(", "(", ")");

  return {
    status: readPythonStringField(networkGateBlock, "status"),
    owner: readPythonStringField(networkGateBlock, "owner"),
    ciPolicy: readPythonStringField(networkGateBlock, "ci_policy"),
    safeTestPairRequired: readPythonBooleanField(networkGateBlock, "safe_test_pair_required"),
    requiredApprovals: readStringList(approvalsBlock),
  };
}

function extractUiFnsGate(source) {
  const gateBlock = extractDelimitedBlock(source, "const fnsRealNetworkSmokeGate = {", "{", "}");
  const approvalsBlock = extractDelimitedBlock(gateBlock, "requiredApprovals: [", "[", "]");

  return {
    status: readTypescriptStringField(gateBlock, "status"),
    owner: readTypescriptStringField(gateBlock, "owner"),
    ciPolicy: readTypescriptStringField(gateBlock, "ciPolicy"),
    safeTestPairRequired: readTypescriptBooleanField(gateBlock, "safeTestPairRequired"),
    requiredApprovals: readStringList(approvalsBlock),
  };
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

function readPythonBooleanField(block, field) {
  return readBooleanField(block, `${field}\\s*=\\s*`, { trueValue: "True", falseValue: "False" });
}

function readTypescriptBooleanField(block, field) {
  return readBooleanField(block, `${field}:\\s*`, { trueValue: "true", falseValue: "false" });
}

function readBooleanField(block, prefixPattern, values) {
  const pattern = new RegExp(`${prefixPattern}(${values.trueValue}|${values.falseValue})`);
  const match = block.match(pattern);
  if (!match) {
    throw new Error(`Boolean field not found by pattern ${pattern}`);
  }
  return match[1] === values.trueValue;
}

function readStringList(block) {
  return [...block.matchAll(/"([^"]*)"/g)].map((match) => match[1]);
}

function formatValue(value) {
  return value === undefined ? "<missing>" : JSON.stringify(value);
}
