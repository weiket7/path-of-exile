import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import BuildLinks from "../../components/BuildLinks";
import type { BuildLinkSet, Creator } from "../../components/BuildLinks";

export const Route = createFileRoute("/builds/league-start")({
  component: LeagueStartBuilds,
});

type Attribute = "str" | "dex" | "int";

interface Build {
  title: string;
  classLine: string;
  budget: string;
  attr: Attribute;
  tags: Array<{ label: string; pill: string }>;
  desc: string;
  why: string;
  creator?: Creator;
  links?: BuildLinkSet;
  lastUpdated?: number;
}

const BUILDS: Array<Build> = [
  {
    title: "Chieftain Righteous Fire",
    classLine: "Marauder → Chieftain",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Righteous Fire", pill: "wh-pill-gem" },
      { label: "Tank / DoT", pill: "wh-pill-normal" },
    ],
    desc: "Self-cast Righteous Fire stacking life and fire regen — Chieftain's flat regen and fire exposure turn your own burn into your main defense layer as well as your damage.",
    why: 'almost no unique-dependent, clears acts safely, and the "regen tank" playstyle forgives under-leveled gear.',
    creator: {
      name: "Pohx",
      channel: "https://www.youtube.com/@PohxKappa",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=aXDVnydIXJw",
      written: "https://mobalytics.gg/poe/builds/pohx-righteous-fire-chieftain",
      pob: "https://pobb.in/KMJMGblyFcI7",
      site: "https://pohx.net/",
    },
  },
  {
    title: "Pathfinder Toxic Rain",
    classLine: "Ranger → Pathfinder",
    budget: "Low",
    attr: "dex",
    tags: [
      { label: "Dexterity", pill: "wh-pill-dex" },
      { label: "Toxic Rain", pill: "wh-pill-gem" },
      { label: "Chaos DoT", pill: "wh-pill-unique" },
    ],
    desc: "Toxic Rain pods stack chaos damage over time from range, while Pathfinder's permanent flask uptime covers evasion, curse immunity, and elemental ailment cleanse.",
    why: "chaos damage bypasses most early energy shield mobs, and the playstyle stays completely safe — you're never in melee range.",
    creator: {
      name: "Path of Evening",
      channel: "https://www.youtube.com/@PathofEvening",
    },
    links: { youtube: "https://www.youtube.com/watch?v=Nr4GR0v_KWw" },
  },
  {
    title: "Slayer Cyclone",
    classLine: "Duelist → Slayer",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Cyclone", pill: "wh-pill-gem" },
      { label: "Melee", pill: "wh-pill-normal" },
    ],
    desc: "Channelled melee spin that moves while it attacks — Slayer's overleech, culling strike, and area bonuses keep you alive while you hold the button down.",
    why: "one of the most forgiving melee starters: leech scales with damage, so the build gets tankier as it gets stronger.",
    creator: {
      name: "FGKorbyn21",
      channel: "https://www.youtube.com/@FGKorbyn21",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=ExIt_fj1p6c",
      written:
        "https://mobalytics.gg/poe/builds/cyclone-slayer-league-starter-to-endgame-step-by-step-guide-beginner-friendly",
      pob: "https://maxroll.gg/poe/pob/cepfnz0x",
    },
  },
  {
    title: "Slayer Shield Crush",
    classLine: "Duelist → Slayer",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Shield Crush", pill: "wh-pill-gem" },
      { label: "Melee", pill: "wh-pill-normal" },
    ],
    desc: "Melee slam that scales off your shield rather than your weapon, so a single good shield carries both your damage and your block — Slayer adds overleech and area on top.",
    why: "your main damage stat doubles as a defensive layer, which keeps the gearing cheap and the character hard to kill on a fresh league.",
    creator: {
      name: "ilnino-gaming",
      channel: "https://www.youtube.com/@ilnino-gaming",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=gCe5r2xVm1o&t=1648s",
      pob: "https://pobb.in/ygckEVPMAttx",
    },
  },
  {
    title: "Chieftain Cast when Stunned",
    classLine: "Marauder → Chieftain",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Cast when Stunned", pill: "wh-pill-gem" },
      { label: "Trigger", pill: "wh-pill-normal" },
    ],
    desc: "Getting stunned is the trigger: you stack life and armour, let hits land, and the linked spells fire on their own — Chieftain supplies the regen and fire scaling to hold the line.",
    why: "the damage comes from being hit rather than from a weapon, so a cheap life-and-armour setup is enough to clear the campaign.",
    creator: {
      name: "emiracle",
      channel: "https://www.youtube.com/@HolyFkingShit",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=2fMifC2ZAao",
      written: "https://mobalytics.gg/poe/builds/cws-chieftain-emiracles",
      pob: "https://pobb.in/zro2ZKFZTMF5",
    },
  },
  {
    title: "Necromancer Chains of Command",
    classLine: "Witch → Necromancer",
    budget: "Low–Med",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Chains of Command", pill: "wh-pill-unique" },
      { label: "Minions", pill: "wh-pill-normal" },
    ],
    desc: "Chains of Command turns your Animated Guardian into the damage dealer, so your gear decisions go onto the minion instead of your own character — Necromancer keeps it alive and scaling.",
    why: "one body armour unique is the whole build: the minions tank and kill for you, so the campaign is close to hands-off.",
    creator: {
      name: "Rusei",
      channel: "https://www.youtube.com/@RuSeI-s7j",
    },
    links: { youtube: "https://www.youtube.com/watch?v=9JiHNYdS5E8" },
  },
  {
    title: "Elementalist Ignite Eviscerate",
    classLine: "Witch → Elementalist",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Eviscerate", pill: "wh-pill-gem" },
      { label: "Ignite / DoT", pill: "wh-pill-unique" },
    ],
    desc: "One big hit applies a burn that does the real damage — Elementalist adds guaranteed ignite, exposure, and damage over time scaling on top of it.",
    why: "ignite damage comes from a single scaling hit, so you do not need attack speed or multipliers to clear the acts.",
    creator: {
      name: "InsPoE",
      channel: "https://www.youtube.com/@InsPoE",
    },
    links: { youtube: "https://www.youtube.com/watch?v=_o_ROOd7TY8&t=23s" },
  },
  {
    title: "Elementalist Ice Nova",
    classLine: "Witch → Elementalist",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Vaal Ice Nova", pill: "wh-pill-gem" },
      { label: "Cold / Freeze", pill: "wh-pill-normal" },
    ],
    desc: "Nova spell that bursts around you and off frozen enemies, with the Vaal version banked for tougher packs — Elementalist supplies the cold exposure and freeze scaling.",
    why: "freeze is a defensive layer as much as a damage one: frozen packs do not hit back while you clear the acts.",
    creator: {
      name: "aer0",
      channel: "https://www.youtube.com/@aer0",
    },
    links: { youtube: "https://www.youtube.com/watch?v=mKrqlBj-SbA&t=15s" },
  },
  {
    title: "Slayer Static Strike",
    classLine: "Duelist → Slayer",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Static Strike", pill: "wh-pill-gem" },
      { label: "Melee", pill: "wh-pill-normal" },
    ],
    desc: "Melee strike that leaves a lingering shock aura pulsing around you, so packs die while you walk — Slayer adds the overleech and area that make it comfortable to hold ground.",
    why: "the aura keeps clearing between hits, which smooths out the usual melee problem of killing one target at a time during the acts.",
    creator: {
      name: "Alohaa",
      channel: "https://www.youtube.com/@Alohaa-ll",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=jQy7qtUnQHM",
      written:
        "https://docs.google.com/spreadsheets/d/1UGBybGpDGgNuewBudqyATyZwY-i81vjFpufj0020DvQ/edit?gid=1845575696#gid=1845575696",
    },
  },
  {
    title: "Hierophant Storm Burst Totems",
    classLine: "Templar → Hierophant",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Storm Burst", pill: "wh-pill-gem" },
      { label: "Totem", pill: "wh-pill-normal" },
    ],
    desc: "Totems channel Storm Burst for you, dropping lightning orbs that detonate on packs — Hierophant grants the extra totems and the placement speed to keep them up.",
    why: "the totems take the hits and do the damage, so the acts stay low-stress and your own gear barely matters.",
    creator: {
      name: "aer0planeGaming",
      channel: "https://www.youtube.com/@aer0planegaming781",
    },
    links: { youtube: "https://www.youtube.com/watch?v=fCnYDU84q18" },
  },
  {
    title: "Elementalist Hexblast Ignite",
    classLine: "Witch → Elementalist",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Hexblast", pill: "wh-pill-gem" },
      { label: "Ignite / DoT", pill: "wh-pill-unique" },
    ],
    desc: "Hexblast consumes your curse for a single large hit, and that hit is only there to set the burn — Elementalist guarantees the ignite and scales the damage over time.",
    why: "curse application does the heavy lifting, so one well-rolled weapon carries the whole campaign.",
    creator: {
      name: "Paak_HC",
      channel: "https://www.youtube.com/@paak_hc469",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=jBXzWKzrChE&t=345s",
      pob: "https://pobb.in/pbyjrsnhjdvo",
    },
  },
  {
    title: "Chieftain Ice Crash Ignite",
    classLine: "Marauder → Chieftain",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Ice Crash", pill: "wh-pill-gem" },
      { label: "Ignite / DoT", pill: "wh-pill-unique" },
    ],
    desc: "Ice Crash slams for a big cold hit that Chieftain converts into fire, so the slam itself is only the trigger — the ignite burning afterwards is the real damage.",
    why: "Chieftain hands you ignite conversion, life regen, and fire resistance from the tree itself, so a league-start weapon is enough to clear the campaign.",
    creator: {
      name: "Crouching_Tuna",
      channel: "https://www.youtube.com/@CrouchingTuna",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=YTTcKnqipOM",
    },
  },
  {
    title: "Hierophant Kinetic Fusillade",
    classLine: "Templar → Hierophant",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Kinetic Fusillade", pill: "wh-pill-gem" },
      { label: "Totems", pill: "wh-pill-normal" },
    ],
    desc: "Ballista totems fire Kinetic Fusillade for you, so the totems take the risk while you reposition — Hierophant adds the extra totems and the mana-based defences that hold the setup together.",
    why: "totems do the damage from the first act onward, which means gear barely gates your clear speed during the campaign.",
    creator: {
      name: "Palsteron",
      channel: "https://www.youtube.com/@Palsteron",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=_oBZ-N5Fg9Y",
      written:
        "https://maxroll.gg/poe/build-guides/kinetic-fusillade-ballista-hierophant-league-starter",
      pob: "https://pobb.in/ktAkVJm59exq",
    },
  },
  {
    title: "Hierophant Explosive Arrow Ballista",
    classLine: "Templar → Hierophant",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Explosive Arrow", pill: "wh-pill-gem" },
      { label: "Totems", pill: "wh-pill-normal" },
    ],
    desc: "Ballista totems stack Explosive Arrow fuses on a target until they all detonate at once — Hierophant supplies the extra totems and the mana-based defences while you stay out of the blast.",
    why: "the damage comes from totem count and gem levels rather than weapon rolls, so a league-start bow carries you deep into maps.",
    creator: {
      name: "POEGuy",
      channel: "https://www.youtube.com/@POEGuy",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=kJWbSFeivHU",
      written:
        "https://www.poe-vault.com/guides/explosive-arrow-ballista-hierophant-build-guide",
    },
  },
  {
    title: "Guardian Dominating Blow",
    classLine: "Templar → Guardian",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Dominating Blow", pill: "wh-pill-gem" },
      { label: "Minions", pill: "wh-pill-normal" },
    ],
    desc: "Every rare you kill becomes a minion fighting for you, so the army rebuilds itself as you clear — Guardian pushes its damage and keeps the whole pack alive with auras.",
    why: "the minions tank and kill for you from early acts, so a bad weapon drop never stalls the campaign.",
    creator: {
      name: "Jorgen",
      channel: "https://www.youtube.com/@JorgenPOE",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=Hg1-3a3gAwI&t=258s",
      pob: "https://pobb.in/diESy56vVvFE",
    },
  },
  {
    title: "Assassin Blade Fall Blade Blast",
    classLine: "Shadow → Assassin",
    budget: "Low",
    attr: "dex",
    tags: [
      { label: "Dexterity", pill: "wh-pill-dex" },
      { label: "Blade Fall / Blade Blast", pill: "wh-pill-gem" },
      { label: "Cast on Crit", pill: "wh-pill-unique" },
    ],
    desc: "Blade Fall drops the blades and Blade Blast detonates them, triggered by crits from a slinger setup — Assassin supplies the crit chance and multiplier the whole loop runs on.",
    why: "the detonation covers a wide area, so one well-rolled crit weapon clears packs through the acts without needing specific uniques.",
    creator: {
      name: "Ky - Path of Exile",
      channel: "https://www.youtube.com/@pathofky",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=d3fCmCBM0F0",
      written:
        "https://mobalytics.gg/poe/profile/pathofky/builds/ky-s-blade-fall-blade-blast-slinger-coc-assassin-leaguestart-to-endgame",
    },
  },
  {
    title: "Elementalist Penance Brand Ignite",
    classLine: "Witch → Elementalist",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Penance Brand", pill: "wh-pill-gem" },
      { label: "Ignite / DoT", pill: "wh-pill-unique" },
    ],
    desc: "Brands attach to a pack and detonate on their own while you keep moving — Elementalist guarantees the ignite each detonation leaves behind, so the burn finishes what the hit started.",
    why: "brands are cast once per pack and kill without you standing still, which keeps the campaign safe on league-start defences.",
    creator: {
      name: "anime princess",
      channel: "https://www.youtube.com/@anime.princess",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=EOjw8h43-bk",
      written:
        "https://mobalytics.gg/poe/profile/animeprincess/builds/ignite-elementalist-league-starter-atanimeprincess",
    },
  },
  {
    title: "Guardian Holy Absolution",
    classLine: "Templar → Guardian",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Absolution", pill: "wh-pill-gem" },
      { label: "Minions", pill: "wh-pill-normal" },
    ],
    desc: "Absolution strikes a pack and raises the dead as sentinels that fight on, so the spell and the minions kill together — Guardian buffs both halves at once with auras.",
    why: "the sentinels are summoned by the skill itself, so you never farm corpses or re-summon between packs during the acts.",
    creator: {
      name: "ronarray",
      channel: "https://www.youtube.com/@ronarray",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=k6xZ3LckqtM",
      written:
        "https://mobalytics.gg/poe/builds/ronarray-holy-absolution-guardian",
    },
  },
  {
    title: "Occultist Essence Drain & Contagion",
    classLine: "Witch → Occultist",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Essence Drain", pill: "wh-pill-gem" },
      { label: "Chaos / DoT", pill: "wh-pill-unique" },
    ],
    desc: "Essence Drain rots a single target and Contagion spreads that rot to everything nearby, so one cast clears the pack — Occultist makes the spread bigger and the damage over time stronger.",
    why: "the damage is all over time, so it ignores weapon rolls entirely and only needs a leveling wand through the whole campaign.",
    creator: {
      name: "Goratha",
      channel: "https://www.youtube.com/@Goratha",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=jUeb5xBhmtc",
      written:
        "https://maxroll.gg/poe/build-guides/essence-drain-contagion-occultist-league-starter",
      pob: "https://pobb.in/KKwuS6uAOh7i",
    },
  },
  {
    title: "Slayer Bleed Slams",
    classLine: "Duelist → Slayer",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Perforate", pill: "wh-pill-gem" },
      { label: "Bleed / DoT", pill: "wh-pill-unique" },
    ],
    desc: "Slams apply a heavy bleed and the target dies to the bleeding rather than the hit — Slayer adds the overleech and culling that make standing in melee range survivable.",
    why: "bleed scales off a single big weapon roll, so one decent two-hander carries the whole campaign without support gear.",
    creator: {
      name: "PhazePlays",
      channel: "https://www.youtube.com/@PhazePlays_",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=PGj3Pcq4HFY",
      written:
        "https://mobalytics.gg/poe/profile/phazeplays/builds/3-28-phazeplays-bleed-slams-slayer-revamped-ground-slam-of-earthshaking",
      pob: "https://pobb.in/t9NEA_mIfOBn",
    },
  },
  {
    title: "Slayer Cyclone Shockwave",
    classLine: "Duelist → Slayer",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Cyclone", pill: "wh-pill-gem" },
      { label: "Melee", pill: "wh-pill-normal" },
    ],
    desc: "Cyclone spins you through packs while a shockwave fires off the hits, so movement and damage are the same button — Slayer supplies the overleech and area that keep it rolling.",
    why: "it never stops moving, so the acts go fast and the only gear check is one solid two-hander.",
    creator: {
      name: "Sanavixx",
      channel: "https://www.youtube.com/@SaNaViXX",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=H9-aXrx93w4&t=620s",
      written:
        "https://mobalytics.gg/poe/profile/grim-key-9npusx/builds/182c4c45-176a-45d2-b1f3-c4b327cb8e58",
      pob: "https://pobb.in/3O317e8QoBv2",
      site: "https://sanavixx.com/",
    },
  },
  {
    title: "Juggernaut Boneshatter",
    classLine: "Marauder → Juggernaut",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Boneshatter", pill: "wh-pill-gem" },
      { label: "Melee", pill: "wh-pill-normal" },
    ],
    desc: "Boneshatter hurts you every time you swing and hits harder the more stacks you are holding — Juggernaut answers that with stun immunity, armour and regen, so the self-damage never kills you.",
    why: "the ascendancy solves the skill\u2019s one weakness outright, which makes it the forgiving version of a very cheap melee starter.",
    creator: {
      name: "Zizaran",
      channel: "https://www.youtube.com/@Zizaran",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=ThANqlWYJ98",
      written:
        "https://maxroll.gg/poe/build-guides/boneshatter-juggernaut-league-starter",
      pob: "https://maxroll.gg/poe/pob/tcjqpe0t",
    },
  },
  {
    title: "Necromancer Holy Relic of Conviction",
    classLine: "Witch → Necromancer",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Holy Relic", pill: "wh-pill-gem" },
      { label: "Minions", pill: "wh-pill-normal" },
    ],
    desc: "The relic pulses damage every time you attack, so your own hit is only a trigger and the relic does the killing — Necromancer scales it and keeps you alive through minion-based recovery.",
    why: "damage comes entirely from the minion gem, so a white weapon is enough and every drop can go into defences instead.",
    creator: {
      name: "BalorMage",
      channel: "https://www.youtube.com/@Balormage",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=55YRrSHiHJk",
      written:
        "https://www.poe-vault.com/guides/holy-relic-necromancer-build-guide",
      pob: "https://pobb.in/a2xd4fVo1bTS",
    },
  },
  {
    title: "Pathfinder Poisonous Concoction of Bouncing",
    classLine: "Ranger → Pathfinder",
    budget: "Low",
    attr: "dex",
    tags: [
      { label: "Dexterity", pill: "wh-pill-dex" },
      { label: "Poisonous Concoction", pill: "wh-pill-gem" },
      { label: "Poison / DoT", pill: "wh-pill-unique" },
    ],
    desc: "You throw flasks instead of attacking, and the bouncing version chains them between packs — Pathfinder keeps the flasks full so the throwing never stops.",
    why: "the skill uses no weapon at all, so your damage is fixed from level 1 and nothing in the campaign can gear-check you.",
    creator: {
      name: "anime princess",
      channel: "https://www.youtube.com/@anime.princess",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=-63PxSlXIFM",
      written:
        "https://mobalytics.gg/poe/profile/animeprincess/builds/3-30-pconc-of-bouncing-atanimeprincess",
      pob: "https://pobb.in/Xb6N6JirbqBc",
    },
    lastUpdated: 3.3,
  },
  {
    title: "Elementalist Lightning Tendrils of Escalation",
    classLine: "Witch → Elementalist",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Lightning Tendrils", pill: "wh-pill-gem" },
      { label: "Channelled", pill: "wh-pill-normal" },
    ],
    desc: "A channelled beam that gets stronger the longer you hold it, so damage ramps inside each pack — Elementalist adds the exposure and shock that make the ramp land harder.",
    why: "it is a single gem with no unique requirement, so the whole campaign runs on a leveling wand and the tree.",
    creator: {
      name: "Master T",
      channel: "https://www.youtube.com/@MasterT_",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=eQPwM0HqSdY",
      written:
        "https://mobalytics.gg/poe/profile/mastert/builds/3-29-masterts-whispering-tendrils-elementalist",
    },
  },
  {
    title: "Warden Kinetic Fusillade",
    classLine: "Ranger → Warden",
    budget: "Low",
    attr: "dex",
    tags: [
      { label: "Dexterity", pill: "wh-pill-dex" },
      { label: "Kinetic Fusillade", pill: "wh-pill-gem" },
      { label: "Projectile", pill: "wh-pill-normal" },
    ],
    desc: "Wand projectiles split and ricochet through a pack as you channel — Warden layers on elemental ailments and the flask-driven defences that keep a ranged character out of trouble.",
    why: "it clears at range from act one with a plain wand, and the ascendancy handles ailments so you spend nothing on resistance gear early.",
    creator: {
      name: "Lolcohol",
      channel: "https://www.youtube.com/@Lolcohol",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=RaIM6AoO1S8&t=711s",
      written:
        "https://mobalytics.gg/poe/profile/lolcohol/builds/3-28-lolcohol-kinetic-fusillade-warden",
      pob: "https://pobb.in/u/lolcohol%234777/xwTYnLV84FLC",
    },
    lastUpdated: 3.28,
  },
  {
    title: "Elementalist Winter Orb",
    classLine: "Witch → Elementalist",
    budget: "Med–High",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Winter Orb", pill: "wh-pill-gem" },
      { label: "Power Charges", pill: "wh-pill-unique" },
    ],
    desc: "You channel once to build the orb, then it rains ice on its own while you keep running — Elementalist and a power-charge stacking tree turn that passive damage into the main source.",
    why: "the orb keeps killing while you move, but the charge-stacking version wants specific uniques, so treat it as the build you grow into rather than the day-one setup.",
    creator: {
      name: "Fubgun",
      channel: "https://www.youtube.com/@Fubgun",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=Zsi_S7Lft8A&t=234s",
      written:
        "https://mobalytics.gg/poe/builds/fubgun-winter-orb-elementalist",
      pob: "https://pobb.in/J6Pf3nkrUY0Z",
    },
  },
  {
    title: "Necromancer Raise Spectres",
    classLine: "Witch → Necromancer",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Raise Spectre", pill: "wh-pill-gem" },
      { label: "Minions", pill: "wh-pill-normal" },
    ],
    desc: "You raise monster corpses as permanent spectres and they fight for you — Necromancer makes them hit far above their level and keeps the whole pack alive.",
    why: "the spectres carry the damage, so your own gear only has to keep you standing while they clear the screen.",
    creator: {
      name: "Raychich",
      channel: "https://www.youtube.com/@raychich",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=Goc5Cay1rtM",
      written:
        "https://mobalytics.gg/poe/profile/raychich/builds/3-29-wretched-defiler-raychich",
      pob: "https://pobb.in/cHEfWP7-FdUs",
    },
    lastUpdated: 3.29,
  },
  {
    title: "Occultist Death\u2019s Oath",
    classLine: "Witch \u2192 Occultist",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Death\u2019s Oath", pill: "wh-pill-unique" },
      { label: "Chaos / DoT", pill: "wh-pill-gem" },
    ],
    desc: "The chest piece emits a chaos aura that kills everything you walk past, so clearing costs no button at all \u2014 Occultist covers the self-damage the armour inflicts and boosts the aura.",
    why: "one cheap unique is the entire damage plan, so the build works the moment you can equip it and never needs a weapon upgrade.",
    creator: {
      name: "aer0",
      channel: "https://www.youtube.com/@aer0",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=YXV2hBZWMgw",
      pob: "https://pobb.in/shqW4RwEog0h",
    },
    lastUpdated: 3.29,
  },
  {
    title: "Gladiator Earthquake",
    classLine: "Duelist \u2192 Gladiator",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Earthquake", pill: "wh-pill-gem" },
      { label: "Bleed / DoT", pill: "wh-pill-unique" },
    ],
    desc: "Earthquake plants a slam that erupts a moment later, so you hit twice per swing and bleed everything caught in it \u2014 Gladiator stacks block and bleed on top of that.",
    why: "block plus bleed means you survive mistakes while a single two-hander carries the damage all the way through the acts.",
    creator: {
      name: "Zizaran",
      channel: "https://www.youtube.com/@Zizaran",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=izLrG4YH3aE",
      pob: "https://pobb.in/CQjwpiUqHfs1",
    },
    lastUpdated: 3.29,
  },
  {
    title: "Elementalist Arc Ignite",
    classLine: "Witch \u2192 Elementalist",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Arc", pill: "wh-pill-gem" },
      { label: "Ignite / DoT", pill: "wh-pill-unique" },
    ],
    desc: "Arc chains between everything on screen and each link sets a burn \u2014 Elementalist guarantees the ignite, so one cast rots the whole pack while you walk away.",
    why: "chaining means you never aim, and the damage sits in the ignite rather than the hit, so a leveling wand is enough for the campaign.",
    creator: {
      name: "BuffaloBaron",
      channel: "https://www.youtube.com/@buffalobaron",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=YuDyMPb8ryw",
      pob: "https://pobb.in/BJhcIXdDu6zv",
    },
    lastUpdated: 3.29,
  },
  {
    title: "Guardian Static Strike",
    classLine: "Templar \u2192 Guardian",
    budget: "Low",
    attr: "str",
    tags: [
      { label: "Strength", pill: "wh-pill-str" },
      { label: "Static Strike", pill: "wh-pill-gem" },
      { label: "Melee", pill: "wh-pill-normal" },
    ],
    desc: "Static Strike leaves a shocking aura pulsing around you after each hit, so packs die while you keep walking \u2014 Guardian wraps that in auras and the recovery to stand in the middle of them.",
    why: "the aura clears between swings and Guardian\u2019s defences hold up on league-start gear, so neither damage nor survival gates the acts.",
    creator: {
      name: "Alohaa",
      channel: "https://www.youtube.com/@Alohaa-ll",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=MI3e0Gz6R6s",
      written:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTZ1VAGxd2AehH5RD1VPP3N1rxoPO3ibc-P3hN3adM_TFDh2yu26qg-vnoqnsol_lKSUHg6qowwhVF/pubhtml",
      pob: "https://pobb.in/0rKXrao_8pGM",
    },
    lastUpdated: 3.3,
  },
  {
    title: "Elementalist Glacial Cascade of the Fissure",
    classLine: "Witch \u2192 Elementalist",
    budget: "Low",
    attr: "int",
    tags: [
      { label: "Intelligence", pill: "wh-pill-int" },
      { label: "Glacial Cascade", pill: "wh-pill-gem" },
      { label: "Mines", pill: "wh-pill-normal" },
    ],
    desc: "You throw mines and detonate a line of ice spikes erupting outward from where they land \u2014 Elementalist adds the exposure and penetration, so the cascade one-shots packs from safety.",
    why: "mines mean you damage from off-screen and never stand in melee range, and the creator rates it a top league starter even for SSF.",
    creator: {
      name: "smokie_777",
      channel: "https://www.youtube.com/@smokie_777",
    },
    links: {
      youtube: "https://www.youtube.com/watch?v=XbPkEupMSbo",
      pob: "https://poe.ninja/poe1/pob/9244b",
    },
    lastUpdated: 3.29,
  },
];

