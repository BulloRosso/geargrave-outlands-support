# Geargrave Outlands mod file reference

Everything a mod can contain, file by file, with worked examples. Exact field lists are
in [`schemas/`](schemas/) (JSON Schema, generated from the game); every id you may
borrow from the base game is in [`base-catalog.md`](base-catalog.md); art rules are in
[`art-guide.md`](art-guide.md). The complete example mod is `modding/examples/salt_bell/`
in the support repository.

**Always finish with the validator** (chapter 17). It reads your folder exactly the way
the game does and names every problem with file and JSON path.

| # | Chapter | File |
|---|---|---|
| 1 | What a mod is, what the player starts with | — |
| 2 | The map, level switches, winter levels, story meters, road maps | `level.json`, `travel/*.konvoi.json` |
| 3 | Factions | `level.json` + `factions.json` |
| 4 | Building actions, the Mend board | `actions.json` |
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
| 18 | The living map | `map_life.json` |
| 19 | Cargo discoverables: sets, hitch loads, reveals | `cargo_sets/*.json` |
| 20 | Road incidents in battle | `road_incidents.json` + `assets/incidents/` |
| 21 | Biomes: your own biome and its art | `level.json` `terrainTheme` + `biome`, `assets/game/` |
| 22 | The Mend board: own items, marks and odds | `mend_items.json` + `assets/mend_items/` |

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
  cargo_sets/         cargo discoverables, one <set_id>.json bundle each (chapter 19)
  doctrines.json      doctrine points for your parts and characters
  characters.json     recruitable characters
  relationships.json  bonds and combos between characters
  conversations.json  NPC dialog trees
  audio.json          sound effects and music playlists
  epilogues.json      the ending comic
  i18n/*.csv          translations
  travel/             advanced: hand-drawn road maps, one <roadId>.konvoi.json each (chapter 2)
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
| `level.json`, `audio.json`, `epilogues.json`, `mascots.json`, `parts.json`, `progression.json`, `relationships.json`, `doctrines.json`, `map_life.json` | `actions.json`, `events.json`, `travel_legs.json`, `encounters/*.json`, `characters.json`, `vehicles.json`, `factions.json`, `conversations.json` |

**Image names.** A field that names an image (`sceneImagePath`, `bannerImage`, portraits,
emblems, encounter / dialog / epilogue / roadside images, part images) takes a **bare name**
(the game adds `.png`) **or** an explicit `.png` / `.jpg` / `.webp` file name — use `.jpg`
for big full-frame scenes. File names the game builds itself must be PNG:
`map_background.png`, `building_<id>_<status>.png` and every vehicle skin file
(`vehicle-sideview-<skin>.png` …).

Trailing commas are only allowed in `level.json`, `audio.json`, `epilogues.json` and
`progression.json`. Simplest rule: write strict JSON everywhere.

**Fuel in texts.** The game shows fuel in litres, and in US gallons when the UI language
is English. Never write a fuel quantity as a bare number in prose (result texts, dialog,
roadside events, translations). Write a token instead and the game fills in the player's
unit: `{fuelpool:8}` = 8 units of the `fuel_regular` / `fuel_diesel` stock (the same
number you put in `grantResource` or `resources`; one unit is 10 litres) and `{fuel:25}`
= 25 litres. `"The farmer fills the tank: {fuelpool:8}."` reads "21 gal" in English and
"80 l" in German.

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
  "terrainTheme": "desert",                   // the biome: "desert" (default) | "winter" | your own (ch. 21)
  "sweepers": true,                           // false = no Sweepers chase the convoy on this level
  "tutorial": false,                          // true = the game's onboarding checklist runs here
  "startingResources": { "water": 80 },       // absolute overrides, fresh start only
  "factions":  [ … ],                         // chapter 3
  "locations": [ … ],
  "roads":     [ … ],
  "startingCrews": [ { "id": "sb_crew", "displayName": "Bell Runners", "locationId": "sb_bellwell" } ]
}
```

`startingCrews` makes the level playable as a fresh start. Without it, the level is only
reachable through a gateway from another level.

### Level switches

All optional; leave a switch out and the level behaves like a normal desert mod.

| Field | Default | What it does |
|---|---|---|
| `terrainTheme` | `"desert"` | The level's biome: `"desert"`, `"winter"` or a name of your own (`"jungle"`, chapter 21 — it then needs a `biome` block saying which of the two it builds on). It picks the battle header art, the fog colour on the map, which base roadside events and road incidents can fire, and switches on the winter rules (*Winter levels*, below) |
| `sweepers` | `true` | Do the Sweepers clear this level's roads? With `true`, every road trip runs against a 24-hour clock and a convoy still on the road when it runs out is swept (its vehicles are lost); the travel screen shows the Sweepers' chase lane. `false` (a sector with no corridor for them): the clock still counts and still prices rests and scouting, but running out ends nothing, and no Sweeper lane, front or margin is shown. Roadside events marked `requiresSweepers` do not fire here |
| `tutorial` | `false` | `true` runs the game's onboarding checklist (the screens, the nav wheel, the first trip) on this level. Only the base game's home sector has it on by default. Turn it on for a mod meant as a first game |
| `hideBaseFactions` | `false` | `true` keeps only the factions of your `factions.json` in the faction list: dossier, radio broadcasts and contracts name no base-game faction. Needs a `factions.json` |
| `levelTextWins` | `false` | Normally a row in your `i18n/*.csv` cannot replace a base-game text with the same key (the base catalog is read first). `true` lets your rows win for every key they define, so you can re-word a base text while your level is active. An empty language cell in such a row shows your English, not the base translation |
| `recommendedAfter` | `""` | A level id the level picker recommends finishing first (advice only, it never locks anything) |
| `requiresDlcAppId` | `0` | A Steam DLC that must be owned to play the level. Official DLC only: **leave it out** — set in a mod, it locks your level for everyone who does not own that DLC |

Your own biome — a jungle, a swamp, a tundra, with its own battle backdrops, card art,
vehicle sprites, map colours and faction pool: **chapter 21**.

### Winter levels

`"terrainTheme": "winter"` turns on the winter rules:

- **No motorcycles.** Wherever the game builds a vehicle itself — generated roadside
  battles, raider packs, rescue missions, the vehicles offered on the road — a
  motorcycle becomes a **Snow Speeder** (a two-seat ski-and-track scout with a pintle
  gun). Your own `encounters/*.json` are used as written: on a winter mod, give your
  light raiders `Quad`, `Buggy` or `Sedan` hulls instead of `Motorcycle`. A `biome`
  block's `hullSwaps` changes this rule (chapter 21).
- **Cold nights.** Night legs of a trip burn more fuel, less the larger the share of
  vehicles with a `CabinHeater`; when under half the column is heated, every second
  night leg costs a step of morale.
- **Snow roads.** Hand-drawn road maps (*Authored road maps*, below) may use the snow
  route types and mark whiteouts. `SnowChains` let a vehicle take deep snow and halve its
  wear on snow routes, in proportion to the chained share of the column.
- **Snow-capable roads.** A road with `"requiresSnowCapable": true` can only be taken by
  a crew with at least one snow-capable vehicle: one with the `SnowChains` or `RamPlow`
  upgrade, or a tracked hull (`Tank` among the public chassis). This gate works on any
  level, but it only makes sense where the player can get chains or a plough.
- **Generated fights** that name no combat faction fall back to the `ZimnikArtel`
  instead of the desert's `RustWolves`. The winter combat factions `LuciaProcession` and
  `ZimnikArtel` can also be named in your battles' `faction` field (catalog).
- **Roadside events and incidents.** Base roadside events tagged for the desert do not
  fire on a winter level, and road incidents with `"stage": "desert"` stay away.
- **Art.** The game swaps some of its own pictures for winter versions on a winter
  level (cards, battle backdrops, convoy and camp backdrops). You can replace any of
  those with your own snow picture in `assets/game/` (chapter 21.3). Your own art (map,
  scenes, roadside images, living-map cards, incident headers) is never swapped — paint
  it in snow from the start (art guide §1).
- `SnowChains` and `CabinHeater` are ordinary upgrades, but the game's gear store sells
  them only in Sector West: on your level, hand them out yourself with `addUpgrade` (a
  shop action that takes water for them works well), roadside `grantUpgrade`, a map
  find's `upgrades` or a goal reward. Without them a winter mod has no way to beat the
  cold rules or open a `requiresSnowCapable` road.

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
  "recon": false,
  "noChanceDiscovery": false
}
```

`rebuilt*` = a second face that takes over once `rebuiltFlag` is set (the town you helped
rebuild). `recon: true` = a road-less hidden site found by recon missions.
`noChanceDiscovery: true` = the place is never stumbled upon: recon missions and the
"reveal what is nearby" effects skip it, only your own `revealLocation` (or the road
reaching it) puts it on the map — use it for a site your story reveals.

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
  "passability": "Open",           // Open | BlockedEnemy | BlockedDamage | BlockedStory (not routable until openRoad)
  "blockadeFactionId": "",         // a faction that mans a toll blockade here (chapter 3)
  "minSkulls": 0,                  // floor for generated roadside battles on this road
  "requiresSnowCapable": false,    // true = only a crew with a snow-capable vehicle may take it (Winter levels)
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
- **Closing a road.** The effect `closeRoad` (actions, dialogs, battle consequences) and
  the rungs of a story meter (below) close a road for good (`BlockedStory`); a convoy
  already on it finishes the drive, new routes are refused. `openRoad` opens it again.
- **Snow-capable roads.** `requiresSnowCapable: true` refuses every crew without a
  snow-capable vehicle (`SnowChains` or `RamPlow` fitted, or a tracked hull) — see
  *Winter levels*. Make sure the player can get chains before the story needs that road.

### Story meters — `flagCounters`

A story meter counts story flags: its value is *how many of its `sources` are set*
minus *how many of its `holds` are set* (never below 0). When the value first reaches a
rung, the rung's flag is set and stays set, and the rung may close roads. Gate anything
on the rung flags like on any other flag. The meter needs no save field: it is always
recomputed from the flags.

```jsonc
"flagCounters": [
  { "id": "sb_salt_debt",
    "chip": true, "chipLabel": "SALT DEBT", "chipTip": "What the Saltmen think you owe them.",
    "sources": ["sb_toll_dodged", "sb_mule_lost", "sb_wagon_robbed", "sb_bell_rung"],
    "holds":   ["sb_tribute_paid"],
    "rungs": [
      { "value": 1, "flag": "sb_debt_noticed", "label": "NOTICED" },
      { "value": 2, "flag": "sb_debt_owed",    "label": "OWED", "closeRoads": ["sb_road_03"] },
      { "value": 3, "flag": "sb_debt_blood",   "label": "BLOOD DEBT",
        "alsoFlag": "sb_saltmen_war", "alsoUnless": ["sb_saltmen_truce"] }
    ],
    "reopen": [ { "flag": "sb_saltmen_truce" } ] }
]
```

| Field | Meaning |
|---|---|
| `id` | your id (prefixed) |
| `sources` / `holds` | flags that push the meter up / hold it down. A hold never undoes a rung already reached |
| `rungs[]` | `value` (the threshold), `flag` (set when reached), `label` (the chip's state text), `closeRoads` (road ids closed when reached), `alsoFlag` + `alsoUnless` (a second flag set at the same time, unless one of the `alsoUnless` flags is already set) |
| `reopen[]` | `flag` + optional `roads`: once that flag is set, those roads (empty = every road this meter closed) open again |
| `chip`, `chipLabel`, `chipTip` | `chip: true` shows the meter on the map header (dots + the highest rung's label) once one of its source flags is set. The header has room for one chip: the first `chip` meter in the list that has started wins |

A broken `flagCounters` block is skipped with a warning in the game log, the level still
loads. Translation keys: `CHIP_<ID>` (caption), `CHIP_<ID>_TIP`, `CHIP_<ID>_<value>`
(a rung's label).

The validator counts rung flags (`flag`, `alsoFlag`) as set and `sources`, `holds`,
`alsoUnless` and `reopen` flags as read, and checks that every road in `closeRoads` /
`reopen.roads` exists.

### Updating a published mod — `roadMigrations`, `oldSaveExits`

When a new version of your mod removes a road, list it so old saves keep working:

```jsonc
"roadMigrations": [ { "from": "sb_road_06", "to": "sb_road_05", "returnTo": "sb_hulk" } ]
```

Vehicles left beside the removed road `from` move to the road `to`; a crew that was
driving it is put back at the location `returnTo`. `oldSaveExits` lists location ids
whose gateway (`exitToLevelId`) only works for saves that already have a slot of the
target level — a retired gateway that old saves still need, while new games never see
it.

The validator checks both lists: `from` must no longer be a road, `to` must be one,
`returnTo` and every `oldSaveExits` id must be locations of the level.

### Gateways

`exitToLevelId` + `exitToLocationId` let an idle crew travel to another level; make them
two-way. Linking into an official level would mean editing it, so a mod usually stands
alone (its own `startingCrews`) or links to another mod.

### Authored road maps — `travel/<roadId>.konvoi.json` (advanced)

Every road trip is played on a **route map**: a small graph of waypoints from one end of
the road to the other, where the player picks legs (highway, gravel, desert track …)
against the 24-hour clock, fuel and wear. Without a file the game generates that map
from the road's seed — that is fine for almost every mod. To hand-draw the route map of
one road, put `travel/<roadId>.konvoi.json` in your mod:

```json
{
  "roadId": "sb_road_01",
  "timeTargetZe": 14,
  "nodes": [
    { "id": "a",  "col": 0, "x": 0.03, "y": 0.5,  "name": "Bellwell" },
    { "id": "n1", "col": 1, "x": 0.35, "y": 0.3,  "name": "Glare Cut" },
    { "id": "n2", "col": 1, "x": 0.35, "y": 0.75, "name": "Salt Sink" },
    { "id": "b",  "col": 2, "x": 0.97, "y": 0.5,  "name": "The Hulk" }
  ],
  "start": "a",
  "goal": "b",
  "edges": [
    { "from": "a",  "to": "n1", "type": "land",   "km": 90 },
    { "from": "a",  "to": "n2", "type": "wueste", "km": 80, "tag": "water" },
    { "from": "n1", "to": "b",  "type": "autobahn", "km": 110, "tag": "tank" },
    { "from": "n2", "to": "b",  "type": "schotter", "km": 70, "mined": true },
    { "from": "n2", "to": "b",  "type": "offroad", "km": 45 }
  ],
  "territories": [ { "faction": "sb_saltmen", "name": "Saltmen Pans", "c0": 1, "c1": 1 } ]
}
```

| Field | Meaning |
|---|---|
| `nodes[]` | `id`, `col` (the time axis: 0 = start, the goal has the highest), `x` / `y` (position on the route map, 0..1), `name` (a location's or waypoint's display name) |
| `start`, `goal` | node ids of the two ends |
| `edges[]` | `from` → `to` (**forward only**: the `to` node has a higher `col`), `type` (route type, below), `km` (> 0), optional `tag` (`tank` fuel stop, `water` water hole, `wrack` wreck parts, `bandit` bandits, `vehicle` a vehicle on offer), `offer` (with `tag: vehicle`: 0 motorcycle, 1 quad, 2 workshop truck, 3 armored car, 4 sedan, 5 farm pickup, 6 SUV, 7 Baja SUV, 8 trailer truck), `obstacle` (a roadblock), `mined`, `whiteout` |
| `territories[]` | `faction` (a faction id), `name`, `c0`..`c1` (the columns it holds) |
| `timeTargetZe` | hours the fastest route should take at 50 km/h (default 19; the clock is 24) |

Route types: `autobahn`, `land`, `berg`, `schotter`, `wueste`, `huegel`, `wrackfeld`,
`minenfeld` (everyone may drive them); `ruine`, `schlucht` (narrow: nothing big fits);
`offroad`, `sumpf`, `flussbett` (off-road vehicles only). Winter levels add `schnee`,
`eis` (everyone), `zugefroren` (narrow) and `tiefschnee` (off-road vehicles or
`SnowChains`). `whiteout: true` on an edge (winter levels only) slows the column on that
leg to 60 % and costs one step of the convoy's scouting on arrival, unless someone with
the `whiteout_read` perk rides along; desert levels ignore it.

The game **rejects the whole file and generates the map instead** when: fewer than two
nodes, duplicate node ids, a missing start or goal, an edge that does not go forward or
names an unknown node or type, `km` ≤ 0, an `offer` out of range, the goal unreachable,
or a reachable node (other than the goal) without at least one exit everyone can drive
(an ungated type and no `obstacle`; `mined` still counts as passable). It also rejects a
map that breaks the road map rules (every waypoint a real choice, the fastest route
inside the time target). The validator runs the game's own checks on each
`.konvoi.json` and reports a rejected map as an ERROR with the reason — so draw every
node a plain exit and read the MODS screen. Name the file after the road id
(`<roadId>.konvoi.json`).

A road without its own map can still get its own time target:
`travel/<roadId>.konvoi-tune.json` with `{ "timeTargetZe": 16 }` (hours at 50 km/h; an
optional `"comment"`). A slow convoy on a map longer than its time target gets
the distances shortened in proportion, and fuel stops are added if the cheapest route
cannot be paid for.

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
ignored), delivery `vehicleId` (unused) and contract `scripted` (the base game's own
tutorial hands those out; a scripted contract is never offered on your level).

Your profiles join the base game's factions in the dossier and on the radio. For a
setting where the desert gangs make no sense, set `"hideBaseFactions": true` in
`level.json` (chapter 2): then only the factions of your `factions.json` are listed.

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

**When a button shows at all.** The building sheet hides what the player has no reason
to know about yet. Your action appears once its *story* requirements hold — every
requirement except the price and standing gates (`resourceAtLeast`,
`reputationAtLeast`, `reputationAtMost`, `bayFreeFor`, `hitchFree`, `seatFreeFor`) and
the cooldown. Those only grey the button out, with the reason. Once shown, an action
stays on screen (greyed out with its reason if a requirement fails later) and wears a
NEW chip the first time. A one-shot that has run — a `flagAbsent` requirement on a flag
the action sets itself — leaves the sheet. To show a lead **before** it can run (the
job a character told you about; the reason line then says what is missing), add
`revealWhen`: a requirement list in the same grammar, and the action shows as soon as
all of those hold.

```json
{ "id": "sb_deliver_mould", "label": "HAND OVER THE MOULD",
  "requires": [ { "type": "flagAbsent", "flag": "sb_mould_delivered", "reason": "Maren already has it." },
                { "type": "cargoAboard", "part": "sb_bell_mould", "reason": "Bring the bell mould from the Hulk." } ],
  "revealWhen": [ { "type": "flagPresent", "flag": "sb_bell_cracked" } ],
  "effects": [ { "type": "removePart", "part": "sb_bell_mould" }, { "type": "setFlag", "flag": "sb_mould_delivered" } ],
  "resultFallback": "Maren runs a thumb along the loam and says nothing for a long time." }
```

Built-in actions and NPC dialogs (`conv_…`) always show (a dialog can have its own
`revealWhen`, chapter 13).

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
| `fleetLacksType` | `vehicle` (chassis) | the convoy owns NO such vehicle (a replacement offer that stays hidden while the original still rolls) |
| `vehicleAtLocation` | `vehicle`, `unmanned`, optional `name` | such a vehicle stands HERE (unmanned = may be handed over; `name` = only the vehicle with exactly that name) |
| `vehiclesAtLocationAtLeast` | `amount` | that many rolling vehicles stand here |
| `cargoAboard` | `part` | the crew standing at this location (the one pressing the button) carries that part in a cargo bay (bays 1–3) |
| `hitchLoadAboard` | `part` | a crew here tows that hitch load (chapter 19) |
| `hitchFree` | — | a vehicle here can still take a hitch load (free hook + tow capability) |
| `bayFreeFor` | `part` | a crew here has a free bay that fits the part |

**Effect types**

| type | fields | does |
|---|---|---|
| `grantResource` | `resource`, `amount` (±) | add / spend stock (negative = a cost) |
| `setFlag` | `flag` | set a story flag — quests, gates and endings all hang on flags |
| `applyReputation` | `faction` or `"$loc"`, `amount` | standing change (with spillover) |
| `settleReputation` | `faction` or `"$loc"` | a NEGATIVE standing with that faction is set back to 0 (never raised above it) — a peacemaker |
| `grantXp` | `role` (CrewRole), `amount` (default 1) | one hand of that role in the acting crew's fleet (a named character first) earns that much experience — a training ground |
| `revealNearby` | `amount` (default 1) | puts the nearest unknown locations (by road hops from here) on the known map — intel |
| `playSound` | `sound` | a sound effect key (yours or a base key) |
| `recruitCharacter` | `character` | a named character joins the acting crew |
| `grantCrewMember` | `role`, `amount` | unnamed hands join |
| `addUpgrade` | `upgrade` | an upgrade into the convoy's stock (chapter 10) |
| `grantPart` / `removePart` | `part` | put a part into a free cargo bay of the acting crew (skipped if no bay fits — gate with `bayFreeFor`) / take it out of their bays (skipped if it isn't aboard — gate with `cargoAboard`) |
| `grantHitchLoad` / `removeHitchLoad` | `part` | hitch a `carry: hitch` part to the first vehicle here with a free hook (else it is parked here) / take it off (chapter 19) |
| `grantMascot` | `mascot` | add a mascot |
| `grantParkedVehicle` | `vehicle` (chassis), `name`, `hullPct` (1–100, default 40), `upgrade2`, `skin` | a damaged vehicle is recovered and joins the acting crew (`upgrade2` = an upgrade already mounted, `skin` = your art) |
| `removeVehicle` | `vehicle` (chassis), optional `name` | an unmanned vehicle standing here leaves the convoy for good (a donation) — gate with `vehicleAtLocation` + `"unmanned": true` (+ the same `name`) |
| `healAll` / `repairFleet` | — | heal the crew / repair the vehicles here |
| `openRoad` | `road` | a blocked road opens for good |
| `closeRoad` | `road` | the road closes (`BlockedStory`) until an `openRoad` or a story meter's `reopen`; a convoy already on it finishes the drive |
| `revealLocation` / `revealMap` | `location` / — | put a location / everything on the known map |
| `dispatchEncounter` | `encounter` | start a battle — **always the last effect** |

Unnamed hands (`grantCrewMember`, roadside `grantCrewRole`, a recovered vehicle's driver)
join at level 1.

### The Mend board

Every evening the convoy's people work the **Mend board**: one cork board for the whole
fleet with a note per damaged vehicle part ("steel"), per wounded crew member
("bandage"), per soured bond to talk out, good bond to deepen or dispute to settle
("fireside", from `relationships.json`) and per crew backstory chapter not yet heard.
Each note has a lever:
LEAVE it, PATCH it (a cheap half-fix), do it PROPER, or go BOLD — an attempt with
printed odds that can botch (more damage, a severe botch leaves a lasting *mark*), come
out clean, or break through and leave a **mend item** on the vehicle or the person (a
ported manifold, a lucky splint). A bold attempt can also graft a piece from the
salvage tray, which won lane battles fill. Items and marks are saved with the vehicle or
person; enemies never carry them.

What your level controls:

- **The town bench and clinic.** In a town where a building lists `repair_vehicles` or
  `repair_vehicles_free` in its `actionIds`, the board gets the town's mechanics (three
  extra hands for steel notes), and a proper job there files the marks off that part.
  A building with `heal_crew` gives the board the clinic: wounds are tended without a
  medic of your own, and a proper job takes a person's marks off. Put these built-ins
  in the towns where the player should be able to mend properly; on the road and in
  towns without them, only the convoy's own people work.
- **Fireside notes** come from the bonds and disputes of your `relationships.json`
  (chapter 12).

- **Its own items, marks and odds** — a `mend_items.json` beside `level.json` (chapter
  22): new items (a jungle level's vine lashing), repainted base items, the marks a
  severe botch leaves, or only your own catalog; and the board's odds (botch and
  breakthrough bands, tray size) while your level is active.
- **Its sounds** — `MEND_LEVER`, `MEND_BREAKTHROUGH`, `MEND_BOTCH`, … (catalog) in
  `audio.json` like any base sound key.

What it cannot do: the hooks (`fx`) an item moves are built in (catalog, "Mend board"),
and the lever itself (LEAVE / PATCH / PROPER / BOLD) and what a proper job costs work the
same on every level.

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
  The action aliases (`ammo`, `diesel`) do NOT work here. A negative amount takes only
  what the convoy has (stock never drops below 0).
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
`roads` (only on these road ids; empty = any), `biomes` (`desert` / `winter` / your own
biome name: only on levels of that biome — a level matches its own name and the biome it
builds on, chapter 21; empty = any), `requiresSweepers` (true = only on levels
with Sweepers — a scene about the chase), `text`, `image`, `sound`, `choices`,
`autoChoice`.

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
  game's generic ones. The generic pool filters itself by biome: on a desert level its
  winter scenes stay away, on a winter level its desert scenes do (a dozen winter
  scenes and the untagged ones remain, so a winter mod is better off with its own
  file). In your own file, a `biomes` or `requiresSweepers` tag that does not match your
  level means that leg never fires.
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
| `enemies[]` | `type` (chassis), `name`, `skin` (your art, chapter 9), `zone` (`EnemyFront` / `EnemyMid` / `EnemyRear`), `upgrades`, `crew[]` (`role`, `skill` 1–5, optional `name`, `perk`), `cargo1..3` (part ids, taken when the player captures the vehicle — a vehicle destroyed instead loses its cargo, so never make a must-have quest item enemy cargo without a fallback), `mascot`, `leader: true` (one per battle: the boss; losing it breaks the gang's morale), `noCapture`, `selfDestructOnBoard`, `empOnly` + `empResistance` (a hull only EMP blasts can hurt; `empResistance` hits destroy it, default 3 — give the player a way to EMP it: robot crew, or `EmpGrenade` from a dialog, action or map find) |
| enemy story fields | `yieldAt` (structure points: once damage would leave the hull at or below this, its crew stands down instead of burning — the vehicle is kept with deck, cargo and loot boxes for the salvage hall; good for a first fight that should leave a prize), `fleeAt` (the same threshold, but the hull breaks off and escapes with its loot boxes; it cannot be boarded), `unlessFlags` (story flags: once any is set, this vehicle stays home — an ally the player won over does not show up), `battleDamage` (structure points already missing at the start, the hull keeps at least 1), `tiresShot` (tyres already shot at the start, each costs one tempo) |
| `stationaries[]` | fixed emplacements: `MgNest`, `HiddenSniper`, `MortarTeam`, `AntiTankGun` in a `zone` |
| `blockades[]` | road obstacles: `kind` (`Wreck`, `Boulder`, `Container`, `BurningBarricade`, `TireStack`, `MineMound`, `BarrelStack`, `DroppedTrailer`), `lane` 0–4, `rank` (2–8, enemy side), `ranksDeep` |
| `reinforcements[]` | vehicles arriving in round `round`: `side` `enemy` or `player` (`guest: true` = an ally that fights for you but is not yours to keep) |
| `gang` | how they fight: `motive` (what they want) + `doctrine` / `secondDoctrine` (tactics), `commandVehicleName` (the vehicle whose loss hurts them most) — catalog lists all |
| `mission` | the win condition: `ueberfall` (defeat them), `kopfgeld` + `targetName` (take that vehicle down before it escapes), `eskorte` + `escortName` (keep that vehicle alive — pair with a player-side reinforcement), `frachtraub` (cargo raid), `durchbruch` (break through to the front) |
| `specialElements` | set-pieces such as a tanker, jammer or minelayer (catalog) |
| `soloPlayerVehicle` | arena rule: the player fields ONE vehicle |
| `maxRounds` | a hard round limit for this battle (> 0). Normally the limit comes from the skull rating (10 rounds up to 2 skulls, 12 / 14 / 16 for 3 / 4 / 5, more for a boss); when it runs out, the side ahead on hulls, hands and mission wins. Use it for a short scripted fight |
| `allowFlee`, `allowAutoResolve` | whether the player may run / auto-resolve |
| `speakerName`, `speakerTitle`, `speakerPortrait`, `locationImage`, `situationImage` | briefing presentation; images are bare names in `assets/` |

**Threat and balance.** The game rates every battle 1–5 **skulls** from its enemies (the
validator prints it). Guideline for a starting convoy: warm-up 1–2, mid-story 3, finale 3–4;
5 is brutal. More vehicles, higher skills, heavier chassis and weapons raise it; a
player-side guest makes a hard fight fair. Remember the travel-event gate (chapter 5).

**Crew skill in battles.** Enemy (and guest) crews keep the old **1–5** scale (1 green …
5 legend). Your recruitable characters use levels 1–10 (chapter 11) — the game converts
between the two, so do not put levels into encounter files.

**Winter levels**: write no `Motorcycle` into a winter mod's battles (the game's own
fights field Snow Speeders there, chapter 2); `LuciaProcession` and `ZimnikArtel` are
combat factions that fit snow.

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
- **Encounters** declare what a **win** changes: `setFlag`, `openRoad`, `closeRoad`,
  `revealLocation`, `grantVehicle` (`vehicleType` = chassis, `name`, `skin`), `recruitCharacter`,
  `addUpgrade`, `claimSurrenderedVehicle`, `applyReputation` (`faction` = a faction id,
  `amount`; the way to pay your own map faction for a won fight). A **loss or flight changes nothing**: no flags
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
hex tile or portrait → the chassis' stock art appears instead.
Prompts and style: art-guide.md, "Vehicles".

### The battle cutaway (per skin, optional)

Clicking a vehicle in a road battle opens its cutaway: the vehicle sectioned open with its
crew, spinning wheels, engine and cargo. Without one the panel shows the side view.

| File | What it is |
|---|---|
| `cutaway-<skin>.png` | 1536×1024, transparent, left side view facing RIGHT with the side wall cut away; seats empty (the game draws the crew) |
| `cutaway-<skin>-damaged.png` | optional, the same outline battered; else the intact picture stays |
| `cutaway_anchors.json` | one entry per skin: frame, wheels, seats, engine, bays, hardpoints, stations — written by the cutaway editor |
| `wheel-spin-<skin>-<n>.png`, `wheel-spin-<skin>-damaged-<n>.png`, `glow-<skin>-damaged.png` | written by the cutaway editor from your pictures |

Place everything with the **cutaway editor** (`modding/cutaway-editor/` in the support
repository: open `cutaway-editor.html` in Chrome or Edge, pick the mod folder, Save). Its
README lists every field of `cutaway_anchors.json`. The validator checks the file, the
pictures, the wheel sprites and the hull tear. A skin the base game already has a cutaway
for keeps the game's own.

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
| `carry`, `set`, `story`, `living`, `fragile`, `maxCopies`, `sellable` | cargo-discoverable fields: hitch loads, set membership, story + hint, living and fragile cargo — chapter 19 (they work in `parts.json` too, but a set's pieces belong in its bundle) |

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
    "skill": 2,
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
    "skill": 1,
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
| `skill` | the starting **level**, 1 … 10. People join at level **1 or 2** and grow through experience from battles (the validator warns above 2). Only a `robot`, who never grows, may start higher. Level 1 fights like a skill-3 enemy (the 1–5 scale of encounter files), level 2 like skill 4, level 5 like skill 5 — a level-1 recruit is not weak |
| `perk` | one perk with a real effect (catalog list with effects). Any other word works only as a dialog gate (`requiresPerk`) |
| `traits` | dialog traits that open extra lines in conversations (`dealmaker`, `hairtrigger`, `grifter`, `believer`, `gearhead`, `veteran`, `paperwise`, `ghost`, `performer`, `wayfinder`) — give one or two |
| `origin` | a combat faction they come from (`FactionId`), or `None` |
| `portrait` | square portrait in `assets/` (art-guide) |
| `description` | the recruit card bio |
| `recruitFlag` | a flag the game **sets automatically** when they join — use it in gates and dialogs, no need to set it yourself |
| `metAt` | the location id where the player meets them (shown on the character sheet) |
| `recruitHook` | not shown in the game — ignore |
| `essential` | never deserts — mark characters your story needs |
| `robot` | a machine crew member (can fire the EMP: 2 power cells per battle). Humans fire it only from a vehicle carrying the `EmpGrenade` upgrade — one throw per vehicle per battle |
| `builderStyle` | `tech`, `organic`, `metal`, `scrap` — how they style base modules they build |

**Recruiting**: an action or dialog choice with `recruitCharacter` (usually behind a
price or a story flag), or `recruitCharacter` as a battle consequence. Pair it with
`characterNotRecruited` so the button disappears afterwards.

**Growth.** Levels rise with experience: battles survived (a lost battle pays the
survivors a little consolation experience; fleeing pays nothing). Sector East's Training
Yard (`training_yard`) is a story action of the base game — do not put it on your
buildings (the validator warns).

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
        { "condition": "same_vehicle", "type": "buff", "stat": "repair", "value": 1, "label": "+1 structure on field repairs together" },
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
- **Effect stats** are **whole numbers, never percentages** (the battle engine has no
  percentages; a fraction like `0.1` rounds to 0 and does nothing, an old-style `20`
  means +20):

  | `condition` | `stat` | `value` means | label example |
  |---|---|---|---|
  | `same_vehicle` | `morale` | morale ± at battle start (with `perTurn`: every round) | "+1 morale at battle start" |
  | `same_vehicle` | `damage` | the pair's first N damaging shots each battle land one harder (1 or 2) | "+1 on the first two shots together" |
  | `same_vehicle` | `combat_value` | +N boarding strength when the pair jumps together, +N defence while both stand on the deck | "+1 boarding strength together" |
  | `same_vehicle` | `negotiation` | +N at the negotiation table (gangs give in one step earlier), at most +2; `faction` limits it to one combat faction | "+1 at the table vs Rust Wolves" |
  | `same_vehicle` | `repair` | +N structure on this vehicle's field repairs | "+1 structure on field repairs together" |
  | `same_convoy` | `water`, `fuel` | daily consumption delta (negative = saving) | "-1 water per day" |

  `label` is the text the crew screen shows; 1 (2 for `damage`) is a strong combo.
- **Synergy sets** need no file: the game's generic sets (three Fighters in one vehicle,
  a Medic with a Mechanic, four Gunners in the convoy …) work with your characters and
  unnamed hands automatically; the crew screen shows them. They cannot be changed by a
  mod.
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
| `revealWhen` | optional list of flags: the talk button only shows on the building once **all** of them are set (empty = always shown). Use it for an NPC who has nothing to say before the story reaches them |
| node | `id`, `text`, optional `image` (a picture the NPC shows: photo, map, wanted poster — bare name in `assets/`, 3:2), `choices`, **`autoChoice`** |
| `autoChoice` | **mandatory** for every node with choices: a plain choice (no requirement, no check, no battle) the game takes on its automatic path |
| choice | `text`, then `next` (a node) or `exit: true`, optional `effects` (the same effect types as actions, chapter 4; `dispatchEncounter` last) |
| hidden gates | `requiresFlag` / `requiresNotFlag` — the choice is invisible until they match |
| visible gates | `requiresRole` (+ `requiresSkill`), `requiresPerk`, `requiresTrait`, `requiresOrigin`, `requiresCharacter` (id or name aboard), `requiresUnnamedRole`, `requiresSpareVehicle`, `requiresResources` — shown locked with the reason |
| `interject: true` | the best-qualified crew member present speaks the line (their portrait on the button) — use it for trait and role lines |
| `check` | a skill roll: the best crew member of `role` rolls `base` + `perSkill` × their level (capped at `cap`) %; on success the effects run, then `next` / `exit`; on failure the talk goes to `onFail` and the effects do NOT run; one attempt per day |
| `requiresSkill` | read on the old 1–5 scale, so files need no update: 1–3 = any level, 4 = level 2+, 5 = level 4+, 6 = level 6+, 7 = level 8+, 8 = level 10. The locked button names the level |

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
- `variants` on a panel add sentences by story flag: `[ { "requiresFlag": ["sb_tobi_stayed"],
  "requiresNotFlag": [], "body": "Tobi still rings it on Sundays." } ]` — every matching
  variant is appended to the panel's body (after the allied/hostile choice), in list
  order. Translation key `EPI_<ENDING>_P<n>_B<s>_V<i>` (i from 0).
- Ending ids are unique across all installed levels.

---

## 16. `i18n/*.csv` — translations

```
keys,en,de
SB_BUY_MOULD_DONE,"The chandler wraps the mould in sailcloth like a newborn.","Der Krämer wickelt die Form in Segeltuch wie ein Neugeborenes."
MISSION_SB_BELL_CRACKED_TITLE,The Cracked Bell,Die gesprungene Glocke
MISSION_SB_BELL_CRACKED_DESC,Find out why Bellwell's bell has gone silent.,Finde heraus warum die Glocke von Bellwell schweigt.
```

First column `keys`, then any of `en de fr es it ja zh ru pt pl ko`. Quote cells with commas;
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
| story meter chip (chapter 2) | `CHIP_<ID>` (caption), `CHIP_<ID>_TIP` (tooltip), `CHIP_<ID>_<value>` (a rung's label) |

Write fuel amounts as `{fuelpool:N}` / `{fuel:N}` tokens in every language column
(chapter 1). A row whose key the base game already uses does **not** replace the base
text unless your `level.json` sets `"levelTextWins": true` (chapter 2).

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

---

## 18. `map_life.json` — the living map

The world map moves between the player's clicks: **traffic parties** drive the road
graph and meet the player's crews, **radio beacons** appear as expiring pins the player
can chase, and **finds** glint beside the roads with lore and loot that lead to each other.
Shipping `map_life.json` **replaces** the base game's set while your level is active — the
base parties, beacons and finds never appear on your map, so write a full set (3–4
kinds, 3–5 beacons, 8–16 finds). Without the file your level gets the base game's living
map (its English texts and desert pictures).

```json
{
  "traffic": {
    "maxOnMap": 3, "spawnChancePercent": 50, "initialSpawns": 2,
    "kinds": {
      "sb_salt_patrol": {
        "behaviour": "patrol", "name": "{0} salt patrol", "desc": "Two rigs with mirror-glare goggles…",
        "icon": "traffic_patrol", "card": "sb_contact_patrol",
        "factions": ["sb_saltmen", "sb_bell_folk"], "stepsPerDay": 2,
        "lifetimeDays": [5, 8], "strength": [2, 3], "tollFuel": [4, 7] },
      "sb_brine_caravan": {
        "behaviour": "caravan", "name": "{0} brine caravan", "desc": "…", "icon": "traffic_caravan",
        "card": "sb_contact_caravan", "factions": ["sb_hulk_traders"], "stepsPerDay": 1,
        "lifetimeDays": [6, 9], "strength": [2, 3],
        "deals": [ { "give": { "water": 8 }, "want": { "fuel_regular": 5 } } ] },
      "sb_salt_pilgrims": { "behaviour": "refugees", "name": "Salt pilgrims", "desc": "…",
        "icon": "traffic_refugees", "card": "sb_contact_refugees", "factions": ["sb_bell_folk"],
        "stepsPerDay": 1, "lifetimeDays": [5, 8], "strength": [0, 0], "waterAsk": 3 },
      "sb_hull_pickers": { "behaviour": "salvagers", "name": "Hull pickers", "desc": "…",
        "icon": "traffic_salvagers", "card": "sb_contact_salvagers", "factions": ["sb_saltmen"],
        "stepsPerDay": 1, "lifetimeDays": [6, 9], "strength": [1, 2],
        "tipPrice": { "screws": 3 }, "scrapDeal": { "give": { "special_spare_parts": 1 }, "want": { "sheet_metal": 3 } } }
    }
  },
  "beacons": {
    "maxOpen": 2, "spawnChancePercent": 40, "firstDay": 2,
    "templates": [
      { "id": "sb_sos_pan_rig", "kind": "sos", "weight": 3, "lifetimeDays": [4, 6],
        "title": "SOS — rig on the pans",
        "intercom": "…anyone on the {0}? Broke an axle near the {1}…",
        "body": "A rig broke down on the pans…", "claimed": "The mirror flash finds you first…",
        "expired": "The mirror on the {0} did not flash at noon.", "card": "sb_beacon_sos",
        "vehicleTypes": ["Sedan", "Pickup", "PanelTruck"], "reward": { "water": 3 } },
      { "id": "sb_bounty_mirror_riders", "kind": "bounty", "weight": 2, "lifetimeDays": [4, 6],
        "title": "Bounty — mirror riders", "intercom": "{2} · {3}: riders have made camp on the {0}, near the {1}…",
        "body": "…", "claimed": "…", "expired": "…", "card": "sb_beacon_bounty",
        "skulls": [2, 3], "reward": { "fuel_regular": 8, "ammo_normal": 16 }, "rep": 1 },
      { "id": "sb_cache_brine_drop", "kind": "cache", "weight": 2, "lifetimeDays": [3, 5],
        "title": "Radar ping — under the crust", "intercom": "…", "body": "…", "claimed": "…", "expired": "…",
        "card": "sb_beacon_cache", "reward": { "water": 6, "screws": 8 } }
    ]
  },
  "pois": {
    "templates": [
      { "id": "sb_salt_camp", "name": "Salt-crusted camp", "card": "sb_poi_salt_camp",
        "lore": "Two tents collapsed under a crust of salt… 'Truck's dead in the sink south of here.'",
        "links": ["sb_salt_truck"], "linkText": "The note names a truck in the sink to the south." },
      { "id": "sb_salt_truck", "name": "Truck in the sink", "card": "sb_poi_salt_truck",
        "lore": "The truck went through the crust to its axles…", "loot": { "tires": 4, "ammo_normal": 24 } },
      { "id": "sb_hull_bell", "name": "Ship's bell in the hull", "card": "sb_poi_hull_bell",
        "lore": "…a chart of the pans with a course plotted to a place your map does not show.", "revealsLocation": true },
      { "id": "sb_mirror_cache", "name": "Rider's cache", "card": "sb_poi_mirror_cache", "lore": "…",
        "loot": { "resistors": 2 }, "repFaction": "sb_saltmen", "repDelta": -1 },
      { "id": "sb_bell_emp_crate", "name": "Diver's crate", "card": "sb_poi_emp_crate",
        "lore": "…one EMP grenade, pin taped down, a checklist ticked to the last line.",
        "joint": "sb_joint_01a", "upgrades": ["EmpGrenade"] }
    ]
  }
}
```

### Traffic — `traffic.kinds`

One entry per kind of party; the **key is your id** (prefixed) and names the texts
(`MAPLIFE_TRAFFIC_<KEY>_NAME` / `_DESC`, chapter 16). `behaviour` picks the rule set:

| `behaviour` | On the road | When a crew meets them (a card after the day tick) |
|---|---|---|
| `patrol` | 2 steps a day between their faction's places | standing ≤ *unfriendly*: pay `tollFuel` fuel or **fight** (a generated battle of that faction, `strength` skulls); *neutral*: half toll or fight; ≥ *accepted*: waved through, *liked*+ shares a rumour (reveals a location) |
| `caravan` | 1 step a day between settlements, vanishes on arrival | one seeded deal from `deals` (`give` for `want`), or **raid** it (−2 standing with its faction, its cargo on victory) |
| `refugees` | 1 step a day toward the nearest settlement | share `waterAsk` water: +1 standing with `repFaction` (default `free_nomads` — set one of your factions), crew morale, a rumour; or move on |
| `salvagers` | 1 step a day toward roads with wrecks | buy a tip for `tipPrice` (marks the nearest unfound find on the map even under the fog), or `scrapDeal` |

Fields: `name` (`{0}` = the faction's name), `desc`, `icon` (marker stem — the base
`traffic_patrol / traffic_caravan / traffic_refugees / traffic_salvagers` icons are fine),
`card` (the 3:2 contact picture), `factions` (your `level.json` factions or base ids —
the party's colour ring, standing and battle faction), `stepsPerDay`, `lifetimeDays`
`[min, max]`, `strength` `[min, max]` skulls, `tollFuel` `[min, max]`, `repFaction`
(refugees), `requiresFlag` (the kind only spawns while all these flags are set) and
`requiresNotFlag` (it stops spawning once one of these is set; parties already on the
road finish their run) — e.g. a patrol that appears once the story stirs a faction up,
or caravans that stop when a road war starts. Top level:
`maxOnMap` parties at once, `spawnChancePercent` per day, `initialSpawns` on day 1.
Parties spawn preferring roads that touch a place the player already knows, so the map is
alive right away. All goods tables use the **raw resource keys**.

### Beacons — `beacons.templates`

Pins on a road junction for `lifetimeDays`, announced on the intercom, claimed by
driving past that junction; when they expire the field log says what was missed.

| `kind` | Announced by | Claim |
|---|---|---|
| `sos` | an anonymous caller (grey portrait) | a stranded rig of one of `vehicleTypes` (a public chassis) joins the crew, damaged, with one hand aboard, plus `reward` |
| `cache` | "Radar watch" (the convoy's own operator) | `reward` goods land (doubled with a radar rig aboard) |
| `bounty` | a faction leader with standing ≥ neutral (`{2}` leader, `{3}` faction) | a FIGHT / LEAVE card against a hostile-ish faction at `skulls`; victory pays `reward` and `rep` with the poster |

Texts: `title`, `intercom` (`{0}` = road "A → B", `{1}` = junction name), `body` (the pin's
card), `claimed`, `expired` (`{0}` = road). `weight` = pick weight, `card` = the 3:2
picture, `requiresFlag` / `requiresNotFlag` gate a template on story flags like a
traffic kind. `maxOpen` beacons at once, `spawnChancePercent` per day from `firstDay`.

### Finds — `pois.templates`

Each template is placed once per level, deterministically, a little off a junction
(children next to their parent). A root with `joint` (a junction id from your
`level.json` roads) is **pinned** beside that junction instead — use it for a find that
belongs to a place, e.g. gear for the fight that junction starts. Pinned finds claim
their junctions before the seeded ones are placed; a `joint` that does not exist on the
level skips the find (validator warning), it is never moved somewhere random. A find is a glint on the map; clicking it opens its
card (`name`, `lore`, picture) — reading is free from anywhere. `loot` needs a crew **on
that road or at either end** ("Take it"). `links` names the next find of a chain: it
only appears once the parent was read, so the camp's note leads to the truck with the
tires (`linkText` is shown under the lore). `upgrades` is a list of `UpgradeType` names
(base catalog) that go into the convoy's upgrade stock on "Take it", next to `loot`; the
card and the log name them, and a find may carry only upgrades. The validator rejects
unknown names. `revealsLocation: true` puts the nearest
unknown place on the map when read. `repFaction` + `repDelta` charge standing when
looted (the Rust Wolves' cache). One parent per find, no cycles; a chain should end in
loot, upgrades or a reveal — the validator says so otherwise. Everything is saved with the game.

Texts derive keys `MAPLIFE_BEACON_<ID>_TITLE/INTERCOM/BODY/CLAIMED/EXPIRED` and
`MAPLIFE_POI_<ID>_NAME/LORE/LINK` for your CSV (chapter 16); English is the fallback.

---

## 19. `cargo_sets/<set_id>.json` — cargo discoverables

A **cargo set** turns cargo into a discovery. Two or three pieces, sometimes plus a
named character or a vehicle class, unlock an absurdly strong effect: a herd of cattle
that tramples the whole chasing pack, a stamp that freezes a battle, a convoy that
collects tolls instead of paying them. Every piece's card hints at the missing ones, so
the player goes hunting. The first time the effect fires, a near-full-screen
**Discovery Modal** takes over the screen (hero image, slogan, story, HOW IT WORKS box),
built for streams and screenshots. Afterwards the effect is a normal command or passive,
and the player can rewatch the reveal from the CARGO codex (intercom drawer).

**What you can and cannot make.** The effects are built into the game: a set **picks**
one of the implemented effect ids from the base catalog (*Cargo sets → Effect ids*) and
tunes its parameters. You invent the pieces, the story, the sources, the hints, the
reveal and its art. Some effects bind a built-in character (Diesel Rita, Widow Grete,
the Sector East duo of Rule 87); the catalog says which effects are usable in a mod.
Creation effects (`fx_assembly`, `fx_delivery_complete`, `fx_hearing_restored`, `fx_requisitioned`, `fx_verified`) do nothing by themselves: their reveal's `buttons` carry the effects (see *Creation reveals* in the catalog).

**One file per set**, in a `cargo_sets/` folder of your mod. The file name is the set id.
A bundle carries everything the set needs:

| Key | What |
|---|---|
| `set` | the set: pieces, placement, trigger, command, effect, reveal, hints |
| `parts` | the pieces, exactly like `parts.json` entries plus the cargo fields below |
| `actions` | the building actions that hand the pieces out (same grammar as `actions.json`) |
| `conversations` | dialog **patches**: a new tree, or entries/nodes added to an existing tree |
| `strings` | English texts for the keys the set references (modal copy, command verb) |

### A complete example

A two-piece set from a fictional salt-marsh mod: a pen of marsh buffalo on the tow hook
and the ferry horn that sets them running. In a chase, releasing the pen tramples the
pursuers.

```json
{
  "set": {
    "id": "sb_set_marsh_herd",
    "name": "The Marsh Remembers",
    "icon": "set_sb_marsh_herd",
    "tier": "early",
    "placement": "hitchedTo",
    "pieces": [ { "part": "sb_cargo_buffalo_pen" }, { "part": "sb_cargo_ferry_horn" } ],
    "optional": [ { "character": "preacher_kolb", "bonus": "herdReturns" } ],
    "requires": [ { "type": "orientation", "value": "chased" } ],
    "command": { "verb": "SB_CMD_STAMPEDE", "phase": "movement", "target": "none",
                 "viaDetach": "sb_cargo_buffalo_pen", "tell": "penGate" },
    "effect": { "id": "fx_stampede", "params": { "damage": 99 } },
    "consumes": [ "sb_cargo_buffalo_pen" ],
    "modal": {
      "image": "disc_sb_marsh_herd.jpg",
      "titleKey": "SB_SET_MARSH_TITLE", "sloganKey": "SB_SET_MARSH_SLOGAN",
      "bodyKey": "SB_SET_MARSH_BODY", "rulesKey": "SB_SET_MARSH_RULES",
      "sfx": "SB_DISC_MARSH"
    },
    "hints": [ { "conversation": "sb_ferryman", "node": "horn_hint",
                 "when": { "cargoAboard": "sb_cargo_buffalo_pen" } } ]
  },
  "parts": [
    { "id": "sb_cargo_buffalo_pen", "kind": "Cargo", "quality": "Large", "weightKg": 2400,
      "name": "Buffalo Pen",
      "description": "Nine marsh buffalo in a stock pen on two axles. They stand very still and watch the road behind you. The ferryman says they only run for one sound.",
      "image": "part_sb_buffalo_pen",
      "carry": "hitch", "set": "sb_set_marsh_herd",
      "story": { "origin": "faction", "ref": "sb_bell_folk",
                 "lore": "The salt farmers kept a herd to trample the reed beds flat each spring. The beds are gone. The herd is not.",
                 "hint": "The ferry horn at the crossing is the only thing they answer to." },
      "living": { "eats": "water", "perDay": 2, "unfedDays": 2, "fate": "walksOff" },
      "maxCopies": 1, "sellable": false },
    { "id": "sb_cargo_ferry_horn", "kind": "Cargo", "quality": "Small", "weightKg": 12,
      "name": "Ferry Horn",
      "description": "A brass hand-horn from the salt ferry, mouthpiece wrapped in tape. Blow it near anything with horns of its own and find out why.",
      "image": "part_sb_ferry_horn",
      "set": "sb_set_marsh_herd", "fragile": [ "fire" ],
      "story": { "origin": "prewar", "ref": "salt_ferry",
                 "lore": "The ferry crossed every hour for forty years. The horn still knows the timetable.",
                 "hint": "The farmers at the reed pens would trade a lot for this." },
      "maxCopies": 1, "sellable": false }
  ],
  "actions": [
    { "id": "sb_get_buffalo_pen", "label": "TAKE THE HERD",
      "requires": [ { "type": "flagAbsent", "flag": "sb_pen_taken", "reason": "The pen is already on your hook." },
                    { "type": "hitchFree", "reason": "Nobody here has a free tow hook." } ],
      "effects": [ { "type": "grantHitchLoad", "part": "sb_cargo_buffalo_pen" },
                   { "type": "setFlag", "flag": "sb_pen_taken" } ],
      "resultFallback": "The farmer hands you the gate rope and does not look back." },
    { "id": "sb_buy_ferry_horn", "label": "BUY THE FERRY HORN",
      "requires": [ { "type": "flagAbsent", "flag": "sb_horn_bought", "reason": "You already have the horn." },
                    { "type": "resourceAtLeast", "resource": "ammo", "amount": 6, "reason": "The ferryman wants 6 rounds." },
                    { "type": "bayFreeFor", "part": "sb_cargo_ferry_horn", "reason": "Needs a free cargo bay." } ],
      "effects": [ { "type": "grantResource", "resource": "ammo", "amount": -6 },
                   { "type": "grantPart", "part": "sb_cargo_ferry_horn" },
                   { "type": "setFlag", "flag": "sb_horn_bought" } ],
      "resultFallback": "He blows it once, for old times. Somewhere far off, something heavy turns its head." }
  ],
  "conversations": [
    { "id": "sb_ferryman", "npcName": "The Ferryman",
      "entry": [ { "requiresFlag": [ "cargo_seen_sb_cargo_buffalo_pen" ], "node": "horn_hint" },
                 { "node": "idle" } ],
      "nodes": [ { "id": "horn_hint",
                   "text": "'That pen on your hook. You will want my horn. Nine buffalo, one sound. Six rounds.'",
                   "autoChoice": "ok",
                   "choices": [ { "id": "ok", "text": "Noted.", "exit": true } ] },
                 { "id": "idle",
                   "text": "The ferryman polishes a brass horn and watches the marsh.",
                   "autoChoice": "bye",
                   "choices": [ { "id": "bye", "text": "Leave.", "exit": true } ] } ] }
  ],
  "strings": {
    "SB_CMD_STAMPEDE": "STAMPEDE",
    "SB_SET_MARSH_TITLE": "The Marsh Remembers",
    "SB_SET_MARSH_SLOGAN": "THE MARSH REMEMBERS!",
    "SB_SET_MARSH_BODY": "The ferry horn sounded once. Nine buffalo remembered the reed beds, and the pack behind you was standing where the reeds used to be.",
    "SB_SET_MARSH_RULES": "Once per chase: everything behind the pen is trampled. Mechs are not buffalo-compatible. Kolb aboard: the pen comes back empty."
  }
}
```

Bind the actions to buildings in `level.json` (`actionIds`) exactly like your other
actions, and the ferryman's tree with `conv_sb_ferryman`. A dialog patch whose id is new
creates a tree (it needs `npcName` or `npcCharacterId` and an unconditional last entry);
a patch whose id already exists adds to that tree.

### The `set`

| Field | Meaning |
|---|---|
| `id` | lowercase snake_case, prefixed, = the file name |
| `name` | English display name (codex, chips) |
| `icon` | set icon (bare name in `assets/`, see the art guide); shown on chips, cards, codex |
| `tier` | `early` or `mid` — documentation for you and the codex |
| `placement` | `sameVehicle`: all cargo pieces in ONE vehicle and the required characters in that vehicle · `sameConvoy`: anywhere in the convoy · `hitchedTo`: the hitch-load piece hangs on the vehicle that carries the other pieces (exactly one hitch piece) |
| `pieces` | what must hold, one field per piece: `part`, `character` (characters.json id; `"a\|b"` = either), `vehicleType` (chassis), `engine` (`"electric"`), `upgrade` (UpgradeType), `role` (CrewRole; `"a\|b"`) |
| `optional` | extra pieces that switch on a `bonus`; the bonus behaviour is built into the effect (catalog column *built-in bonus*) |
| `requires` | trigger conditions checked once all pieces hold: `orientation` (`chased`/`chase`), `night`, `location`, `building`, `factionEnemy`, `vehicleClass` — unmet triggers grey the command out with a reason |
| `command` | battle effects only: `verb` (string key of the button), `phase` (`movement`/`action`/`reaction`), `target` (`none`), `viaDetach` (the hitch part whose release fires the effect), `tell` (an id for the stage tell) |
| `effect` | `id` from the catalog + `params` (catalog column *params*) |
| `consumes` | part ids used up when the effect fires |
| `modal` | the reveal: `image` (16:9 hero, in `assets/`), `titleKey`, `sloganKey`, `bodyKey`, `rulesKey`, `sfx` (an `audio.json` event key; leave it out and a built-in category stinger plays), `buttons` (optional creation buttons: `{ "label": "…", "effects": [ action effects ] }`) |
| `hints` | documentation of where your hint lines live (the codex reads it); the lines themselves are dialog entries/choices gated on `cargo_seen_<partId>` |
| `achievement` | leave out in mods |

### The cargo fields on a part

| Field | Meaning |
|---|---|
| `carry` | `bay` (default) or `hitch`: a hitch load rides on the tow hook as a generic container of its `quality` (Small / Medium / Large) — no vehicle art needed. It needs a vehicle with tow capability (tier a: tow trucks, workshop, farm pickup, flatbed, … or any vehicle with the `TowRig` upgrade; a bare pickup cannot tow) |
| `set` | the set id this piece belongs to (one set per piece; the set must name the part back) |
| `story` | `origin` (`faction` / `character` / `prewar`), `ref` (faction id, character id or your tradition key), `lore` (the piece's story), `hint` (one sentence that points to the missing piece) — shown in the STORY tab of the card and in the codex |
| `living` | living cargo: `eats` (`water` or `smallCargo`), `perDay`, `unfedDays`, `fate` (`walksOff`/`dies`) |
| `fragile` | events that destroy it: `ram`, `rammed`, `boarded`, `fire`, `drop` |
| `maxCopies` | how many the convoy may hold (set pieces: 1) |
| `sellable` | `false` for set pieces |

### Sourcing and hints

- **Pieces in bays** come from actions with `grantPart` (gate with `bayFreeFor`), **hitch
  loads** with `grantHitchLoad` (gate with `hitchFree`). Enemy vehicles can carry a piece
  (`cargo1` in the encounter) — capturing the vehicle takes it.
- **Dialog cannot check reputation or free bays.** Give a piece through dialog as
  talk → `setFlag` → a pickup action that requires the flag and checks the bay.
- **Hint lines appear once the hunt has begun.** The game sets `cargo_seen_<partId>` the
  first time a piece enters the convoy; gate hint entries or choices on it with
  `requiresFlag`. A patch to an existing tree **prepends** your entries and adds or
  replaces nodes by id — make the entry condition specific, or it hijacks the tree.
- **Labels and result texts of actions are inline** (`label`, `reason`,
  `resultFallback`): the `strings` block only serves keys that the set itself references
  (modal copy, the command verb).
- Other flags you can read: `cargo_complete_<setId>` (all pieces held),
  `disc_<setId>` (the effect fired once — use it for restock actions),
  `cargo_lost_<partId>` (living cargo walked off, fragile cargo broke).

### Checklist for one set

1. Pick the effect in the catalog; check *usable in a mod*.
2. Write 2–3 pieces with a story each; every `hint` points at a missing piece.
3. Place the sources on different locations, so the hunt crosses the map.
4. Two or three hint lines on NPCs, gated on `cargo_seen_<partId>`.
5. Hero image, set icon, part images (art guide §9), the reveal sound in `audio.json`.
6. `strings` for every key in `modal` and `command.verb`.
7. Validate: the validator checks every part, character, chassis and upgrade name, the
   placement and trigger types, the effect id, the hitch-piece rule, the back-references
   between parts and sets, and every action and dialog effect.

---

## 20. `road_incidents.json` — road incidents in battle

A **road incident** is an absurd roadside moment in the middle of a fight. After the
beats of battle round 3 and round 7 the game rolls once each (50 %, from the battle's
seed). On a hit, one eligible incident fires:

1. its **walker** (an isometric cut-out) fades in on the far roadside, crosses the road
   and stops on the hex in front of the convoy vehicle with the most free road ahead;
2. a **card** opens over the paused battle: header picture, title, text, two buttons;
3. the player picks one; the text is replaced by the **result**, the effects land at once,
   and the walker leaves.

Exactly one option is good and one is bad, and the labels never say which. The joke is
usually that the sensible-sounding choice is the bad one. The game seats the two buttons
by a hash of the id, so the left button is not always the good one.

**Your file is merged over the game's pool** of 40 base incidents while your level is
active: your incidents join the pool, an incident with a base id **replaces** that base
incident, and `"baseIncidents": false` drops the whole base pool (for a setting where a
red-nosed reindeer would break the mood). To drop only a few, list their ids in
`"hideBase": ["…", "…"]` (e.g. incidents that name a base faction your level does not
have). Base ids are listed in the catalog (*Road incidents*).

### A complete example (Salt Bell)

```json
{
  "$schema": "https://raw.githubusercontent.com/BulloRosso/geargrave-outlands-support/main/.claude/skills/geargrave-outlands-mod-creator/references/schemas/road_incidents.schema.json",
  "baseIncidents": true,
  "incidents": [
    {
      "id": "sb_salt_mule", "time": "day", "stage": "desert", "terrain": "flat",
      "minSkulls": 2, "maxSkulls": 5, "needs": "", "once": false,
      "walker": { "stem": "sb_salt_mule", "rows": 1, "span": 2, "entry": "cross", "exit": "cross", "scale": 2.0 },
      "title": "The salt mule",
      "body": "A mule caked white with salt drags a sledge of salt blocks across the pan and stops in front of the convoy. A little cracked bell clanks on its collar, out of tune. Somewhere out there a Saltman is missing his mule, and his salt.",
      "a": { "label": "Lead it home to Bellwell", "good": true,
             "result": "The Bell Folk unload the salt, water the mule and pay in what they have: water. Warden Marr will hear who brought it home.",
             "effects": [ { "type": "rep", "faction": "sb_bell_folk", "delta": 2 }, { "type": "water", "delta": 2 } ] },
      "b": { "label": "Ring its bell for the owner", "good": false,
             "result": "The owner hears it. So does every Saltman on the pan: the crack in that bell is the only one like it, and now they know exactly where you are.",
             "effects": [ { "type": "enemyMorale", "delta": 2 }, { "type": "firePct", "side": "enemy", "pct": 120, "rounds": 1 } ] }
    }
  ]
}
```

Art for this incident: `assets/incidents/header_sb_salt_mule.png` (the card picture,
16:9) and `assets/incidents/walkers/sb_salt_mule.png` (the iso cut-out). Art guide §10.

### When an incident is eligible

| Key | Values | Meaning |
|---|---|---|
| `time` | `day`, `night` | night incidents fire only in night battles |
| `stage` | `any`, `desert`, `winter` | the level's terrain theme |
| `terrain` | `any`, `flat`, `rocky` | rocky = the battle has rocks, or a gorge / river-bed road |
| `minSkulls`, `maxSkulls` | 2..5 | the story level (2 = start, 5 = endgame) |
| `needs` | `""`, `robot`, `saucer`, `ambulance`, `warrig`, `battlemech`, `male_named`, `wreck_o` | something in the convoy the joke depends on (catalog) |
| `once` | true / false | true = never again in this campaign (sets `flag_incident_<id>`) |

The game also remembers the last 20 incidents and never repeats one of them, and it
never fires an incident whose walker has no room in front of any vehicle, or one that
would remove the player's last vehicle.

### The walker

| Key | Default | Meaning |
|---|---|---|
| `stem` | — | file name of `assets/incidents/walkers/<stem>.png` |
| `result` | — | optional second picture shown after the choice (with `exit: "stay"`) |
| `rows` | 1 | length in hexes along the road |
| `span` | 1 | hexes **across** the lanes that must be free in front of the target (2 for a car-sized walker, 3 for a bus) |
| `entry` | `cross` | `cross` = walks in from the far roadside; `drop` = falls from the sky onto its hex; `shoulder` = appears on the roadside and stays there |
| `exit` | `cross` | `cross` = keeps walking off the road; `fade`; `stay` = stays until the round ends; `lift` = rises back into the sky |
| `scale` | 1 | size factor on top of the stage's standard walker size |
| `alpha` | 1 | opacity once arrived (a mirage at 0.6) |
| `offsetRank`, `offsetLane` | 0 | shift the standing hex (and its room check) by whole hexes |
| `atLane` | — | an absolute lane **beside** the road (e.g. `-2.4` = past the far shoulder); skips the room check because nothing on the road is blocked |

### The options and their effects

Each option has `label` (the button, keep it under 40 characters), `result` (the text
after the choice), `good` (exactly one of the two) and `effects`. The effect verbs are
built into the game; the catalog (*Road incidents → Effect type*) lists every verb with
its arguments. The ones a mod uses most:

| Effect | Example |
|---|---|
| reputation (base faction or **your own**) | `{ "type": "rep", "faction": "sb_bell_folk", "delta": 2 }` |
| water / fuel / spare parts / shells | `{ "type": "water", "delta": 2 }` |
| a part of your `parts.json` | `{ "type": "grantPart", "id": "sb_engine_saltbox" }` |
| a story flag your quest reads | `{ "type": "setFlag", "flag": "sb_met_the_mule" }` |
| damage or repair the target vehicle | `{ "type": "structure", "delta": -20 }` |
| enemy morale / an enemy vehicle | `{ "type": "enemyMorale", "delta": -2 }`, `{ "type": "enemyStun", "who": "nearest", "rounds": 1 }` |
| stronger or weaker fire for N rounds | `{ "type": "firePct", "side": "enemy", "pct": 120, "rounds": 1 }` |

Hull numbers (`structure`, `enemyStructure`, `enemyHeal`) are on a **100-point scale**:
-20 is a heavy salvo, -8 a scratch, +15 a decent patch. Gains of water and fuel are
clamped by the convoy's tanks. Reputation with **your own** factions moves on the map and
is there when the battle ends.

### Texts and translation

The English texts sit inline in the file. To translate them, add rows to your
`i18n/<mod_id>.csv` with the keys `RW_INC_<ID>_TITLE`, `_BODY`, `_A`, `_B`, `_RA` (result
of A) and `_RB`, where `<ID>` is the incident id in capitals (ch. 16).

### Checklist for one incident

1. One joke, one image: a walker the player recognises at hex size, and a header that
   tells the scene without words.
2. Pick `time`, `stage`, `terrain` so it only fires where it makes sense.
3. Two options, one good, one bad; the good one is rarely the obvious one.
4. Effects small enough not to decide the battle alone: 2 rep, 2–6 water or fuel, a
   15–20 hull hit, one round of stun.
5. Set `span` for anything wider than a person, `scale` for anything bigger than a car.
6. Header and walker art (art guide §10), then validate: the validator checks every
   value above, every effect verb and argument, both pictures, and prints a summary line.

## 21. Biomes — `terrainTheme`, the `biome` block and `assets/game/`

The biome decides how the whole game *looks and behaves* on your level: the isometric
travel map (ground, rocks, plants, dust, sky), the isometric battle (painted backdrops,
road, landmarks, snow or heat shimmer), the impact and strategy cards, convoy and camp
backdrops, vehicle sprites, and rules such as cold nights, whiteouts and which hulls
appear. The game ships two biomes, `desert` (Sector East, the default) and `winter`
(Sector West). A mod can name its own.

### 21.1 A built-in biome

```json
"terrainTheme": "winter"
```

That is all a snow level needs: cold rules, whiteouts, the Snow Speeder in place of
motorcycles, winter faction pools and every `_winter` picture of the base game. Leave
`terrainTheme` out (or write `"desert"`) for a desert level.

### 21.2 Your own biome

```json
"terrainTheme": "jungle",
"biome": {
  "baseBiome": "desert",
  "roadsideFactions": ["FreeNomads", "SparkplugCult"],
  "fallbackFaction": "FreeNomads",
  "hullSwaps": { "Motorcycle": "Quad", "RaiderMotorcycle": "RaiderBuggy" },
  "isoBackdrops": { "mountain": "jx_ridge", "open": "jx_clearing" },
  "palette": {
    "sky": "#cfe0c4", "sand": "#6f8a46", "low": "#5f7a3c", "mid": "#4d6630",
    "rock": "#6b6a58", "rockDark": "#4a4a3e", "pan": "#7fa0a0", "peak": "#b9c4a8",
    "plant": "#2f5a2a", "scrub": "#3f6a34", "wood": "#4a3a2a", "dust": "#8a8a62",
    "haze": "#9fb08a", "water": "#3f7f7a"
  }
}
```

The theme name is lowercase snake_case: it becomes the file suffix of your art
(`impact_ram_jungle.png`). Every field of `biome` is optional.

| Field | What it does | Without it |
|---|---|---|
| `baseBiome` | `desert` or `winter`. Your biome follows that biome's **rules** (cold nights, whiteouts, snow on the battle road, Snow Speeder, the 3D travel view) and falls back to its **art** wherever you ship no picture of your own. | `desert` — and the validator warns, because a theme like `"snow"` would otherwise silently lose every winter rule |
| `roadsideFactions` | Combat factions that stage generated roadside fights (names from the catalog, "Biome art" section). | the base biome's pool |
| `fallbackFaction` | Combat faction of a generated fight that names none. | Rust Wolves (desert) / Zimnik Artel (winter) |
| `hullSwaps` | Chassis your biome fields in place of others, on both sides (`"Motorcycle": "Quad"`). Present = replaces the winter rule completely; `{"Motorcycle": "Motorcycle"}` keeps motorcycles on a winter base. | winter base: motorcycles become Snow Speeders; desert: no swaps |
| `isoBackdrops` | The painted battle sets beside the road: `mountain` for rocky road terrain, `open` for open terrain (asphalt fights pick one of the two by encounter id). A base set (`stone`, `canyon`, `winterplain`, `wintermountain`) or your own (21.4). | the base biome's two sets |
| `palette` | Colours of the isometric travel map, one key at a time (table 21.5). | the base biome's colour for that key |

### 21.3 Art: the `assets/game/` folder

Your level's `assets/game/` folder **mirrors the game's own art folder**. Take a game
picture's path (the catalog's "Biome art" section lists every picture that changes with
the biome, e.g. `impacts/impact_ram.png`), and:

- `assets/game/impacts/impact_ram_jungle.png` — your biome's **variant**: shown on
  jungle levels instead of the game's picture.
- `assets/game/impacts/impact_ram.png` — an outright **replacement**, used whenever
  your biome has no variant of its own (on any biome of your level).

The game looks for a picture in this order (first hit wins):

1. your `assets/game/<path>_<theme>.png`
2. the game's own `<path>_<theme>.png` (only exists for `winter`)
3. on a winter base: your `assets/game/<path>_winter.png`, then the game's `<path>_winter.png`
4. your `assets/game/<path>.png`
5. the game's picture

So a jungle level that ships nothing looks like the desert; a winter-based `tundra` that
ships nothing looks like Sector West, and every picture you add replaces just that one.

- Keep the **file type and pixel size** of the original (`.jpg` stays `.jpg`): screens
  crop and scale by the original's size.
- Pictures whose name already carries a biome (`ui/convoy-bg-desert-day.png`,
  `travel/sweep_lane_desert_night.png`, `konvoi/road_highway_desert_day.png`,
  `ui/loot-hall-desert.png`) take the **base biome's** name plus your suffix:
  `ui/convoy-bg-desert-day_jungle.png` on a desert base, `ui/convoy-bg-winter-day_tundra.png`
  on a winter base.
- The validator lists every file under `assets/game/` that matches no game picture or
  carries another biome's suffix — such files are never shown.

### 21.4 The isometric battle

**Backdrop sets.** A set is four tiles in `assets/game/lane/iso/backdrop/`:
`<set>_far.png`, `<set>_near.png` (required) and `<set>_far_outer.png`,
`<set>_near_outer.png` (optional, the strips beyond). Paint them at **1024×1536** like the
base sets (copy `stone_*` as a template and keep the road edge where it is). Then tell the
game where the road edge runs in each tile — picture pixels from the top, measured at the
left edge — in `assets/game/lane/iso/backdrop/backdrop.json`:

```json
{ "lineY0": { "jx_ridge_far": 380, "jx_ridge_near": 150, "jx_clearing_far": 440, "jx_clearing_near": 170 } }
```

Your file is merged into the game's, so it only lists your own sets. Name the sets in
`biome.isoBackdrops`. Prefix set names with your id prefix.

**Landmarks** (one big set piece that passes by in rounds 3–4, optional): canvas
2048×1536 per landmark, `assets/game/lane/iso/landmarks/<set>_<name>.png` plus an
optional `<set>_<name>_over.png` (the part that overlaps vehicles), listed in
`assets/game/lane/iso/landmarks/landmarks.json`:

```json
{ "tileOriginY": { "jx_ridge": 4 }, "sets": { "jx_ridge": ["temple_gate", "crashed_ferry"] } }
```

(`tileOriginY` = the vertical offset of the tile inside the canvas; copy the base value of
the set you started from.)

**Road and ground.** `assets/game/lane/iso/road_tile_<theme>.png` replaces the road
strip; `assets/game/lane/iso/terrain/<theme>/` may hold `sand.png`, `sand-rocky.png`,
`cracked.png`, `plateau-top.png`, `cliff.png`, `pit.png` (the fallback ground a battle
shows when a set's painted tiles are missing); missing ones come from the base biome.

**Snow, heat and dust** follow `baseBiome`: a winter base gets falling snow, tyre tracks
in snow and snow caps on vehicles; a desert base gets heat shimmer and tumbleweed.

**Vehicles.** The battle draws every vehicle from an isometric sprite. A vehicle of your
`vehicles.json` with `"skin": "jx_jeep"` uses `assets/game/iso_vehicles/jx_jeep.png`,
`jx_jeep-damaged.png` and `jx_jeep-broken.png` (art guide §5). A biome variant of any
sprite adds the suffix last: `iso_vehicles/dessert-pickup_jungle.png`,
`dessert-pickup-damaged_jungle.png`.

### 21.5 The isometric travel map (`palette`)

| Key | Paints | Key | Paints |
|---|---|---|---|
| `sky` | background behind the map | `wood` | dead trees |
| `ambient` | ambient light colour | `plant` | upright plants (cactus / pine) |
| `sun` | sunlight colour | `scrub` | low bushes, roadside scrub |
| `shadow` | cast shadows (alpha allowed: `"#1a2a1080"`) | `stone` | small rocks, roadside rocks |
| `dust` | dust plumes and puffs | `wall` | low settlement walls |
| `haze` | storm wall (sand / snow / your weather) | `plaza` | town squares |
| `water` | rivers and fords (tint) | `formationRock` | big rock formations (four shades) |
| `sand` | flat ground | `formationBand` | banded mesas (four shades) |
| `low` | low ground | `rock` | high rocky ground |
| `mid` | middle ground | `rockDark` | steep slopes |
| `pan` | dry pans / lake beds below the water line | `peak` | the highest summits |

Colours are `"#rrggbb"` (or `"#rrggbbaa"`). The roadside **polaroid pictures** of travel
vignettes follow the art rule: `assets/game/vignettes/vig_<id>_<theme>.png`.

### 21.6 Texts and what stays

- Vignette outcome lines that have a winter version also look for an i18n row
  `<KEY>_<THEME>` (`VIG_OUT_<VIGNETTE>_<VARIANT>_JUNGLE`) in your CSV. Other texts follow the base biome
  ("dust on the horizon" on a desert base, "snow plume" on a winter base) — reword them in
  your own events, legs and dialogs where it matters.
- Roadside events: a `travel_legs.json` leg with `"biomes": ["jungle"]` appears only in
  your biome; `["desert"]` legs appear in every desert-based level, yours included.
- Road incidents: `"stage": "desert"` / `"winter"` matches the base biome. Your own
  `road_incidents.json` only loads on your level anyway, so `"any"` is fine.
- An encounter's own `terrainTheme` may name your biome too (it then uses your biome's
  art and rules on its stage); any other unknown name plays as desert.
- The 3D travel view (an optional camera) always uses the base biome's landscape.

### 21.7 Checklist

- [ ] `terrainTheme` is snake_case; a theme that is not `desert`/`winter` has `biome.baseBiome`
- [ ] every file under `assets/game/` mirrors a game path (validator: no "matches no game picture")
- [ ] variants carry your theme's suffix; originals' size and file type kept
- [ ] own backdrop sets: `_far` + `_near` tiles + both `lineY0` lines; set names in `isoBackdrops`
- [ ] palette keys from table 21.5; hull swaps between catalog chassis
- [ ] play a fight on rocky and on open road terrain and look at the backdrop, road and landmark

---

## 22. The Mend board — `mend_items.json`

A bold attempt at the Mend board (chapter 4) can leave a **mend item**: a *tune* is made
from the damaged part or the wound itself on a breakthrough; a *graft* is a salvage piece
from the tray (won lane battles fill it) fitted in — on a clean job it carries a flaw, a
breakthrough drops the flaw. A severe botch leaves a **mark**. Every item moves one number
(`boon`), a graft at most one more (`flaw`). The game ships 60 items and 8 marks; a level's
`mend_items.json` rides on top of them while the level is active.

```json
{
  "items": [
    { "id": "jx_vine_lashing", "kind": "vehicle", "slot": "chassis", "source": "graft",
      "name": "Vine Lashing", "piece": "Coil of Liana",
      "story": "Green liana wound round the axle mounts while it was still wet. It dried like wire.",
      "boon": { "fx": "tire_saving_pct", "n": 15 }, "flaw": { "fx": "tempo", "n": -1 } },
    { "id": "jx_canopy_eyes", "kind": "person", "slot": "body", "source": "tune",
      "name": "Canopy Eyes", "story": "Weeks under the trees taught them to see what moves.",
      "boon": { "fx": "skill", "n": 1 } },
    { "id": "ported_manifold", "kind": "vehicle", "slot": "engine", "source": "tune", "standard": true,
      "name": "Swamp Manifold", "story": "Wider ports, and a snorkel against the wet.",
      "boon": { "fx": "speed_kmh", "n": 5 } }
  ],
  "marks": [
    { "id": "jx_mark_silted_block", "kind": "vehicle", "slot": "engine", "name": "Silted Block",
      "text": "Mud in the water jacket. It runs hot from now on.", "flaw": { "fx": "speed_kmh", "n": -5 } }
  ],
  "balance": { "trayCapacity": 6, "botchBase": 38 }
}
```

| Field | Meaning |
|---|---|
| `id` | snake_case with your prefix. The **same id as a base item or mark replaces it** while your level is active (the third item above repaints the Ported Manifold); a new id joins the catalog. Items and marks share one id space |
| `kind`, `slot` | `vehicle` + `engine` / `chassis` / `tank` / `armor` / `weapons` / `hull`, or `person` + `body`. Anything else is dropped |
| `source` | `tune` (made on a breakthrough, never a flaw) or `graft` (a salvage piece: needs `piece` and a `flaw`) |
| `standard` | optional label for the plain, expected tunes of a vehicle slot; no rule reads it |
| `name`, `story`, `piece` | English text; `piece` = the graft's name while it lies in the tray |
| `boon` / `flaw` | `{ "fx": <hook>, "n": <whole number> }`: hooks from the catalog ("Mend board"); positive `n` is always better for the carrier, so a boon is positive and a flaw negative |
| marks: `text`, `flaw`, `days` | what a severe botch leaves. `days` 0 = permanent (a proper job at a town bench or clinic removes it); more = it fades after that many days. The **first permanent mark of a slot** is the one a severe botch there leaves — a mark of yours for a slot wins over the base mark |
| `hideBaseItems` | `true` = start from an empty catalog: only your items and marks exist on your level. Give it at least one graft (or the tray stays empty), a permanent mark per vehicle slot and one for a person, or a severe botch leaves nothing |
| `balance` | the board's odds while your level is active — any of the `mend` knobs of the catalog, whole numbers; the rest keeps the game's value. `botchBase` / `botchPerRating` / `botchMin` / `botchMax` and `breakBase` / … set the bands from the lead's rating; `trayCapacity`, `trayPieces`, `trayPiecesBigBattle` the salvage tray; `personItemCap` the items a person carries |

**Icons.** Every new item needs `assets/mend_items/<id>.png` (square, transparent, like the
base icons: one object, 80/20 cel style, art guide §1). A replaced base item keeps the
game's icon unless you ship one under its id; `mark_vehicle.png` / `mark_person.png` there
replace the two shared mark icons.

**Texts.** The JSON English is shown in every language until your CSV has rows:
`MENDITEM_<ID>_NAME`, `MENDITEM_<ID>_STORY`, `MENDITEM_<ID>_PIECE`, `MENDMARK_<ID>_NAME`,
`MENDMARK_<ID>_TEXT` (`<ID>` = the id in capitals).

**Saves.** Items and marks are saved by id on the vehicle or person. An item a crew carries
out of your level into another keeps working only where its id exists — a convoy that
drives through a gateway into a level without your file carries a name the board no longer
knows (it shows nothing and counts nothing). Keep ids stable between versions of your mod.

Checklist:

- [ ] every item: kind + slot fit, a hook from the catalog, boon positive, flaw negative
- [ ] grafts have `piece` and `flaw`; tunes have no flaw
- [ ] an icon per new item in `assets/mend_items/`
- [ ] `balance` names only catalog knobs, whole numbers
- [ ] with `hideBaseItems`: grafts, and permanent marks for vehicle slots and for a person
