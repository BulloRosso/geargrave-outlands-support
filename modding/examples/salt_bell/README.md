# Salt Bell — the showcase example mod for Geargrave Outlands

A standalone level: a dead inland sea gone to white salt under a heavy sky. Ship hulls
rust on the cracked pans, a black basalt ridge walls off the east, and the thirsty,
stubborn people of **Bellwell** want their cracked signal bell to ring again — without
it, the water caravans pass them by.

It is the worked example for the
[mod file reference](../../../.claude/skills/geargrave-outlands-mod-creator/references/file-reference.md):
every system a mod can use appears here at least once, small enough to read in one sitting.

## What's inside

- **Map** — 5 locations (a well settlement, a stranded cargo ship used as a trading
  post, a pump station, a ridge outpost, a salt-buried harbour ruin), 7 roads,
  9 junctions, a recoverable wreck (`level.json`).
- **Two factions with full profiles** (`factions.json`) — the Bell Folk (Warden Ilse Marr,
  three moods, radio lines that change once the bell rings, a newspaper dossier, a water
  delivery and a mail-bag haul contract) and the Saltmen (Salt King Oszkar, hidden until
  the story introduces them, rivals of the Bell Folk through `spillover`).
- **A 5-step quest** on the jobs board (`progression.json` goals with `chainChild`),
  told through building actions (`actions.json`) and ending in a 3-page epilogue.
- **Two recruitable characters** (`characters.json`) — Maren Kett (Mechanic, `free_repair`,
  gearhead + wayfinder, essential) and her brother Tobi (Driver) — with the *Kett & Kett*
  combo and a wary bond between Maren and Vane (`relationships.json`).
- **Two dialog trees** (`conversations.json`) — Maren's (entry variants, a gearhead
  interject line, a Politician check with a fallback node, a water payment, recruits,
  a picture) and Quartermaster Ide, an inline NPC who unlocks a vehicle in the shop.
- **A new vehicle** (`vehicles.json`) — *The Road Manor*, a 1982 motorhome with welded
  armour on the `BattleBus` chassis, with a full image set. It is for sale at The Hulk
  once Ide lists it, and it is also the Salt King's war wagon in the finale — board it
  to capture it.
- **Quest items and an engine** (`parts.json`) — the founder's mould (rides in a cargo
  bay, used up by the recast), the stolen bronze (cargo on the boss vehicle), and the
  Saltbox 2.0 marine diesel; `doctrines.json` gives the engine and Maren build value.
- **Two battles** (`encounters/`) — a 2-skull ambush on the road and the 4-skull finale:
  a mortar behind a breakwater, burning barricades, a volunteer pickup that joins you in
  round 2, a late enemy rider, day/night rounds and a bounty on the war wagon.
- **Travel** — 4 junction events + 5 random ones (`events.json`) and 8 roadside
  decisions (`travel_legs.json`), three with their own pictures, the rest using the
  game's built-in road illustrations.
- **Sound** — three synthesized sound effects (bell, cracked bell, ship-hull gong) plus
  base-game sound keys (`audio.json`).
- **English and German** for every action, requirement, goal and name (`i18n/salt_bell.csv`).

## Install

1. Open the game's install folder (Steam: right-click the game → *Manage* →
   *Browse local files*) and go into `levels/`.
2. Copy the whole `salt_bell` folder in there, so that you have
   `levels/salt_bell/level.json`.
3. Start the game and pick **Salt Bell** in the level picker. It starts fresh at Bellwell.

## The quest (spoilers)

| Flag | Set by | Unlocks |
|---|---|---|
| `sb_bell_cracked` | Bellwell → Bell Gantry: `sb_inspect_bell` | the mould at The Hulk; the Saltmen appear in the faction lists |
| `sb_mould_found` | The Hulk → Hold Market: `sb_buy_mould` (4 ammo, needs a free cargo bay; grants the mould) | cooling water at Pump Station Nine; Maren offers to join |
| `sb_cooling_water` | Pump Station Nine → Pump House: `sb_buy_cooling_water` (5 fuel) | the ride against the Saltmen at Basalt Watch |
| `sb_bronze_recovered` | winning `sb_saltmen_boss` (started by Basalt Watch → Lookout: `sb_ride_on_saltmen`) | recasting the bell; the Warden's thanks |
| `sb_bell_rung` | Bellwell → Bell Gantry: `sb_recast_bell` (needs the mould aboard) | the epilogue; new Bell Folk radio lines |

Side threads: `sb_maren_joined` (Maren's dialog), `sb_manor_offered` (Ide's dialog →
The Road Manor in the shop), `sb_ambush_beaten` (the warm-up win changes which roadside
events appear), `sb_pilgrims_helped` (a roadside kindness paid back later), the optional
bronze hand-over if you captured the war wagon's cargo.

## Playtest list

Visit every location; run each custom action and both dialogs (with and without a
gearhead / dealmaker / Politician aboard); buy The Road Manor; recruit Maren and Tobi and
seat them in one vehicle; drive every road at different stances; win both battles (try
boarding the Salt Throne); reach the ending.

## Credits

- Design and text: Geargrave Outlands example, built with an AI agent using the
  `geargrave-outlands-mod-creator` skill.
- **All images are AI-generated** (OpenAI gpt-image-2, with official level art as style
  reference), then cropped, resized and cut out with ImageMagick.
- **All sounds are synthesized**: each is a handful of decaying, slightly inharmonic sine
  partials plus a short noise burst for the strike, rendered to 16-bit mono WAV by a
  small script. No recordings or sample libraries were used.

Version 1.1. Free to copy, change and learn from.
