(function publishAccountabilityDataset(global) {
  "use strict";

  const entities = [
    { id: "donald-j-trump", kind: "person", name: "Donald J. Trump", classes: ["subject", "public-official"] },
    { id: "d-john-sauer", kind: "person", name: "D. John Sauer", classes: ["lawyer"] },
    { id: "william-owen-scharf", kind: "person", name: "William Owen Scharf", classes: ["lawyer"] },
    { id: "michael-r-dreeben", kind: "person", name: "Michael R. Dreeben", classes: ["lawyer"] },
    { id: "john-g-roberts-jr", kind: "person", name: "John G. Roberts, Jr.", classes: ["judicial"] },
    { id: "clarence-thomas", kind: "person", name: "Clarence Thomas", classes: ["judicial"] },
    { id: "samuel-a-alito-jr", kind: "person", name: "Samuel A. Alito, Jr.", classes: ["judicial"] },
    { id: "neil-m-gorsuch", kind: "person", name: "Neil M. Gorsuch", classes: ["judicial"] },
    { id: "brett-m-kavanaugh", kind: "person", name: "Brett M. Kavanaugh", classes: ["judicial"] },
    { id: "amy-coney-barrett", kind: "person", name: "Amy Coney Barrett", classes: ["judicial"] },
    { id: "sonia-sotomayor", kind: "person", name: "Sonia Sotomayor", classes: ["judicial"] },
    { id: "elena-kagan", kind: "person", name: "Elena Kagan", classes: ["judicial"] },
    { id: "ketanji-brown-jackson", kind: "person", name: "Ketanji Brown Jackson", classes: ["judicial"] },

    { id: "warren-kenneth-paxton-jr", kind: "person", name: "Warren Kenneth Paxton, Jr.", classes: ["subject", "lawyer", "public-official"] },
    { id: "tony-buzbee", kind: "person", name: "Tony Buzbee", classes: ["lawyer"] },
    { id: "anthony-dolcefino", kind: "person", name: "Anthony Dolcefino", classes: ["lawyer"] },
    { id: "colby-holler", kind: "person", name: "Colby Holler", classes: ["lawyer"] },
    { id: "dan-cogdell", kind: "person", name: "Dan Cogdell", classes: ["lawyer"] },
    { id: "anthony-osso", kind: "person", name: "Anthony Osso", classes: ["lawyer"] },
    { id: "judd-e-stone-ii", kind: "person", name: "Judd E. Stone II", classes: ["lawyer"] },
    { id: "christopher-d-hilton", kind: "person", name: "Christopher D. Hilton", classes: ["lawyer"] },
    { id: "allison-m-collins", kind: "person", name: "Allison M. Collins", classes: ["lawyer"] },
    { id: "amy-s-hilton", kind: "person", name: "Amy S. Hilton", classes: ["lawyer"] },
    { id: "kateland-r-jackson", kind: "person", name: "Kateland R. Jackson", classes: ["lawyer"] },
    { id: "joseph-n-mazzara", kind: "person", name: "Joseph N. Mazzara", classes: ["lawyer"] },
    { id: "j-mitchell-little", kind: "person", name: "J. Mitchell Little", classes: ["lawyer"] },

    { id: "rusty-hardin", kind: "person", name: "Rusty Hardin", classes: ["lawyer"] },
    { id: "lara-hudgins-hollingsworth", kind: "person", name: "Lara Hudgins Hollingsworth", classes: ["lawyer"] },
    { id: "jennifer-brevorka", kind: "person", name: "Jennifer Brevorka", classes: ["lawyer"] },
    { id: "megan-moore", kind: "person", name: "Megan Moore", classes: ["lawyer"] },
    { id: "daniel-dutko", kind: "person", name: "Daniel Dutko", classes: ["lawyer"] },
    { id: "leah-m-graham", kind: "person", name: "Leah M. Graham", classes: ["lawyer"] },
    { id: "armstead-lewis", kind: "person", name: "Armstead Lewis", classes: ["lawyer"] },
    { id: "aisha-dennis", kind: "person", name: "Aisha Dennis", classes: ["lawyer"] },
    { id: "dick-deguerin", kind: "person", name: "Dick DeGuerin", classes: ["lawyer"] },
    { id: "mark-white-iii", kind: "person", name: "Mark White, III", classes: ["lawyer"] },
    { id: "harriet-oneill", kind: "person", name: "Harriet O’Neill", classes: ["lawyer"] },
    { id: "erin-m-epley", kind: "person", name: "Erin M. Epley", classes: ["lawyer"] },
    { id: "mark-e-donnelly", kind: "person", name: "Mark E. Donnelly", classes: ["lawyer"] },
    { id: "terese-buess", kind: "person", name: "Terese Buess", classes: ["lawyer"] },
    { id: "donna-cameron", kind: "person", name: "Donna Cameron", classes: ["lawyer"] },
    { id: "brian-benken", kind: "person", name: "Brian Benken", classes: ["lawyer"] },
    { id: "ross-garber", kind: "person", name: "Ross Garber", classes: ["lawyer"] },
    { id: "lisa-bowlin-hobbs", kind: "person", name: "Lisa Bowlin Hobbs", classes: ["lawyer"] },

    { id: "dan-patrick", kind: "person", name: "Dan Patrick", classes: ["public-official", "tribunal"] },
    { id: "lana-myers", kind: "person", name: "Lana Myers", classes: ["judicial", "tribunal"] },
    { id: "nathan-l-hecht", kind: "person", name: "Nathan L. Hecht", classes: ["judicial"] },
    { id: "texas-house-representatives", kind: "group", name: "Texas House of Representatives", classes: ["legislative"] },
    { id: "texas-senate-jury", kind: "group", name: "Qualified voting members of the Texas Senate", classes: ["tribunal"] }
  ];

  const matters = [
    {
      id: "us-scotus-23-939",
      subjectIds: ["donald-j-trump"],
      title: "Trump v. United States",
      shortTitle: "SCOTUS 23-939",
      forum: "Supreme Court of the United States",
      jurisdiction: "United States",
      docket: "23-939",
      openedDate: "2024-02-28",
      decisionDate: "2024-07-01",
      disposition: "Judgment of the D.C. Circuit vacated; case remanded.",
      semanticPhrase: "TRUMP V UNITED STATES SCOTUS 23y939"
    },
    {
      id: "tx-senate-paxton-impeachment-2023",
      subjectIds: ["warren-kenneth-paxton-jr"],
      title: "Texas Senate Court of Impeachment: Warren Kenneth Paxton, Jr.",
      shortTitle: "Paxton impeachment 2023",
      forum: "Texas Senate sitting as a Court of Impeachment",
      jurisdiction: "Texas",
      docket: "H.R. 2377 / S.R. 36, 88th Legislature",
      openedDate: "2023-05-27",
      decisionDate: "2023-09-16",
      disposition: "No tried article was sustained; Paxton was acquitted on those articles. Four held articles were dismissed without acquittal, and Paxton was reinstated.",
      semanticPhrase: "PAXTON IMPEACHMENT TEXAS 2023"
    }
  ];

  const sources = [
    {
      id: "scotus-opinion-23-939",
      title: "Trump v. United States, slip opinion",
      publisher: "Supreme Court of the United States",
      sourceClass: "primary-official",
      evidenceUse: "eligible",
      documentDate: "2024-07-01",
      uri: "https://www.supremecourt.gov/opinions/23pdf/23-939_e2pg.pdf",
      capture: {
        retrievedAt: "2026-09-11T07:46:57Z",
        sha256: "4cbb9bd0c0f023cd0273826e9481f16edd2ca942e5b378123d2478b66ef31746",
        byteLength: 531026,
        hashScope: "downloaded HTTP response body",
        ipfsCid: null,
        chainTxid: null
      }
    },
    {
      id: "scotus-docket-23-939",
      title: "Docket for No. 23-939",
      publisher: "Supreme Court of the United States",
      sourceClass: "primary-official",
      evidenceUse: "eligible",
      documentDate: null,
      uri: "https://www.supremecourt.gov/docket/docketfiles/html/public/23-939.html",
      capture: {
        retrievedAt: "2026-09-11T07:46:57Z",
        sha256: "36a485c1a87cb227857837d2d4c43196bf0590b0ce0eb46463b3f74ea9814535",
        byteLength: 132755,
        hashScope: "downloaded HTTP response body",
        ipfsCid: null,
        chainTxid: null
      }
    },
    {
      id: "fjc-gorsuch",
      title: "Gorsuch, Neil M.",
      publisher: "Federal Judicial Center",
      sourceClass: "primary-official",
      evidenceUse: "eligible",
      documentDate: null,
      uri: "https://www.fjc.gov/history/judges/gorsuch-neil-m",
      capture: {
        retrievedAt: "2026-09-11T07:46:57Z",
        sha256: "322746d60880f3dc2746c0192631160f7f4683b003031581f57f6e76aea7606d",
        byteLength: 46917,
        hashScope: "downloaded HTTP response body",
        ipfsCid: null,
        chainTxid: null
      }
    },
    {
      id: "fjc-kavanaugh",
      title: "Kavanaugh, Brett M.",
      publisher: "Federal Judicial Center",
      sourceClass: "primary-official",
      evidenceUse: "eligible",
      documentDate: null,
      uri: "https://www.fjc.gov/history/judges/kavanaugh-brett-m",
      capture: {
        retrievedAt: "2026-09-11T07:46:57Z",
        sha256: "33712f6d99e4312853d4c2fec1f05dc1107d043f894007d437a0e0e18216e9e7",
        byteLength: 47532,
        hashScope: "downloaded HTTP response body",
        ipfsCid: null,
        chainTxid: null
      }
    },
    {
      id: "fjc-barrett",
      title: "Barrett, Amy Coney",
      publisher: "Federal Judicial Center",
      sourceClass: "primary-official",
      evidenceUse: "eligible",
      documentDate: null,
      uri: "https://www.fjc.gov/history/judges/barrett-amy-coney",
      capture: {
        retrievedAt: "2026-09-11T07:46:57Z",
        sha256: "5ff2a9b3404d02c44ec063487dec0ea16017274ba465d043b94bacb88f2dbab0",
        byteLength: 46994,
        hashScope: "downloaded HTTP response body",
        ipfsCid: null,
        chainTxid: null
      }
    },
    {
      id: "tx-senate-impeachment-index",
      title: "Senate Court of Impeachment: Attorney General Warren Kenneth Paxton, Jr.",
      publisher: "Texas State Senate",
      sourceClass: "primary-official",
      evidenceUse: "eligible",
      documentDate: null,
      uri: "https://senate.texas.gov/coi.php",
      capture: {
        retrievedAt: "2026-09-11T07:46:57Z",
        sha256: "d9c91d353a752b8d69763b58c4d9db36ed0252a429d0cad525f23409b38498ce",
        byteLength: 78280,
        hashScope: "downloaded HTTP response body",
        ipfsCid: null,
        chainTxid: null
      }
    },
    {
      id: "tx-senate-paxton-transcript-v1-am",
      title: "Paxton impeachment trial transcript, Volume 1 AM",
      publisher: "Texas State Senate",
      sourceClass: "primary-official",
      evidenceUse: "eligible",
      documentDate: "2023-09-05",
      uri: "https://senate.texas.gov/_assets/coi/docs/2023-09-05-V1-AM-Final.pdf",
      capture: {
        retrievedAt: "2026-09-11T07:46:57Z",
        sha256: "a7a00c9006bdaac6ceb159cbb79fce9dd4a7493cff0fa476746aec5f965a1052",
        byteLength: 203293,
        hashScope: "downloaded HTTP response body",
        ipfsCid: null,
        chainTxid: null
      }
    },
    {
      id: "tx-senate-paxton-judgment",
      title: "Judgment, Court of Impeachment: Warren Kenneth Paxton, Jr.",
      publisher: "Texas State Senate",
      sourceClass: "primary-official",
      evidenceUse: "eligible",
      documentDate: "2023-09-16",
      uri: "https://senate.texas.gov/_assets/coi/docs/Judgment-Court-of-Impeachment-Warren-Kenneth-Paxton-Jr.pdf",
      capture: {
        retrievedAt: "2026-09-11T07:46:57Z",
        sha256: "1aac3af4c317c82cf8804d9434bff9ec7cb5689017a0735b3c547945679a497b",
        byteLength: 1384982,
        hashScope: "downloaded HTTP response body",
        ipfsCid: null,
        chainTxid: null
      }
    },
    {
      id: "hcr-politics-chat-2026-09-10",
      title: "Politics Chat, September 10, 2026",
      publisher: "Heather Cox Richardson / YouTube",
      sourceClass: "commentary",
      evidenceUse: "context-only",
      documentDate: "2026-09-10",
      uri: "https://www.youtube.com/watch?v=MThDbwLkwHs",
      capture: null
    }
  ];

  const assertions = [
    {
      id: "scotus-23-939-disposition",
      subjectIds: ["donald-j-trump"],
      matterId: "us-scotus-23-939",
      actorId: "john-g-roberts-jr",
      predicate: "authored_court_opinion",
      predicateLabel: "authored Court opinion",
      actorSide: "tribunal",
      factClass: "adjudicated-outcome",
      eventDate: "2024-07-01",
      statement: "Chief Justice Roberts authored the opinion vacating the D.C. Circuit judgment and remanding the case.",
      sourceRefs: [
        { sourceId: "scotus-opinion-23-939", locator: "syllabus p. 8; opinion p. 1" }
      ]
    },
    {
      id: "scotus-23-939-immunity-holding",
      subjectIds: ["donald-j-trump"],
      matterId: "us-scotus-23-939",
      actorId: "john-g-roberts-jr",
      predicate: "stated_court_holding",
      predicateLabel: "stated Court holding",
      actorSide: "tribunal",
      factClass: "adjudicated-outcome",
      eventDate: "2024-07-01",
      statement: "The Court held that a former President has absolute immunity for conduct within exclusive constitutional authority, at least presumptive immunity for official acts, and no immunity for unofficial acts.",
      sourceRefs: [
        { sourceId: "scotus-opinion-23-939", locator: "syllabus pp. 1-8" }
      ]
    },
    {
      id: "scotus-23-939-sauer-argued",
      subjectIds: ["donald-j-trump"],
      matterId: "us-scotus-23-939",
      actorId: "d-john-sauer",
      predicate: "argued_for",
      predicateLabel: "argued for petitioner",
      actorSide: "subject",
      factClass: "procedural-fact",
      eventDate: "2024-04-25",
      statement: "D. John Sauer argued for petitioner Donald J. Trump.",
      sourceRefs: [
        { sourceId: "scotus-docket-23-939", locator: "April 25, 2024 argument entry; Attorneys for Petitioners" }
      ]
    },
    {
      id: "scotus-23-939-scharf-attorney",
      subjectIds: ["donald-j-trump"],
      matterId: "us-scotus-23-939",
      actorId: "william-owen-scharf",
      predicate: "attorney_for",
      predicateLabel: "attorney for petitioner",
      actorSide: "subject",
      factClass: "procedural-fact",
      eventDate: "2024-04-25",
      statement: "The Supreme Court docket lists William Owen Scharf as an attorney for petitioner Donald J. Trump.",
      sourceRefs: [
        { sourceId: "scotus-docket-23-939", locator: "Attorneys for Petitioners" }
      ]
    },
    {
      id: "scotus-23-939-dreeben-argued",
      subjectIds: ["donald-j-trump"],
      matterId: "us-scotus-23-939",
      actorId: "michael-r-dreeben",
      predicate: "argued_against",
      predicateLabel: "argued for respondent",
      actorSide: "opposing",
      factClass: "procedural-fact",
      eventDate: "2024-04-25",
      statement: "Michael R. Dreeben argued for respondent United States.",
      sourceRefs: [
        { sourceId: "scotus-docket-23-939", locator: "April 25, 2024 argument entry; Attorneys for Respondents" }
      ]
    }
  ];

  function addScotusParticipation(actorId, predicate, predicateLabel, statement) {
    assertions.push({
      id: "scotus-23-939-" + actorId + "-" + predicate.replace(/_/g, "-"),
      subjectIds: ["donald-j-trump"],
      matterId: "us-scotus-23-939",
      actorId: actorId,
      predicate: predicate,
      predicateLabel: predicateLabel,
      actorSide: "tribunal",
      factClass: "adjudicated-outcome",
      eventDate: "2024-07-01",
      statement: statement,
      sourceRefs: [
        { sourceId: "scotus-opinion-23-939", locator: "syllabus p. 8" }
      ]
    });
  }

  addScotusParticipation("clarence-thomas", "joined_in_full", "joined Court opinion in full", "Justice Thomas joined the Court opinion in full and filed a concurring opinion.");
  addScotusParticipation("samuel-a-alito-jr", "joined_in_full", "joined Court opinion in full", "Justice Alito joined the Court opinion in full.");
  addScotusParticipation("neil-m-gorsuch", "joined_in_full", "joined Court opinion in full", "Justice Gorsuch joined the Court opinion in full.");
  addScotusParticipation("brett-m-kavanaugh", "joined_in_full", "joined Court opinion in full", "Justice Kavanaugh joined the Court opinion in full.");
  addScotusParticipation("amy-coney-barrett", "joined_in_part", "joined except Part III-C", "Justice Barrett joined the Court opinion except Part III-C and filed an opinion concurring in part.");
  addScotusParticipation("sonia-sotomayor", "dissented", "filed dissent", "Justice Sotomayor filed a dissenting opinion joined by Justices Kagan and Jackson.");
  addScotusParticipation("elena-kagan", "joined_dissent", "joined Sotomayor dissent", "Justice Kagan joined Justice Sotomayor’s dissenting opinion.");
  addScotusParticipation("ketanji-brown-jackson", "dissented", "joined and separately dissented", "Justice Jackson joined Justice Sotomayor’s dissent and filed a separate dissenting opinion.");

  function addNomination(actorId, sourceId, date, name) {
    assertions.push({
      id: actorId + "-nominated-by-trump",
      subjectIds: ["donald-j-trump"],
      matterId: "us-scotus-23-939",
      actorId: actorId,
      predicate: "nominated_by_subject",
      predicateLabel: "nominated by Donald J. Trump",
      actorSide: "appointment-history",
      factClass: "procedural-fact",
      eventDate: date,
      statement: name + " was nominated to the Supreme Court by President Donald J. Trump.",
      sourceRefs: [
        { sourceId: sourceId, locator: "Federal Judicial Service" }
      ]
    });
  }

  addNomination("neil-m-gorsuch", "fjc-gorsuch", "2017-02-01", "Neil M. Gorsuch");
  addNomination("brett-m-kavanaugh", "fjc-kavanaugh", "2018-07-10", "Brett M. Kavanaugh");
  addNomination("amy-coney-barrett", "fjc-barrett", "2020-09-29", "Amy Coney Barrett");

  assertions.push(
    {
      id: "paxton-house-adopted-articles",
      subjectIds: ["warren-kenneth-paxton-jr"],
      matterId: "tx-senate-paxton-impeachment-2023",
      actorId: "texas-house-representatives",
      predicate: "matter_history",
      predicateLabel: "matter history",
      actorSide: "opposing",
      factClass: "procedural-fact",
      eventDate: "2023-05-27",
      statement: "The Texas House adopted twenty articles of impeachment against Warren Kenneth Paxton, Jr.; the Senate later convened as a Court of Impeachment.",
      sourceRefs: [
        { sourceId: "tx-senate-impeachment-index", locator: "Court of Impeachment overview" }
      ]
    },
    {
      id: "paxton-impeachment-final-judgment",
      subjectIds: ["warren-kenneth-paxton-jr"],
      matterId: "tx-senate-paxton-impeachment-2023",
      actorId: "texas-senate-jury",
      predicate: "rendered_judgment",
      predicateLabel: "rendered final judgment",
      actorSide: "tribunal",
      factClass: "adjudicated-outcome",
      eventDate: "2023-09-16",
      statement: "No tried article was sustained; Paxton was acquitted on those articles. Four articles held in abeyance were dismissed without an acquittal, and Paxton was reinstated as Attorney General.",
      sourceRefs: [
        { sourceId: "tx-senate-paxton-judgment", locator: "pp. 1-2" }
      ]
    },
    {
      id: "paxton-dan-patrick-presided",
      subjectIds: ["warren-kenneth-paxton-jr"],
      matterId: "tx-senate-paxton-impeachment-2023",
      actorId: "dan-patrick",
      predicate: "presided_over",
      predicateLabel: "presided over proceeding",
      actorSide: "tribunal",
      factClass: "procedural-fact",
      eventDate: "2023-09-05",
      statement: "Lieutenant Governor Dan Patrick served as presiding officer of the Senate Court of Impeachment.",
      sourceRefs: [
        { sourceId: "tx-senate-paxton-transcript-v1-am", locator: "transcript pp. 1, 8-10" }
      ]
    },
    {
      id: "paxton-lana-myers-jurist",
      subjectIds: ["warren-kenneth-paxton-jr"],
      matterId: "tx-senate-paxton-impeachment-2023",
      actorId: "lana-myers",
      predicate: "served_as_counsel_and_jurist",
      predicateLabel: "served as legal counsel and jurist",
      actorSide: "tribunal",
      factClass: "procedural-fact",
      eventDate: "2023-09-05",
      statement: "Judge Lana Myers was sworn to perform the duties of legal counsel and jurist in the impeachment.",
      sourceRefs: [
        { sourceId: "tx-senate-paxton-transcript-v1-am", locator: "transcript pp. 10-11" }
      ]
    },
    {
      id: "paxton-nathan-hecht-oath",
      subjectIds: ["warren-kenneth-paxton-jr"],
      matterId: "tx-senate-paxton-impeachment-2023",
      actorId: "nathan-l-hecht",
      predicate: "administered_oaths",
      predicateLabel: "administered tribunal oaths",
      actorSide: "tribunal",
      factClass: "procedural-fact",
      eventDate: "2023-09-05",
      statement: "Chief Justice Nathan L. Hecht administered oaths to Dan Patrick and Judge Lana Myers; this record does not classify him as an adjudicator in the trial.",
      sourceRefs: [
        { sourceId: "tx-senate-paxton-transcript-v1-am", locator: "transcript pp. 9-11" }
      ]
    }
  );

  const paxtonDefenseIds = [
    "tony-buzbee", "anthony-dolcefino", "colby-holler", "dan-cogdell", "anthony-osso",
    "judd-e-stone-ii", "christopher-d-hilton", "allison-m-collins", "amy-s-hilton",
    "kateland-r-jackson", "joseph-n-mazzara", "j-mitchell-little"
  ];

  const houseCounselIds = [
    "rusty-hardin", "lara-hudgins-hollingsworth", "jennifer-brevorka", "megan-moore",
    "daniel-dutko", "leah-m-graham", "armstead-lewis", "aisha-dennis", "dick-deguerin",
    "mark-white-iii", "harriet-oneill", "erin-m-epley", "mark-e-donnelly", "terese-buess",
    "donna-cameron", "brian-benken", "ross-garber", "lisa-bowlin-hobbs"
  ];

  const entityById = Object.fromEntries(entities.map(function pair(entity) {
    return [entity.id, entity];
  }));

  function addPaxtonAppearance(actorId, side, predicate, label) {
    assertions.push({
      id: "paxton-impeachment-" + actorId + "-appearance",
      subjectIds: ["warren-kenneth-paxton-jr"],
      matterId: "tx-senate-paxton-impeachment-2023",
      actorId: actorId,
      predicate: predicate,
      predicateLabel: label,
      actorSide: side,
      factClass: "procedural-fact",
      eventDate: "2023-09-05",
      statement: entityById[actorId].name + (side === "subject" ? " appeared for the Attorney General." : " appeared for the Texas House Board of Managers."),
      sourceRefs: [
        { sourceId: "tx-senate-paxton-transcript-v1-am", locator: side === "subject" ? "appearance pp. 3-4" : "appearances pp. 1-3" }
      ]
    });
  }

  paxtonDefenseIds.forEach(function addDefense(actorId) {
    addPaxtonAppearance(actorId, "subject", "appeared_for_subject", "appeared for Paxton");
  });

  houseCounselIds.forEach(function addHouseCounsel(actorId) {
    addPaxtonAppearance(actorId, "opposing", "appeared_for_house_managers", "appeared for House managers");
  });

  global.CERTLEDGER_ACCOUNTABILITY = {
    schemaVersion: "certledger-accountability/1.0.0",
    dataset: {
      id: "public-law-us-v1",
      version: "0.1.0",
      title: "Public-law accountability records",
      createdAt: "2026-09-11T07:46:57Z",
      description: "Append-only, source-bounded records of public professional acts and legal outcomes.",
      rules: [
        "Inclusion is not a finding of wrongdoing or endorsement.",
        "Every assertion requires a public source and a precise locator.",
        "Allegations, procedural acts, adjudicated outcomes, corrections, and exonerations are distinct records.",
        "Corrections append and reference earlier records; published history is not silently rewritten.",
        "Commentary may explain why a matter was collected but cannot prove a factual assertion.",
        "Do not publish private addresses, personal phone numbers, family information, or unsupported motive claims."
      ]
    },
    matters: matters,
    entities: entities,
    sources: sources,
    assertions: assertions
  };
})(window);
