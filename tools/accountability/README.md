# certLedger public-law accountability records

This directory is a dependency-free, static viewer for source-bounded records of public legal acts. It works from `file://`, an ordinary static web server, GitHub Pages, or IPFS.

The initial dataset covers:

- *Trump v. United States*, Supreme Court No. 23-939;
- the 2023 Texas Senate impeachment trial of Warren Kenneth Paxton, Jr.; and
- Heather Cox Richardson's September 10, 2026 video as context only, explicitly excluded from factual evidence.

## Model

The stored unit is an assertion, not a label applied to a person. An assertion connects:

1. a public subject;
2. a matter or proceeding;
3. a public professional actor;
4. a narrow predicate such as `argued_for`, `joined_in_full`, or `presided_over`;
5. an event date and neutral statement; and
6. at least one source reference with a locator.

`data.js` is the source dataset. The browser canonicalizes the expanded object by sorting object keys, preserving array order, and emitting compact UTF-8 JSON. The displayed SHA-256 covers those exact canonical JSON bytes. Use **Download canonical JSON** to save the bytes that correspond to the displayed digest.

Source hashes in the initial dataset cover the HTTP response bodies downloaded on September 11, 2026. They do not make the documents retrievable. Pin the downloaded source documents and canonical dataset to IPFS, then append their CIDs and the ledger transaction IDs in a later dataset revision.

## Run

Open `index.html` directly, or serve the repository root:

```sh
python3 -m http.server 8000
```

Then visit:

```text
http://127.0.0.1:8000/tools/accountability/
```

The SHA-256 routine has a local fallback because `crypto.subtle` may be unavailable on a non-secure Termux-hosted HTTP origin.

## Validate

The verifier uses only built-in Node.js modules and does not participate in the browser application:

```sh
node tools/accountability/verify.mjs
```

It checks identifier uniqueness, references, source eligibility, dates, hashes, prohibited contact-data keys, and the browser fallback SHA-256 implementation against Node's implementation.

## Publication rules

- Use primary official records for factual assertions whenever they exist.
- Keep `allegation`, `procedural-fact`, `adjudicated-outcome`, `correction`, and `exoneration` distinct.
- Record contrary and favorable dispositions with the same specificity as adverse events.
- Never infer a bar number, professional identifier, motive, financial relationship, or adjudicative role.
- Do not publish private addresses, personal phone numbers, family information, or other irrelevant personal data.
- Never silently replace a published assertion. Add a correction record referencing the earlier assertion and, once anchored, its transaction ID.

The burn-plan export deliberately produces semantic inputs rather than finished addresses or a signed transaction. Address generation, CID insertion, transaction review, signing, and broadcast remain explicit steps in Chisel.
