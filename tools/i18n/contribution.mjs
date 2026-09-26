// =============================================================================
// contribution.mjs — validate and merge peer translation contributions.
//
// Early-access players correct translations in the in-game helper (Ctrl+T on
// the map), press "Save for GitHub" and upload the resulting
//   translation-<locale>-<contributor>-<yyyyMMdd-HHmm>.json
// to i18n-contributions/<locale>/ of the public support repo as a pull request
// (support-repo/i18n-contributions/README.md, docs/community-feedback.md).
// This file is synced into that repo (tools/support-repo/sync.mjs), where its
// PR check runs WITHOUT the CSV catalog.
//
//   node tools/i18n/contribution.mjs check <file.json>...     (CI + reviewers)
//   node tools/i18n/contribution.mjs apply <file.json> [--force-stale] [--dry-run]
//
// check  — refuses (exit 1) a malformed file: wrong format/locale/name/folder,
//          unknown key or CSV, empty text, invented {n} placeholder, unbalanced
//          BBCode, control characters. Stale rows (the catalog text changed since
//          the player saw it) and already-merged rows are reported, not failed.
//          Without a catalog (support repo) placeholders are checked against
//          the file's own sourceText; keys and staleness wait for apply.
// apply  — runs check, then writes every current row's newTranslationText into
//          its CSV cell (target-locale column only; every other cell re-emits
//          unchanged, like patch-cells.mjs) and moves the file to
//          i18n-contributions/applied/<locale>/. Stale rows are skipped unless
//          --force-stale. Afterwards run reimport_translations.bat.
// =============================================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from "node:fs";
import { dirname, basename, resolve, relative, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const LOCALES = ["en", "de", "fr", "es", "it", "ja", "zh", "ru", "pt", "pl"];
const FORMAT = "geargrave-translation-contribution";
const NAME_RE = /^translation-([a-z]{2})-[a-z0-9_]+(?:-[a-z0-9_]+)*-\d{8}-\d{4}\.json$/;
const CSV_RE = /^(?:i18n\/translation\.csv|levels\/[a-z0-9_-]+\/i18n\/[a-z0-9_.-]+\.csv)$/;
const MAX_TEXT = 4000;
// The public community repo carries this script but not the CSV catalog.
const HAS_CATALOG = existsSync(join(REPO, "godot", "i18n", "translation.csv"));

// ---- record-wise CSV (quoted fields carry embedded newlines) — as patch-cells.mjs
function parseCsv(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
      continue;
    }
    if (c === '"') { q = true; continue; }
    if (c === ",") { row.push(cell); cell = ""; continue; }
    if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((x) => x !== "")) rows.push(row);
      row = [];
      continue;
    }
    cell += c;
  }
  row.push(cell);
  if (row.some((x) => x !== "")) rows.push(row);
  return rows;
}
const esc = (s) => (/[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s);
const PLACEHOLDER = /\{\d+(?::[^}]*)?\}/g;

function bbcodeImbalance(s) {
  const stack = [];
  const re = /\[(\/?)([a-z]+)[^\]]*\]/gi;
  let m;
  while ((m = re.exec(s))) {
    const closing = m[1] === "/", tag = m[2].toLowerCase();
    if (!["b", "i", "u", "s", "color", "font", "code", "center", "url"].includes(tag)) continue;
    if (!closing) stack.push(tag);
    else if (!stack.length) return `stray [/${tag}]`;
    else if (stack.at(-1) !== tag) return `[/${tag}] closes [${stack.at(-1)}]`;
    else stack.pop();
  }
  return stack.length ? `unclosed [${stack.join("], [")}]` : "";
}

// ---- catalog access ----------------------------------------------------------
/** csvFileName as the game displays it → on-disk path (base table lives under godot/). */
function csvDiskPath(csvFileName) {
  if (csvFileName === "i18n/translation.csv") return join(REPO, "godot", "i18n", "translation.csv");
  for (const root of [REPO, join(REPO, "godot")]) {
    const p = join(root, ...csvFileName.split("/"));
    if (existsSync(p)) return p;
  }
  return null;
}

const csvCache = new Map();
function loadCsv(path) {
  if (!csvCache.has(path)) {
    const text = readFileSync(path, "utf8");
    const rows = parseCsv(text);
    const byKey = new Map();
    for (let r = 1; r < rows.length; r++) byKey.set(rows[r][0], r);
    // Keep the checkout's line endings (autocrlf) so untouched rows stay byte-identical.
    const eol = text.includes("\r\n") ? "\r\n" : "\n";
    csvCache.set(path, { rows, header: rows[0], byKey, eol, dirty: false });
  }
  return csvCache.get(path);
}

