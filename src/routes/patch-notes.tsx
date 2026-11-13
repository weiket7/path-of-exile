import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/patch-notes")({ component: PatchNotes });

const SOURCE_URL = "https://www.pathofexile.com/forum/view-thread/4013680";

interface Section {
  title: string;
  points: Array<string>;
}

/**
 * Condensed digest of GGG's 3.30.0 patch notes, written in our own words.
 * The full notes are GGG's copyrighted text — link out, don't mirror.
 */
const SECTIONS: Array<Section> = [
  {
    title: "Covens of Umbra challenge league",
    points: [
      "Covenites perform rites to summon their Queen; disrupting one lets you pick a Fate for that area's boss.",
      "Each Fate raises both the difficulty and the rewards, and they stack into a genuinely dangerous fight.",
      "Bosses empowered by Fates drop Viscera, which you place on your own Wickerman to keep a piece of their power.",
      "40 new challenges (8 in Ruthless), with Totem Pole hideout pieces from the 19th challenge onward, then every third.",
      "Standard, Hardcore and SSF variants exist; Hardcore is parented to Standard, so a death drops you into the Standard league.",
    ],
  },
  {
    title: "New content and features",
    points: [
      "New Intelligence skill Arcane Link — buffs an allied player, adds lightning damage based on your mana, and kills you if they die.",
      "New Transfigured skill Fireball of Radiation — a fire ball that applies a short, heavy fire damage over time debuff.",
      "11 new unique items and a new jewel base type, Mycelium Core.",
      "69 more foiled Tier 17 Valdo's Map options, and 96 more foiled uniques from the Voidborn Reliquary.",
      "Most pinnacle items, fragments and keys now have their own audio.",
    ],
  },
  {
    title: "Endgame: Scarabs become Threads",
    points: [
      "Scarabs are gone. Threads replace them — one per league mechanic (Abyss, Bestiary, Betrayal, Blight, Breach, Expedition, Incursion, Legion, Ritual, Ultimatum).",
      "Apply Threads at the Map Device to force that mechanic into the area; up to 8, with escalating chances of powerful randomised effects.",
      "Existing Scarabs convert to the matching Thread or to a Frayed Thread; Veiled Scarabs all become Frayed Threads.",
      "Those ten mechanics no longer spawn randomly in maps — if you want them, you bring the Thread.",
      "Shaped Regions reworked: ten types, one per Thread, each granting free Threads to maps in the region.",
      "Delirium Orbs now reforge the map with a Delirious percentage (5–50% each, stacking to 100%) instead of enchanting it.",
      "Divine Vessels, Allflame Embers and Mercenary Warrants became currency items rather than map fragments.",
      "31 maps returned to the Atlas and 31 were removed; four new meta-crafting bench options were added.",
    ],
  },
  {
    title: "Atlas passive tree",
    points: [
      "Completely reworked — you now start at the centre and build outwards.",
      "150 total points, up from 138; Uber Elder now gives 4 points, and the other pinnacle bosses give 2 each.",
      "Every primary league mechanic cluster was rebuilt; Delve and Heist clusters were removed entirely.",
      "All Scarab clusters became Thread clusters, and much of what Scarabs used to do is now baked into the tree.",
      "Six keystones removed; a new one, Phantom Anomalies, moves Atlas Anomalies onto Shaped Region completion.",
    ],
  },
  {
    title: "Mirage goes core",
    points: [
      "Mirages can now appear in map areas, and the Black Barya shows up on the Atlas in every league (now area level 84).",
      "Saresh, of the Weeping Black is substantially harder and no longer drops a map containing a Mirage.",
      "Djinn Coins are gone, so each Djinn wish Sigil was given a new effect.",
      "Several Mirage-specific incubators and the Coins of Restoration and Desecration can no longer be obtained.",
      "Mirage league uniques now count toward Unique Stash Tab completion.",
    ],
  },
  {
    title: "League reworks",
    points: [
      "Incursion: Atziri has moved into the Temple of Atzoatl. Vials no longer drop, their uniques come from Cradle of Creation temples, and the Atziri fight itself was reworked (no pause, melee attacks, no immunity phases, far less reflect).",
      "Harvest: no more separate subarea — Sacred Flora spawn directly in maps, and fewer, larger Lifeforce drops.",
      "Betrayal: Syndicate safehouse rewards now give unique item stashes, Allflame Embers or Threads instead of Scarabs.",
      "Expedition: Gwennen no longer gambles items — she flips a coin on one of your rares between crafting options.",
      "Ritual: Blood-Filled Vessels now require Ritual Threads on the map; rerolls always produce at least one Omen.",
      "Bestiary: yellow beasts are no longer captured, only killed, and are no longer needed for beastcrafting recipes.",
      "Heist: Whakano sells contracts and blueprints for gold at level 68+, and contracts can award bonus blueprint reveals.",
    ],
  },
  {
    title: "Item generation rework",
    points: [
      "Item Rarity on monsters now decides which drop pools can roll at all, not just the rarity of what drops.",
      "Currency split into magic-tier (Transmutation, Alteration, Jeweller's) and rare-tier (Alchemy, Chaos, Divine, Mirror) pools — more rarity means better currency.",
      "The old penalty that cut rare and unique monsters' non-rarity drops by 80% is gone, so valuable currency now comes mostly from them.",
      "Rare and magic monster mods no longer add item quantity; rarity was raised to compensate across the board.",
      "From Act 6, rare and magic items can roll an Item Tier of 2–5, driving modifier tiers, base type, quality, sockets and links.",
      "Map modifiers now grant Atlas Drops where they used to grant quantity, scaling maps, Threads and league resources.",
      "Modifier Tier Rating was rebuilt so it no longer distorts which mods appear, and no longer has breakpoints.",
      "Many sources of fractured items were removed; Tier 5 items can drop fractured instead.",
    ],
  },
  {
    title: "General changes",
    points: [
      "The Viridian Wildwood can now spawn in Act 7's Northern Forest and Dread Thicket; a Mirage can spawn in Act 9's Vastiri Desert and Oasis. Neither applies in Ruthless.",
      "New crafting bench option to set every socket white for an Orb of Scouring (plus a Vaal Orb on corrupted items).",
      "Scrolls of Wisdom are now bought with gold (15 each) in every town, and Orbs of Transmutation cost an Orb of Augmentation.",
      "Currency Stash Tab reshuffled: Reflecting Mist can be stored, shards can't, and a long list of league items (Allflame Embers, Soul Cores, Royal Visage, Refracting Fog) moved into the League section.",
      "Stat text no longer says \"nearby\" \u2014 effects now state their range in metres. Purely descriptive; the ranges didn't change.",
      "Notables from anointments and cluster jewels are keyworded inline instead of shown in a separate side panel.",
    ],
  },
  {
    title: "Ascendancy",
    points: [
      "Reliquarian notables were shuffled for the new league.",
      "Pathfinder: Master Surgeon now cuts flask recovery rate rather than recovery, Master Alchemist removes all ailments, and Master Distiller's per-flask bonuses were retuned.",
      "Warden gained broadly \u2014 Barkskin generates faster and mitigates more, and Unbound Avatar lasts 15 seconds (was 10).",
      "Trickster: Heartstopper now gives 75% less damage over time, minimum action speed is 105% of base, and Spellbreaker suppresses more.",
      "A long tail of other ascendancies was retuned too \u2014 Chieftain, Slayer, Champion, Hierophant, Guardian, Saboteur, Elementalist, Occultist and Ascendant all have notable changes in the source notes.",
    ],
  },
  {
    title: "Skill and support gems",
    points: [
      "Flame Link gives much more flat added fire damage, but scales off 3% of your maximum life (was 5%).",
      "Pact of Beidat, the Flame, Lightning and Stone Golems, and Winter Orb were all trimmed slightly.",
      "Transfusion Support no longer supports instant spells; it now grants a nearby minion a charge per 400 life spent on upfront costs.",
      "Vaal Sacrifice Support now leaves you at 20% of maximum life and energy shield instead of 1.",
    ],
  },
  {
    title: "Unique items",
    points: [
      "Atziri's Acuity: leech from critical strikes is instant, but you cannot regenerate or recoup life. Existing copies are unaffected.",
      "Doedre's Tongue only drops from Covens of Umbra encounters now, with higher resistances and new \"damage can ignite/shock/freeze cursed enemies\" mods.",
      "Doryani's Invitation always drops corrupted with an implicit and four randomised modifiers.",
      "Femurs of the Saints was rebuilt around a new pool of per-minion modifiers, with higher socketed gem levels and minion damage.",
      "Shavronne's Wrappings trades faster energy shield recharge start for recoup; Malachai's Loop, Shadowstitch, Ralakesh's Impatience and several others were retuned.",
    ],
  },
  {
    title: "Items and crafting",
    points: [
      "Orbs of Chance are far more likely to produce a unique, and correspondingly much rarer \u2014 vendors no longer sell them and most recipes that cost them now cost Alteration or Alchemy instead.",
      "Orbs of Binding can no longer be obtained (existing ones still work); Alchemy and Sacred Orbs are more common.",
      "Imprinting and mirroring no longer count as modifying an item, so Eternal Orbs and Mirrors don't work on \"can be modified while Corrupted\" items and don't clear Hinekora's Lock.",
      "Rog rerolls 1, 3 or 5 times (was 3, 6 or 10), and the Recombinator keeps the selected base's item level instead of averaging.",
      "Implicits on most Atlas base types were raised \u2014 Blessed Orb your existing ones to catch up.",
      "Reliquary and Valdo's Map rewards now always drop unidentified.",
    ],
  },
  {
    title: "Mercenaries",
    points: [
      "Hired mercenaries deal up to 20% less attack damage at level 83 and scale damage reduction worse at high levels.",
      "They now take resistance penalties by area level: -30% in levels 46\u201367, -60% in level 68+ areas and hideouts.",
      "More base and increased maximum life to compensate.",
      "Kalandra's Touch, Untouched Soul and Screams of the Desiccated no longer work on them; several mercenary support gem versions were retuned.",
    ],
  },
  {
    title: "Divination cards",
    points: [
      "Cards can no longer award current league-specific items; the pools update if those items go core.",
      "Eight cards are temporarily disabled: Buried Treasure, Cameria's Cut, Man With Bear, More is Never Enough, The Card Sharp, The Deal, The Rabbit's Foot and The Silly Boy.",
      "Rebirth and Renewal now rewards an item level 86 Simplex Amulet.",
    ],
  },
  {
    title: "Ruthless",
    points: [
      "Each randomly spawning league mechanic now rolls independently, so more of them appear across the campaign.",
      "Map sustain was cut: bonus higher-tier boss drops are much rarer and the three-maps-for-one-higher recipe is gone.",
      "Voidstones set a quadrant's minimum map tier to 12 (was 16) and no longer convert tier 1\u201315 drops to gold.",
      "Kirac caps at tier 14, unlocks tiers more slowly and charges more gold; Tujen no longer sells oils.",
    ],
  },
  {
    title: "Monsters, UI and microtransactions",
    points: [
      "Monster packs from strongboxes can now inherently roll magic or rare.",
      "Area modifier keywords need Alt held to pin, and controller users can toggle stash and inventory with the Currency Exchange open.",
      "Locust Swarm rare finisher and Locust Footprints are enabled in Path of Exile; a handful of other microtransaction fixes landed.",
    ],
  },
  {
    title: "Bug fixes",
    points: [
      "Chance to deal double damage while on full life no longer rolls an extra time against full-life enemies.",
      "Assassin's Mark from Deathmarked no longer triggers from spell critical strikes.",
      "Ghorr's Magnificence was making you take more damage instead of less.",
      "Gigantic Rogue Exiles split twice again, as intended before 3.27.0.",
      "Plus a long list of display, tooltip, localisation and audio fixes \u2014 the full list is in the source notes.",
    ],
  },
];

