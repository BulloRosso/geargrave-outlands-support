# Art guide

All art is **optional** — a mod without images still plays (flat map backdrop, type
icons, stock vehicle art, silhouettes). Add art in this order; the first items change
the most: map background → banner → vehicle side views → location scenes → roadside
and epilogue images → living-map cards → portraits → building images → faction dossier art.

## 1. The house style: "80/20 graphic edge"

Everything except the map background is rendered in one look:

> **About 80 % realistic rendering, 20 % graphic edge.**
> A realistic painted image — truthful materials (weathered timber, corrugated metal,
> poured concrete, rusted steel, dust), believable ambient occlusion, one consistent
> directional light with **smooth, realistic falloff inside every surface** — plus a
> deliberate layer of **selective, medium-weight dark brown-black ink outlines** on the
> **big forms only**: silhouettes, rooflines, building corners, door and gate openings,
> vehicle bodies, wheels, crates and machines, large foreground props. Lines slightly
> heavier in the foreground than in the distance.

It is **not** flat cel shading: no posterized light, no hard light bands, no outlines on
small detail (planks, bricks, bolts, scratches, rust spots, texture noise — that turns it
into comic art). And it is **not** a photograph or a plain 3D render: the ink edges are
clearly visible and intentional — the major shapes would still read as a clean line
drawing if you removed the colour.

Palette: dusty ochre, rust, umber, olive, bleached sky; saturated red only for danger.
No text, letters, logos, UI or watermarks in any image.

