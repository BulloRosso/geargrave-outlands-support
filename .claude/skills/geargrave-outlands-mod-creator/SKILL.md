---
name: geargrave-outlands-mod-creator
description: Build, extend, fix and validate mods for the game Geargrave Outlands — a mod is a level folder (map, factions, building actions, junction and roadside events, battles/encounters, story goals, vehicles with art, parts, characters with perks, traits, bonds and combos, NPC dialog trees, epilogues/endings, sound effects and music, translations). Use when someone wants to create a Geargrave Outlands mod, level, map, region, faction, quest, NPC dialog, character, vehicle, battle, roadside event, ending/epilogue or SFX, or asks why their mod does not load or shows errors in the game's MODS screen.
---

# Geargrave Outlands mod creator

You help a player build a **mod** for Geargrave Outlands: one folder that the game loads
as a playable level — its own map, factions, story, characters, vehicles, battles,
ending and sounds. You write JSON, organise art and sound files, and run the game's
validator until the mod is clean. The game's code is not available — everything you need
is in this skill:

| Read | When |
|---|---|
| `references/file-reference.md` | **always, before writing any file** — every format with a worked example (17 chapters) |
| `references/base-catalog.md` | whenever you use something from the base game: built-in actions, vehicle chassis, upgrades, perks, traits, doctrines, sound keys, playlists, gang tactics, road illustrations |
| `references/art-guide.md` | whenever you make or place an image — the **80/20 house style**, sizes, file names, prompts, vehicle image sets |
| `references/schemas/*.schema.json` | exact field lists; add `"$schema"` pointers so editors check files too |
| `modding/examples/salt_bell/` (support repo) | the complete worked example mod — copy patterns from it |

## 0. Find the game and the mods folder

The mods folder is `levels/` inside the game's install folder, next to the game
executable (the official `sector_east/` and `sector_west/` are in there too).

