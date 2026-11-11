import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { storageGet, storageSet } from "../../lib/storage";

const PROGRESS_KEY = "wh_leveling_progress";

export const Route = createFileRoute("/guides/leveling")({
  component: LevelingGuide,
});

interface Act {
  num: number;
  title: string;
  subtitle: string;
  level: string;
  town: string;
  notes?: Array<ReactNode>;
  bossNote?: ReactNode;
  steps?: Array<string>;
}

const TERM_KIND: Record<string, string> = {};
const addTerms = (kind: string, terms: Array<string>) => {
  for (const t of terms) TERM_KIND[t] = kind;
};

addTerms("wh-t-boss", [
  "Hillock",
  "General Gravicius",
  "Dominus",
  "Piety",
  "Hailrake",
  "Deep Dweller",
  "Brutus",
  "Fairgraves",
  "Merveil",
  "The Great White Beast",
  "Fidelitas",
  "Archbishop Geofri the Abashed",
  "Kraityn",
  "The Weaver",
  "Oak",
  "Alira",
  "Vaal Oversoul",
  "Blackguards",
]);
addTerms("wh-t-npc", [
  "Tarkleigh",
  "Nessa",
  "Bestel",
  "Gruest",
  "Yeena",
  "Slik",
  "Clarissa",
  "Lady Dialla",
  "Hargan",
  "Grigor",
  "Maramoa",
  "Siosa",
]);

// Looted quest items share the NPC green in the source guides.
addTerms("wh-t-quest", [
  "Fidelitas\u2019 Spike",
  "Baleful Gem",
  "Golden Hand",
  "Maligaro\u2019s Spike",
  "Thaumetic Emblem",
  "Tolman\u2019s Bracelet",
  "Sewer Keys",
  "Ribbon Spool",
  "Thaumetic Sulphite",
  "Infernal Talc",
  "Tower Key",
  "Golden Pages",
]);
addTerms("wh-t-lab", ["Labyrinth Trial"]);
addTerms("wh-t-item", [
  "Waypoint",
  "waypoint",
  "Platinum Busts",
  "Supply Container",
  "Blackguard Chest",
  "Undying Blockage",
  "Loose Candle",
  "Sewer Grating",
  "Tolman",
  "Ammonite Glyph",
  "Haliotis Glyph",
  "Roseus Glyph",
  "Book of Skill",
  "Strange Device",
  "Thaumetic Seal",
  "Quicksilver Flask",
]);
addTerms("wh-t-zone", [
  "Twilight Strand",
  "Lioneye\u2019s Watch",
  "Coast",
  "Mud Flats",
  "Submerged Passage",
  "Tidal Island",
  "Flooded Depths",
  "Ledge",
  "Climb",
  "Lower Prison",
  "Upper Prison",
  "Warden\u2019s Quarters",
  "Warden\u2019s Chambers",
  "Prisoner\u2019s Gate",
  "Ship Graveyard Cave",
  "Ship Graveyard",
  "Cavern of Wrath",
  "Cavern of Anger",
  "Merveil\u2019s Lair",
  "Southern Forest",
  "Forest Encampment",
  "The Old Fields",
  "The Den",
  "The Crossroads",
  "The Chamber of Sins Level 1",
  "The Chamber of Sins Level 2",
  "The Fellshrine Ruins",
  "The Crypt Level 1",
  "The Crypt Level 2",
  "The Broken Bridge",
  "The Riverways",
  "The Western Forest",
  "The Weavers Chambers",
  "The Weavers Chamber",
  "The Wetlands",
  "The Vaal Ruins",
  "The Northern Forest",
  "The Caverns",
  "The Dread Thicket",
  "The Ancient Pyramid",
  "The Pyramid Apex",
  "The City of Sarn",
  "The Sarn Encampment",
  "Slums",
  "Crematorium",
  "Marketplace",
  "Catacombs",
  "Battlefront",
  "The Docks",
  "Solaris Temple (Level One)",
  "Solaris Temple (Level Two)",
  "Solaris Temple",
  "Lunaris Temple (Level One)",
  "Lunaris Temple (Level Two)",
  "Lunaris Temple",
  "Ebony Barracks",
  "Imperial Gardens",
  "The Archives",
  "Library",
  "Upper Sceptre of God",
  "Sceptre of God",
  "Aqueduct",
  "Highgate",
  "Sewers",
]);