// ---- validation ----------------------------------------------------------------
/** Returns { errors, warnings, rows: [{ entry, csv, r, col, state }] }. */
function checkFile(file) {
  const errors = [], warnings = [], rows = [];
  const name = basename(file);
  let doc;
  try { doc = JSON.parse(readFileSync(file, "utf8").replace(/^﻿/, "")); }
  catch (e) { return { errors: [`not valid JSON: ${e.message}`], warnings, rows }; }

  if (doc?.format !== FORMAT) errors.push(`"format" must be "${FORMAT}"`);
  if (doc?.formatVersion !== 1) errors.push(`unsupported "formatVersion" ${doc?.formatVersion}`);
  const src = doc?.sourceLocale, tgt = doc?.targetLocale;
  if (!LOCALES.includes(src)) errors.push(`unknown sourceLocale "${src}"`);
  if (!LOCALES.includes(tgt)) errors.push(`unknown targetLocale "${tgt}"`);
  if (src === tgt) errors.push("sourceLocale and targetLocale are the same");

  const m = NAME_RE.exec(name);
  if (!m) errors.push(`file name must look like translation-<locale>-<name>-<yyyyMMdd-HHmm>.json`);
  else if (m[1] !== tgt) errors.push(`file name locale "${m[1]}" ≠ targetLocale "${tgt}"`);
  const rel = relative(REPO, resolve(file)).split(sep).join("/");
  if (rel.startsWith("i18n-contributions/") && !rel.startsWith("i18n-contributions/applied/")
      && rel !== `i18n-contributions/${tgt}/${name}`)
    errors.push(`belongs in i18n-contributions/${tgt}/, not ${rel}`);

  const mods = doc?.modifications;
  if (!Array.isArray(mods) || mods.length === 0) errors.push(`"modifications" must be a non-empty array`);
  else if (doc.entryCount !== mods.length) warnings.push(`entryCount ${doc.entryCount} ≠ ${mods.length} entries`);
  if (errors.length) return { errors, warnings, rows };

  const seen = new Set();
  for (const [i, e] of mods.entries()) {
    const at = `#${i + 1} ${e?.labelName ?? "?"}`;
    const fields = ["labelName", "csvFileName", "sourceText", "translationText", "newTranslationText"];
    const bad = fields.filter((f) => typeof e?.[f] !== "string");
    if (bad.length) { errors.push(`${at}: missing/non-text field(s) ${bad.join(", ")}`); continue; }
    if (!CSV_RE.test(e.csvFileName)) { errors.push(`${at}: csvFileName "${e.csvFileName}" is not a catalog file`); continue; }
    const id = `${e.csvFileName}|${e.labelName}`;
    if (seen.has(id)) { errors.push(`${at}: listed twice`); continue; }
    seen.add(id);

    if (!HAS_CATALOG) {
      // Public community repo: no CSVs there, so check against the file's own
      // sourceText; key existence and staleness are checked again at apply time.
      const v = e.newTranslationText;
      if (!/^[A-Za-z0-9_.-]+$/.test(e.labelName)) { errors.push(`${at}: malformed labelName`); continue; }
      if (!v.trim()) { errors.push(`${at}: newTranslationText is empty`); continue; }
      if (v.length > MAX_TEXT) { errors.push(`${at}: text longer than ${MAX_TEXT} characters`); continue; }
      if (/[\u0000-\u0009\u000B-\u001F\u007F]/.test(v)) { errors.push(`${at}: control characters in text`); continue; }
      if (v === e.translationText) { errors.push(`${at}: newTranslationText equals the old text`); continue; }
      const srcSet = new Set(e.sourceText.match(PLACEHOLDER) ?? []);
      const vSet = new Set(v.match(PLACEHOLDER) ?? []);
      const invented = [...vSet].filter((p) => !srcSet.has(p));
      if (invented.length) { errors.push(`${at}: invented placeholder(s) ${invented.join(",")}`); continue; }
      const dropped = [...srcSet].filter((p) => !vSet.has(p));
      if (dropped.length) warnings.push(`${at}: drops placeholder(s) ${dropped.join(",")} — the number/name will be missing`);
      const imb = bbcodeImbalance(v);
      if (imb) { errors.push(`${at}: unbalanced markup — ${imb}`); continue; }
      rows.push({ entry: e, state: "ok" });
      continue;
    }

    const path = csvDiskPath(e.csvFileName);
    if (!path) { errors.push(`${at}: ${e.csvFileName} does not exist`); continue; }
    const csv = loadCsv(path);
    const r = csv.byKey.get(e.labelName);
    const col = csv.header.indexOf(tgt), srcCol = csv.header.indexOf(src), enCol = csv.header.indexOf("en");
    if (r === undefined) { errors.push(`${at}: key not in ${e.csvFileName}`); continue; }
    if (col < 0) { errors.push(`${at}: ${e.csvFileName} has no "${tgt}" column`); continue; }

    const v = e.newTranslationText;
    if (!v.trim()) { errors.push(`${at}: newTranslationText is empty`); continue; }
    if (v.length > MAX_TEXT) { errors.push(`${at}: text longer than ${MAX_TEXT} characters`); continue; }
    if (/[\u0000-\u0009\u000B-\u001F\u007F]/.test(v)) { errors.push(`${at}: control characters in text`); continue; }
    const en = csv.rows[r][enCol] ?? "";
    const enSet = new Set(en.match(PLACEHOLDER) ?? []);
    const vSet = new Set(v.match(PLACEHOLDER) ?? []);
    const invented = [...vSet].filter((p) => !enSet.has(p));
    if (invented.length) { errors.push(`${at}: invented placeholder(s) ${invented.join(",")}`); continue; }
    const dropped = [...enSet].filter((p) => !vSet.has(p));
    if (dropped.length) warnings.push(`${at}: drops placeholder(s) ${dropped.join(",")} — the number/name will be missing`);
    const imb = bbcodeImbalance(v);
    if (imb) { errors.push(`${at}: unbalanced markup — ${imb}`); continue; }

    // Compare line-ending-blind: the player's catalog and this checkout may differ in CRLF/LF.
    const lf = (s) => s.replace(/\r\n/g, "\n");
    const current = csv.rows[r][col] ?? "";
    let state = "ok";
    if (lf(current) === lf(v)) { state = "merged"; warnings.push(`${at}: already in the catalog — skipped`); }
    else if (lf(current) !== lf(e.translationText)) {
      state = "stale";
      warnings.push(`${at}: STALE — catalog now reads ${JSON.stringify(current)}, player saw ${JSON.stringify(e.translationText)}`);
    }
    if (state === "ok" && srcCol >= 0 && lf(csv.rows[r][srcCol] ?? "") !== lf(e.sourceText))
      warnings.push(`${at}: the ${src} source text changed since — review the meaning`);
    rows.push({ entry: e, csv, path, r, col, state });
  }
  return { errors, warnings, rows };
}