- Steam default (Windows): `C:\Program Files (x86)\Steam\steamapps\common\Geargrave Outlands\`
- Otherwise ask the user (Steam → right-click the game → *Manage* → *Browse local files*).

The validator is the game itself, run headless:

```
"<install>\GeargraveOutlands.console.exe" --headless --validate-mod "<mod folder>"
```

(Linux: `"<install>/GeargraveOutlands.x86_64" --headless --validate-mod <folder>`.)
If there is no console output, add `--validate-out=<file>` and read that file. Confirm the
validator runs (`--validate-mods`) before writing anything — you depend on it.

Work **directly in the mods folder** (`<install>/levels/<mod_id>/`), or author elsewhere and
validate by path. Gateway and id-collision checks compare against installed levels either way.

## 1. Agree on the brief (ask, don't assume)

Settle these with the user in a few questions, then restate them in 8–12 lines:

1. **Region** — one sentence of mood + climate (drives text, art, `defaultRoadTerrain`).
2. **Size** — 4–8 locations for a first mod, 1–3 buildings each, roads with 0–2 junctions.
3. **Factions** — 1–3: identity line, leader + speech style, what they trade and want,
   who they hate (file-reference ch. 3).
4. **Story** — one goal, 3–5 steps, each step a story flag: `flag → what sets it → what it
   unlocks`. The last flag triggers the **epilogue**.
5. **Characters** — 1–3 recruitable people: role, perk, traits, how they join; which pairs
   bond or combo (ch. 11–12).
6. **NPCs to talk to** — 1–3 dialog trees at buildings (ch. 13).
7. **Battles** — a warm-up (≤ 2 skulls), a gatekeeper, a finale (3–4 skulls); which one is
   the advanced set-piece (allies, obstacles, emplacements, mission) (ch. 7).
8. **Vehicles** — any new vehicle: chassis + look (ch. 9), where it comes from (shop,
   wreck, reward, enemy).
9. **Roads** — junction events and 6+ roadside events, or keep the game's generic roadside
   pool (ch. 5–6).
10. **Sound** — which moments get a sound; the user's files (ogg/mp3/wav) or base keys.
11. **Art** — does the user have an image tool? Art is optional; map background and
    vehicle side views matter most.
12. **Id prefix** — 2–3 letters from the mod name (`salt_bell` → `sb_`); every id starts
    with it, sound keys use it upper case (`SB_BELL`).

## 2. Build in this order — validate after EVERY step

1. **Skeleton** — `level.json`: factions, locations (placeholder `pos`), roads, one
   `startingCrews`, `description`, `author`, `version`. The validator must say it loads.
2. **Map art** (if possible) — `assets/map_background.png` first (3840×2160), look at it,
   put each `pos` on a painted landmark (art-guide §3). Otherwise spread locations over
   the canvas (≥ 60 px from edges).
3. **Factions** — the full profile in `factions.json` for each faction of your story:
   leader, speech style, broadcasts (+ flag-gated sets), dossier history, deliveries,
   contracts, spillover (ch. 3).
4. **Buildings + actions** — every location gets something to do: built-ins
   (`heal_crew`, `repair_vehicles`, `trade_water`, `buy_vehicles`, …) and your own
   `actions.json`. Story steps = actions with `flagPresent/flagAbsent` requirements and
   `setFlag` effects. Every custom action has a `resultFallback`, every requirement a
   `reason`.
5. **Characters, bonds, dialogs** — `characters.json` (perk from the catalog, 1–2
   traits, portrait, bio), `relationships.json` (a combo for a good pair, a bond with
   friction), `conversations.json` (NPC trees; every node with choices has a safe
   `autoChoice`; the last `entry` is unconditional; trait lines use `interject`).
6. **Vehicles and parts** — `vehicles.json` (chassis + `skin` + lore; shop / wreck),
   `parts.json` for quest items and cargo, `doctrines.json` to give them build value.
7. **Battles** — `encounters/<id>.json`; declare wins in `progression.json`. Check each
   battle's skull rating in the validator output: a battle started by a travel event must
   not exceed the story level (ch. 5).
8. **Goals** — `progression.json` `goals` with `chainChild` links (the main story) and
   `MISSION_<FLAG>_TITLE` / `_DESC` rows in your CSV.
9. **Travel** — `events.json` (every joint `eventId` + 4 random-pool events) and
   `travel_legs.json` (6+ roadside events with images, 2–3 choices each, safe `autoChoice`).
10. **Sound** — files into `assets/audio/`, map them in `audio.json` (`"assets/audio/x.ogg"`),
    play with `playSound` and event `sound` fields.
11. **Epilogue** — `epilogues.json`: `flags` = the final story flag; pages `world`,
    `factions` (allied/hostile variants), `convoy`.
12. **Art** — the rest, in the art guide's order, **always in the 80/20 house style**
    (realistic rendering + selective medium-weight ink edges on big forms only — never flat
    cel shading, never photoreal without edges). Vehicle skins: side view first, then hex
    tile, portrait, loot image, damage stages, all the same vehicle.
13. **Translations** (optional) — `i18n/<mod_id>.csv` with the derived keys (ch. 16).

## 3. Rules that prevent the classic failures

- `level.json` `id` = folder name; lowercase snake_case ids, all prefixed; character
  **names** unique (bonds, combos and doctrine tags match by name).
- Strict JSON (no comments, no trailing commas) in `actions.json`, `events.json`,
  `travel_legs.json`, `encounters/*.json`, `characters.json`, `vehicles.json`,
  `factions.json`, `conversations.json`. Simplest: strict JSON everywhere.
- `dispatchEncounter` is always the **last** effect.
- `events.json` and `travel_legs.json` use **raw resource keys** (`ammo_normal`,
  `fuel_regular`, …); only actions and dialogs accept the aliases.
- Shipping `events.json` / `travel_legs.json` **replaces** the game's pools: every joint
  `eventId` must exist; write 4+ random junction events and 6+ roadside events.
- Travel-event battles are threat-gated (story level starts at 2): keep them ≤ 2 skulls
  early, or start big fights from actions.
- A lost or fled battle sets nothing: put must-win fights on a building action so the
  player can retry; `once` events never come back.
- Sound keys are case-sensitive; audio paths are relative to the level folder.
- Vehicles: pick a chassis from the catalog — you cannot change its numbers, only dress it.
  Do not reference or describe the base game's own vehicles; build your own.
- Upgrades are built in: give or sell them, never invent new ones. New parts are plain
  engines or cargo; `Defense/Prep/Base/LootBox` classes only work on the game's own part ids.
- Perks: use one with an effect (catalog). Traits: only the ten listed.
- Your factions are map factions; a battle's `faction` only knows the game's combat
  factions — use `"None"` + a `gang` block and pay reputation through a follow-up action.
- Do not use Sector East story actions (catalog lists the reusable built-ins).
- Numbers: costs of 2–6 water or fuel, rewards 4–12; early fights 2–3 enemy vehicles
  with skill 2–3 crews.

## 4. Done means

- The validator prints **`RESULT: OK`** — 0 errors and 0 warnings. `RESULT: LOADS, n
  warning(s) to fix` is **not** done. INFO lines are polish: mention the rest to the user.
- A `README.md` in the mod folder: what it is, how to install (copy the folder into
  `levels/`), credits, and whether images/sounds were AI-generated or synthesized.
- A short **playtest list** for the user: pick the level in the level picker (its
  **MODS** button shows the same report); visit every location; run each custom action
  and dialog branch; buy/recover the vehicles; recruit the characters and seat the combo
  pair together; drive every road; win each battle; reach the ending (the epilogue plays
  on the map shortly after its flag is set). Only a human can judge pacing, tone,
  difficulty and whether the art fits.
- To share: zip the mod folder itself (the zip contains `<mod_id>/level.json`).

## 5. When the user brings a broken mod

Run `--validate-mod` first and work the report top-down: `NOT LOADED` lines, then ERROR,
then WARN. Each line names the file and a JSON path (`$.locations[2].type`) or an entity
(`actions[3] sb_open_gate effects[1]`). Quote the line to the user, fix it, re-run. The
in-game MODS screen shows the same report (enable *Show hints* for INFO lines).
