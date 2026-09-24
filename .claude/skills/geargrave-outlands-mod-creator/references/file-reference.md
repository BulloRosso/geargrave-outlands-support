# Geargrave Outlands mod file reference

Everything a mod can contain, file by file, with worked examples. Exact field lists are
in [`schemas/`](schemas/) (JSON Schema, generated from the game); every id you may
borrow from the base game is in [`base-catalog.md`](base-catalog.md); art rules are in
[`art-guide.md`](art-guide.md). The complete example mod is `modding/examples/salt_bell/`
in the support repository.

**Always finish with the validator** (chapter 16). It reads your folder exactly the way
the game does and names every problem with file and JSON path.

| # | Chapter | File |
|---|---|---|
| 1 | What a mod is, what the player starts with | — |
| 2 | The map | `level.json` |
| 3 | Factions | `level.json` + `factions.json` |
| 4 | Building actions | `actions.json` |
| 5 | Junction events | `events.json` |
| 6 | Roadside events | `travel_legs.json` |
| 7 | Battles and finds | `encounters/*.json` |
| 8 | Story goals and battle outcomes | `progression.json` |
| 9 | Vehicles | `vehicles.json` + vehicle art |
| 10 | Parts, upgrades and doctrine tags | `parts.json`, `doctrines.json` |
| 11 | Characters, perks, traits | `characters.json` |
| 12 | Bonds and combos | `relationships.json` |
| 13 | NPC dialog trees | `conversations.json` |
| 14 | Sound effects and music | `audio.json` |
| 15 | Endings | `epilogues.json` |
| 16 | Translations | `i18n/*.csv` |
| 17 | Validate | — |

---

## 1. What a mod is

A mod is **one folder** = one level: its own map, story, battles, ending and sounds.
The folder name is the level id.

```
<mod_id>/
  level.json          REQUIRED  the map: factions, locations, buildings, roads, crews
  assets/             every image (map, banner, scenes, buildings, vehicles, portraits, panels)
    audio/            your sound effects and music (any sub-folder name works)
  actions.json        building actions
  events.json         junction events
  travel_legs.json    roadside events (replaces the game's pool while your level is active)
  encounters/         battles and finds, one <encounter_id>.json each
  progression.json    story goals + what winning a battle changes
  factions.json       full faction profiles (dossier, leader, broadcasts, contracts)
  vehicles.json       vehicles for shops, wrecks and rewards
  parts.json          parts / cargo items
  doctrines.json      doctrine points for your parts and characters
  characters.json     recruitable characters
  relationships.json  bonds and combos between characters
  conversations.json  NPC dialog trees
  audio.json          sound effects and music playlists
  epilogues.json      the ending comic
  i18n/*.csv          translations
```

Only `level.json` is required. Every overlay file merges over the base game **by id**
(your entry wins) and only while your level is the active one.

**Where it goes.** `levels/` inside the game's install folder, next to the official
`sector_east/` and `sector_west/` (Steam: right-click the game → *Manage* → *Browse local
files*). The level picker lists it; its **MODS** button shows every mod folder with the
validator's findings.

**Ids.** Everything you define is **lowercase snake_case and globally unique**: crew
positions, saves and story flags store bare ids. Prefix all of them with a 2–3 letter tag
(`sb_` for "salt_bell"). Sound keys are UPPER_SNAKE (`SB_BELL`). Character **names**
must be unique too — bonds and combos match characters by name.

**JSON rules.** camelCase keys, enums as strings, colours as 6-digit hex without `#`.
Keys starting with `_` and the key `comment` are ignored everywhere — use `"_note": "…"`.

| Tolerates `//` comments | Strict JSON (a comment or trailing comma makes the game skip the whole file) |
|---|---|
| `level.json`, `audio.json`, `epilogues.json`, `mascots.json`, `parts.json`, `progression.json`, `relationships.json`, `doctrines.json` | `actions.json`, `events.json`, `travel_legs.json`, `encounters/*.json`, `characters.json`, `vehicles.json`, `factions.json`, `conversations.json` |

**Image names.** A field that names an image (`sceneImagePath`, `bannerImage`, portraits,
emblems, encounter / dialog / epilogue / roadside images, part images) takes a **bare name**
(the game adds `.png`) **or** an explicit `.png` / `.jpg` / `.webp` file name — use `.jpg`
for big full-frame scenes. File names the game builds itself must be PNG:
`map_background.png`, `building_<id>_<status>.png` and every vehicle skin file
(`vehicle-sideview-<skin>.png` …).

Trailing commas are only allowed in `level.json`, `audio.json`, `epilogues.json` and
`progression.json`. Simplest rule: write strict JSON everywhere.

### What the player starts with

