// ------------------------------------------------------
// 1. Types for clean and safe bibliographic metadata
// ------------------------------------------------------
export interface BibliographicRecord {
  title: string | null;
  author: string | null;
  editor: string | null;
  place: string | null;
  publisher: string | null;
  year: string | null;
  pages: string | null;
  illustrations: string | null;
  size: string | null;
  notes: string | null;
  isbn: string | null;
  subjects: string[];
  category: string | null;
  callNumber: string | null;
  accessionNumber: string | null;
  language: string | null;
  section: string | null;
  controlNumber: string | null;
  copies: number | null;
  available: number | null;
  borrowed: number | null;
  resourceType: string | null;
  mediaType: string | null;
  carrierType: string | null;

  raw: Record<string, string>;
}

// ------------------------------------------------------
// 2. Mapping table: MARC-like numeric → semantic names
// ------------------------------------------------------
const MARC_MAP: Record<string, keyof BibliographicRecord> = {
  "001": "title",
  "004": "editor",
  "008": "author",
  "009": "place",
  "0010": "publisher",
  "0011": "year",
  "0013": "pages",
  "0014": "illustrations",
  "0015": "size",
  "0018": "notes",
  "0019": "isbn",
  "0020": "subjects",
  "0024": "category",
  "0025": "callNumber",
  "0026": "accessionNumber",
  "0027": "language",
  "0028": "section",
  "0029": "controlNumber",
  "0030": "copies",
  "0031": "available",
  "0032": "borrowed",
  "0039": "resourceType",
  "0040": "mediaType",
  "0041": "carrierType",
};

// ------------------------------------------------------
// 3. Utility: Safe number conversion
// ------------------------------------------------------
const toNumberOrNull = (value?: string) =>
  value && !isNaN(Number(value)) ? Number(value) : null;

// ------------------------------------------------------
// 4. Enhanced MARC Parser
// ------------------------------------------------------
export function parseMaintext(maintext: string): BibliographicRecord {
  if (!maintext || typeof maintext !== "string") {
    return emptyRecord();
  }

  // Split at \x1E terminator and filter out empty lines
  const entries = maintext.split("\x1E").filter(Boolean);

  const raw: Record<string, string> = {};

  // Extract numeric code + text value
  for (const entry of entries) {
    const match = entry.match(/^<(\d+)> ?([\s\S]*)$/);


    if (!match) continue;

    const tag = match[1].trim();
    const value = match[2].trim();

    raw[tag] = value;
  }

  // Build final structured record
  const record: BibliographicRecord = {
    title: raw["001"] || null,
    author: raw["008"] || null,
    editor: raw["004"] || null,
    place: raw["009"] || null,
    publisher: raw["0010"] || null,
    year: raw["0011"] || null,
    pages: raw["0013"] || null,
    illustrations: raw["0014"] || null,
    size: raw["0015"] || null,
    notes: raw["0018"] || null,
    isbn: raw["0019"] || null,

    subjects: raw["0020"]
      ? raw["0020"].split(";").map(s => s.trim()).filter(Boolean)
      : [],

    category: raw["0024"] || null,
    callNumber: raw["0025"] || null,
    accessionNumber: raw["0026"] || null,
    language: raw["0027"] || null,
    section: raw["0028"] || null,
    controlNumber: raw["0029"] || null,

    copies: toNumberOrNull(raw["0030"]),
    available: toNumberOrNull(raw["0031"]),
    borrowed: toNumberOrNull(raw["0032"]),

    resourceType: raw["0039"] || null,
    mediaType: raw["0040"] || null,
    carrierType: raw["0041"] || null,

    raw,
  };

  return record;
}

// ------------------------------------------------------
// 5. Empty object fallback
// ------------------------------------------------------
function emptyRecord(): BibliographicRecord {
  return {
    title: null,
    author: null,
    editor: null,
    place: null,
    publisher: null,
    year: null,
    pages: null,
    illustrations: null,
    size: null,
    notes: null,
    isbn: null,
    subjects: [],
    category: null,
    callNumber: null,
    accessionNumber: null,
    language: null,
    section: null,
    controlNumber: null,
    copies: null,
    available: null,
    borrowed: null,
    resourceType: null,
    mediaType: null,
    carrierType: null,
    raw: {},
  };
}