const IMAGES = [
  {
    src: "https://web.poecdn.com/public/news/2026-11-09/POE1/Infographic/CovensofUmbra_Infographic.png",
    alt: "Covens of Umbra league infographic",
    caption: "Covens of Umbra — league infographic",
  },
  {
    src: "https://web.poecdn.com/public/news/2026-11-10/reliquarian-martial.png",
    alt: "Reliquarian martial weapon mystery box art",
    caption: "Reliquarian — martial",
  },
  {
    src: "https://web.poecdn.com/public/news/2026-11-10/reliquarian-caster.png",
    alt: "Reliquarian caster weapon art",
    caption: "Reliquarian — caster",
  },
  {
    src: "https://web.poecdn.com/public/news/2026-11-10/reliquarian-armour.png",
    alt: "Reliquarian armour art",
    caption: "Reliquarian — armour",
  },
  {
    src: "https://web.poecdn.com/public/news/2026-11-10/reliquarian-jewellery.png",
    alt: "Reliquarian jewellery art",
    caption: "Reliquarian — jewellery",
  },
];

function PatchNotes() {
  return (
    <main className="wh-wrap">
      <div className="wh-page-head">
        <div className="wh-eyebrow">00 · Patch</div>
        <h1>3.30 Patch Notes</h1>
        <p>
          Content Update 3.30.0 — Path of Exile: Covens of Umbra. The headline
          changes, condensed. Scarabs are gone, the Atlas passive tree was
          rebuilt from the centre out, and item generation works differently
          from the ground up.
        </p>
        <div className="wh-link-row">
          <a
            className="wh-btn wh-btn-primary"
            href={SOURCE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Full official notes
          </a>
          <a
            className="wh-btn wh-btn-ghost"
            href="https://www.pathofexile.com/covens"
            target="_blank"
            rel="noreferrer"
          >
            Expansion page
          </a>
        </div>
      </div>

      <figure className="wh-patch-figure">
        <img
          className="wh-patch-img"
          src={IMAGES[0].src}
          alt={IMAGES[0].alt}
          loading="lazy"
        />
        <figcaption className="wh-mono">{IMAGES[0].caption}</figcaption>
      </figure>

      {SECTIONS.map((section) => (
        <div className="wh-act-panel" key={section.title}>
          <div className="wh-act-panel-head">
            <div>
              <h2>{section.title}</h2>
            </div>
            <div className="wh-act-meta wh-mono">
              <span>3.30.0</span>
            </div>
          </div>
          <ul className="wh-patch-list">
            {section.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="wh-act-panel">
        <div className="wh-act-panel-head">
          <div>
            <h2>Voidborn Reliquary art</h2>
            <span>96 more foiled uniques were added to the pool</span>
          </div>
        </div>
        <div className="wh-patch-gallery">
          {IMAGES.slice(1).map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption className="wh-mono">{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <p className="wh-mono wh-patch-source">
        Summarised from GGG&apos;s official patch notes thread. Path of Exile ©
        Grinding Gear Games — images served from their CDN.{" "}
        <a href={SOURCE_URL} target="_blank" rel="noreferrer">
          Read the full notes
        </a>
        .
      </p>
    </main>
  );
}