A fresh start on your level (the level picker's ROLL OUT) always seeds the **standard
convoy**: Malik (Leader), Ellaine (Driver), Vane (Leader), Sable (Driver), Cap (the robot
adviser) and a few unnamed hands, riding a motorcycle, a pickup, a workshop truck, a
dune buggy and a few more starter vehicles. They start at your `startingCrews` location.
You may reference them by **name** in bonds, combos and dialog gates (`Cap`, `Malik`,
`Ellaine`, `Vane`, `Sable`).

Starting stock on *normal* difficulty (scaled by difficulty; override single values
with `startingResources`):

| key | start | | key | start |
|---|---|---|---|---|
| `water` | 100 | | `tires` | 9 |
| `fuel_regular` | 18 | | `special_spare_parts` | 8 |
| `fuel_diesel` | 4 | | `screws` | 6 |
| `ammo_normal` | 120 | | `sheet_metal` | 2 |
| `ammo_explosive` | 6 | | `resistors`, `pistons` | 0 |

Water is drunk every day (about one per crew member), fuel burns per road segment, so
early costs of 2–6 water or fuel are noticeable but fair.

**Fog of knowledge.** Every location is drawn on the map from the start, but a location
nobody has visited is unnamed; planners show it only as "road to the east". It becomes
known when a crew arrives there, or through `revealLocation` / `revealMap` effects and
an event's `revealsLocations`. The starting location is known.

---

## 2. `level.json` — the map

The map is one bitmap, `assets/map_background.png`, standard **3840×2160**. Every
position is a pixel `[x, y]` on it, **≥ 60 px from every edge**.

```jsonc
{
  "id": "salt_bell",                          // MUST equal the folder name
  "displayName": "Salt Bell",
  "description": "A dead inland sea of white salt pans …",   // picker subtitle: name the climate
  "version": "1.0",
  "author": "Your Name",
  "bannerImage": "banner.png",                // in assets/, a 1536×368 strip
  "capBriefing": { "en": "Cap's pitch …", "de": "…" },       // or a plain string
  "defaultRoadTerrain": "salzsee",            // battle backdrop default (catalog)
  "terrainTheme": "desert",                   // battle header art: "desert" | "winter"
  "startingResources": { "water": 80 },       // absolute overrides, fresh start only
  "factions":  [ … ],                         // chapter 3
  "locations": [ … ],
  "roads":     [ … ],
  "startingCrews": [ { "id": "sb_crew", "displayName": "Bell Runners", "locationId": "sb_bellwell" } ]
}
```

`startingCrews` makes the level playable as a fresh start. Without it, the level is only
reachable through a gateway from another level.

### Location

```jsonc
{
  "id": "sb_bellwell",
  "displayName": "Bellwell",
  "pos": [820, 1310],                   // on a painted landmark of your map
  "factionId": "sb_bell_folk",          // default "neutral"
  "type": "Settlement",                 // Settlement | GasStation | Factory | MilitaryBase | Ruin | Farm
  "status": "inhabited",                // inhabited | abandoned | destroyed (picks the building art)
  "description": "Two paragraphs.\n\nSecond paragraph.",
  "sceneImagePath": "location_scene_sb_bellwell.jpg",   // in assets/ — .png, .jpg or .webp
  "buildings": [ … ],
  "exitToLevelId": "", "exitToLocationId": "", "exitRequiredFlag": "",   // gateway
  "rebuiltFlag": "", "rebuiltStatus": "", "rebuiltDescription": "", "rebuiltSceneImagePath": "",
  "recon": false
}
```

`rebuilt*` = a second face that takes over once `rebuiltFlag` is set (the town you helped
rebuild). `recon: true` = a road-less hidden site found by recon missions.

### Building

```jsonc
{
  "id": "sb_bell_gantry",
  "displayName": "The Bell Gantry",
  "type": "Watchtower",       // VehicleShop | RepairShop | TownHall | Arena | Clinic | Watchtower |
                              // Workshop | Bunker | Chapel | Library | MotorPool | Caravanserai
  "description": "…",
  "actionIds": ["sb_inspect_bell", "conv_sb_founder", "heal_crew"],
  "requiredFactionId": "", "requiredReputation": 0,   // standing gate (see chapter 3)
  "requiredCharacterId": "",                          // a character that must ride with the convoy
  "requiredItem": "",                                 // a resource key the convoy must hold
  "requiredStoryFlag": "",
  "hiddenUntilStoryFlag": false                       // true = invisible until requiredStoryFlag is set
}
```

`actionIds` takes your `actions.json` ids, built-in actions (catalog), and
`conv_<conversation id>` to put an NPC dialog on the building. Art:
`assets/building_<buildingId>_<status>.png` (4:3); missing → a type glyph.

### Road, junction, wreck

```jsonc
{
  "id": "sb_road_01", "fromId": "sb_bellwell", "toId": "sb_hulk",
  "type": "CountryRoad",           // Highway | CountryRoad | OffroadTrack
  "passability": "Open",           // Open | BlockedEnemy | BlockedDamage (not routable until openRoad)
  "blockadeFactionId": "",         // a faction that mans a toll blockade here (chapter 3)
  "minSkulls": 0,                  // floor for generated roadside battles on this road
  "joints": [ { "id": "sb_joint_01a", "displayName": "Glare Cut", "pos": [1400, 1250], "eventId": "sb_evt_ambush" } ],
  "wrecks": [ { "id": "sb_wreck_rv", "displayName": "Beached Motorhome", "description": "…",
                "recoverVehicleId": "sb_rv_found", "recoverRequirement": "tow_tier_b",
                "setsStoryFlag": "sb_rv_recovered", "requiredStoryFlag": "" } ]
}
```

- One day per segment: n joints = n+1 days of driving.
- The same joint id on two roads = one shared junction (same `pos`).
- **Wrecks** are recovered automatically when a crew drives that road and meets
  `recoverRequirement`: `""` (anyone), `mechanic` (an unwounded Mechanic aboard), or
  `tow_tier_a` / `tow_tier_b` / `tow_tier_c` (a vehicle that can tow a car / a truck or
  bus / a tank). `recoverVehicleId` names a vehicle from **your** `vehicles.json`
  (chapter 9); the wreck is shown once the road has been driven.

### Gateways

`exitToLevelId` + `exitToLocationId` let an idle crew travel to another level; make them
two-way. Linking into an official level would mean editing it, so a mod usually stands
alone (its own `startingCrews`) or links to another mod.

---

## 3. Factions — describing and setting one up

A faction is who owns the places, who the player bargains with and whose radio chatter
fills the map. Design it before you write JSON:

1. **Identity in one line** — what they are and what they want. *"The Bell Folk: well
   keepers who trade water for news and fear silence more than thirst."*
2. **Leader** — a name, a title, and a *speech style* (how they talk: "short sentences,
   weather words, never says no directly").
3. **Want / fear / price** — what they trade (`specialityResources`), what angers them,
   what they pay for (contracts, deliveries).
4. **Relations** — who they like and hate (`spillover`: helping them moves your standing
   with others).
5. **Look** — a colour (map ring), an emblem, the leader's face in three moods.

### Step 1: declare it in `level.json`

```jsonc
"factions": [
  { "id": "sb_bell_folk", "displayName": "The Bell Folk", "color": "c8b98a" },
  { "id": "sb_saltmen",   "displayName": "The Saltmen",   "color": "8a3b2a" }
]
```

This alone makes the faction exist: it owns locations (`factionId`), has a reputation,
and works in actions (`applyReputation`, `reputationAtLeast`) and building gates.

### Step 2: the full profile in `factions.json`

```json
{ "factions": [ {
  "id": "sb_bell_folk",
  "displayName": "The Bell Folk",
  "color": "c8b98a",
  "leaderName": "Warden Ilse Marr",
  "leaderTitle": "Keeper of the Well",
  "speechStyle": "short sentences, weather words, never says no directly",
  "emblem": "emblem_sb_bell_folk",
  "familyPhoto": "family_sb_bell_folk",
  "portraitMoods": {
    "neutral": "portrait_sb_ilse_neutral",
    "pleased": "portrait_sb_ilse_pleased",
    "angry":   "portrait_sb_ilse_angry"
  },
  "specialityResources": ["water"],
  "spillover": { "sb_saltmen": -0.5 },
  "blockadeToll": { "water": 4 },
  "leaderBackstory": [
    "Ilse Marr was the well's third keeper and the first who could read the old pump manuals.",
    "She rang the bell the night the sea died, and has been waiting twelve years for anyone to answer."
  ],
  "broadcasts": [
    "Bellwell to all roads: water at the rope, news at the gate. Bring both.",
    "No bell again tonight. The pans are quiet. Quiet is not the same as safe."
  ],
  "broadcastSets": [
    { "requiresFlag": ["sb_bell_rung"],
      "lines": [ "Bellwell to all roads: the bell speaks again. Caravans, you know the way." ] }
  ],
  "history": {
    "masthead": "THE WELL ROPE",
    "tagline": "News by the bucket.",
    "dateline": "Bellwell, twelfth dry year",
    "headline": "A TOWN THAT WAITS FOR A SOUND",
    "subhead": "How the Bell Folk kept a well alive on a dead sea.",
    "illustration": "history_sb_bell_folk",
    "illustrationCaption": "The gantry at dusk, rope in hand.",
    "fightImage": "fight_sb_bell_folk",
    "fightCaption": "They do not fight. They close the well.",
    "hatedMascotId": "",
    "sections": [ { "title": "What the old world ran on", "body": "Salt, shipping and a canal nobody finished." } ],
    "people": [ { "characterId": "sb_maren", "name": "Maren Kett", "stance": "loves",
                  "note": "The founder's daughter. They would follow her into the pans." } ]
  },
  "deliveryOffers": [
    { "id": "sb_water_run", "minLevel": "accepted", "goods": { "water": 12 },
      "price": { "ammo_normal": 10 }, "cooldownDays": 5 }
  ],
  "contracts": [
    { "id": "sb_mail_bag", "kind": "haul", "minLevel": "accepted", "to": "$nearestOwn", "days": 4,
      "pitch": "A mail bag for our nearest post. Don't read it. Everyone reads it.",
      "reward": { "goods": { "water": 10 }, "rep": 1 }, "penalty": { "rep": -1 } }
  ],
  "requiresFlag": ""
} ] }
```

| Field | What it does |
|---|---|
| `emblem`, `familyPhoto`, `portraitMoods.*`, `history.illustration`, `history.fightImage` | bare image names in your `assets/` (`.png` added if you omit the extension) |
| `portraitMoods` | the leader's face on the intercom and dossier: `neutral`, `pleased` (from *liked*), `angry` (from *unfriendly*); a missing mood falls back to `neutral` |
| `specialityResources` | what their posts trade best |
| `spillover` | `{ other faction: factor }`: +2 with them moves the other by factor × 2 (negative = rivals) |
| `blockadeToll` | the toll a `blockadeFactionId` road charges to pass |
| `leaderBackstory`, `broadcasts` | dossier text and radio lines on the map |
| `broadcastSets` | alternative radio lines once flags are (not) set; the first match replaces `broadcasts` |
| `history` | the dossier's newspaper page (masthead, headline, sections, people who love/hate named characters — `stance` `loves` / `hates` shifts standing while that character rides with you) |
| `deliveryOffers` | goods they deliver for a price at a standing (`minLevel`), repeating every `cooldownDays` |
| `contracts` | jobs over the radio: `haul` (carry to `to`: a location id or `$nearestOwn`), `escort` (`escortVehicle`, a chassis, rides in your rearguard next run), `bounty` (`target` = a faction whose vehicles to hunt); `reward` / `penalty` in goods and `rep` |
| `requiresFlag` | hide the faction from lists until the story introduces it |
| contract `requiresFlag` | offer the contract only once a story flag is set |

All dossier art (`familyPhoto`, `history.illustration`, `fightImage`, `hatedMascotImage`) is
optional; `hatedMascotId` + `hatedMascotImage` + `hatedMascotCaption` show a mascot the
faction hates. Ignore `levelThresholds` and `company` (game-wide rules; a mod's copy is
ignored) and delivery `vehicleId` (unused).

**Reputation.** Starts at **0** with every faction. Levels: `hostile` ≤ −4,
`unfriendly` ≤ −2, neutral, `accepted` ≥ 1, `liked` ≥ 2, `allied` ≥ 4. Move it with the
action effect `applyReputation` (`"$loc"` = the owner of the location the building stands
in; don't use `$loc` on a `neutral` location). Gate with `reputationAtLeast` /
`reputationAtMost` or a building's `requiredReputation`. Standing also shifts prices at
that faction's posts: allied −20 %, liked −10 %, neutral/accepted ±0, unfriendly and hostile +15 % (purchases in actions, vehicle shops and trade).

**Factions in battle.** A battle's `faction` field only knows the game's own combat
factions (catalog, `FactionId`); it drives enemy behaviour and radio chatter. Your mod's
faction is a *map* faction. To make a battle "theirs": set `"faction": "None"`, give it a
`gang` block (chapter 7) for their fighting style, name the vehicles in their voice, and
let the story move the standing — e.g. the win sets a flag (`progression.json`) and a
follow-up action at their post (`flagPresent` → `applyReputation`) pays out.

Faction art (see art-guide): emblem, three leader portraits, optional family photo,
history illustration and fight image.

---

## 4. `actions.json` — building actions

A building button is an action: **requires** (all must pass, else the button is disabled
with the reason) → **effects** (applied in order) → **result** text.

```json
{ "actions": [ {
  "id": "sb_buy_mould",
  "label": "BUY THE BELL MOULD",
  "requires": [
    { "type": "flagPresent", "flag": "sb_bell_cracked", "reason": "Nobody here needs a mould yet." },
    { "type": "flagAbsent",  "flag": "sb_mould_found",  "reason": "You already have the mould." },
    { "type": "resourceAtLeast", "resource": "ammo_normal", "amount": 4, "reason": "The chandler wants 4 rounds." },
    { "type": "reputationAtLeast", "faction": "sb_bell_folk", "amount": 1, "reason": "Only for friends of the well." }
  ],
  "effects": [
    { "type": "grantResource", "resource": "ammo_normal", "amount": -4 },
    { "type": "grantPart", "part": "sb_bell_mould" },
    { "type": "setFlag", "flag": "sb_mould_found" },
    { "type": "applyReputation", "faction": "$loc", "amount": 1 },
    { "type": "playSound", "sound": "SB_HULL_GONG" }
  ],
  "resultKey": "SB_BUY_MOULD_DONE",
  "resultFallback": "The chandler wraps the mould in sailcloth like a newborn.",
  "cooldownDays": 0
} ] }
```

- `label` = the button text (English; short, upper case reads best). Without it the button
  shows the id in capitals. Translate it with the key `ACTION_<ID>` (or your own `labelKey`).
- `reason` / `resultFallback` = English text; `reasonKey` / `resultKey` = optional
  translation keys (chapter 16).
- `cooldownDays` > 0 makes a repeatable action rest that many days (a well, a scrap pile).
- An action with a built-in id **replaces** that action while your level is active.
- `$level` inside a flag becomes your level id.
- Resource names in actions: the raw keys (chapter 1) or the aliases `water`, `diesel`,
  `parts`, `ammo`, `explosives`.

**Requirement types**

| type | fields | passes when |
|---|---|---|
| `flagPresent` / `flagAbsent` | `flag` | story flag set / not set |
| `resourceAtLeast` | `resource`, `amount` | the convoy holds ≥ amount |
| `reputationAtLeast` / `reputationAtMost` | `faction`, `amount` | standing ≥ / ≤ amount |
| `characterRecruited` / `characterNotRecruited` | `character` (id) | that character rides / does not ride with the convoy |
| `mascotsAtLeast` | `amount` | the convoy owns ≥ amount mascots |
| `convoyExists` | — | there is a convoy |
| `fleetHasType` | `vehicle` (chassis) | the convoy owns such a vehicle |
| `vehicleAtLocation` | `vehicle`, `unmanned` | such a vehicle stands HERE (unmanned = may be handed over) |
| `vehiclesAtLocationAtLeast` | `amount` | that many rolling vehicles stand here |
| `cargoAboard` | `part` | the crew standing at this location (the one pressing the button) carries that part in a cargo bay |
| `bayFreeFor` | `part` | a crew here has a free bay that fits the part |

**Effect types**

| type | fields | does |
|---|---|---|
| `grantResource` | `resource`, `amount` (±) | add / spend stock (negative = a cost) |
| `setFlag` | `flag` | set a story flag — quests, gates and endings all hang on flags |
| `applyReputation` | `faction` or `"$loc"`, `amount` | standing change (with spillover) |
| `playSound` | `sound` | a sound effect key (yours or a base key) |
| `recruitCharacter` | `character` | a named character joins the acting crew |
| `grantCrewMember` | `role`, `amount` | unnamed hands join |
| `addUpgrade` | `upgrade` | an upgrade into the convoy's stock (chapter 10) |
| `grantPart` / `removePart` | `part` | put a part into a free cargo bay of the acting crew (skipped if no bay fits — gate with `bayFreeFor`) / take it out of their bays (skipped if it isn't aboard — gate with `cargoAboard`) |
| `grantMascot` | `mascot` | add a mascot |
| `grantParkedVehicle` | `vehicle` (chassis), `name`, `hullPct` (1–100, default 40), `upgrade2`, `skin` | a damaged vehicle is recovered and joins the acting crew (`upgrade2` = an upgrade already mounted, `skin` = your art) |
| `healAll` / `repairFleet` | — | heal the crew / repair the vehicles here |
| `openRoad` | `road` | a blocked road opens for good |
| `revealLocation` / `revealMap` | `location` / — | put a location / everything on the known map |
| `dispatchEncounter` | `encounter` | start a battle — **always the last effect** |

---

## 5. `events.json` — junction events

When a crew passes a junction, the joint's `eventId` fires, or (for joints without an
`eventId`) a random event from your pool may fire (about one pass in three).

```json
{ "events": [
  { "id": "sb_evt_ambush", "kind": "encounter", "once": true, "encounterId": "sb_salt_ambush",
    "text": "Shapes rise out of the glare. Saltmen, three rigs, no flags.", "sound": "ROADSIDE_HOSTILE" },
  { "id": "sb_evt_salt_storm", "kind": "resource", "pool": "random", "once": false,
    "text": "A salt storm scours the paint off — and uncovers a buried water cache.",
    "resources": { "water": 6, "tires": -1 }, "onlyIfBelow": { "water": 40 } },
  { "id": "sb_evt_hull_gong", "kind": "flavor", "pool": "random",
    "text": "Wind in a stranded hull rings like a gong. Everybody pretends not to flinch.",
    "sound": "SB_HULL_GONG", "requiresFlag": ["sb_bell_cracked"], "revealsLocations": ["sb_old_harbour"] }
] }
```

- **Shipping `events.json` replaces the game's event pool** while your level is active:
  every joint `eventId` must be defined here, and give the pool 4+ `"pool": "random"`
  events so empty junctions stay alive.
- `pool` defaults to not-random: the event only fires where a joint names it.
- `once: true` = once per playthrough, whatever happens after (a lost or fled battle does
  not come back). Put battles the player must be able to retry on a building action.
- `kind`: `flavor` (text), `resource` (applies `resources`), `encounter` (starts
  `encounterId`), `generated` (a generated roadside battle), `story`, `vehicle_grant`.
- **`resources` and `onlyIfBelow` use the raw keys** (`ammo_normal`, `fuel_regular`, …).
  The action aliases (`ammo`, `diesel`) do NOT work here.
- `requiresFlag` / `requiresNotFlag` gate the event, `setsFlag` sets one,
  `revealsLocations` puts locations on the known map, `sound` plays a sound key.
- **Battles from travel events are threat-gated**: a battle rated N skulls (chapter 7) only
  starts once the *story level* reaches N. The story level is 2 at the start and rises to
  5 as the player completes the goals on your `progression.json` goal chain (chapter 8).
  Keep travel-event battles at ≤ 2 skulls early, or start bigger fights from an action
  (`dispatchEncounter` is not gated). The validator prints every battle's skulls.

---

## 6. `travel_legs.json` — roadside events

Roadside events are the illustrated decisions *between* junctions: once per travel day at
most, a board slides over the route map with a picture, a situation and 2–3 choices, each
with a price and a consequence.

```json
{ "legs": [
  {
    "id": "sb_leg_salt_wagon",
    "roadTypes": ["CountryRoad", "OffroadTrack"],
    "weight": 3,
    "once": false,
    "text": "A salt hauler's wagon lies on its side, axle snapped, the driver asleep in its shade. His barrels are full.",
    "image": "sb_leg_salt_wagon",
    "sound": "",
    "choices": [
      { "id": "help", "barkRole": "Mechanic", "requiresRole": "Mechanic",
        "text": "Splint his axle. It costs us a morning.",
        "delayDays": 1, "morale": 5, "resources": { "water": 4 }, "setsFlag": "sb_hauler_helped" },
      { "id": "trade", "barkRole": "Politician",
        "text": "Trade tyres for barrels and leave him to his luck.",
        "resources": { "tires": -1, "water": 8 } },
      { "id": "drive", "barkRole": "Driver",
        "text": "Drive on. Salt keeps.",
        "morale": -3 }
    ],
    "autoChoice": "drive"
  },
  {
    "id": "sb_leg_glare_riders",
    "stances": ["overdrive", "nightrun"],
    "requiresFlag": ["sb_bell_cracked"],
    "text": "Mirrors flash on the ridge — someone is signalling your position ahead.",
    "image": "sb_leg_glare_riders",
    "choices": [
      { "id": "fight", "barkRole": "Gunner", "text": "Turn and run them down.", "dispatchEncounter": "sb_salt_ambush" },
      { "id": "detour", "barkRole": "Driver", "text": "Cut across the pans, lose them in the glare.",
        "breakdownPct": 25, "encounterDeltaTomorrow": -15 },
      { "id": "slow", "barkRole": "Driver", "text": "Ease off and let them lose interest.", "delayDays": 0, "morale": -2 }
    ],
    "autoChoice": "slow"
  }
] }
```

**Leg fields**: `roadTypes` (empty = any), `stances` (`steady`, `cautious`,
`overdrive`, `nightrun`; empty = any), `weight` (how often, relative), `once`,
`onlyIfBelow` (raw resource keys), `requiresFlag` / `requiresNotFlag`, `minVehicles`,
`text`, `image`, `sound`, `choices`, `autoChoice`.

**Choice consequences**

| field | effect |
|---|---|
| `resources` | raw resource deltas (`{ "water": 4, "tires": -1 }`) |
| `morale` | convoy morale ± |
| `delayDays` | 1 = make camp: no driving today, water still drunk |
| `progress` | bonus road segments today (the reward of fast, risky options) |
| `breakdownPct` | % chance something breaks (a vehicle takes wear damage) |
| `encounterDeltaTomorrow` | ± percentage points on tomorrow's junction-battle chance |
| `loseVehiclePct` | % chance to lose a vehicle (never the last one) |
| `riskCrewPct` + `sendCrewRole` | % chance the volunteer of that role does not come back (never an essential character) |
| `grantCrewRole` + `grantCrewCount` | unnamed hands join |
| `grantUpgrade`, `grantPart`, `grantVehicleType` + `grantVehicleName` + `grantVehicleSkin` | rewards |
| `setsFlag` / `setsFlags`, `revealsLocations` | story |
| `dispatchEncounter` / `dispatchGenerated` | start your battle / a generated roadside battle |
| `requiresRole`, `requiresUpgrade`, `requiresFlag`, `requiresNotFlag` | gates (role and upgrade gates show locked with the reason; flag gates hide the choice) |
| `barkRole` | who announces the choice (a named crew member of that role gets their portrait on the button) — cosmetic |

**Rules**
- `autoChoice` is **mandatory** and must be **safe**: no breakdown, delay, vehicle loss,
  crew risk, battle, or requirement. Resource costs and morale changes are fine. The game
  takes it when nobody decides.
- A choice's `dispatchEncounter` is **not** threat-gated (unlike junction events): the
  player chose the fight.
- **Shipping `travel_legs.json` replaces the game's whole roadside pool** while your level
  is active — write **6 or more** legs so trips don't repeat, or ship none and keep the
  game's generic ones.
- `image`: a bare name (`"sb_leg_salt_wagon"` → `assets/sb_leg_salt_wagon.png`) or a file name
  with extension (`"sb_leg_salt_wagon.jpg"`); 3:2, e.g. 1536×1024; shown in a tall column, so
  keep the subject centred. You
  may also use one of the game's built-in road illustrations (names in the catalog) and
  ship no art at all.

---

## 7. `encounters/<id>.json` — battles and finds

The file name is the encounter id. Start one from an action (`dispatchEncounter`), a
junction event (`encounterId`) or a roadside choice (`dispatchEncounter`).

### A simple battle

```json
{
  "id": "sb_salt_ambush",
  "name": "Saltmen at the Cut",
  "intro": "Two buggies drop out of the glare, a pickup behind them with a harpoon rig.",
  "attackReason": "Salt is thirst. You carry water. That's the whole sermon.",
  "kind": "Battle",
  "speakerName": "Ossa", "speakerTitle": "Salt Warden",
  "environment": "Day",
  "faction": "None",
  "roadTerrain": "salzsee",
  "orientation": "chased",
  "enemies": [
    { "type": "Buggy", "name": "Glare One", "zone": "EnemyMid",
      "crew": [ { "role": "Driver", "skill": 2 }, { "role": "Gunner", "skill": 2 } ] },
    { "type": "Pickup", "name": "The Harpoon", "zone": "EnemyMid", "leader": true, "upgrades": ["MgMount"],
      "crew": [ { "role": "Driver", "skill": 2 }, { "role": "Fighter", "skill": 3 } ] }
  ],
  "gang": { "motive": "blut", "doctrine": "rudeltreiben" },
  "mission": { "type": "ueberfall" }
}
```

### An advanced battle — a boss with allies, obstacles and a bounty

```json
{
  "id": "sb_saltmen_boss",
  "name": "The Salt King's Procession",
  "intro": "At dusk the Saltmen roll out of the old harbour: a motorhome dragged into a war wagon, outriders on both flanks, a mortar crew dug in behind the breakwater. The stolen bronze is chained to the wagon's roof.",
  "attackReason": "The bell is ours now. We will ring it when WE are thirsty.",
  "kind": "Battle",
  "speakerName": "Salt King Oszkar", "speakerTitle": "Lord of the Dead Sea",
  "speakerPortrait": "portrait_sb_salt_king",
  "locationImage": "encounter_scene_sb_saltmen_boss",
  "environment": "Night",
  "nightSchedule": { "startAtNight": false, "dayLength": 3, "nightLength": 3 },
  "faction": "None",
  "roadTerrain": "salzsee",
  "orientation": "chase",
  "allowFlee": true,
  "enemies": [
    { "type": "BattleBus", "name": "The Salt Throne", "skin": "sb-rv-road-manor", "zone": "EnemyMid", "leader": true,
      "upgrades": ["MgMount", "RamPlow"], "cargo1": "sb_bell_bronze",
      "crew": [ { "role": "Driver", "skill": 3 }, { "role": "Leader", "skill": 4, "name": "Oszkar" },
                { "role": "Gunner", "skill": 3 }, { "role": "Fighter", "skill": 3 } ] },
    { "type": "Buggy", "name": "Left Hand", "zone": "EnemyFront",
      "crew": [ { "role": "Driver", "skill": 2 }, { "role": "Gunner", "skill": 2 } ] },
    { "type": "Buggy", "name": "Right Hand", "zone": "EnemyFront",
      "crew": [ { "role": "Driver", "skill": 2 }, { "role": "Gunner", "skill": 2 } ] }
  ],
  "stationaries": [ { "type": "MortarTeam", "zone": "EnemyRear", "name": "Breakwater Mortar" } ],
  "blockades": [
    { "kind": "BurningBarricade", "lane": 1, "rank": 3 },
    { "kind": "TireStack", "lane": 3, "rank": 3 }
  ],
  "reinforcements": [
    { "round": 2, "side": "player", "guest": true, "faction": "None",
      "vehicles": [ { "type": "Pickup", "name": "Bellwell Volunteers", "zone": "OwnMid",
                      "crew": [ { "role": "Driver", "skill": 2 }, { "role": "Fighter", "skill": 2 } ] } ] },
    { "round": 3, "side": "enemy",
      "vehicles": [ { "type": "Quad", "name": "Late Rider", "zone": "EnemyRear",
                      "crew": [ { "role": "Driver", "skill": 2 } ] } ] }
  ],
  "specialElements": [],
  "gang": { "motive": "trophaeen", "doctrine": "scherenwand", "secondDoctrine": "belagerung",
            "commandVehicleName": "The Salt Throne" },
  "mission": { "type": "kopfgeld", "targetName": "The Salt Throne" }
}
```

| Field | Meaning |
|---|---|
| `kind` | `Battle` (a fight) · `Vehicle` (a find: an abandoned vehicle to claim — `situationImage` + `situationText` + one enemy entry = the vehicle) |
| `environment` | `Day`, `Night`, `Sandstorm`, `ScrapField`, `Highway`; `nightSchedule` alternates day/night rounds |
| `orientation` | `chase` = the enemy holds the road ahead; `chased` = the gang hunts the convoy from behind. Pursuit doctrines (`rudeltreiben`, `zangenzug`, `kaperfahrt`, `falkenjagd`, `schattenfahrt`, `aderlass`) suit `chased`; wall/siege doctrines (`scherenwand`, `belagerung`, `koederfahrt`, `sturmflucht`) need `chase` |
| `enemies[]` | `type` (chassis), `name`, `skin` (your art, chapter 9), `zone` (`EnemyFront` / `EnemyMid` / `EnemyRear`), `upgrades`, `crew[]` (`role`, `skill` 1–5, optional `name`, `perk`), `cargo1..3` (part ids, taken when the player captures the vehicle — a vehicle destroyed instead loses its cargo, so never make a must-have quest item enemy cargo without a fallback), `mascot`, `leader: true` (one per battle: the boss; losing it breaks the gang's morale), `noCapture` |
| `stationaries[]` | fixed emplacements: `MgNest`, `HiddenSniper`, `MortarTeam`, `AntiTankGun` in a `zone` |
| `blockades[]` | road obstacles: `kind` (`Wreck`, `Boulder`, `Container`, `BurningBarricade`, `TireStack`, `MineMound`, `BarrelStack`, `DroppedTrailer`), `lane` 0–4, `rank` (2–8, enemy side), `ranksDeep` |
| `reinforcements[]` | vehicles arriving in round `round`: `side` `enemy` or `player` (`guest: true` = an ally that fights for you but is not yours to keep) |
| `gang` | how they fight: `motive` (what they want) + `doctrine` / `secondDoctrine` (tactics), `commandVehicleName` (the vehicle whose loss hurts them most) — catalog lists all |
| `mission` | the win condition: `ueberfall` (defeat them), `kopfgeld` + `targetName` (take that vehicle down before it escapes), `eskorte` + `escortName` (keep that vehicle alive — pair with a player-side reinforcement), `frachtraub` (cargo raid), `durchbruch` (break through to the front) |
| `specialElements` | set-pieces such as a tanker, jammer or minelayer (catalog) |
| `soloPlayerVehicle` | arena rule: the player fields ONE vehicle |
| `allowFlee`, `allowAutoResolve` | whether the player may run / auto-resolve |
| `speakerName`, `speakerTitle`, `speakerPortrait`, `locationImage`, `situationImage` | briefing presentation; images are bare names in `assets/` |

**Threat and balance.** The game rates every battle 1–5 **skulls** from its enemies (the
validator prints it). Guideline for a starting convoy: warm-up 1–2, mid-story 3, finale 3–4;
5 is brutal. More vehicles, higher skills, heavier chassis and weapons raise it; a
player-side guest makes a hard fight fair. Remember the travel-event gate (chapter 5).

**Factions in battle**: see chapter 3 (use `"faction": "None"` + `gang` for your own).

---

## 8. `progression.json` — story goals and battle outcomes

```json
{
  "goals": [
    { "flag": "sb_bell_cracked",     "location": "sb_bellwell",     "chainChild": "sb_mould_found" },
    { "flag": "sb_mould_found",      "location": "sb_hulk",         "chainChild": "sb_cooling_water" },
    { "flag": "sb_cooling_water",    "location": "sb_pump_nine",    "chainChild": "sb_bronze_recovered" },
    { "flag": "sb_bronze_recovered", "location": "sb_basalt_watch", "days": 2, "requires": ["Fighter"],
      "chainChild": "sb_bell_rung", "reward": { "upgrade": "MgMount", "grant": true } },
    { "flag": "sb_bell_rung",        "location": "sb_bellwell" }
  ],
  "encounters": [
    { "id": "sb_saltmen_boss", "consequences": [
      { "story": "the Salt Throne burns on the pans — and the bronze is ours.",
        "effects": [ { "type": "setFlag", "flag": "sb_bronze_recovered" } ] } ] }
  ]
}
```

- **Goals** are the jobs board: one entry per story step, in order. `chainChild` links a
  step to the next — the longest chain is your **main story**, and how far along it the
  player is sets the story level (the threat gate of chapter 5). Side goals without
  `chainChild` show on the jobs board but do not raise the story level. Optional: `location`,
  `days` (rough effort), `requires` (crew roles the job needs), `towClass` (`a`/`b`/`c`),
  `reward` (`vehicleType`, `upgrade`, `character`, `resource` + `amount`, `part`,
  `opens`; `"grant": true` = the game pays it the moment the flag is set — leave it
  false when your action already hands the reward over).
- Goal titles and texts come from your CSV: `MISSION_<FLAG>_TITLE` and
  `MISSION_<FLAG>_DESC` (the flag in upper case). Without them the board shows the bare
  flag name.
- Ignore `actions`, `mirrorExempt`, `actionsComment` (internal bookkeeping of the official levels).
- **Encounters** declare what a **win** changes: `setFlag`, `openRoad`,
  `revealLocation`, `grantVehicle` (`vehicleType` = chassis, `name`, `skin`), `recruitCharacter`,
  `addUpgrade`, `claimSurrenderedVehicle`. A **loss or flight changes nothing**: no flags
  are set, so the action that started the battle stays available for another try.
- `"when": "negotiatedOnly"` restricts a consequence to a negotiated win; then add
  `"repeatUntil": "<flag>"` to the encounter entry so a forced win cannot lock the prize away.

---

## 9. Vehicles — `vehicles.json` + vehicle art

A mod vehicle = a **chassis** (its combat numbers: class, structure, armour, speed,
seats, mounts — table in the catalog) + **your name, lore and art** (`skin`). You cannot
change the numbers of a chassis; pick the one whose numbers fit and dress it.

### Worked example: a 1980s motorhome with welded armour

The `BattleBus` chassis is a class-4 hull with front armour 1, four seats, four mounts and
a roof MG — exactly a big motorhome with plate welded on the nose.

```json
{ "vehicles": [
  { "id": "sb_rv_road_manor",
    "type": "BattleBus",
    "name": "The Road Manor",
    "source": "shop",
    "locationId": "sb_hulk",
    "stockTier": 1,
    "costWater": 30, "costAmmo": 40,
    "requiredFlag": "sb_mould_found",
    "skin": "sb-rv-road-manor",
    "lore": "A 1982 family motorhome, beige with a brown stripe. Someone welded boiler plate over the nose and the wood-panel doors, cut a gun hatch in the roof and kept the lace curtains. The ice box still works."
  },
  { "id": "sb_rv_found",
    "type": "BattleBus",
    "name": "Beached Motorhome",
    "source": "wreck",
    "skin": "sb-rv-road-manor",
    "lore": "The same model, stripped by the salt wind. It will run again." }
] }
```

| Field | Meaning |
|---|---|
| `type` | the chassis |
| `name`, `lore` | shown in shop, garage, crew screens |
| `source` | `shop` (sold at `locationId`'s `buy_vehicles` building) or `wreck` (for a road wreck's `recoverVehicleId`) |
| `locationId`, `stockTier`, `costWater`, `costAmmo`, `requiredFlag` | shop listing: where, which stock tier, the price, a story gate |
| `skin` | the art stem (below); one skin can serve several vehicle entries and enemy vehicles |
| `storyCritical`, `buybackFlag`, `buybackCostWater`, `buybackCostParts` | a vehicle your story needs: if it is lost, any vehicle shop offers it back |
| `kind`, `roadId`, `startParked`, `startHullPct`, `startComponents`, `startUpgrades`, `cargoBay1/2` | only for the game's own starting convoy — ignore |

Other ways to give a vehicle (all take a chassis + your `skin`, no vehicles.json entry needed): a battle win in `progression.json` (`{ "type": "grantVehicle", "vehicleType": "BattleBus", "name": "The Road Manor", "skin": "sb-rv-road-manor" }`), the action effect `grantParkedVehicle` (`vehicle` = chassis,
`skin`, `name`, `hullPct`, `upgrade2` = an upgrade already mounted), a roadside choice
`grantVehicleType` + `grantVehicleSkin`, or an enemy with that `skin` the player captures.

**"Some armour"**: armour comes from the chassis (front value, flanks −1, rear −2).
For more protection, mount armour upgrades (`addUpgrade`, or `upgrade2` on
`grantParkedVehicle`) — the upgrade list is in the catalog.

### The vehicle images (per skin)

All live in `assets/`, named after the skin. Only the first three matter much; the rest
are damage variants the game otherwise derives.

| File | Where it shows | Format |
|---|---|---|
| `vehicle-sideview-<skin>.png` | **convoy screen and road battles** (the vehicle on the road) — most important | transparent cut-out, **pure side profile facing RIGHT**, wheels touching the bottom edge, bold dark outline; ~1024×683 |
| `hex-tile-<skin>.png` | roster tiles, salvage hall, pickers | transparent cut-out, **isometric 3/4 view from above-front**, vehicle centred with a soft drop shadow; 1024×1024 |
| `vehicle-screen-<skin>.png` | shop, garage, crew screens (the vehicle's portrait) | painted **scene with background**, 3/4 front view, 3:2 (1536×1024) |
| `loot-vehicle-<skin>.png` | salvage hall after a capture | transparent cut-out, 3/4 front view, ~1500×850 |
| `vehicle-sideview-<skin>-damaged.png` / `-critical.png` / `-broken.png` | road battle as the hull drops below 70 % / nearly destroyed / destroyed | same framing as the side view, same size of vehicle |
| `hex-tile-<skin>-damaged.png` / `-broken.png` | roster tile when damaged / destroyed (broken = burnt wreck on its side) | as the hex tile |
| `vehicle-screen-<skin>-damaged.png` | portrait when damaged | as the portrait |
| `loot-vehicle-<skin>-damaged.png` | salvage hall, damaged capture | as the loot image |

Cut-outs **must** have a transparent background (the validator checks). Missing side view,
hex tile or portrait → the chassis' stock art appears instead. The battle cutaway view
(the inside of a vehicle) is not moddable yet; it shows the side view.
Prompts and style: art-guide.md, "Vehicles".

---

## 10. Parts, upgrades and doctrine tags

Three different things, often confused:

| | What it is | Can a mod create new ones? |
|---|---|---|
| **Upgrade** | a mounted piece of kit with built-in behaviour (MG mount, ram plow, armour plating, nitro …) | **No** — use the existing ones (catalog `UpgradeType`): mount them on enemies, give them (`addUpgrade`, roadside `grantUpgrade`, goal rewards), sell them through actions, tag them with doctrine points |
| **Part** | a physical item in a cargo bay: an **engine** or **cargo** (quest items, trade goods, crates) | **Yes** — `parts.json` |
| **Doctrine points** | what an upgrade, part, character or perk contributes to the convoy's seven Road Doctrines (builds that unlock passives at 4/7/10 points) | **Yes** — `doctrines.json` |

### `parts.json`

```json
{ "parts": [
  { "id": "sb_bell_mould", "kind": "Cargo", "quality": "Medium", "weightKg": 180,
    "name": "Bell Founder's Mould", "description": "Two halves of fired loam in a crate of ship timber. Fragile. Heavy. Priceless to exactly one town.",
    "image": "part_sb_bell_mould" },
  { "id": "sb_bell_bronze", "kind": "Cargo", "quality": "Large", "weightKg": 420,
    "name": "Stolen Bell Bronze", "description": "The old bell, broken into three pieces and chained together.",
    "image": "part_sb_bell_bronze" },
  { "id": "sb_engine_saltbox", "kind": "Engine", "quality": "Small",
    "name": "Saltbox 2.0", "description": "A marine diesel that forgot the sea. Coughs, never quits.",
    "image": "part_sb_engine_saltbox" }
] }
```

| Field | Meaning |
|---|---|
| `kind` | `Cargo` (rides in a cargo bay) or `Engine` (a swappable engine) |
| `quality` | the size it needs: `Small`, `Medium`, `Large` — a bay must be at least that big |
| `weightKg` | cargo weight: heavier loads burn more fuel on the road |
| `name`, `description`, `image` | shown on cargo cards; `image` = bare name in `assets/` (square 512×512, the item on a plain neutral background) |
| `class` | `Defense` / `Prep` / `Base` / `LootBox` only work on the game's own part ids (their behaviour is built in); a new part with a class acts as plain cargo |

Use parts as **quest items**: `grantPart` puts one into a free bay, `cargoAboard` checks a
crew here carries it, `removePart` hands it over, `bayFreeFor` checks there is room.
Enemies can carry them (`cargo1`) — boarding and capturing the vehicle takes the cargo.

### `doctrines.json` — giving your content build value

```json
{ "components": {
  "part:sb_engine_saltbox":  { "warranty": 1, "rush": 1 },
  "character:Maren Kett":    { "warranty": 2 },
  "upgrade:RamPlow":         { "ram": 3 }
} }
```

Keys: `upgrade:<UpgradeType>`, `part:<part id>`, `character:<character NAME>`,
`perk:<perk id>`, `role:<CrewRole>`, `vehicletype:<chassis>`; values: points per
doctrine (`ram`, `sniper`, `boarding`, `negotiation`, `roadblock`, `rush`, `warranty` —
catalog). Re-tagging a base upgrade changes it while your level is active.

---

## 11. Characters — `characters.json`

A character is a named crew member the player can recruit: a role, a skill, a perk,
traits, a face and a story.

```json
{ "characters": [
  { "id": "sb_maren",
    "name": "Maren Kett",
    "role": "Mechanic",
    "skill": 3,
    "perk": "free_repair",
    "traits": ["gearhead", "wayfinder"],
    "origin": "None",
    "portrait": "portrait_sb_maren",
    "description": "The bell founder's daughter. Casts anything that melts, fixes anything that doesn't, and has not forgiven the Saltmen for the bronze.",
    "metAt": "sb_bellwell",
    "recruitFlag": "sb_maren_joined",
    "essential": true,
    "builderStyle": "metal" },
  { "id": "sb_tobi",
    "name": "Tobi Kett",
    "role": "Driver",
    "skill": 2,
    "perk": "free_reverse",
    "traits": ["ghost"],
    "portrait": "portrait_sb_tobi",
    "description": "Maren's younger brother. Drives like the salt is lava. Talks to engines when he thinks nobody listens." }
] }
```

| Field | Meaning |
|---|---|
| `name` | display name — **unique**, and the key for bonds, combos and doctrine tags |
| `role` | `Mechanic`, `Medic`, `Driver`, `Gunner`, `Fighter`, `Sniper`, `Politician`, `Leader` — what they do in battle and at camp |
| `skill` | 1 (green) … 5 (legend); rises with battles survived |
| `perk` | one perk with a real effect (catalog list with effects). Any other word works only as a dialog gate (`requiresPerk`) |
| `traits` | dialog traits that open extra lines in conversations (`dealmaker`, `hairtrigger`, `grifter`, `believer`, `gearhead`, `veteran`, `paperwise`, `ghost`, `performer`, `wayfinder`) — give one or two |
| `origin` | a combat faction they come from (`FactionId`), or `None` |
| `portrait` | square portrait in `assets/` (art-guide) |
| `description` | the recruit card bio |
| `recruitFlag` | a flag the game **sets automatically** when they join — use it in gates and dialogs, no need to set it yourself |
| `metAt` | the location id where the player meets them (shown on the character sheet) |
| `recruitHook` | not shown in the game — ignore |
| `essential` | never deserts — mark characters your story needs |
| `robot` | a machine crew member (can fire the EMP) |
| `builderStyle` | `tech`, `organic`, `metal`, `scrap` — how they style base modules they build |

**Recruiting**: an action or dialog choice with `recruitCharacter` (usually behind a
price or a story flag), or `recruitCharacter` as a battle consequence. Pair it with
`characterNotRecruited` so the button disappears afterwards.

---

## 12. Bonds and combos — `relationships.json`

Characters who ride together affect each other. **Combos** are rewards (two people
working well together); **bonds** are directed relationships that change over time and
can sour a combo. Both use character **names**.

```json
{
  "combos": [
    { "id": "sb_kett_siblings", "a": "Maren Kett", "b": "Tobi Kett",
      "name": "Kett & Kett",
      "flavor": "She casts it, he drives it into the ground, she casts it again.",
      "buddies": true,
      "effects": [
        { "condition": "same_vehicle", "type": "buff", "stat": "repair", "value": 20, "label": "+20 % repairs when they share a vehicle" },
        { "condition": "same_vehicle", "type": "buff", "stat": "morale", "value": 1, "label": "+1 morale at battle start" },
        { "condition": "same_convoy",  "type": "buff", "stat": "water", "value": -1, "label": "-1 water per day: Tobi finds wells" }
      ] }
  ],
  "relationships": [
    { "from": "Maren Kett", "to": "Vane", "state": "wary", "value": -10,
      "nextThreshold": 20, "nextState": "trusts", "symmetric": false,
      "effects": [ { "condition": "same_vehicle", "type": "debuff", "stat": "morale", "value": -1, "label": "-1 morale while Vane rides with her" } ],
      "incident": { "id": "sb_vane_bronze", "text": "Vane once sold scrap bronze on the salt road. Maren recognises the stamp on his belt buckle." },
      "actions": [
        { "id": "force_conversation", "label": "Make them talk it out", "cost": { "downtime": 1 }, "uncertain": true, "outcomes": ["resolve", "detonate"] },
        { "id": "let_it_harden", "label": "Let it harden", "cost": {}, "consequence": "advance_toward_refuses" }
      ] }
  ]
}
```

- **Effect fields**: `condition`, `type` (`buff` = the pair gains, `debuff` = the pair pays), `stat`, `value`, `label`; optional `perTurn: true` (a morale debuff applied every round, not just at battle start) and `faction` (a negotiation bonus that only counts against that combat faction).
- **Effect stats**: with `same_vehicle` (both in one vehicle): `morale` (battle-start
  morale ±), `damage` (fraction, 0.1 = +10 % damage), `combat_value`, `negotiation` (%),
  `repair` (%). With `same_convoy` (both anywhere in the convoy): `water`, `fuel` (daily
  consumption delta; negative = saving). `label` is the text the crew screen shows.
- **Bond states** from the value: ≥ 20 `trusts`, 1…19 `owes`, −19…0 `wary`, −34…−20
  `resents`, ≤ −35 `refuses` (refuses = they will not share a vehicle). A bond at 0 or
  below switches off the pair's combos until it is repaired.
- **Bond actions** at camp spend downtime: `force_conversation` (uncertain: `resolve` or
  `detonate`), `let_it_harden` (`advance_toward_refuses`), `reminisce` (`deepen`).
- You may bond your characters with the core cast (`Malik`, `Ellaine`, `Vane`, `Sable`, `Cap`).
- `backstories`, `debts`, `disputes`, `goals` add camp-fire story beats (see schema).
  Combo **manoeuvres** (`maneuvers`) run built-in effect code and cannot be added by mods yet.
- Crew banter lines are not moddable yet.

---

## 13. NPC dialog trees — `conversations.json`

An NPC stands at a building (`actionIds: ["conv_<id>"]`). A conversation is a tree:
**nodes** (what the NPC says) with **choices** (what the convoy answers), leading to other
nodes, ending with effects.

```json
{ "conversations": [ {
  "id": "sb_founder",
  "npcCharacterId": "sb_maren",
  "doneFlag": "sb_maren_joined",
  "entry": [
    { "requiresFlag": ["sb_maren_joined"], "node": "after" },
    { "requiresFlag": ["sb_bronze_recovered"], "node": "bronze" },
    { "node": "root" }
  ],
  "nodes": [
    { "id": "root",
      "image": "conv_sb_cracked_bell",
      "text": "Maren doesn't look up from the crack in the bell. 'Loam, bronze and cooling water. I have one of the three. You want the town to trust you? Bring me the other two.'",
      "autoChoice": "leave",
      "choices": [
        { "id": "ask", "text": "Who has the bronze?", "next": "saltmen" },
        { "id": "gearhead", "text": "That crack runs with the grain. You can braze it instead of recasting.",
          "requiresTrait": "gearhead", "interject": true, "next": "impressed" },
        { "id": "leave", "text": "We'll see what we can find.", "exit": true }
      ] },
    { "id": "saltmen",
      "text": "'The Saltmen. They took it the night the bell cracked. Say it was salvage. It was theft with paperwork.'",
      "autoChoice": "back",
      "choices": [ { "id": "back", "text": "Understood.", "exit": true } ] },
    { "id": "impressed",
      "text": "She looks up for the first time. 'Brazing holds a year. Casting holds a century. But you know metal. That's rare out here.'",
      "autoChoice": "leave",
      "choices": [
        { "id": "leave", "text": "Keep it in mind.", "exit": true,
          "effects": [ { "type": "applyReputation", "faction": "sb_bell_folk", "amount": 1 } ] } ] },
    { "id": "bronze",
      "text": "'You brought it back.' She lays a hand on the chained pieces. 'Then I'm coming with you. Somebody has to keep your engines from dying before the bell rings.'",
      "autoChoice": "later",
      "choices": [
        { "id": "join", "text": "Welcome aboard, Maren.",
          "effects": [ { "type": "recruitCharacter", "character": "sb_maren" }, { "type": "setFlag", "flag": "sb_maren_joined" } ],
          "exit": true },
        { "id": "persuade", "text": "Your brother drives. Bring him too.",
          "check": { "role": "Politician", "base": 40, "perSkill": 10, "cap": 85, "onFail": "no_tobi" },
          "effects": [ { "type": "recruitCharacter", "character": "sb_maren" },
                       { "type": "recruitCharacter", "character": "sb_tobi" },
                       { "type": "setFlag", "flag": "sb_maren_joined" } ],
          "exit": true },
        { "id": "pay", "text": "Take 10 water for the forge first.",
          "requiresResources": { "water": 10 },
          "requiresNotFlag": ["sb_forge_paid"],
          "effects": [ { "type": "grantResource", "resource": "water", "amount": -10 },
                       { "type": "applyReputation", "faction": "sb_bell_folk", "amount": 2 },
                       { "type": "setFlag", "flag": "sb_forge_paid" } ],
          "next": "bronze" },
        { "id": "later", "text": "Not yet.", "exit": true }
      ] },
    { "id": "no_tobi", "text": "'Tobi stays. Someone has to guard the well.' She picks up her tools anyway.",
      "autoChoice": "ok",
      "choices": [ { "id": "ok", "text": "Fair enough.",
                     "effects": [ { "type": "recruitCharacter", "character": "sb_maren" }, { "type": "setFlag", "flag": "sb_maren_joined" } ],
                     "exit": true } ] },
    { "id": "after", "text": "Maren is already checking your radiator hoses.", "autoChoice": "bye",
      "choices": [ { "id": "bye", "text": "Carry on.", "exit": true } ] }
  ]
} ] }
```

| Part | Rules |
|---|---|
| NPC | `npcCharacterId` (a character — name and portrait come from it) or `npcName` + `npcPortrait` (an NPC who can't be recruited) |
| `entry` | checked top to bottom; the first whose `requiresFlag` are all set picks the start node. **The last entry has no requirement.** |
| `doneFlag` | marks the talk finished (the building button shows it as done) |
| node | `id`, `text`, optional `image` (a picture the NPC shows: photo, map, wanted poster — bare name in `assets/`, 3:2), `choices`, **`autoChoice`** |
| `autoChoice` | **mandatory** for every node with choices: a plain choice (no requirement, no check, no battle) the game takes on its automatic path |
| choice | `text`, then `next` (a node) or `exit: true`, optional `effects` (the same effect types as actions, chapter 4; `dispatchEncounter` last) |
| hidden gates | `requiresFlag` / `requiresNotFlag` — the choice is invisible until they match |
| visible gates | `requiresRole` (+ `requiresSkill`), `requiresPerk`, `requiresTrait`, `requiresOrigin`, `requiresCharacter` (id or name aboard), `requiresUnnamedRole`, `requiresSpareVehicle`, `requiresResources` — shown locked with the reason |
| `interject: true` | the best-qualified crew member present speaks the line (their portrait on the button) — use it for trait and role lines |
| `check` | a skill roll: the best crew member of `role` rolls `base` + `perSkill` × skill (capped at `cap`) %; on success the effects run, then `next` / `exit`; on failure the talk goes to `onFail` and the effects do NOT run; one attempt per day |

Guard every choice that pays out and loops back (`requiresNotFlag` + `setFlag`), or players can farm it. Write each NPC in one voice; 3–7 nodes is plenty. Translation keys: `CONV_<ID>_<NODE>`,
`CONV_<ID>_<NODE>_<CHOICE>`, `CONV_<ID>_NPC` (upper case).

---

## 14. `audio.json` — sound effects and music

```jsonc
{
  "events": {
    "SB_BELL": "assets/audio/sb_bell.ogg",           // your own sound effect
    "SB_HULL_GONG": "assets/audio/sb_hull_gong.wav",
    "MAP_DISCOVERY": "assets/audio/sb_discovery.wav"  // REPLACES a base sound while your level is active
  },
  "playlists": {
    "worldmap": [ "assets/audio/sb_theme.ogg", { "file": "assets/audio/sb_night.ogg", "title": "Salt Night" } ]
  }
}
```

- Formats `.ogg`, `.mp3`, `.wav`; paths relative to **your level folder** (`assets/audio/…`).
- Play: action/dialog effect `{ "type": "playSound", "sound": "SB_BELL" }`, junction event
  `"sound"`, roadside event `"sound"`. Keys are case-sensitive (`MAP_DISCOVERY`, not
  `map_discovery`).
- Replace a base sound or playlist by using its name (catalog lists all base keys and
  playlists); only while your level is active.
- Effects 0.3–3 s, peak about −3 dBFS, no silence padding.

---

## 15. `epilogues.json` — endings

A short comic (2–3 pages, up to 3 panels each) that plays on the map shortly after one
of its flags is set.

```json
{ "endings": [ {
  "id": "sb_ending_bell_rings",
  "flags": ["sb_bell_rung"],
  "title": "The Bell Speaks",
  "pages": [
    { "kind": "world", "title": "The Basin",
      "panels": [ { "image": "epilogue_sb_world", "focusY": 0.4, "heading": "Water on the Salt",
                    "body": "The caravans came back on the third day, following the sound." } ] },
    { "kind": "factions", "title": "Who Stayed",
      "panels": [ { "image": "epilogue_sb_folk", "faction": "sb_bell_folk", "heading": "The Bell Folk",
                    "body": "They ring it at dusk now, every dusk.",
                    "bodyAllied": "They ring it twice when your dust shows on the horizon.",
                    "bodyHostile": "They ring it — and close the well rope when you come.",
                    "imageAllied": "", "imageHostile": "" } ] },
    { "kind": "convoy", "title": "The Convoy",
      "panels": [ { "image": "epilogue_sb_convoy", "heading": "Rolling On", "body": "…" } ],
      "crew": { "Maren Kett": "Maren stayed long enough to see the first caravan, then climbed back into the cab." } }
  ]
} ] }
```

- `flags`: any of them triggers the ending (empty → the ending id is the flag). Something
  in your mod must set it.
- Page `kind`: `world`; `factions` (a panel with `faction` switches `bodyAllied` /
  `bodyHostile` and the image variants by the final standing); `convoy` (adds one line
  per named crew member still aboard + run statistics; `crew` overrides lines by name).
- Panel images: bare names in `assets/`, 3:2; `focusY` (0 top … 1 bottom) picks the crop.
- Ending ids are unique across all installed levels.

---

## 16. `i18n/*.csv` — translations

```
keys,en,de
SB_BUY_MOULD_DONE,"The chandler wraps the mould in sailcloth like a newborn.","Der Krämer wickelt die Form in Segeltuch wie ein Neugeborenes."
MISSION_SB_BELL_CRACKED_TITLE,The Cracked Bell,Die gesprungene Glocke
MISSION_SB_BELL_CRACKED_DESC,Find out why Bellwell's bell has gone silent.,Finde heraus warum die Glocke von Bellwell schweigt.
```

First column `keys`, then any of `en de fr es it ja zh ru pt`. Quote cells with commas;
UTF-8. English in the JSON is always the fallback, so translations are optional — except
the `MISSION_*` goal titles, which need at least an `en` row.

`<ID>` = the id upper case; `<slug>` = the English text upper case with every run of
non-letters/digits turned into one `_` (`"The Deep Well"` → `THE_DEEP_WELL`).

| Text | Key |
|---|---|
| level name (picker, top bar) / author | `LEVEL_<slug of displayName>` / `LEVEL_AUTHOR_<slug of author>` |
| level description, Cap's briefing | use the `capBriefing` object (per language) — the description is not keyed |
| faction name / leader / backstory line i / broadcast i | `FACTION_<ID>_NAME` / `_LEADER` / `_BACKSTORY_<i>` / `_BROADCAST_<i>` (i from 0); dossier: `FACTION_<ID>_HIST_*` |
| location name / description | `LOC_<slug of displayName>` / `LOC_DESC_<ID>` |
| building name / description | `BLDG_NAME_<ID>` / `BLDG_DESC_<ID>` |
| junction name | `JOINT_<slug of displayName>` |
| wreck name / description | `WRECK_NAME_<ID>` / `WRECK_DESC_<ID>` |
| junction event text | `EVENT_<ID>` |
| encounter name / intro / attack reason / situation | `ENC_NAME_<ID>` / `ENC_INTRO_<ID>` / `ENC_REASON_<ID>` / `ENC_SITUATION_<ID>` |
| goal title / text | `MISSION_<FLAG>_TITLE` / `MISSION_<FLAG>_DESC` |
| action button / result / requirement reason | `ACTION_<ID>` (or your `labelKey`) / the `resultKey` / `reasonKey` you wrote |
| dialog node / choice / NPC name | `CONV_<ID>_<NODE>` / `CONV_<ID>_<NODE>_<CHOICE>` / `CONV_<ID>_NPC` |
| character description | `CHAR_DESC_<ID>` and `CHARBIO_<ID>` |
| part name / description | `PART_<ID>_NAME` / `PART_<ID>_DESC` |
| vehicle name | `VEH_<slug of name>` |
| epilogue | `EPI_<ENDING>_TITLE`, `EPI_<ENDING>_P<n>_TITLE`, `EPI_<ENDING>_P<n>_H<s>`, `EPI_<ENDING>_P<n>_B<s>`, `…_B<s>_ALLIED`, `…_B<s>_HOSTILE` (page n, panel s, from 1) |

---

## 17. Validate

```
GeargraveOutlands.console.exe --headless --validate-mod "C:\path\to\salt_bell"
GeargraveOutlands.console.exe --headless --validate-mods          # every installed mod
```

(Linux: `./GeargraveOutlands.x86_64 --headless --validate-mod ~/mods/salt_bell`.)
`--validate-out=report.txt` also writes the report to a file; `--no-info` hides hints.
Exit code 0 = no errors, 1 = errors, 2 = nothing to check.

```
== salt_bell  (C:\…\levels\salt_bell)
   ERROR actions.json actions[2] sb_open_cut effects[0]: dispatchEncounter must be the LAST effect …
   WARN  level.json $.roads[1].from_id: unknown key 'from_id' — the game ignores it (did you mean 'fromId'?)
   INFO  encounters/sb_salt_ambush.json: threat rating 2 skull(s)
   RESULT: 1 error(s), 1 warning(s)
MODCHECK: FAIL (1 error(s))
```

- **ERROR** — broken: the game rejects the level, or a feature can never work.
  `NOT LOADED` = the level is not listed at all; fix those first.
- **WARN** — works, but not as you meant it. `RESULT: LOADS, n warning(s) to fix` means
  the mod plays but is **not done**.
- **INFO** — hints: missing optional art, threat ratings, flags nobody reads.
- **Done = `RESULT: OK`** (0 errors, 0 warnings).

The same report is in the game: level picker → **MODS** (enable *Show hints* for INFO).