**Style references.** The game's install folder ships its level art as plain PNGs:
`levels/sector_east/assets/` and `levels/sector_west/assets/` (location scenes
`location_scene_*.png`, building images `building_*.png`, vehicle art
`vehicle-sideview-*`, `hex-tile-*`, `vehicle-screen-*`). They are exactly this style —
give one or two of the same kind as a **style reference** to your image tool ("match the
rendering and edge treatment of the reference; do not copy its subject"). Use a desert
reference for a desert mod and a winter one for snow, or palette details (palm trees,
snow) leak over. Never copy them into your mod.

### The style block (append to every prompt except the map)

> STYLE: realistic painted rendering with truthful weathered materials, ambient
> occlusion and one consistent directional light with smooth realistic shading inside
> every surface. On top of that, a deliberate graphic edge treatment: confident
> medium-weight dark brown-black ink outlines ONLY on the major silhouettes and structural
> boundaries — outer contours of buildings and vehicles, rooflines, corners, large
> openings, wheels, crates and machines, large foreground props; slightly heavier in the
> foreground. No outlines on small detail (planks, bricks, bolts, scratches, rust spots,
> texture). About 80 % realistic rendering, 20 % graphic edge. Not flat cel shading, no
> posterized or banded light, not a photograph, not a plain 3D render, no depth-of-field
> blur. Muted post-apocalyptic palette (dusty ochre, rust, umber, olive), saturated red
> only for danger. No text, no letters, no logos, no watermark.

## 2. Files, sizes, names

| What | File (in `assets/`) | Size | Background |
|---|---|---|---|
| Map background | `map_background.png` (PNG!) | **3840×2160** | full image |
| Level banner | `banner.png` (named by `bannerImage`) | **1536×368** strip | full image |
| Location scene | referenced by `sceneImagePath` (`.png`/`.jpg`/`.webp`) | 1536×1024 (3:2) | full image |
| Building image | `building_<buildingId>_<status>.png` | 1024×768 (4:3) | full image |
| Vehicle side view | `vehicle-sideview-<skin>.png` (+ `-damaged`, `-critical`, `-broken`) | ~1024×683 | **transparent** |
| Vehicle hex tile | `hex-tile-<skin>.png` (+ `-damaged`, `-broken`) | 1024×1024 | **transparent** |
| Vehicle portrait | `vehicle-screen-<skin>.png` (+ `-damaged`) | 1536×1024 | full scene |
| Vehicle loot image | `loot-vehicle-<skin>.png` (+ `-damaged`) | ~1400×850, trimmed to the vehicle | **transparent** |
| Character / leader portrait | any name, referenced by `portrait` / `portraitMoods` | 1024×1024 square | full image |
| Faction emblem | referenced by `emblem` | 1024×1024 | transparent or plain |
| Faction dossier art | `familyPhoto`, `history.illustration`, `history.fightImage` | 1536×1024 | full image |
| Part image | referenced by `parts.json` `image` | 512×512 | plain neutral |
| Roadside event image | named by `travel_legs.json` `image` (bare name → .png, or with .jpg) | 1536×1024 (3:2), subject centred | full image |
| Dialog image | referenced by a conversation node `image` | 1536×1024 | full image |
| Encounter scene | referenced by `locationImage` / `situationImage` | 1536×1024 | full image |
| Epilogue panels | referenced by `epilogues.json` `image` | 1536×1024 or wider | full image |
| Living-map card (find, contact, beacon) | `life/<stem>.png`, named by `map_life.json` `card` | 1536×1024 (3:2) | full image |
| Living-map marker icon | `life/<stem>.png`, named by `map_life.json` `icon` (the base `traffic_*` icons need no file) | 1024×1024, subject ~85 % of the square | **transparent** |

Keep the whole mod under ~150 MB. Every image named in JSON may be `.jpg` (write the
extension) — use JPG quality 85–90 for full-frame scenes, panels, roadside and dossier art.
Files whose names the game builds (map background, building images, all vehicle skin
files) must be PNG; cut-outs must be PNG anyway (transparency).

## 3. Map background (its own style)

A detailed **painted overland map on aged, burnt-edged parchment**, seen from straight
above to slightly oblique: terrain (ridges, dry riverbeds, salt pans, forests, coast)
plus **small painted landmark clusters where your locations will sit**. Earthy ochre,
umber and olive, gentle contrast so the game's markers and road lines stay readable.
No roads drawn as lines, no markers, no text, no compass. The 80/20 edge rule does not
apply here.

> Detailed painted overland map of a post-apocalyptic region on aged parchment with dark
> burnt edges, top-down view: {terrain}. Small painted landmarks at {N} places: {list,
> with rough positions}. Earthy ochre, umber and olive, gentle contrast, fine painted
> detail. No roads drawn as lines, no markers, no text, no letters, no compass, no legend.

Generate 16:9 (or crop to 16:9) and upscale to exactly 3840×2160 — **never stretch**: its
pixels are your coordinates. Then read the pixel position of each landmark and use it as
that location's `pos`.

## 4. Scenes and places

**Location scene** (3:2) — high three-quarter establishing view of the place, like a
photographer on a rooftop: {place: what it is built from, who lives there, one telling
detail}, {time of day, weather}. + style block.

**Building image** (4:3) — "a single building: {…}, three-quarter view from slightly
above, centred, dusty ground around it" + style block. Status matters: `abandoned` =
boarded, drifted sand; `destroyed` = collapsed, burnt.

**Banner** (generate 3:2, crop a 1536×368 strip): "wide key art: {a character of your mod
in the foreground, your region's landmark behind, a convoy vehicle}" + style block. Keep
faces and vehicles in the middle third vertically — the strip crop removes top and bottom.

**Roadside event / dialog / encounter / epilogue image** (3:2): one clear moment — the
wagon on its side, the NPC holding up a map, the gang lined up at dusk, the town after
your ending — subject centred (roadside images are shown in a tall column and cropped at
the sides) + style block.

**Living-map cards** (3:2, `assets/life/`) — the picture behind every find, contact and
beacon card of chapter 18. Three prompt families, one per use: a *find* is "a detailed
still the player has just found from the road: {the find: the abandoned camp, the truck
in the sink}, subject centred, low horizon, hard-edged shadows, nobody or people far
away"; a *contact* is "an encounter on the road: {the party: two armed rigs blocking the
track / a caravan pulled over with its goods on a table / a column on foot / a salvage
crew at work}, slightly elevated three-quarter view, the road diagonal, figures small and
each doing something different"; a *beacon* is one moment "{the stranded rig at night
with a flare / the raider camp seen from a ridge at dawn / the dug-up container with a
radar unit beside it}". Write the region into every prompt (salt glare, snow, dunes) or
the base game's desert leaks in. + style block. Marker icons are shared with the base game
(`traffic_patrol`, `traffic_caravan`, `traffic_refugees`, `traffic_salvagers`, the pins and
glints) — a mod only needs new ones for a party that looks nothing like those four.

## 5. Vehicles

One **skin** = one set of images of the same vehicle, identical in design, colours and
damage story across all views. Generate the side view first and use it as the reference
for every other view ("the same vehicle as the reference, from {view}").

**Side view** — `vehicle-sideview-<skin>.png` (the most important image):
> Pure side profile of {vehicle: era, make-like description, colours, armour, weapons,
> cargo}, facing RIGHT, the whole vehicle in frame, wheels resting on the bottom edge of
> the image, no ground, no shadow, isolated on a transparent background, thick clean
> dark outline around the whole silhouette like a die-cut sticker. + style block.

Crop tight to the vehicle, keep a 3:2 canvas (e.g. 1024×683) with the wheels on the
bottom edge. Damage stages use the **same framing and vehicle size**:
`-damaged` (dents, scorch marks, a cracked window), `-critical` (smoking, panels hanging,
one wheel bent), `-broken` (burnt-out wreck).

**Hex tile** — `hex-tile-<skin>.png`:
> Isometric three-quarter view from above-front-left of {the same vehicle}, centred,
> occupying about 70 % of a square frame, soft drop shadow under it, transparent
> background. + style block.

`-damaged`: battered. `-broken`: a burnt wreck lying on its side, debris around it.

**Portrait** — `vehicle-screen-<skin>.png`:
> Three-quarter front view of {the same vehicle} parked in {a scene from your mod: the
> ship-hulk market, the salt flats at noon}, eye level, the vehicle fills the middle
> third. + style block.

**Loot image** — `loot-vehicle-<skin>.png`: three-quarter front view, isolated on a
transparent background, as if presented in the salvage hall.

**Framing recipe (image generators don't keep framing between calls — fix it after):**
1. *Side view + damage stages*: trim each image to its content (transparent border
   removed), scale every stage so the **vehicle length** matches the intact side view,
   paste onto a transparent canvas of the intact image's size with the wheels on the
   bottom edge, horizontally centred. (ImageMagick: `magick in.png -trim +repage
   -resize <W>x in2.png`, then `magick -size <W>x<H> xc:none in2.png -gravity south
   -composite out.png`.)
2. *Hex tiles*: trim, scale the longest side to ~70 % of 1024, centre on a transparent
   1024×1024 canvas; keep the damaged/broken tiles at the same scale.
3. *Loot image*: trim to the vehicle (no fixed size).

**Transparency**: ask your tool for a transparent background (many support it), or
generate on a flat colour and remove the background. The validator rejects cut-outs
without an alpha channel.

**Worked example — the 1980s armoured motorhome** (skin `sb-rv-road-manor`, chassis `BattleBus`):
> A 1982 American family motorhome: boxy fibreglass body, beige with a brown and orange
> stripe, a sleeping bay over the cab, wood-effect side panel. Survivors welded rusty
> boiler plate over the nose, the windscreen reduced to two slits, steel mesh over the
> side windows, lace curtains still inside. A pintle machine gun behind a plate shield on
> the roof ladder platform, jerry cans and a spare tyre on the rear ladder, sand tyres.

## 6. People and factions

**Portrait** (square): "head-and-shoulders portrait of {age, build, clothing, one telling
detail, expression}, looking slightly off-camera, dim neutral background" + style block.

**Faction leader moods**: the same person three times — `neutral` (calm), `pleased`
(a small real smile, relaxed shoulders), `angry` (tight jaw, leaning in). Generate
neutral first and use it as the reference for the other two.

**Emblem**: a painted badge/insignia object (a stencilled plate, a stitched patch, a
branded tin sign) that shows the faction's idea, centred, no letters.

**Family photo**: "the faction's people posed in front of their signature vehicles,
like an old group photograph, {place}" + style block.

**Part image** (square, plain background): the item alone, three-quarter view, soft
shadow + style block.

## 7. Post-processing

- Upscale with a high-quality filter (Lanczos); never change the map's aspect ratio.
- Crop the banner last and look at it at 1536×368.
- Look at every image before using it: wrong subject, text in the image, a
  photographic look without ink edges, or flat cel-shaded light → regenerate.
- Name files exactly as referenced; the validator reports missing files and missing
  transparency.

## 8. AI-generated art

If you use AI image generation, say so in your mod's README. Stores and players expect it.