// Longest first so "Ship Graveyard Cave" wins over "Ship Graveyard".
const TERM_RE = new RegExp(
  `(${Object.keys(TERM_KIND)
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "g",
);

function highlight(text: string) {
  return text.split(TERM_RE).map((part, i) =>
    TERM_KIND[part] ? (
      // eslint-disable-next-line react/no-array-index-key
      <span key={i} className={TERM_KIND[part]}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

const ACTS: Array<Act> = [
  {
    num: 1,
    title: "The Twilight Strand to Merveil",
    subtitle: "Washed up on the Karui shore",
    level: "Lv 1–12",
    town: "Lioneye's Watch",
    steps: [
      "Kill Hillock at the end of The Twilight Strand.",
      "Enter Lioneye\u2019s Watch and talk to Tarkleigh for Cleave/Molten Strike/Galvanic Arrow/Perforate/Splitting Steel",
      'Buy Spectral throw for 1 wisdom. Buy 3 link, axe, moveboots. Use this regex "poa|ge on f|cis|atr|od rag|^spectral t|akn|dati|d win|ess su|^trin|stbl|^hast|lix|bush$|^ancestral ca|c st|ld ch|^melee p|f ash$|bat s|^mom|-[rgbw]-|Runn|rint|s:.+ax"',
      "Enter The Coast and run to the end of the zone. Make sure you take the Waypoint. Enter The Mud Flats.",
      "Find 3 Rhoa Nests for Ammonite, Haliotis, and Roseus Glyphs. Find the glyph wall and go to The Submerged Passage. Enter and grab the Waypoint.",
      "Waypoint back to The Coast and enter the Tidal Island. Run straight to Hailrake and kill him. Log out, turn the quest in with Nessa for Quicksilver Flask and Volley",
      "Talk to Tarkleigh for sniper's mark (sniper's mark/decoy totem/puncture/vigilant strike/war banner/blood and sand/crushing fist) and shield charge. Buy Dash.",
      "Nessa buy Momentum for 1 wisdom and dash (optional for 1 wisdom). Equip shield charge + momentum. Equip spectral axe + bleed + volley",
      "Waypoint to The Submerged Passage. If you come across the Flooded Depths entrance, drop a portal for a quick return later.",
      "Find the exit to The Ledge.",
      "Grab the Waypoint and carry on to the exit to The Climb.",
      "Run all the way through The Climb, taking the Waypoint if you pass it.",
      "Enter The Lower Prison and grab the Waypoint.",
      "Waypoint to Lioneye\u2019s Watch \u2014 if you were quick, your portal is still open. Otherwise Waypoint to the Flooded Depths.",
      "Find the Flooded Depths entrance. It is usually towards the early part of the map.",
      "Kill the Deep Dweller, then log out.",
      "Talk to Tarkleigh for the Book of Skill, then Waypoint to The Lower Prison.",
      "Find the Labyrinth Trial and complete it.",
      "Locate the exit to The Upper Prison.",
      "Find the exit to The Warden\u2019s Quarters and head straight for The Warden\u2019s Chambers.",
      "Kill Brutus. Log out or portal back to town.",
      "Nessa for faster attack (added fire, melee splash, multiple proj, maim, lifetap). Nessa buy sapphire ring and mana pot. Tarkleigh for Leap Slam and Book of Skill",
      "Waypoint back to Prisoner\u2019s Gate.",
      "Exit into The Ship Graveyard and grab Waypoint \u2014 near the zone entrance.",
      "If find Cavern of Wrath, go in grab Waypoint and back to The Ship Graveyard. Find Ship Graveyard Cave entrance.",
      "Retrieve the Allflame and head back out into The Ship Graveyard.",
      "Talk to Fairgraves and kill him.",
      "If haven't found Find Cavern of Wrath, find it and grab the Waypoint.",
      "Waypoint back to Lioneye\u2019s Watch. Talk to Bestel for the Book of Skill.",
      "Turn in Siren's Cadence to Nessa for not needed gem (Lacerate, Holy Sweep, Rain of Arrows, Shattering Steel, Earthshatter). Buy Lapis Amulet, 2 Sapphire Rings, Ancestral Call, Ruthless, Frost Blink, Static Strike, Intimidating Cry, Spectral Helix",
      "Link Spectral Helix + Chance to Bleed, Static Strike + Ruthless + Ancestral Call. Leap Slam + Faster Attack + Momemtum. Equip Frost Blink and Intimidating Cry",
      "Waypoint to The Cavern of Wrath.",
      "Exit into The Cavern of Anger.",
      "Exit into Merveil\u2019s Lair.",
      "Kill Merveil and enter The Southern Forest.",
      "Run through the zone and enter The Forest Encampment \u2014 continue on the Act 2 tab.",
    ],
  },
  {
    num: 2,
    title: "The Old Fields to the Vaal Oversoul",
    subtitle: "Bandits, the Weaver, and the road to Sarn",
    level: "Lv 12\u201322",
    town: "The Forest Encampment",
    steps: [
      //continue from 31:51
      "Yeena to identify and sell items. Gamble at level 9 for Jade Chopper or 13 or 18 or 23. Take the exit on the right to The Old Fields.",
      "For 2nd Quicksilver Flask, look for The Den, kill The Great White Beast, and take the exit behind it back to The Old Fields. ",
      "Otherwise skip the zone and head for The Crossroads. Follow the road to find the waypoint.",
      "Take the left path to The Chamber of Sins Level 1 and grab Waypoint",
      "Descend to The Chamber of Sins Level 2. Complete Labyrith Trial and grab the Waypoint.",
      "Run to the end, kill Fidelitas, loot the Fidelitas\u2019 Spike he drops, click the Strange Device, loot the Baleful Gem, then log out/waypoint.",
      "Turn in Intruders in Black to Gruest for Herald of Ash, buy Blood Rage from Yeena and teleport back to The Crossroads.",
      "Go to the right towards Fellshrine Ruins and find the entrance to The Crypt Level 1.",
      "Complete the Labyrinth Trial, then continue to The Crypt Level 2.",
      "Locate Archbishop Geofri the Abashed \u2014 and skip him, click the altar behind him for the Golden Hand. Loot it and log out/Waypoint.",
      "Turn in Through Scared Ground to Yeena for Book of Skill and teleport back to The Crossroads.",
      "Go straight ahead into The Broken Bridge. Run the zone, deal with Kraityn (kill or help him), then log out/portal to town",
      "Take the exit on the left to The Riverways. Follow the road, pick up the waypoint, and keep following the road to the exit to The Western Forest.",
      "Head down the path until you locate the waypoint. On opposite side of waypoint/the side waypoint is not on, run into the forest, look for the wall of trees covered in spider webs, and follow it to The Weavers Chambers entrance.",
      "Go through The Weavers Chamber, kill The Weaver, pick up Maligaro\u2019s Spike, then log out/portal to town.",
      "Turn in Sharp and Cruel to Slik for Melee Phys. Buy Close Combat from Yeena and replace Ruthless with it, also buy Precision. Teleport back to The Riverways.",
      "Run through the 2 pillars and keep going that way to find The Wetlands.",
      "Kill Oak. Find the waypoint and take it back to The Western Forest.",
      "On the side of the road the waypoint is on, along the wall of the map, you will find Alira in her camp and help her",
      "Follow the wall left until you find the icon Ateri's Letter on map and camp of the Blackguards. Kill their leader, pick up the Thaumetic Emblem, use it on the Thaumetic Seal, then log out/portal to town",
      "Waypoint to Act 1 town and collect your Skill Book reward from Bestel. Buy Precision from Yeena. Teleport to The Wetlands.",
      "Poison the roots and enter The Vaal Ruins. Break the seal once you reach it and exit into The Northern Forest.",
      "Head upwards through The Northern Forest until you find The Caverns. Skip The Dread Thicket.",
      "Grab the waypoint once you come across it.",
      "When get Attack Mastery non-vaal skills strike 1 more target, replace Ancestral call with Melee Phys",
      "Locate the entrance to The Ancient Pyramid and enter.",
      "Climb the levels of the Pyramid until you reach The Pyramid Apex.",
      "Slay the Vaal Oversoul and exit into The City of Sarn.",
      "Find the Blackguards harassing Clarissa and kill them all to rescue her. Wait until she is on her feet, and speak to her before running off.",
      "Follow the little staircase directly below Clarissa and follow the water\u2019s edge until you reach The Sarn Encampment \u2014 continue on the Act 3 tab.",
    ],
  },
  {
    num: 3,
    title: "The Slums to Dominus",
    subtitle: "Sewers, temples, and the climb up the Sceptre of God",
    level: "Lv 22\u201333",
    town: "The Sarn Encampment",
    steps: [
      "Exit into the Slums.",
      "Find the Crematorium and grab the waypoint. Take note of where the Sewer Grating was if you passed one on the way.",
      "Find the Labyrinth Trial inside the Crematorium and complete it.",
      "Find Piety and defeat her. Interact with Tolman and take Tolman\u2019s Bracelet.",
      "Log out or portal to town. Speak with Clarissa to receive the Sewer Keys.",
      "Enter the Slums and find the Sewer Grating. Open it and enter the Sewers.",
      "Locate the three Platinum Busts. There is always one before the waypoint and two after it.",
      "Find the exit into the Marketplace.",
      "Grab the waypoint.",
      "To the right of the waypoint is the entrance to the Catacombs. Enter and complete the Labyrinth Trial, then log out and return to the Marketplace via waypoint.",
      "Locate the exit to the Battlefront.",
      "Find the waypoint, which is generally in the centre of the zone.",
      "Head downwards from the waypoint until you find the Blackguard Chest, which looks like a cart, and take the Ribbon Spool from it.",
      "Head left from the waypoint until you find the entrance to The Docks.",
      "Optional: depending on how far behind you are on levels, kill as many monsters as you can in the docks to catch up to the zone level.",
      "Locate the Supply Container and loot the Thaumetic Sulphite, then log out.",
      "Take the waypoint back to Battlefront and head upwards until you locate the entrance to the Solaris Temple (Level One).",
      "Proceed through the temple until you find the entrance to the Solaris Temple (Level Two).",
      "Continue through the temple until you find the waypoint.",
      "Talk to Lady Dialla to receive an Amulet reward and the Infernal Talc.",
      "Log out or portal to town, then talk to Hargan to receive the Book of Skill.",
      "Take the waypoint to the Sewers.",
      "Go down/left from the waypoint and burn away the Undying Blockage. This is always extremely close to the waypoint.",
      "Enter the Ebony Barracks and acquire the waypoint.",
      "Head upwards through the Ebony Barracks until you find General Gravicius.",
      "Kill General Gravicius and continue heading upwards.",
      "Enter the Lunaris Temple (Level One).",
      "Grab the waypoint and enter the Lunaris Temple (Level Two).",
      "Look for ascending staircases to find the correct path quickly. Continue following the staircases until you reach the carts. The side with two carts is always a dead end, while the single-cart side is the correct path.",
      "Keep ascending through the temple until you reach Piety at the top.",
      "Kill Piety and loot the Tower Key.",
      "Return to town and talk to Grigor to receive the Book of Skill. Speak with Maramoa to receive the gem reward.",
      "Take the waypoint to the Ebony Barracks.",
      "Head to the right of the waypoint until you find the entrance to the Imperial Gardens.",
      "Follow the tiled path until you find the waypoint.",
      "Optional: if you need specific gems from the Library quest, take the upper left path at the three way fork, up the stairs. Enter the Library and grab the waypoint halfway through the area. Continue until you find the Loose Candle. Click on it and enter The Archives. Collect the four Golden Pages before returning to town via portal or logout. Take the waypoint back to the Library and speak to Siosa for your reward. Take the waypoint back to the Imperial Gardens.",
      "Complete the final Labyrinth Trial for the Normal Lab. From the three way fork just above the waypoint, head upwards and slowly snake your way to the left. The Labyrinth Trial is almost always found in the uppermost left corner of the area.",
      "From the three way fork above the waypoint, head to the lower right and up the stairs. Start heading to the upper right, following the tiled path until you find the entrance to the Sceptre of God.",
      "Enter the Sceptre of God and ascend the levels until you find the Upper Sceptre of God.",
      "Enter the Upper Sceptre of God and ascend the levels.",
      "Kill Dominus.",
      "Enter the Aqueduct and make your way through the area.",
      "Enter Highgate \u2014 continue on the Act 4 tab.",
    ],
  },
  {
    num: 4,
    title: "Highgate to Malachai",
    subtitle: "The difficulty wall — and the Labyrinth",
    level: "Lv 33–40",
    town: "Highgate",
    notes: [
      "Act 4 is the first real damage and defence check. If something feels impossible here, your gear is behind, not your build.",
      "The six Trials of Ascendancy are spread across Acts 1–3 and finish here — clearing them opens the Labyrinth and your first Ascendancy points. Do it; the power jump is large.",
      "Kaom and Daresso are mandatory on the way to Malachai, and each drops a quest item.",
    ],
    bossNote: (
      <>
        <b>Boss note:</b> Malachai&apos;s beam tracks you — keep moving instead
        of stopping to attack, and expect a final phase where the arena itself
        damages you.
      </>
    ),
  },
  {
    num: 5,
    title: "Oriath and the first Kitava fight",
    subtitle: "Short act, big resistance penalty at the end",
    level: "Lv 40–45",
    town: "Overseer’s Tower",
    notes: [
      "Shortest act on the list. You fight Kitava and lose by design — do not overspend on gear right before it.",
      "Finishing Act 5 applies a −30% penalty to all elemental resistances. Budget for it: what felt comfortable in Act 5 will not in Act 6.",
      "Natural checkpoint for a passive respec if your leveling tree drifted from your final build.",
    ],
    bossNote: (
      <>
        <b>Boss note:</b> Kitava here is a survival check, not a damage check.
        Innocence, earlier in the act, is the one that actually kills people —
        his beams sweep the arena in a fixed pattern.
      </>
    ),
  },
  {
    num: 6,
    title: "Back to the Twilight Strand",
    subtitle: "The same coastline, corrupted",
    level: "Lv 45–50",
    town: "Lioneye's Watch",
    notes: [
      "You retrace Act 1 geography with much tougher packs and a second wave of gem quest rewards.",
      "Fix your resistances first thing — the Act 5 penalty just landed and this is where it bites.",
      "League side content (beasts, temples, mines, and similar) starts appearing — optional, but quick detours pay in currency and crafting material.",
    ],
    bossNote: (
      <>
        <b>Boss note:</b> Shavronne in the Prison and the Brine King at the end
        are both heavy on ground effects — keep an eye on the floor more than
        the health bar.
      </>
    ),
  },
  {
    num: 7,
    title: "The Bridge Encampment to the Temple of Decay",
    subtitle: "Act 2 territory, now with teeth",
    level: "Lv 50–55",
    town: "The Bridge Encampment",
    notes: [
      "Maligaro in the Chamber of Sins and Gruthkul in the Ashen Fields are both quest bosses with rewards attached.",
      "The Dread Thicket is a dark, dense zone — light the fireflies before fighting, not during.",
      "Keep resistances capped as you go; the gap between a capped and an uncapped character widens sharply from here.",
    ],
    bossNote: (
      <>
        <b>Boss note:</b> Arakaali in the Temple of Decay summons adds
        constantly — clear the adds or your damage will never land on her.
      </>
    ),
  },
  {
    num: 8,
    title: "The Sarn Ramparts to the Blood Aqueduct",
    subtitle: "Three named bosses in one act",
    level: "Lv 55–60",
    town: "The Sarn Encampment",
    notes: [
      "Doedre, Solaris, and Lunaris are all mandatory. Solaris and Lunaris flip between physical and elemental damage mid-fight.",
      "The Blood Aqueduct at the end is a well-known leveling zone — worth a few extra runs if you are under-leveled for Act 9.",
      "Another batch of gem quest rewards lands here; re-check whether a better support is now available to you.",
    ],
    bossNote: (
      <>
        <b>Boss note:</b> Doedre channels from a fixed spot while her adds do
        the work — kill the adds, then burst her down.
      </>
    ),
  },
  {
    num: 9,
    title: "The Descent to the Rotting Core",
    subtitle: "Short, harsh, and the last stop before Oriath",
    level: "Lv 60–64",
    town: "The Highgate (Oasis)",
    notes: [
      "By the end of Act 9 you want all three elemental resistances capped or close to it before you touch Act 10.",
      "The Quarry and Refinery are dense — good XP if you are a level or two short.",
      "Last comfortable place to buy upgrades before the campaign finale.",
    ],
    bossNote: (
      <>
        <b>Boss note:</b> the Depraved Trinity is three bosses sharing one
        health pool with rotating immunity — damage whichever one is currently
        vulnerable instead of fighting all three.
      </>
    ),
  },
  {
    num: 10,
    title: "Oriath and the second Kitava fight",
    subtitle: "Campaign finale — unlocks the Atlas of Worlds",
    level: "Lv 64–68",
    town: "Oriath Docks",
    notes: [
      "Confirm all resistances are capped and you have a flask up for whatever ailment your build is weakest to before starting the final fight.",
      "Finishing Act 10 applies a second −30% resistance penalty — assume you will need to re-gear for maps immediately after.",
      <>
        Once Kitava is down, your first map drops automatically and the Atlas
        becomes available — head to{" "}
        <Link to="/guides/atlas">the Atlas guide</Link> next.
      </>,
    ],
    bossNote: (
      <>
        <b>Boss note:</b> multiple phases with escalating area attacks — this is
        where a real defensive layer (not just high life) starts to matter for
        the first time.
      </>
    ),
  },
];

function LevelingGuide() {
  const [active, setActive] = useState(1);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const act = ACTS.find((a) => a.num === active) ?? ACTS[0];

  useEffect(() => {
    setDone(storageGet<Record<string, boolean>>(PROGRESS_KEY, {}));
  }, []);

  function toggle(id: string) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      storageSet(PROGRESS_KEY, next);
      return next;
    });
  }

  function clearAct() {
    setDone((prev) => {
      const next = Object.fromEntries(
        Object.entries(prev).filter(([k]) => !k.startsWith(`a${act.num}-`)),
      );
      storageSet(PROGRESS_KEY, next);
      return next;
    });
  }

  const doneCount = act.steps
    ? act.steps.filter((_, i) => done[`a${act.num}-${i}`]).length
    : 0;

  return (
    <main className="wh-wrap">
      <div className="wh-page-head">
        <div className="wh-eyebrow">03 · Guide</div>
        <h1>Leveling: Act 1 → Act 10</h1>
        <p>
          The campaign hasn&apos;t changed shape in years — ten acts, two Kitava
          fights, and a −30% resistance penalty after each one. Pick an act.
        </p>
      </div>

      <div className="wh-toolbar" role="tablist" aria-label="Acts">
        {ACTS.map((a) => (
          <button
            key={a.num}
            type="button"
            role="tab"
            aria-selected={a.num === active}
            className={a.num === active ? "wh-tab is-active" : "wh-tab"}
            onClick={() => setActive(a.num)}
          >
            Act {a.num}
          </button>
        ))}
      </div>

      <div className="wh-act-panel">
        <div className="wh-act-panel-head">
          <div>
            <h2>
              Act {act.num} · {act.title}
            </h2>
            <span>{act.subtitle}</span>
          </div>
          <div className="wh-act-meta wh-mono">
            <span>{act.level}</span>
            <span>{act.town}</span>
          </div>
        </div>

        {act.steps ? (
          <>
            <div className="wh-zone-head wh-mono">
              <span>
                {doneCount} / {act.steps.length} done
              </span>
              <button
                type="button"
                className="wh-btn wh-btn-ghost"
                onClick={clearAct}
                disabled={doneCount === 0}
              >
                Clear progress
              </button>
            </div>
            <ol className="wh-zone-list">
              {act.steps.map((step, i) => {
                const id = `a${act.num}-${i}`;
                const isDone = !!done[id];
                return (
                  <li key={step} className="wh-zone">
                    <button
                      type="button"
                      aria-pressed={isDone}
                      className={isDone ? "wh-zone-btn is-done" : "wh-zone-btn"}
                      onClick={() => toggle(id)}
                    >
                      {highlight(step)}
                    </button>
                  </li>
                );
              })}
            </ol>
          </>
        ) : null}

        {act.notes || act.bossNote ? (
          <div className="wh-act-body">
            {act.notes ? (
              <ul>
                {act.notes.map((note, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={i}>{note}</li>
                ))}
              </ul>
            ) : null}
            {act.bossNote ? (
              <div className="wh-boss-note">{act.bossNote}</div>
            ) : null}
          </div>
        ) : null}
      </div>
    </main>
  );
}
