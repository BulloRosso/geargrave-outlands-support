# Modding Geargrave Outlands

A mod is **one folder** that the game loads as a playable level: its own map,
locations, buildings, quests, battles, ending and sounds. No programming and no
tools beyond a text editor are needed — everything is JSON plus your images and
sound files. The game checks your mod for you and says exactly what is wrong.

| I want to… | Go to |
|---|---|
| install a mod someone made | [Install a mod](#install-a-mod) |
| build my first mod | [Your first mod in 15 minutes](#your-first-mod-in-15-minutes) |
| look up a file format | [File reference](../.claude/skills/geargrave-outlands-mod-creator/references/file-reference.md) |
| know which ids the base game offers | [Base-game catalog](../.claude/skills/geargrave-outlands-mod-creator/references/base-catalog.md) |
| make images that fit the game | [Art guide](../.claude/skills/geargrave-outlands-mod-creator/references/art-guide.md) |
| let an AI agent build it with me | [Build a mod with an AI agent](#build-a-mod-with-an-ai-agent) |
| see a complete mod | [examples/](examples/) |

---

## Install a mod

1. Find the game's install folder. On Steam: right-click the game → **Manage** →
   **Browse local files**.
2. Open the **`levels`** folder in there. You will see the official `sector_east`
   and `sector_west` folders.
3. Copy the mod's folder next to them. The mod folder must directly contain a
   `level.json` — `levels/rust_vigil/level.json`, not `levels/rust_vigil/rust_vigil/level.json`.
4. Start the game. The mod appears in the **level picker**. Its **MODS** button
   (bottom left) lists every mod folder and whether it loads; a mod with problems is
   shown in red with the reasons.

To remove a mod, delete its folder. Saves made on a mod's level need that mod.

## Your first mod in 15 minutes

1. **Copy the example.** Copy [`examples/`](examples/)'s mod folder into `levels/`,
   rename the folder (e.g. `my_outpost`) and set `"id": "my_outpost"` in its
   `level.json`.
2. **Change something you can see.** Edit `displayName`, `description` and `author`
   in `level.json`, rename a location, move it (`"pos": [x, y]` — pixels on
   `assets/map_background.png`, which is 3840×2160).
3. **Check it.** In the game: level picker → **MODS** → **Re-check**. Or on the
   command line (faster while editing):

   ```
   "<install folder>\GeargraveOutlands.console.exe" --headless --validate-mod "<install folder>\levels\my_outpost"
   ```

   The report names the file and the exact spot (`$.locations[2].type`) of every
   problem, and suggests fixes (`did you mean 'fromId'?`).
4. **Play it.** Pick it in the level picker and roll out.
5. **Make it yours.** Rename every id prefix (the example uses a short tag in front of
   every id) to your own, add locations, write actions, add a battle, an ending and
   sounds — the [file reference](../.claude/skills/geargrave-outlands-mod-creator/references/file-reference.md)
   has an example for each.

### What a mod can contain

| File | What it adds |
|---|---|
| `level.json` | the map: factions, locations, buildings, roads and junctions, wrecks, starting crew |
| `actions.json` | building buttons: requirements → effects (resources, story flags, reputation, recruits, sounds, battles) |
| `factions.json` | who owns the places: leader, dossier, radio broadcasts, deliveries and contracts |
| `events.json` | things that happen at junctions |
| `travel_legs.json` | illustrated roadside decisions between junctions, with prices and consequences |
| `map_life.json` | the living map: patrols, caravans, refugee columns and salvagers moving on your roads (with contact cards), expiring radio beacons (SOS rigs, bounties, radar caches) and chained finds beside the roads with lore and loot |
| `encounters/*.json` | battles and vehicle finds |
| `progression.json` | what winning a battle changes (flags, opened roads, recruits) and the story goals |
| `epilogues.json` | the ending: a short comic that plays when your final story flag is set |
| `audio.json` + sound files | your own sound effects and music, or replacements for the game's |
| `i18n/*.csv` | translations of your texts into any of the game's nine languages |
| `characters.json`, `relationships.json` | recruitable characters with perks and traits; bonds and combos between them |
| `conversations.json` | NPC dialog trees with skill checks, trait lines and consequences |
| `vehicles.json` + vehicle art | your own vehicles on the game's chassis, with side view, hex tile and portrait |
| `parts.json`, `doctrines.json` | quest items, cargo and engines; their build value |
| `assets/` | map background, level banner, location scenes, building art, portraits, epilogue panels |

## The validator

Every mod folder is checked the way the game reads it. Three severities:

- **ERROR** — the game rejects the level, or a feature can never work (a building
  points at an action that does not exist, a sound file is `.flac`, an epilogue page
  has an unknown kind). **NOT LOADED** means the level does not show up at all.
- **WARN** — it works, but not as you meant it (a misspelled key the game ignores, a
  missing image, a location no road reaches, an ending nothing triggers).
  `RESULT: LOADS, n warning(s) to fix` means the mod plays but is not done yet.
- **INFO / hints** — optional polish (no banner yet, no building art) and each battle's threat rating in skulls.

Your mod is finished when the report says **`RESULT: OK`**.

Command line options: `--validate-mods` checks every installed mod,
`--validate-out=report.txt` also writes the report to a file, `--no-info` hides hints.
Exit code 0 = no errors (handy in scripts). On Linux run `./GeargraveOutlands.x86_64`
with the same options.

**Editor support.** The [`schemas/`](../.claude/skills/geargrave-outlands-mod-creator/references/schemas/)
folder has a JSON Schema for every file. Add a first line like
`"$schema": "https://raw.githubusercontent.com/BulloRosso/geargrave-outlands-support/main/.claude/skills/geargrave-outlands-mod-creator/references/schemas/level.schema.json",`
and VS Code (and most editors) will autocomplete keys and underline mistakes as you type.

## Build a mod with an AI agent

This repository contains an agent skill,
[`geargrave-outlands-mod-creator`](../.claude/skills/geargrave-outlands-mod-creator/SKILL.md).
It teaches an AI coding agent (Claude Code, or any agent that reads `SKILL.md`
skills) the whole mod format, the base-game catalog, the art style and the
validator loop.

- **Claude Code:** clone this repository and start Claude Code inside it — the skill
  is picked up automatically. Or copy the folder
  `.claude/skills/geargrave-outlands-mod-creator/` into `~/.claude/skills/`.
- Then describe your mod: *"Make a Geargrave Outlands mod: a salt-flat outpost
  around a deep well, four locations, a two-step quest ending in an epilogue, one
  boss battle, and a bell sound when the quest completes."* The agent asks a few
  questions, writes the files into your `levels/` folder and runs the validator until
  the mod is clean. You play-test and judge the result.

The example mod in [`examples/`](examples/) was built exactly this way.

## Sharing

Zip the mod folder itself (the zip contains `my_outpost/level.json`) and share it
wherever you like. Include a short `README.md`: what the mod is, how to install it,
credits, and whether images or sounds were AI-generated. Steam Workshop support is
planned; until then, zips are the way.

## Rules of thumb

- Prefix every id you create with a short tag (`rv_`) — ids are global across all
  installed levels.
- Keep `level.json` `id` identical to the folder name.
- Write strict JSON (no `//` comments, no trailing commas) — most files require it.
  Use `"_note": "…"` keys for notes.
- Sound files: `.ogg`, `.mp3` or `.wav`, paths relative to your mod folder.
- Mods cannot contain code. Everything a mod can do is listed in the file reference.

Questions or a format that is missing something you need? Open an issue in this
repository with the label **modding**.
