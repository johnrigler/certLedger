(function startAccountabilityViewer() {
  "use strict";

  const data = window.CERTLEDGER_ACCOUNTABILITY;

  if (!data) {
    document.body.textContent = "Accountability dataset failed to load.";
    return;
  }

  const entityById = indexById(data.entities);
  const matterById = indexById(data.matters);
  const sourceById = indexById(data.sources);
  let canonicalJson = "";
  let datasetHash = "";

  const dom = {
    schemaVersion: document.querySelector("#schemaVersion"),
    datasetId: document.querySelector("#datasetId"),
    datasetHash: document.querySelector("#datasetHash"),
    stats: document.querySelector("#stats"),
    searchInput: document.querySelector("#searchInput"),
    subjectFilter: document.querySelector("#subjectFilter"),
    matterFilter: document.querySelector("#matterFilter"),
    actorFilter: document.querySelector("#actorFilter"),
    records: document.querySelector("#records"),
    resultCount: document.querySelector("#resultCount"),
    emptyState: document.querySelector("#emptyState"),
    sources: document.querySelector("#sources"),
    downloadButton: document.querySelector("#downloadButton"),
    burnButton: document.querySelector("#burnButton"),
    burnDialog: document.querySelector("#burnDialog"),
    burnMatter: document.querySelector("#burnMatter"),
    burnOutput: document.querySelector("#burnOutput"),
    copyBurnButton: document.querySelector("#copyBurnButton")
  };

  function indexById(items) {
    return Object.fromEntries(items.map(function toPair(item) {
      return [item.id, item];
    }));
  }

  function canonicalize(value) {
    if (value === null || typeof value !== "object") {
      return JSON.stringify(value);
    }

    if (Array.isArray(value)) {
      return "[" + value.map(canonicalize).join(",") + "]";
    }

    return "{" + Object.keys(value).sort().map(function serializeKey(key) {
      return JSON.stringify(key) + ":" + canonicalize(value[key]);
    }).join(",") + "}";
  }

  function utf8Bytes(text) {
    const bytes = [];

    for (const character of text) {
      const point = character.codePointAt(0);

      if (point <= 0x7f) {
        bytes.push(point);
      } else if (point <= 0x7ff) {
        bytes.push(0xc0 | (point >>> 6), 0x80 | (point & 0x3f));
      } else if (point <= 0xffff) {
        bytes.push(
          0xe0 | (point >>> 12),
          0x80 | ((point >>> 6) & 0x3f),
          0x80 | (point & 0x3f)
        );
      } else {
        bytes.push(
          0xf0 | (point >>> 18),
          0x80 | ((point >>> 12) & 0x3f),
          0x80 | ((point >>> 6) & 0x3f),
          0x80 | (point & 0x3f)
        );
      }
    }

    return bytes;
  }

  function rotateRight(value, count) {
    return (value >>> count) | (value << (32 - count));
  }

  function fallbackSha256(text) {
    const constants = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    const hash = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    const message = utf8Bytes(text);
    const bitLength = message.length * 8;
    const highLength = Math.floor(bitLength / 0x100000000);
    const lowLength = bitLength >>> 0;

    message.push(0x80);
    while (message.length % 64 !== 56) {
      message.push(0);
    }

    for (let shift = 24; shift >= 0; shift -= 8) {
      message.push((highLength >>> shift) & 0xff);
    }
    for (let shift = 24; shift >= 0; shift -= 8) {
      message.push((lowLength >>> shift) & 0xff);
    }

    for (let offset = 0; offset < message.length; offset += 64) {
      const words = new Array(64);

      for (let index = 0; index < 16; index += 1) {
        const position = offset + (index * 4);
        words[index] = (
          (message[position] << 24) |
          (message[position + 1] << 16) |
          (message[position + 2] << 8) |
          message[position + 3]
        ) >>> 0;
      }

      for (let index = 16; index < 64; index += 1) {
        const word15 = words[index - 15];
        const word2 = words[index - 2];
        const sigma0 = rotateRight(word15, 7) ^ rotateRight(word15, 18) ^ (word15 >>> 3);
        const sigma1 = rotateRight(word2, 17) ^ rotateRight(word2, 19) ^ (word2 >>> 10);
        words[index] = (words[index - 16] + sigma0 + words[index - 7] + sigma1) >>> 0;
      }

      let a = hash[0];
      let b = hash[1];
      let c = hash[2];
      let d = hash[3];
      let e = hash[4];
      let f = hash[5];
      let g = hash[6];
      let h = hash[7];

      for (let index = 0; index < 64; index += 1) {
        const bigSigma1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
        const choose = (e & f) ^ ((~e) & g);
        const first = (h + bigSigma1 + choose + constants[index] + words[index]) >>> 0;
        const bigSigma0 = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22);
        const majority = (a & b) ^ (a & c) ^ (b & c);
        const second = (bigSigma0 + majority) >>> 0;

        h = g;
        g = f;
        f = e;
        e = (d + first) >>> 0;
        d = c;
        c = b;
        b = a;
        a = (first + second) >>> 0;
      }

      hash[0] = (hash[0] + a) >>> 0;
      hash[1] = (hash[1] + b) >>> 0;
      hash[2] = (hash[2] + c) >>> 0;
      hash[3] = (hash[3] + d) >>> 0;
      hash[4] = (hash[4] + e) >>> 0;
      hash[5] = (hash[5] + f) >>> 0;
      hash[6] = (hash[6] + g) >>> 0;
      hash[7] = (hash[7] + h) >>> 0;
    }

    return hash.map(function hex(word) {
      return word.toString(16).padStart(8, "0");
    }).join("");
  }

  async function sha256(text) {
    if (window.crypto && window.crypto.subtle && typeof TextEncoder !== "undefined") {
      try {
        const bytes = new TextEncoder().encode(text);
        const digest = await window.crypto.subtle.digest("SHA-256", bytes);
        return Array.from(new Uint8Array(digest)).map(function toHex(byte) {
          return byte.toString(16).padStart(2, "0");
        }).join("");
      } catch (error) {
        // Non-secure local HTTP origins can expose crypto without a usable subtle API.
      }
    }

    return fallbackSha256(text);
  }

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function addOption(select, value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.append(option);
  }

  function humanize(value) {
    return value.replace(/-/g, " ").replace(/\b\w/g, function upper(character) {
      return character.toUpperCase();
    });
  }

  function sourceLink(sourceRef) {
    const source = sourceById[sourceRef.sourceId];
    const link = makeElement("a", "sourceLink", source ? source.title : sourceRef.sourceId);
    link.href = source ? source.uri : "#";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (sourceRef.locator) link.textContent += " — " + sourceRef.locator;
    return link;
  }

  function renderRecord(record) {
    const actor = entityById[record.actorId];
    const matter = matterById[record.matterId];
    const article = makeElement("article", "record");
    const top = makeElement("div", "recordTop");
    const title = makeElement("h3", "", actor ? actor.name : record.actorId);
    const badges = makeElement("div", "badges");
    const relationBadge = makeElement("span", "badge", record.predicateLabel);
    const classBadge = makeElement("span", "badge" + (record.factClass === "adjudicated-outcome" ? " outcome" : ""), humanize(record.factClass));

    badges.append(relationBadge, classBadge);
    top.append(title, badges);
    article.append(top);
    article.append(makeElement("p", "recordStatement", record.statement));
    article.append(makeElement("p", "recordMeta", (matter ? matter.shortTitle : record.matterId) + " · " + record.eventDate + " · side: " + record.actorSide));

    const sourceRow = makeElement("div", "sourceMeta");
    sourceRow.append("Source: ");
    record.sourceRefs.forEach(function appendSource(ref, index) {
      if (index > 0) sourceRow.append("; ");
      sourceRow.append(sourceLink(ref));
    });
    article.append(sourceRow);

    return article;
  }

  function selectedRecords() {
    const query = dom.searchInput.value.trim().toLowerCase();
    const subject = dom.subjectFilter.value;
    const matter = dom.matterFilter.value;
    const actorClass = dom.actorFilter.value;

    return data.assertions.filter(function matches(record) {
      const actor = entityById[record.actorId];
      const linkedMatter = matterById[record.matterId];
      const searchable = [
        actor && actor.name,
        linkedMatter && linkedMatter.title,
        linkedMatter && linkedMatter.docket,
        record.predicate,
        record.predicateLabel,
        record.statement,
        record.factClass,
        record.actorSide
      ].filter(Boolean).join(" ").toLowerCase();

      return (!query || searchable.includes(query)) &&
        (!subject || record.subjectIds.includes(subject)) &&
        (!matter || record.matterId === matter) &&
        (!actorClass || (actor && actor.classes.includes(actorClass)));
    });
  }

  function renderRecords() {
    const records = selectedRecords().slice().sort(function newestFirst(left, right) {
      return right.eventDate.localeCompare(left.eventDate) || left.id.localeCompare(right.id);
    });

    dom.records.replaceChildren.apply(dom.records, records.map(renderRecord));
    dom.resultCount.textContent = records.length + " of " + data.assertions.length + " records";
    dom.emptyState.hidden = records.length !== 0;
  }

  function renderSources() {
    const cards = data.sources.map(function renderSource(source) {
      const article = makeElement("article", "source");
      const top = makeElement("div", "sourceTop");
      const heading = makeElement("h3", "", source.title);
      const badges = makeElement("div", "badges");
      const typeClass = source.sourceClass === "commentary" ? "commentary" : "official";
      badges.append(makeElement("span", "badge " + typeClass, humanize(source.sourceClass)));
      if (source.evidenceUse === "context-only") {
        badges.append(makeElement("span", "badge commentary", "Context only"));
      }
      top.append(heading, badges);
      article.append(top);
      article.append(makeElement("p", "sourceMeta", source.publisher + (source.documentDate ? " · " + source.documentDate : "")));

      const link = makeElement("a", "", source.uri);
      link.href = source.uri;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      article.append(link);

      if (source.capture) {
        article.append(makeElement("code", "sourceHash", "sha256:" + source.capture.sha256 + " · " + source.capture.byteLength + " bytes · CID/txid pending"));
      } else {
        article.append(makeElement("span", "sourceHash", "No captured hash; excluded from factual evidence."));
      }

      return article;
    });

    dom.sources.replaceChildren.apply(dom.sources, cards);
  }

  function renderStats() {
    const officialSources = data.sources.filter(function isOfficial(source) {
      return source.sourceClass === "primary-official";
    }).length;
    const values = [
      ["Subjects", data.matters.reduce(function uniqueSubjects(ids, matter) {
        matter.subjectIds.forEach(function add(id) { ids.add(id); });
        return ids;
      }, new Set()).size],
      ["Matters", data.matters.length],
      ["Actors", new Set(data.assertions.map(function actor(record) { return record.actorId; })).size],
      ["Official sources", officialSources]
    ];

    const cards = values.map(function statCard(pair) {
      const card = makeElement("div", "stat");
      card.append(makeElement("span", "statLabel", pair[0]));
      card.append(makeElement("span", "statValue", String(pair[1])));
      return card;
    });
    dom.stats.replaceChildren.apply(dom.stats, cards);
  }

  function populateFilters() {
    const subjectIds = Array.from(new Set(data.matters.flatMap(function subjects(matter) {
      return matter.subjectIds;
    })));
    subjectIds.sort(function byName(left, right) {
      return entityById[left].name.localeCompare(entityById[right].name);
    }).forEach(function addSubject(id) {
      addOption(dom.subjectFilter, id, entityById[id].name);
    });

    data.matters.slice().sort(function byTitle(left, right) {
      return left.title.localeCompare(right.title);
    }).forEach(function addMatter(matter) {
      addOption(dom.matterFilter, matter.id, matter.shortTitle);
      addOption(dom.burnMatter, matter.id, matter.shortTitle);
    });

    const actorClasses = Array.from(new Set(data.entities.flatMap(function classes(entity) {
      return entity.classes;
    }))).sort();
    actorClasses.forEach(function addActorClass(actorClass) {
      addOption(dom.actorFilter, actorClass, humanize(actorClass));
    });
  }

  function semanticName(name) {
    return name.normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/-/g, "y")
      .replace(/[^A-Za-z0-9 ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toUpperCase();
  }

  function makeBurnPlan(matterId) {
    const matter = matterById[matterId];
    const records = data.assertions.filter(function forMatter(record) {
      return record.matterId === matterId;
    });
    const actorIds = Array.from(new Set(records.map(function actor(record) {
      return record.actorId;
    }).concat(matter.subjectIds)));
    const people = actorIds.map(function entity(id) { return entityById[id]; })
      .filter(function isPerson(entity) { return entity && entity.kind === "person"; })
      .sort(function byName(left, right) { return left.name.localeCompare(right.name); });
    const lines = [
      "# certLedger accountability burn plan",
      "# Semantic inputs only; verify generated addresses before signing.",
      "SCHEMA " + data.schemaVersion,
      "DATASET " + data.dataset.id + "@" + data.dataset.version,
      "OP_RETURN CL1|" + data.dataset.id + "|" + data.dataset.version + "|sha256:" + datasetHash,
      "",
      "# Matter / subject address input",
      "un DCx " + matter.semanticPhrase,
      "",
      "# Public person address inputs"
    ];

    people.forEach(function addPerson(person) {
      lines.push("un DAx " + semanticName(person.name));
    });

    lines.push(
      "",
      "# Populate after the canonical JSON is pinned",
      "un DDx CID_FIRST_HALF",
      "un DEx CID_SECOND_HALF",
      "",
      "# Append a later transaction referencing the prior txid for any correction or new disposition."
    );

    return lines.join("\n");
  }

  function updateBurnOutput() {
    dom.burnOutput.value = makeBurnPlan(dom.burnMatter.value);
  }

  async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (error) {
        // Fall through for file:// and non-secure local HTTP origins.
      }
    }

    const temporary = document.createElement("textarea");
    temporary.value = text;
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.append(temporary);
    temporary.select();
    document.execCommand("copy");
    temporary.remove();
  }

  function downloadCanonicalJson() {
    const blob = new Blob([canonicalJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = data.dataset.id + "-" + data.dataset.version + ".canonical.json";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function bindEvents() {
    [dom.searchInput, dom.subjectFilter, dom.matterFilter, dom.actorFilter].forEach(function bind(element) {
      element.addEventListener("input", renderRecords);
      element.addEventListener("change", renderRecords);
    });

    dom.downloadButton.addEventListener("click", downloadCanonicalJson);
    dom.burnButton.addEventListener("click", function openBurnDialog() {
      updateBurnOutput();
      if (typeof dom.burnDialog.showModal === "function") {
        dom.burnDialog.showModal();
      } else {
        dom.burnDialog.setAttribute("open", "");
      }
    });
    dom.burnMatter.addEventListener("change", updateBurnOutput);
    dom.copyBurnButton.addEventListener("click", async function copyBurnPlan() {
      await copyText(dom.burnOutput.value);
      const original = dom.copyBurnButton.textContent;
      dom.copyBurnButton.textContent = "Copied";
      window.setTimeout(function restoreLabel() {
        dom.copyBurnButton.textContent = original;
      }, 1200);
    });
  }

  async function initialize() {
    dom.schemaVersion.textContent = data.schemaVersion;
    dom.datasetId.textContent = data.dataset.id + "@" + data.dataset.version;
    populateFilters();
    renderStats();
    renderRecords();
    renderSources();
    bindEvents();

    canonicalJson = canonicalize(data);
    datasetHash = await sha256(canonicalJson);
    dom.datasetHash.textContent = datasetHash;
  }

  initialize().catch(function showFatal(error) {
    dom.datasetHash.textContent = "Error: " + error.message;
  });
})();