function report(file, { errors, warnings, rows }) {
  const ok = rows.filter((x) => x.state === "ok").length;
  console.log(`${relative(REPO, resolve(file))}: ${errors.length ? "REFUSED" : "valid"} — ` +
              `${ok} applicable, ${rows.length - ok} stale/merged, ${errors.length} error(s)`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

// ---- main ----------------------------------------------------------------------
const [mode, ...rest] = process.argv.slice(2);
const files = rest.filter((a) => !a.startsWith("--"));
const force = rest.includes("--force-stale"), dry = rest.includes("--dry-run");
if (!["check", "apply"].includes(mode) || files.length === 0 || (mode === "apply" && files.length !== 1)) {
  console.error("usage: node contribution.mjs check <file.json>...\n" +
                "       node contribution.mjs apply <file.json> [--force-stale] [--dry-run]");
  process.exit(2);
}

let failed = false;
if (mode === "check") {
  for (const f of files) {
    if (!existsSync(f)) { console.log(`${f}: missing`); failed = true; continue; }
    const res = checkFile(f);
    report(f, res);
    if (res.errors.length) failed = true;
  }
  process.exit(failed ? 1 : 0);
}

const file = files[0];
if (!existsSync(file)) { console.error(`missing: ${file}`); process.exit(2); }
if (!HAS_CATALOG) { console.error("apply needs the game repo's CSV catalog (godot/i18n/translation.csv)"); process.exit(2); }
const res = checkFile(file);
report(file, res);
if (res.errors.length) process.exit(1);

let written = 0;
for (const x of res.rows) {
  if (x.state === "merged" || (x.state === "stale" && !force)) continue;
  x.csv.rows[x.r][x.col] = x.entry.newTranslationText.replace(/\r?\n/g, x.csv.eol);
  x.csv.dirty = true;
  written++;
}
for (const [path, csv] of csvCache) {
  if (!csv.dirty) continue;
  console.log(`${dry ? "would write" : "wrote"} ${relative(REPO, path)}`);
  if (!dry) writeFileSync(path, csv.rows.map((r) => r.map(esc).join(",")).join(csv.eol) + csv.eol);
}
console.log(`${written} cell(s) ${dry ? "would be " : ""}updated.`);

const doc = JSON.parse(readFileSync(file, "utf8").replace(/^﻿/, ""));
const target = join(REPO, "i18n-contributions", "applied", doc.targetLocale, basename(file));
if (!dry && resolve(file) !== target) {
  mkdirSync(dirname(target), { recursive: true });
  renameSync(file, target);
  console.log(`moved to ${relative(REPO, target)} — run reimport_translations.bat next.`);
}
