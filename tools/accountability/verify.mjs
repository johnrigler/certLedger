import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const dataSource = fs.readFileSync(path.join(directory, "data.js"), "utf8");
const appSource = fs.readFileSync(path.join(directory, "app.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(dataSource, sandbox, { filename: "data.js" });

const data = sandbox.window.CERTLEDGER_ACCOUNTABILITY;
assert.ok(data, "data.js must publish CERTLEDGER_ACCOUNTABILITY");
assert.equal(data.schemaVersion, "certledger-accountability/1.0.0");

function assertUniqueIds(items, label) {
  const seen = new Set();
  for (const item of items) {
    assert.match(item.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, label + " has an invalid id: " + item.id);
    assert.ok(!seen.has(item.id), label + " has duplicate id: " + item.id);
    seen.add(item.id);
  }
  return seen;
}

function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(canonicalize).join(",") + "]";
  return "{" + Object.keys(value).sort().map((key) => JSON.stringify(key) + ":" + canonicalize(value[key])).join(",") + "}";
}

const entityIds = assertUniqueIds(data.entities, "entities");
const matterIds = assertUniqueIds(data.matters, "matters");
const sourceIds = assertUniqueIds(data.sources, "sources");
assertUniqueIds(data.assertions, "assertions");

const sourceById = Object.fromEntries(data.sources.map((source) => [source.id, source]));
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

for (const matter of data.matters) {
  assert.match(matter.openedDate, isoDate, matter.id + " openedDate");
  assert.match(matter.decisionDate, isoDate, matter.id + " decisionDate");
  for (const subjectId of matter.subjectIds) {
    assert.ok(entityIds.has(subjectId), matter.id + " has unknown subject " + subjectId);
  }
}

for (const source of data.sources) {
  assert.ok(/^https:\/\//.test(source.uri), source.id + " must use HTTPS");
  if (source.evidenceUse === "eligible") {
    assert.equal(source.sourceClass, "primary-official", source.id + " is eligible but not primary-official");
    assert.ok(source.capture, source.id + " needs a captured hash");
  }
  if (source.capture) {
    assert.match(source.capture.sha256, /^[0-9a-f]{64}$/, source.id + " sha256");
    assert.ok(Number.isSafeInteger(source.capture.byteLength) && source.capture.byteLength > 0, source.id + " byteLength");
  }
}

for (const assertion of data.assertions) {
  assert.ok(matterIds.has(assertion.matterId), assertion.id + " has unknown matter");
  assert.ok(entityIds.has(assertion.actorId), assertion.id + " has unknown actor");
  assert.match(assertion.eventDate, isoDate, assertion.id + " eventDate");
  assert.ok(assertion.sourceRefs.length > 0, assertion.id + " needs a source");
  for (const subjectId of assertion.subjectIds) {
    assert.ok(entityIds.has(subjectId), assertion.id + " has unknown subject " + subjectId);
  }
  for (const reference of assertion.sourceRefs) {
    assert.ok(sourceIds.has(reference.sourceId), assertion.id + " has unknown source " + reference.sourceId);
    assert.equal(sourceById[reference.sourceId].evidenceUse, "eligible", assertion.id + " cites a context-only source");
    assert.ok(reference.locator.trim(), assertion.id + " has an empty locator");
  }
}

const serialized = JSON.stringify(data);
for (const prohibitedKey of ["homeAddress", "personalPhone", "familyInformation", "email"]) {
  assert.ok(!serialized.includes('"' + prohibitedKey + '"'), "prohibited contact-data key: " + prohibitedKey);
}

const canonical = canonicalize(data);
const nodeHash = crypto.createHash("sha256").update(canonical, "utf8").digest("hex");

const fallbackMatch = appSource.match(/function fallbackSha256\(text\) \{[\s\S]*?\n  \}\n\n  async function sha256/);
assert.ok(fallbackMatch, "could not locate browser fallbackSha256");
const fallbackSource = fallbackMatch[0].replace(/\n\n  async function sha256$/, "");
const helperMatch = appSource.match(/function utf8Bytes\(text\) \{[\s\S]*?\n  \}\n\n  function rotateRight[\s\S]*?\n  \}/);
assert.ok(helperMatch, "could not locate SHA-256 helpers");
const hashSandbox = {};
vm.runInNewContext(helperMatch[0] + "\n" + fallbackSource + "\nthis.hash = fallbackSha256(input);", { ...hashSandbox, input: canonical });

const computed = vm.runInNewContext(helperMatch[0] + "\n" + fallbackSource + "\nfallbackSha256(input);", { input: canonical });
assert.equal(computed, nodeHash, "browser fallback SHA-256 differs from Node SHA-256");

console.log("accountability dataset verified");
console.log("entities:", data.entities.length);
console.log("matters:", data.matters.length);
console.log("sources:", data.sources.length);
console.log("assertions:", data.assertions.length);
console.log("canonical bytes:", Buffer.byteLength(canonical, "utf8"));
console.log("sha256:", nodeHash);
