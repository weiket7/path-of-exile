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
  "Voll",
  "Kaom",
  "Daresso",
  "Barkhul",
  "The Trio",
  "Malachai",
  "Doedre",
  "Maligaro",
  "Shavronne",
  "Overseer Crow",
  "Justicar Casticus",
  "High Templar Avarius",
  "Innocence",
  "Kitava",
  "The Dishonored Queen",
  "Tukohama",
  "Abberath",
  "Puppet Mistress",
  "Brine King",
  "Greust",
  "Gruthkul",
  "Arakaali",
  "Doedre the Vile",
  "Gemling Legionnaires",
  "Dawn",
  "Dusk",
  "Yugul",
  "Solaris",
  "Lunaris",
  "Shakari",
  "Basilisk",
  "General Adus",
  "Garukhan",
  "Depraved Trinity",
  "Vilenta",
  "Avarius, Reassembled",
  "Cultists",
  "Gargoyles",
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
  "Tasuni",
  "Oyun",
  "Dialla",
  "Lani",
  "Lily Roth",
  "Lilly Roth",
  "Weylam Roth",
  "Weylam",
  "Sin",
  "Silk",
  "Eramir",
  "Helena",
  "Petarus and Vanja",
  "Irasha",
  "Bannon",
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
  "Deshret\u2019s Banner",
  "Deshret\u2019s Spirit",
  "Eye of Fury",
  "Eye of Desire",
  "Oriath Portal",
  "Miasmeter",
  "Eyes of Zeal",
  "Sign of Purity",
  "Kitava\u2019s Torments",
  "Eye of Conquest",
  "Black Flag",
  "Ignition Switch",
  "Maligaro\u2019s Map",
  "Black Venom",
  "Obsidian Key",
  "Greust\u2019s Necklace",
  "Kishara\u2019s Star",
  "Fireflies",
  "Ankh of Eternity",
  "Sun Orb",
  "Moon Orb",
  "Storm Blade",
  "Bottled Storm",
  "Basilisk Acid",
  "Trarthan Powder",
  "Elixir of Allure",
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
  "The Dried Lake",
  "The Mines (Level One)",
  "The Mines (Level Two)",
  "Crystal Veins",
  "Kaom\u2019s Dream",
  "Kaom\u2019s Stronghold",
  "Caldera of the King",
  "Daresso\u2019s Dream",
  "The Grand Arena",
  "The Ring of Blades",
  "Belly of the Beast (Level One)",
  "Belly of the Beast (Level Two)",
  "Bowels of the Beast",
  "The Harvest",
  "The Black Core",
  "The Ascent",
  "Slave Pens",
  "Overseer\u2019s Tower",
  "Control Blocks",
  "Oriath Square",
  "Templar Courts",
  "The Chamber of Innocence",
  "The Sanctum of Innocence",
  "Torched Courts",
  "Ruined Square",
  "Ossuary",
  "The Reliquary",
  "Cathedral Rooftop",
  "Cathedral Apex",
  "Wraeclast",
  "Karui Fortress",
  "Tukohama\u2019s Keep",
  "The Ridge",
  "Shavronne\u2019s Tower",
  "Prison Rooftop",
  "Valley of the Fire Drinker",
  "Spawning Ground",
  "The Beacon",
  "Brine King\u2019s Reef",
  "Brine King\u2019s Throne",
  "The Crypt (Level Two)",
  "Maligaro\u2019s Sanctum",
  "Maligaro\u2019s Workshop",
  "Ashen Fields",
  "Fortress Encampment",
  "Den of Despair",
  "The Causeway",
  "Vaal City",
  "Temple of Decay (Level One)",
  "Temple of Decay (Level Two)",
  "Arakaali\u2019s Web",
  "Sarn Ramparts",
  "Toxic Conduits",
  "Doedre\u2019s Cesspool",
  "The Cauldron",
  "Sewer Outlet",
  "The Quay",
  "Resurrection Site",
  "Grain Gate",
  "Imperial Fields",
  "The Solaris Concourse",
  "The Harbour Bridge",
  "The Lunaris Concourse",
  "The Bath House",
  "High Gardens",
  "Pools of Terror",
  "Lunaris Temple (Level 1)",
  "Lunaris Temple (Level 2)",
  "Sky Shrine",
  "Blood Aqueducts",
  "The Descent",
  "Vastiri Desert",
  "The Oasis",
  "Sand Pit",
  "The Foothills",
  "Boiling Lake",
  "The Tunnel",
  "The Quarry",
  "The Refinery",
  "Shrine of the Winds",
  "Belly of the Beast",
  "Rotting Core",
  "Black Core",
  "Black Heart",
  "Oriath",
  "Ravaged Square",
  "Desecrated Chambers",
  "Oriath Docks",
  "The Canals",
  "The Feeding Trough",
  "Altar of Hunger",
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
      "Turn in Siren's Cadence to Nessa for not needed gem (Lacerate, Holy Sweep, Rain of Arrows, Shattering Steel, Earthshatter). Buy Lapis Amulet, 2 Sapphire Rings, Ancestral Call, Ruthless, Frost Blink, Static Strike, Intimidating Cry (no need), Spectral Helix",
      "Link Spectral Helix + Chance to Bleed, Static Strike + Ruthless + Ancestral Call. Leap Slam + Faster Attack + Momemtum. Equip Frost Blink and Intimidating Cry (no need)",
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
      "Turn in Intruders in Black to Gruest for Herald of Ash, buy Blood Rage (no need), Poacher's Mark from Yeena and teleport back to The Crossroads.",
      "Go to the right towards Fellshrine Ruins and find the entrance to The Crypt Level 1.",
      "Complete the Labyrinth Trial, then continue to The Crypt Level 2.",
      "Locate Archbishop Geofri the Abashed \u2014 and skip him, click the altar behind him for the Golden Hand. Loot it and log out/Waypoint.",
      "Turn in Through Scared Ground to Yeena for Book of Skill and teleport back to The Crossroads.",
      "Go straight ahead into The Broken Bridge. Run the zone, deal with Kraityn (kill or help him), then log out/portal to town",
      "Take the exit on the left to The Riverways. Follow the road, pick up the waypoint, and keep following the road to the exit to The Western Forest.",
      "Head down the path until you locate the waypoint. On opposite side of waypoint/the side waypoint is not on, run into the forest, look for the wall of trees covered in spider webs, and follow it to The Weavers Chambers entrance.",
      "Go through The Weavers Chamber, kill The Weaver, pick up Maligaro\u2019s Spike, then log out/portal to town.",
      "Turn in Sharp and Cruel to Slik for Melee Phys. Buy Close Combat from Yeena and replace Ruthless with it, also buy Precision and Shockwave. Teleport back to The Riverways.",
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
      "Exit top right into the Slums.",
      "Find the Crematorium and grab the waypoint. Take note of where the Sewer Grating was if you passed one on the way.",
      "Find the Labyrinth Trial inside the Crematorium and complete it.",
      "Find Piety and defeat her. Interact with Tolman and take Tolman\u2019s Bracelet.",
      "Log out or portal to town. Speak with Clarissa to receive the Sewer Keys. Buy Haste from Clarissa. 4 link spectral helix + leap slam + faster attacks + momemtum. ",
      "Enter the Slums and find the Sewer Grating. Open it and enter the Sewers.",
      "Locate the three Platinum Busts (1 before waypoint and 2 after it) and waypoint.",
      "Complete Cassia's Blight to unlock her in hideout. Find the exit into the Marketplace.",
      "Grab the waypoint, ignore Ornate Chest containing Decanter Spiritus and to the right of the waypoint is the entrance to the Catacombs.",
      "Enter and complete the Labyrinth Trial, portal to the Marketplace",
      "Go left to the Battlefront, find Blackguard Chest containing Ribbon Spool and get waypoint in the centre of the zone",
      "From waypoint head left and up to The Docks. Static strike + ancestral call/ruthless + melee phys + close combat.",
      "Locate the Supply Container and loot the Thaumetic Sulphite, then log out/portal",
      "Take the waypoint back to Battlefront and head upwards until Solaris Temple (Level One).",
      "Get waypoint and find Solaris Temple (Level Two).",
      "Continue through the temple until you find the waypoint.",
      "Talk to Lady Dialla to receive an Amulet reward and the Infernal Talc.",
      "Log out or portal to town, then talk to Hargan to receive the Book of Skill.",
      "Take the waypoint to the Sewers and burn away the Undying Blockage.",
      "Enter the Ebony Barracks and acquire the waypoint.",
      "Head upwards through the Ebony Barracks and kill General Gravicius.",
      "Head upwards to Lunaris Temple (Level One).",
      "Grab the waypoint and enter the Lunaris Temple (Level Two).",
      "Look for ascending staircases to find the correct path quickly. Continue following the staircases until you reach the carts. The side with two carts is always a dead end, while the single-cart side is the correct path.",
      "Keep ascending through the temple until you reach Piety at the top.",
      "Kill Piety and loot the Tower Key.",
      "Return to town and talk to Grigor to receive the Book of Skill.",
      "Turn in Lost in Love to Maramoa for Pride [Hatred/Grace/Dread Banner/Pride/Rallying Cry/Petrified Blood].",
      "Turn in Sever the Right Hand to Maramoa for Cyclone and replace Spectral Helix. [Cyclone, Ice Crash, Blast Rain, Thunderstorm, Charged Dash, Lancing Steel, Bladestorm, Spectral Shield Throw].",
      "Take the waypoint to the Ebony Barracks.",
      "Head to the right of the waypoint until you find the entrance to the Imperial Gardens.",
      "Follow the tiled path until you find the waypoint.",
      "Optional: if you need specific gems from the Library quest, take the upper left path at the three way fork, up the stairs. Enter the Library and grab the waypoint halfway through the area.",
      "Continue until you find the Loose Candle. Click on it and enter The Archives. Collect the four Golden Pages and log out/portal to town then  waypoint back to the Library and speak to Siosa for your reward. Take the waypoint back to the Imperial Gardens.",
      "[Life Leech, Fortify, Arrogance, Hypothermia, Pulverise, Impale, Windburst, Urgent Orders, Bloodthirst, Corrupting Cry, Expert Retaliation]",
      "Red page 1 buy general's cry for 1 alt, autoexertion for 1 alt, fortify for 1 chance, sunder for 1 transmute, blood and sand for 1 wisdom, steelskin for 1 wisdom, flesh and stone for 1 alt",
      "Red page 2 pulverise for 1 chance, shockwave for 1 alt, lifetap for 1 transmute, melee phys for 1 alt",
      "Green page 3 desecrate for 1 alt",
      "Blue page 5 purity of elements for 1 alt, automation for 1 alt",
      "Blue page 7 infused channeling for 1 wisdom",
      "From market/Library, buy Infused Channeling for 1 wisdom, Desecrate for 1 alteration.",
      "In Imperial Gardens, complete the Labyrinth Trial and Normal Lab for Impact. From the three way fork just above the waypoint, head upwards and slowly snake your way to the left. The Labyrinth Trial is almost always found in the uppermost left corner of the area.",
      "In Imperial Gardens, go to lower right and find entrance to Sceptre of God.",
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
    steps: [
      "Remove Spectral Throw + Chance to Bleed, Sniper's Mark, Haste. Equip Autoexertion + General's Cry + Sunder + Melee Phys/Pulverise. Equip Cyclone + Infused Channeling + Fortify (lvl 31) + Pulverise/Melee Phys. Equip Purity of Elements, Precision, Blood and Sand, Poacher's Mark +Lifetap, Automation + Steelskin, Desecrate (use when bossing).",
      "Go bottom left to The Dried Lake.",
      "Locate Voll, defeat him, and take Deshret\u2019s Banner. Log out or portal to town.",
      "Open the mines using Deshret\u2019s Banner and enter The Mines (Level One).",
      "Proceed through the area and enter The Mines (Level Two).",
      "Locate Deshret\u2019s Spirit and release it.",
      "Continue to the Crystal Veins.",
      "Locate the waypoint at the end of the area and return to Highgate.",
      "Speak to Tasuni to receive the Book of Skill reward. Speak to Oyun to receive the gem reward.",
      "This is where we recommend you complete your first Labyrinth and ascend.",
      "Return to the Crystal Veins via the waypoint.",
      "The next two steps may be completed in either order. We prefer Kaom\u2019s Dream first, as the boss is generally a little less dangerous at lower levels.",
      "Enter Kaom\u2019s Dream and proceed through the area until you reach Kaom\u2019s Stronghold. Acquire the waypoint and continue onwards until you reach the Caldera of the King. Defeat Kaom and pick up the Eye of Fury. Return to town via logout or portal, then take the waypoint to the Crystal Veins.",
      "Enter Daresso\u2019s Dream and proceed through the area until you encounter Barkhul. Defeat him and his bodyguards, then enter The Grand Arena and acquire the waypoint.",
      "Proceed through the arenas until you encounter The Trio, a group of three unique enemies. This means Daresso is in the next area, and signals you are on the correct path.",
      "Defeat The Trio and enter The Ring of Blades. Defeat Daresso and take the Eye of Desire. Log out or portal to town, then take the waypoint to the Crystal Veins.",
      "Talk to Dialla.",
      "Enter the Belly of the Beast (Level One) and proceed through the area.",
      "Enter the Belly of the Beast (Level Two) and proceed through the area.",
      "Enter the Bowels of the Beast.",
      "Defeat Piety.",
      "Enter The Harvest and acquire the waypoint.",
      "Slay Malachai\u2019s three guardians \u2014 Doedre, Maligaro, and Shavronne \u2014 and loot the organs they drop.",
      "Use the three organs to enter The Black Core, found next to the waypoint.",
      "Kill Malachai.",
      "Log out or portal back to town. Buy Mark on Hit, Brutality from Petarus and Vanja",
      "Go to upper right and exit into The Ascent.",
      "Locate and interact with the resonator, and take the Oriath Portal.",
      "Enter Oriath \u2014 continue on the Act 5 tab.",
    ],
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
    steps: [
      "military staff",
      "Grab the waypoint and make your way through the Slave Pens.",
      "Kill Overseer Crow, and ascend the ladder that drops down to enter the Overseer\u2019s Tower.",
      "Talk to Lani to receive the ring reward.",
      "Enter the Control Blocks.",
      "Find the Miasmeter. This is typically about halfway through the zone, on the leftmost part of the area.",
      "Continue to kill Justicar Casticus at the end of the area and pick up the Eyes of Zeal.",
      "Enter Oriath Square and grab the waypoint.",
      "Find and enter the Templar Courts.",
      "Make your way through the zone and enter The Chamber of Innocence, grabbing the immediate waypoint.",
      "Find The Sanctum of Innocence and kill High Templar Avarius and Innocence.",
      "Enter The Chamber of Innocence through the newly opened exit.",
      "Enter the Torched Courts and make your way through the area.",
      "Enter the Ruined Square and find the Waypoint. The entrances to the other areas are always in the same general part of the zone.",
      "Enter the Ossuary.",
      "Find the Sign of Purity and return to the Ruined Square via the exit.",
      "Locate The Reliquary.",
      "Find each of Kitava\u2019s Torments, then log out or portal to town.",
      "Speak to the NPCs for your quest rewards.",
      "You are about to fight Kitava and take a \u221230% resistance penalty. Overcap your elemental resistances by roughly 30% first, so the next act does not punish you for it.",
      "Return to the Ruined Square via waypoint.",
      "Enter the Cathedral Rooftop and make your way through the area.",
      "Enter the Cathedral Apex and defeat Kitava.",
      "Speak with Lily Roth and sail to Wraeclast \u2014 continue on the Act 6 tab.",
    ],
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
    steps: [
      "Use crafting bench to craft necessary resists",
      "For first run in league. Go to the left to The Twilight Strand. Clear the area of all monsters, then portal to town and speak with Lilly Roth.",
      "Go up to The Coast and proceed through the zone. Talk to Ailith. Grab the waypoint at the end.",
      "Enter the Mud Flats. Find and kill The Dishonored Queen and take the Eye of Conquest.",
      "Go towards middle upper to  the Karui Fortress \u2014.",
      "Go left then up for free tattoo. Enter Tukohama\u2019s Keep.",
      "Defeat Tukohama. Talk to Sin and select Soul of Tukohama as your minor Pantheon god.",
      "Find and enter The Ridge.",
      "Grab the waypoint and return to Lioneye\u2019s Watch. Talk to Tarkleigh to receive the Book of Skill reward.",
      "Return to The Ridge via the waypoint.",
      "Find and enter the Lower Prison and grab the waypoint, just inside the entrance.",
      "Find the Labyrinth Trial and complete it.",
      "Find and enter Shavronne\u2019s Tower.",
      "Ascend the tower until you reach the Prison Rooftop.",
      "Kill Brutus and Shavronne.",
      "Go through the Warden\u2019s Chambers and enter the Prisoner\u2019s Gate. Grab the waypoint.",
      "Find the Valley of the Fire Drinker and defeat Abberath. Log out or portal to town and talk to Bestel for the Book of Skill reward.",
      "Take the waypoint back to the Prisoner\u2019s Gate and head in the opposite direction from the Valley of the Fire Drinker \u2014 if Abberath was bottom right, head top right, and vice versa.",
      "Enter the Western Forest. Follow the main road to find the waypoint.",
      "Find and enter The Riverways. Follow the main road to find the waypoint.",
      "Find and enter The Wetlands, usually in the upper part of the area. Find the Spawning Ground and kill the Puppet Mistress. Log out or portal to town and speak to Tarkleigh for the Book of Skill reward, then return to The Riverways via waypoint.",
      "Find and enter the Southern Forest. The entrance is usually in the middle or lower right of the area.",
      "Grab the waypoint before exiting into the Cavern of Anger.",
      "Open the Flag Chest and take the Black Flag.",
      "Enter the passage and make your way through the cavern until you reach The Beacon. Enter and immediately acquire the waypoint.",
      "Locate the pyramid-like structure and ascend it. Escort the two pillars to their berths by standing within the glowing circle.",
      "Click the Ignition Switch, then click the Beacon again.",
      "Talk to Weylam Roth and sail to the Brine King\u2019s Reef. Grab the waypoint.",
      "Locate and enter the Brine King\u2019s Throne \u2014 usually easiest by following the left wall.",
      "Kill the Brine King. Speak to Sin and take the Brine King as your major Pantheon.",
      "Talk to Weylam Roth and sail onward \u2014 continue on the Act 7 tab.",
    ],
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
    steps: [
      "Enter the Broken Bridge and travel towards the bottom left part of the area.",
      "Enter The Crossroads. Follow the road and grab the waypoint in the centre of the zone.",
      "Take the bottom fork from the waypoint and enter the Fellshrine Ruins.",
      "Enter The Crypt and acquire the waypoint.",
      "Find the Labyrinth Trial and complete it.",
      "Find the Sarcophagus and descend to The Crypt (Level Two).",
      "Locate the Container of Sins and take Maligaro\u2019s Map.",
      "Return to the Bridge Encampment via portal or logout.",
      "Return to The Crossroads via waypoint.",
      "Take the upper path from the waypoint and enter the Chamber of Sins (Level 1).",
      "Grab the waypoint at the central cross and insert Maligaro\u2019s Map into the Map Device.",
      "Enter Maligaro\u2019s Sanctum and proceed until you find Maligaro\u2019s Workshop.",
      "Kill Maligaro and take the Black Venom. Leave the map via portal scroll.",
      "Speak with Silk and take the Obsidian Key.",
      "Find and enter the Chamber of Sins (Level Two).",
      "Find the Labyrinth Trial and complete it.",
      "Enter The Den.",
      "Proceed and exit into the Ashen Fields.",
      "Enter the Fortress Encampment.",
      "Slay Greust.",
      "Enter the Northern Forest.",
      "Grab the waypoint.",
      "Enter the Dread Thicket.",
      "Enter the Den of Despair and kill Gruthkul, then return to the Dread Thicket.",
      "Collect seven Fireflies from around the Dread Thicket.",
      "Return to the Bridge Encampment and speak with Eramir to receive the two Books of Skill.",
      "Optional: speak with Helena to receive Greust\u2019s Necklace. It only rewards an amulet, but rarely takes more than a minute. If you pass the Azmeri Shrine in the Northern Forest, place the necklace there and speak with Helena next time you are in town.",
      "Return to the Northern Forest via the waypoint.",
      "Find the exit to The Causeway.",
      "Grab the waypoint when you encounter it.",
      "Acquire Kishara\u2019s Star before leaving the area \u2014 usually right next to the zone exit, in Kishara\u2019s Lockbox.",
      "Enter the Vaal City.",
      "Locate Yeena. The Vaal City is sprawling and easy to get lost in: there is always a section ringed by dead ends that is hard to get into, and Yeena and the waypoint are always there.",
      "Take the waypoint back to town and give Kishara\u2019s Star to Weylam for a Book of Skill reward, then return to the Vaal City.",
      "Speak with Yeena and enter the Temple of Decay (Level One).",
      "Enter the Temple of Decay (Level Two).",
      "Enter Arakaali\u2019s Web.",
      "Kill Arakaali.",
      "Enter the Sarn Ramparts.",
      "Enter the Sarn Encampment.",
      "This is where we recommend you run the second Labyrinth.",
      "Continue on the Act 8 tab.",
    ],
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
    steps: [
      "Enter the Toxic Conduits.",
      "Locate and enter Doedre\u2019s Cesspool.",
      "Open the grate and enter The Cauldron.",
      "Kill Doedre the Vile.",
      "Exit into the Sewer Outlet and grab the waypoint.",
      "Take the right path and enter The Quay.",
      "Open the Sealed Casket and take the Ankh of Eternity. It is typically near the zone entrance \u2014 look for a long bridge.",
      "Locate and enter the Resurrection Site and kill Tolman.",
      "Talk to Clarissa.",
      "Return to The Quay.",
      "Enter the Grain Gate and grab the waypoint. Head upwards through the zone, roughly following the upper right wall.",
      "Kill the Gemling Legionnaires.",
      "Enter the Imperial Fields and follow the main road to find the waypoint.",
      "Return to the Sarn Encampment. Speak to Clarissa and Maramoa for the Book of Skill rewards, and to Hargan for the ring reward.",
      "Return to the Imperial Fields.",
      "Enter the Solaris Temple (Level One).",
      "Acquire the waypoint if you come across it.",
      "Enter the Solaris Temple (Level Two).",
      "Kill Dawn and take the Sun Orb, then log out or portal to town.",
      "Return to the Solaris Temple (Level One) via waypoint.",
      "Find and enter The Solaris Concourse.",
      "Run through, acquire the waypoint, and enter The Harbour Bridge.",
      "Run through and enter The Lunaris Concourse.",
      "Acquire the waypoint and enter The Bath House.",
      "Find the Labyrinth Trial and complete it.",
      "Enter the High Gardens and proceed until you encounter the Pools of Terror. Enter and slay Yugul, then log out or portal to town.",
      "Speak to Hargan for the Book of Skill reward, then return to The Lunaris Concourse via waypoint.",
      "Enter the Lunaris Temple (Level 1). The path is the same as in Act 3 \u2014 keep heading upwards until you reach it.",
      "Acquire the waypoint, then enter the Lunaris Temple (Level 2).",
      "Kill Dusk and take the Moon Orb, then log out or portal to town.",
      "Return to The Lunaris Concourse via waypoint.",
      "Enter The Harbour Bridge.",
      "Enter the Sky Shrine.",
      "Kill Solaris and Lunaris.",
      "Enter the Blood Aqueducts.",
      "Enter Highgate \u2014 continue on the Act 9 tab.",
    ],
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
    steps: [
      "Enter The Descent and head to the right.",
      "Descend via the Supply Hoists until you locate the exit to the Vastiri Desert.",
      "Locate and acquire the waypoint.",
      "Locate the Storm Weathered Chest. Defeat the waves of mummies that ambush you, then take the Storm Blade.",
      "Return to town via portal scroll and speak with Petarus and Vanja. Talk to Sin, then speak with Petarus and Vanja again to take the Bottled Storm. Use your portal to return to the Vastiri Desert.",
      "Find the entrance to The Oasis, which is now accessible using the Bottled Storm.",
      "Traverse the area and enter the Sand Pit. Kill Shakari, then log out or portal to town.",
      "Speak to Irasha for the Book of Skill reward, then return to the Vastiri Desert via waypoint.",
      "Enter The Foothills.",
      "Find the waypoint, usually in the upper right part of the area.",
      "Enter the Boiling Lake.",
      "Kill the Basilisk and take the Basilisk Acid. You know you are close once you start seeing groups of petrified enemies.",
      "Log out or portal to town, then take the waypoint back to The Foothills.",
      "Enter The Tunnel, usually in the upper or upper left part of the area.",
      "Acquire the waypoint.",
      "Find the Labyrinth Trial and complete it.",
      "Enter The Quarry. Run straight to the middle of the zone and acquire the waypoint.",
      "The next two steps can be done in either order, depending on what you find first.",
      "Enter The Refinery and explore until you find General Adus, then kill him. He sits in his own small arena, generally in the upper or upper left part of the area \u2014 taking the left path from the start usually finds him faster. Interact with the Theurgic Precipitate Machine and take the Trarthan Powder, then portal or log out and return to The Quarry via waypoint.",
      "Optional: if you want the \u201ctrigger a socketed spell when you use a skill\u201d craft, look for the grate in The Refinery that leads underground to it.",
      "Enter the Shrine of the Winds and slay Garukhan. Return to town, speak with Irasha for the Book of Skill reward, then return to The Quarry via waypoint.",
      "Talk to Sin and enter the Belly of the Beast.",
      "Enter the Rotting Core and make your way through the area.",
      "Enter the Black Core and talk to Sin.",
      "Enter each of the portals in any order and defeat Malachai\u2019s guardians \u2014 Shavronne, Maligaro, and Doedre.",
      "Enter the Black Heart and kill the Depraved Trinity.",
      "Talk to Lilly Roth and sail to Oriath \u2014 continue on the Act 10 tab.",
    ],
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
    steps: [
      "Enter the Cathedral Rooftop. The zone entrances in the Ravaged Square sit in the same relative positions as in Act 5.",
      "Enter the Cathedral Apex, immediately left of where you entered the rooftop.",
      "Kill the Cultists and Gargoyles to free Bannon.",
      "Return to the Cathedral Rooftop and make your way to the right.",
      "Enter the Ravaged Square.",
      "Head down and right until you find the Control Blocks entrance, and enter it.",
      "Pick up the waypoint, then find Vilenta \u2014 roughly where the Miasmeter was in Act 5. Kill Vilenta, then log out or portal to town.",
      "Talk to Lani for the Book of Skill reward, then take the waypoint to the Control Blocks and exit to the Ravaged Square.",
      "Head upwards until you reach the waypoint, acquire it, and enter the Ossuary.",
      "Find the Labyrinth Trial and complete it \u2014 it is close to the waypoint. Optional: the Elixir of Allure, which rewards respec points, is also nearby. Then log out or portal to town.",
      "Take the waypoint to the Ravaged Square, then find and enter the Torched Courts and proceed through the area.",
      "Enter the Desecrated Chambers, laid out much like The Chamber of Innocence in Act 5. Grab the immediate waypoint.",
      "Find and kill Avarius, Reassembled.",
      "Return to the Oriath Docks via waypoint.",
      "Talk to Bannon, then talk to Lani for the flask and armour rewards.",
      "This is where we recommend running the third Labyrinth \u2014 get it done before Kitava\u2019s affliction lands again. Make sure you are 30% over your elemental resistance caps before the fight.",
      "Return to the Ravaged Square and head upwards until you find Innocence. Speak with him.",
      "Enter The Canals and proceed through the area.",
      "Enter The Feeding Trough and proceed through the area.",
      "Speak with Sin and enter the Altar of Hunger.",
      "Kill Kitava.",
      "Speak with Lani in Oriath for the Book of Skill reward \u2014 the campaign is done, and the Atlas opens up.",
    ],
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