const FILTERS: Array<{ key: "all" | Attribute; label: string }> = [
  { key: "all", label: "All" },
  { key: "str", label: "Strength" },
  { key: "dex", label: "Dexterity" },
  { key: "int", label: "Intelligence" },
];

function LeagueStartBuilds() {
  const [filter, setFilter] = useState<"all" | Attribute>("all");
  const visible = BUILDS.filter(
    (build) => filter === "all" || build.attr === filter,
  );

  return (
    <main className="wh-wrap">
      <div className="wh-page-head">
        <div className="wh-eyebrow">01 · Builds</div>
        <h1>League-Start Builds</h1>
      </div>

      <div
        className="wh-filter-bar"
        role="group"
        aria-label="Filter by attribute"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={
              filter === f.key ? "wh-filter-btn is-active" : "wh-filter-btn"
            }
            onClick={() => setFilter(f.key)}
          >
            {f.key === "all" ? `All · ${BUILDS.length}` : f.label}
          </button>
        ))}
        <span className="wh-filter-count">Showing {visible.length}</span>
      </div>

      <div className="wh-build-grid">
        {visible.map((build) => (
          <article key={build.title} className="wh-card wh-build-card">
            <div className="wh-build-top">
              <div>
                <h3>{build.title}</h3>
                <div className="wh-class-line">{build.classLine}</div>
              </div>
              <div className="wh-budget">
                Budget
                <b>{build.budget}</b>
              </div>
            </div>
            <div className="wh-tag-row">
              {build.tags.map((tag) => (
                <span key={tag.label} className={`wh-pill ${tag.pill}`}>
                  {tag.label}
                </span>
              ))}
            </div>
            <p className="wh-desc">{build.desc}</p>
            <p className="wh-why">
              <b>Why league start:</b> {build.why}
            </p>
            <BuildLinks creator={build.creator} links={build.links} />
          </article>
        ))}
      </div>
    </main>
  );
}
