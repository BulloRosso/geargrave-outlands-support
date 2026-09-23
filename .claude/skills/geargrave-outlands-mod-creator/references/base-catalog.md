# Base-game catalog (GENERATED)

Generated from the game (early-access) by `ModdingExportProbe` — do not edit by hand.
Every id below is something a mod may **reference** from the base game. Ids a mod
**defines** itself must be new and prefixed with a short level tag (see file-reference.md).
Content that ships inside the official levels (Sector East / West characters, encounters,
story actions) is NOT listed: it is only loaded while that level is active.

## Map vocabulary (level.json)

- Location `type`: `Settlement`, `GasStation`, `Factory`, `MilitaryBase`, `Ruin`, `Farm`
- Building `type`: `VehicleShop`, `RepairShop`, `TownHall`, `Arena`, `Clinic`, `Watchtower`, `Workshop`, `Bunker`, `Chapel`, `Library`, `MotorPool`, `Caravanserai`
- Road `type`: `Highway`, `CountryRoad`, `OffroadTrack`
- Road `passability`: `Open`, `BlockedEnemy`, `BlockedDamage`

Location `status`: `inhabited`, `abandoned`, `destroyed`.

Resource keys (`startingResources`, building `requiredItem`, action `resource`):
`ammo_explosive`, `ammo_normal`, `fuel_diesel`, `fuel_regular`, `pistons`, `resistors`, `screws`, `sheet_metal`, `special_spare_parts`, `tires`, `water`.
Actions additionally accept the aliases `water`, `diesel`, `parts`, `ammo`, `explosives`.

## Built-in building actions (`actionIds`)

Reusable in any level (level-agnostic):

- `buy_vehicles`
- `sell_vehicles`
- `heal_crew`
- `repair_vehicles`
- `recruit_crew`
- `trade_water`
- `trade_fuel`
- `scavenger_task`
- `buy_intel`
- `install_tow_rig`
- `place_bets`

Sector East **story** actions (bound to its characters and flags — do not reuse): `arena_fight`, `attend_sermon`, `endgame_quest`, `inspect_saucer`, `mayors_tasks`, `negotiation_job`, `open_armory`, `pump_diesel`, `quest_board`, `recruit_diesel_rita`, `recruit_doc_mira`, `recruit_kalinka_voss`, `recruit_preacher_kolb`, `recruit_widow_grete`, `restore_tank`, `sniper_training`, `swap_flak_trailer`.

Global data actions (usable anywhere; override by defining the same id):
`buy_intel`, `buy_vehicles`, `install_tow_rig`, `scavenger_task`, `sell_vehicles`.

## Base factions (`factionId` in actions, epilogues, encounters' map faction)

| id | name |
|---|---|
| `convoy_guild` | Convoy Guild |
| `field_greys` | Field Greys |
| `rust_wolves` | Rust Wolves |
| `sparkplug_cult` | Sparkplug Cult |
| `free_nomads` | Free Nomads |

## Base characters (`recruitCharacter`, `characterRecruited`, `requiredCharacterId`)

| id | name | role |
|---|---|---|
| `diesel_rita` | Diesel Rita | Driver |
| `doc_mira` | Doc Mira | Medic |
| `fixit_otto` | Fixit Otto | Mechanic |
| `widow_grete` | Widow Grete | Sniper |
| `kalinka_voss` | Kalinka Voss | Gunner |
| `preacher_kolb` | Preacher Kolb | Politician |
| `berserk` | Berserk | Fighter |
| `wreck_o` | Wreck-O | Gunner |
| `gabby_hernandes` | Gabby Hernandes | Politician |

## Vehicle chassis (vehicles.json `type`, encounter enemy `type`)

A mod vehicle is a chassis (its combat numbers) plus your own name, lore and art (skin).
Class = size/mass (1-5), structure = hit points, armour = front armour (flanks -1, rear -2),
speed 0-5, seats = crew hands, mounts = upgrade slots.

| chassis | class | structure | armour | speed | seats | mounts | built-in gun | what it is |
|---|---|---|---|---|---|---|---|---|
| `Motorcycle` | 1 | 2 | 0 | 5 | 2 | 1 | - | motorbike — fast, fragile, two seats |
| `Quad` | 1 | 2 | 0 | 5 | 1 | 1 | - | quad bike — fast scout |
| `Buggy` | 2 | 4 | 0 | 4 | 2 | 2 | - | dune buggy — fast light raider |
| `Sedan` | 2 | 4 | 0 | 4 | 2 | 1 | - | civilian car — cheap, quick, thin |
| `Convertible` | 2 | 4 | 0 | 4 | 2 | 1 | - | open car — quick, one mount |
| `Suv` | 2 | 4 | 0 | 3 | 2 | 2 | - | SUV — all-rounder |
| `BajaSuv` | 2 | 4 | 0 | 4 | 2 | 3 | - | desert racer SUV — off-road running gear from the factory |
| `Pickup` | 2 | 4 | 0 | 3 | 3 | 3 | - | pickup — three seats, cargo bed |
| `FarmPickup` | 2 | 6 | 0 | 2 | 2 | 2 | - | farm pickup — tough frame, slow, tows |
| `PanelTruck` | 3 | 6 | 0 | 3 | 2 | 4 | - | panel van — slow, many mount slots (conversions, campers) |
| `MonsterTruck` | 3 | 6 | 1 | 3 | 2 | 3 | - | monster truck — ram plow from the factory |
| `Workshop` | 3 | 6 | 0 | 2 | 4 | 3 | - | workshop truck — four seats, toolbox built in |
| `TowTruck` | 3 | 6 | 1 | 2 | 2 | 3 | - | tow truck — hitch built in |
| `TankerTruck` | 3 | 6 | 0 | 2 | 2 | 2 | - | tanker — explodes when destroyed |
| `Truck` | 3 | 8 | 0 | 2 | 3 | 3 | - | off-road lorry — very tough, three seats |
| `Ambulance` | 3 | 6 | 0 | 3 | 4 | 2 | - | box ambulance — four seats, no cargo bays |
| `TrailerTruck` | 4 | 8 | 1 | 2 | 3 | 4 | - | semi tractor — hitch, big |
| `MilitaryTransporter` | 4 | 8 | 1 | 2 | 3 | 4 | yes | military transporter — armored, roof MG |
| `BattleBus` | 4 | 8 | 1 | 2 | 4 | 4 | yes | bus / motorhome hull — armored, four seats, roof MG |
| `Swat` | 4 | 8 | 2 | 2 | 3 | 3 | yes | armored police van — closed hull, roof MG |
| `FlatbedTruck` | 4 | 8 | 1 | 2 | 3 | 4 | yes | flatbed — three cargo bays, roof MG |
| `Tank` | 5 | 12 | 2 | 1 | 3 | 4 | yes | battle tank — tracks, heavy gun, closed hull |
| `FuelTrailer` | 1 | 2 | 0 | 0 | 0 | 0 | - | fuel trailer — towed, explodes |
| `PassengerTrailer` | 2 | 4 | 0 | 0 | 2 | 0 | - | passenger trailer — towed, two seats |

## Combat vocabulary (encounters, vehicles.json, actions)

- UpgradeType (enemy upgrades, addUpgrade, roadside grantUpgrade): `Headlights`, `RamPlow`, `SpikeShields`, `Loudspeakers`, `MgMount`, `Mortar`, `ExtraTank`, `ReinforcedTires`, `Nitro`, `RadioRig`, `SniperRifle`, `AtGun`, `TowRig`, `DiscoHeaven`, `KuroganeBlades`, `AshDrumBanner`, `TetsujinServoKit`, `ColdForgeArmor`, `Flamethrower`, `SmokeGrenades`, `OverdriveBooster`, `GrenadeLauncher`, `MegaBoomBox`, `ManekiEars`, `LoadedDice`, `Gramophone`, `SpareKnuckles`, `FridgeMagnet`, `Harpoon`, `BunnyEars`, `MegaWelder`, `RadarUnit`, `AuditorKnee`, `ChoirSubwoofer`, `BrassLung`, `FinaleRack`, `MirrorPlate`, `CoffeeMachine`, `BlueprintDangerousPanelTruck`, `BlueprintMortarSuv`, `BlueprintRamTruck`, `BlueprintBattlePlatform`, `BlueprintDevilTruck`, `BlueprintDeadlyRain`, `BlueprintGiveWay`, `BlueprintFutureDreams`, `BlueprintAvalanche`, `BlueprintSandstormBuggy`, `BlueprintOutlandSedan`, `BlueprintOutlandPickup`, `BlueprintDuneRaider`, `MineSweeper`, `MotionDetector`, `LargeCabin`, `ChainsawFront`, `HeavyBoreBarrel`, `GyroStabilizer`, `IncendiaryLoader`, `ApRounds`, `SalvageRadar`, `SignalBooster`, `TerrainScanner`, `DroneUplink`, `ArmoredFuelLiner`, `FireExtinguisherRig`, `SelfSealingTires`, `CrashHarnesses`, `LongHaulTanks`, `OffroadSuspension`, `SpikedRamPlow`, `LongBarrelAtGun`, `OmniArray`, `CanOpener`, `AssaultRamp`, `EarPlugs`, `JammerPod`, `Leaflets`, `ShrapnelCharge`, `Winch`, `DemolitionCharge`, `ToolKit`, `SoundInsulation`, `NightVision`, `InfraredSight`, `CamoPaint`, `FlareRounds`, `SilentRunning`, `OrbitalStrikeController`, `MineFlailDrum`, `SealedIntakes`, `IrHeadlights`, `ArmoredCabin1`, `ArmoredCabin2`, `DeckParapet`, `RollCage`, `ArmorPlate`, `HeavyArmorPlate`, `ChainGun`, `TurretMount`, `OffroadChassis`, `Ballast`, `BulkheadWall`, `LimpetCharge`, `LoaderAssist`, `JumpSeat`, `FrameReinforcement`, `Whaler`, `SgRustBreaker`, `SgCoachwhip`, `SgStreetSermon`, `SgGoldenChoke`, `SgDustDevil`, `SgWidowmaker`, `RfDrifterLever`, `RfHomesteader`, `RfBrassPilgrim`, `RfSilverPsalm`, `RfSandCantor`, `RfIronDeacon`, `ArScrapKalash`, `ArRoadWarden`, `ArAshCarbine`, `ArGildedMutiny`, `ArDuneChorus`, `ArGreyProtocol`, `MgScrapyardHowl`, `MgFreightreaper`, `MgThunderquill`, `MgGoldenChoirmaster`, `MgSandHymn`, `MgSilverSermon`, `SrLongPrayer`, `SrHorizonNail`, `SrQuietAuditor`, `SrSilverVerdict`, `SrDuneWidow`, `SrGoldenFullstop`, `GlDoorAuditor`, `GlPipeApostle`, `GlWidowsKnock`, `GlGoldenRequiem`, `GlSandVerdict`, `GlLastArgument`
- CrewRole (crew role, character role): `Mechanic`, `Medic`, `Driver`, `Gunner`, `Fighter`, `Sniper`, `Politician`, `Leader`
- Zone (enemy / stationary zone): `OwnRear`, `OwnMid`, `OwnFront`, `EnemyFront`, `EnemyMid`, `EnemyRear`
- Environment (encounter environment): `Day`, `Night`, `Sandstorm`, `ScrapField`, `Highway`
- FactionId (encounter faction, gang.faction, character origin): `None`, `ConvoyGuild`, `RustWolves`, `SparkplugCult`, `FieldGreys`, `FreeNomads`, `RustFinches`, `KuroganeKai`
- EncounterKind (encounter kind): `Battle`, `Vehicle`, `Person`, `Roadblock`
- StationaryType (encounter stationaries[].type): `None`, `MgNest`, `HiddenSniper`, `MortarTeam`, `AntiTankGun`
- Blockade kind (encounter blockades[].kind): `Wreck`, `Boulder`, `Container`, `BurningBarricade`, `TireStack`, `MineMound`, `DroppedTrailer`, `BarrelStack`, `PrototypeWreck`

Road terrain (roadTerrain, level defaultRoadTerrain): `asphalt`, `salzsee`, `duene`, `schlucht`, `wrackfeld`, `ruinenstadt`, `flussbett`, `minenfeld`.

Road battle grid: driving lanes 0-4 (blockade lane). Ranks are negative on the player side and positive on the enemy side:
EnemyFront 2..3, EnemyMid 4..5, EnemyRear 6..8, OwnFront -2..-1, OwnMid -4..-3, OwnRear -6..-5.
Write a blockade rank in enemy-side numbers; in a chased battle the game mirrors it.

Encounter orientation: chase (enemy holds the road ahead) or chased (the gang hunts the convoy from behind).

Mission type: ueberfall (ambush), eskorte (escort; escortName = a player-side reinforcement vehicle), frachtraub (cargo raid), durchbruch (breakthrough), kopfgeld (bounty; targetName = the enemy vehicle's name).

Gang motive:

- `kapern` - Capture: Soft kills: tires, driver, tank — then boarding. Your best vehicle is their target, not your weakest.
- `fracht` - Cargo: Attacks trailers and cargo carriers, avoids destroying them. Dumping cargo can end a battle.
- `blut` - Blood/Territory: Destruction, rams, shoving. The only motive that fights to the end — no retreat before escalation stage 2.
- `treibstoff` - Fuel: Hunts tankers and extra-tank carriers; never ignites tanks. Your extra tanks make you interesting.
- `trophaeen` - Trophies: Hunts special vehicles, prototypes, named crew. Specialisation draws fire.

Gang doctrine / secondDoctrine:

- `rudeltreiben` - Pack Drive: Isolate one player vehicle and shove it into the ditch.
- `scherenwand` - Shear Wall: Brake in front, feed from behind.
- `zangenzug` - Pincer Pull: Halve the column: hit the convoy's middle from both sides, split vanguard from rearguard.
- `aderlass` - Bloodletting: Patience and tires: distance 5–8 ranks, priority tires only, evade every closing move; then escalate to Boarding Run.
- `kaperfahrt` - Boarding Run: Alongside and over: boarders match tempo, anchors suppress the deck crew with crew-priority fire.
- `falkenjagd` - Falcon Hunt: The wounded first: all fire on the weakest worthwhile target (critical, driverless, leaking, marked).
- `koederfahrt` - Bait Run: The lone straggler flees toward the chokepoint; the gang waits out of sight.
- `schattenfahrt` - Shadow Run: Lights out, parallel out of sight, closed flank attack the moment the convoy betrays its position. Night only.
- `belagerung` - Siege: Grind the castle: surround, grenades and crew-priority fire clear the deck, then board from two sides.
- `sturmflucht` - Storm Retreat: Ordered withdrawal: barrels and mines to the rear, blockers cut pursuers off the loot, rally point beyond the band.

Special elements (specialElements):

- `tankwagen` - Tanker: A tanker rides with them: rupture thresholds one stage lower, explosion radius 2, a permanent fuel trail after a rupture. Igniting it is easy — capturing it is rich.
- `kommandofahrzeug` - Command Vehicle: A command vehicle keeps the gang on its doctrine. Take it down and the gang falls apart (Zerfall) — a target that makes the enemy shoot dumber.
- `waffenplattform` - Weapons Platform: A turret gun with range 14, a dead zone of 3 ranks, firing only at tempo 3 or less. Stalk it in its shadow or force it to drive.
- `raeumpanzer` - Clearance Tank: Tracked, no tires, overruns every blockade, tempo capped at 3. It eats the cover you were counting on.
- `bike_schwarm` - Bike Swarm: Six to eight bikes, every rider a boarder. Turns your priorities upside down: deck crew and grenades shine.
- `panzertransporter` - Armor Hauler: Structure 60 — hull fire is practically useless. A masterclass in the three soft kills: tires, driver, tank.
- `instabile_fracht` - Unstable Cargo: The carrier explodes at heat 1 or any ram. Its own driving becomes the difficulty; enemies ram instead of shooting.
- `verderbliche_fracht` - Perishable Cargo: A round limit ticks in the briefing (12–16 rounds). The only legitimate time limit: time pressure as a cargo property.
- `lebende_fracht` - Living Cargo: Crew-priority fire and grenades against the carrier destroy the reward. Mission rules that take tools away.
- `fassfracht` - Barrel Cargo: Action 'drop barrel': a blockade (mass 2, structure 3); shot at, it becomes a fire field. Cargo as a weapon.
- `sender_datenkern` - Transmitter Data Core: The carrier is permanently revealed (no fog, night useless); enemy waves until it leaves the band. A breakthrough that feels like flight.
- `schwerlast` - Heavy Load: The trailer adds 4 ranks and caps tempo at 3. Speed as a solution is struck — a pure space-control game.
- `prototyp_bergung` - Prototype Salvage: A wreck on the track; salvaging takes 2 rounds adjacent with a winch. A race that tips into standstill mid-battle.
- `stoersender` - Jammer: Radius 8: no marks, no track preview, no part recon. It attacks information, not vehicles.
- `windenjaeger` - Winch Hunter: An enemy winch rig: harpoons and drags toward the shoulder. Your own mechanic, from the wrong side.
- `minenleger` - Mine Layer: Drops one debris cell behind itself every round. Pursuit becomes slalom — visible in the movement resolution.
- `oelwerfer` - Oil Thrower: Lays oil slicks (steering blackout). Breakthrough defence, deterministically readable.

## Character perks (characters.json perk, dialog requiresPerk)

- `black_ice_waltz` - no road wear on winter levels
- `boarding_fury` - boarding assaults hit harder (Fighter)
- `broker_tongue` - negotiation +10 % / threshold +1
- `cg_cool_head` - The first reaction this vehicle triggers each battle costs no hand. (normally earned through experience)
- `cg_deck_guard` - Boarders face one more defender on this deck (the best defence bonus counts, they do not stack). (normally earned through experience)
- `cg_field_weld` - Field repairs by this mechanic restore one more point of structure. (normally earned through experience)
- `cg_night_eyes` - On lookout at night or in a sandstorm, the road preview reaches 6 ranks instead of 4. (normally earned through experience)
- `cg_quick_hands` - Works one extra repair note per day at the camp board. (normally earned through experience)
- `cg_second_cure` - The heal job puts two freshly wounded hands back on their feet instead of one. (normally earned through experience)
- `cg_silver_tongue` - The first propaganda broadcast by this politician each battle costs the gang one extra morale. (normally earned through experience)
- `cult_whisperer` - talks cultists down: better negotiation with the faithful (Politician)
- `eagle_eye` - can inspect enemy vehicles in the battle cutaway
- `field_recovery` - the wounded recover between fights (Medic)
- `first_shot_bonus` - the first shot of each battle hits harder (Sniper)
- `free_repair` - one repair a day costs no parts (Mechanic)
- `free_reverse` - backing up a zone costs no move (Driver)
- `lion_dance` - boarding ignores the enemy boarding overwatch
- `mounted_gun_range` - mounted guns reach one rank further (Gunner)
- `orbital_mortar` - calls the orbital strike (special - avoid in mods)
- `pathfinder` - spots mines and hazards on the road
- `radar_ears` - +1 scouting intel
- `relentless_pursuit` - +1 on the first hit each battle against a target that moved last round
- `signal_master` - their vehicle is a command post (like a radio rig)
- `white_noise` - their vehicle ignores enemy reaction locks

## Character traits (characters.json traits, dialog requiresTrait)

- `believer` - reads the road like scripture — opens rite and cult lines
- `dealmaker` - talks water out of a stone — opens negotiator lines
- `gearhead` - reads engines like faces — opens machine lines
- `ghost` - is never the one they watch — opens stealth and eavesdrop lines
- `grifter` - every lock has a price, every mark a tell — opens con lines
- `hairtrigger` - violence is a first language — opens intimidation lines
- `paperwise` - knows how a stamp gets made — opens permit and ledger lines
- `performer` - can hold a crowd — opens stage and spectacle lines
- `veteran` - has worn a uniform and knows who salutes whom — opens military lines
- `wayfinder` - reads the land like a map — opens route, weather and water lines

## Bonds and combos (relationships.json)

Bond states: `trusts`, `owes`, `wary`, `resents`, `refuses` (value >= 20 trusts, 1..19 owes, -19..0 wary, -34..-20 resents, <= -35 refuses).
Effect condition + stat: same_vehicle with `morale`, `damage`, `combat_value`, `negotiation`, `repair`; same_convoy with `water`, `fuel` (per-day consumption delta, negative = saving).

## Road doctrines (doctrines.json component points)

- `ram` - Right of Way: Brakes are a pre-war superstition; whoever weighs more is legally correct.
- `sniper` - Final Notice: One envelope, one stamp, one recipient; delivery is always confirmed.
- `boarding` - House Call: The crew does home visits; the patient rarely recovers, but the vehicle does.
- `negotiation` - Customer Service: The complaints department survived the apocalypse; it always does.
- `roadblock` - Roadblock: You didn't stop at the checkpoint, so the checkpoint came to you.
- `rush` - Rush Hour: Never be where the paperwork says you are.
- `warranty` - Full Warranty: The last valid warranty in the wasteland, honored at gunpoint if necessary.

## Roadside events (travel_legs.json)

stances: `steady`, `cautious`, `overdrive`, `nightrun`. roadTypes: `Highway`, `CountryRoad`, `OffroadTrack`.
Built-in illustrations a leg may use as image without shipping art:
`icon_pace`, `konvoi_ev_casualty`, `konvoi_ev_crossing`, `konvoi_ev_decoy`, `konvoi_ev_deserter`, `konvoi_ev_envoy`, `konvoi_ev_gamble`, `konvoi_ev_hauler`, `konvoi_ev_incident`, `konvoi_ev_informant`, `konvoi_ev_informant_backlash`, `konvoi_ev_kid_camp`, `konvoi_ev_lookout`, `konvoi_ev_mechanic`, `konvoi_ev_patrol`, `konvoi_ev_rival`, `konvoi_ev_shortcut`, `konvoi_ev_shrine`, `konvoi_ev_trader`, `konvoi_ev_turnabout`, `konvoi_ev_water`, `konvoi_ev_wellspring`, `roadside_ambulance_drone`, `roadside_ambush_remains`, `roadside_ambush_survivor`, `roadside_broken_family`, `roadside_burning_tanker`, `roadside_chalk_cistern`, `roadside_chalk_sun_cave`, `roadside_chalk_teacher`, `roadside_chalk_warning`, `roadside_clan_gift`, `roadside_clan_grudge`, `roadside_clan_outriders`, `roadside_dead_drop`, `roadside_dead_surveyor`, `roadside_distress_relay`, `roadside_distress_relay_trap`, `roadside_drive_in_night`, `roadside_empty_truck`, `roadside_fever_wagon`, `roadside_glass_field`, `roadside_grave_road`, `roadside_hostage_swap`, `roadside_last_billboard`, `roadside_mine_singer`, `roadside_minefield_blind`, `roadside_minefield_marked`, `roadside_night_choir`, `roadside_night_flare`, `roadside_numbers_station`, `roadside_parts_find`, `roadside_parts_trader`, `roadside_pontoon_scales`, `roadside_press_gang_toll`, `roadside_rag_and_bone_king`, `roadside_signal_flare`, `roadside_sinkhole_cry`, `roadside_survey_obelisk`, `roadside_the_one_who_walked`, `roadside_thirsty_pilgrims`, `roadside_vault_of_axles`, `roadside_walking_welder`, `roadside_water_diviner`, `roadside_wolf_tribute_post`, `roadside_wolves_payback`, `roadside_wolves_respect`, `sweep_lane_desert_day`, `sweep_lane_desert_night`, `sweep_lane_winter_day`, `sweep_lane_winter_night`, `travel_map_aerial`, `travel_map_aerial_winter`, `travel_scene_camp`, `travel_scene_camp_winter`, `travel_scene_country`, `travel_scene_country_winter`, `travel_scene_highway`, `travel_scene_highway_winter`, `travel_scene_night`, `travel_scene_night_winter`, `travel_scene_offroad`, `travel_scene_offroad_winter`.

## Reputation levels (factions)

Reputation starts at 0 (neutral) with every faction. Levels: `allied` at 4, `liked` at 2, `accepted` at 1, `unfriendly` at -2, `hostile` at -4. Contract / delivery minLevel uses these names.
Contract kind: haul (deliver to 'to'), escort (escortVehicle rides along on the next run), bounty (target = a faction whose vehicles to hunt).

## Mascot effect ids (mascots.json effectId - mods can only reuse these)

- `surrender_always_loot_minus1` (SurrenderAlways)
- `every5thwin_bonuscard_repLossX2` (LoyaltyCard)
- `nego_plus10_failplus1moral` (LuckyCat)
- `aimed_vs_minus20_ownsniper_minus10` (Skydancer)
- `loot_bonuscard_subtrap15` (MysteryBox)
- `scrap_plus50_recruit_minus10` (Receipt)
- `taunt_dodge20_zonebuddies10` (NeonArrow)
- `repair_minus1part_bware5` (PriceTag)
- `speed_plus1_night_dodge_minus10` (RgbKnob)
- `reroll_first_miss_bothsides` (FuzzyDice)
- `morale_clamp_2_8` (Trophy)
- `moral_per_explosion_recruit_minus10` (HighscorePlate)
- `round1_init_plus2_round4_minus1` (EnergyDrink)
- `crew_plus1_zoneenvy_minus1_leaderfix` (ClawCrown)
- `night_malus_half_day_minus5` (LedHalo)
- `undo_one_command_minus1moral` (Joystick)
- `sniper_hit_plus50` (Badger)
- `style_tech_boost` (TechTotem)
- `style_organic_boost` (OrganicTotem)
- `style_metal_boost` (MetalTotem)
- `style_scrap_boost` (ScrapTotem)
- `ledger_empty_column` (EmptyColumnTotem)
- `eighth_flag_banner` (EighthFlagTotem)
- `km_fx_ram_plus1` (KmRamPlus1)
- `km_fx_first_surface_offset_free` (KmFirstSurfaceOffsetFree)
- `km_fx_free_lane_change` (KmFreeLaneChange)
- `km_fx_repair_plus1` (KmRepairPlus1)
- `km_fx_first_component_shot_plus1` (KmFirstComponentShotPlus1)
- `km_fx_first_mark_expires` (KmFirstMarkExpires)
- `km_fx_rally_spreads` (KmRallySpreads)
- `km_fx_wear_halved` (KmWearHalved)
- `km_fx_choose_gust` (KmChooseGust)
- `km_fx_night_sight` (KmNightSight)
- `km_fx_free_crew_transfer` (KmFreeCrewTransfer)
- `km_fx_propaganda_plus1` (KmPropagandaPlus1)

## Base parts (parts.json ids for grantPart, cargoAboard, ...)

Only these ids have built-in Defense / Prep / Base / LootBox behaviour; a mod may restyle them (same id) but new ids act as plain cargo.

| id | kind | class | size |
|---|---|---|---|
| `engine_rustpop_11` | Engine | None | Small |
| `engine_hornet_vtwin` | Engine | None | Small |
| `engine_v8_workhorse` | Engine | None | Medium |
| `engine_boxer_twincam` | Engine | None | Medium |
| `engine_leviathan_diesel` | Engine | None | Large |
| `engine_warhog_block` | Engine | None | Large |
| `cargo_radar_station` | Cargo | Base | Medium |
| `cargo_drone_set` | Cargo | None | Small |
| `cargo_water_purifier` | Cargo | Base | Medium |
| `cargo_field_forge` | Cargo | Base | Large |
| `cargo_medical_pod` | Cargo | Base | Medium |
| `cargo_fuel_bladder` | Cargo | Base | Large |
| `cargo_fuel_canister` | Cargo | None | Small |
| `cargo_fuel_drum` | Cargo | None | Medium |
| `cargo_fuel_tank` | Cargo | None | Large |
| `cargo_master_toolchest` | Cargo | Base | Small |
| `cargo_marble_statues` | Cargo | None | Large |
| `cargo_pink_fridge` | Cargo | None | Medium |
| `cargo_chrome_jukebox` | Cargo | None | Medium |
| `cargo_disco_ball` | Cargo | None | Small |
| `cargo_espresso_machine` | Cargo | None | Small |
| `cargo_arcade_cabinet` | Cargo | None | Large |
| `cargo_champagne_crate` | Cargo | None | Small |
| `contract_crate` | Cargo | None | Small |
| `cargo_carburetor` | Cargo | None | Small |
| `cargo_luxury_cabin` | Cargo | Base | Medium |
| `cargo_field_workshop` | Cargo | Base | Medium |
| `defense_spike_dropper` | Cargo | Defense | Small |
| `defense_smoke_battery` | Cargo | Defense | Small |
| `defense_decoy_flares` | Cargo | Defense | Small |
| `defense_mg_turret` | Cargo | Defense | Medium |
| `defense_paint_mortar` | Cargo | Defense | Medium |
| `defense_mine_dropper` | Cargo | Defense | Large |
| `defense_oil_slick` | Cargo | Defense | Small |
| `defense_radio_jammer` | Cargo | Defense | Small |
| `defense_decoy_drone` | Cargo | Defense | Small |
| `defense_nitro_rack` | Cargo | Defense | Medium |
| `prep_ground_scanner` | Cargo | Prep | Small |
| `prep_decoy_rig` | Cargo | Prep | Small |
| `prep_cutting_torch` | Cargo | Prep | Small |
| `prep_sand_ladders` | Cargo | Prep | Small |
| `prep_false_colors` | Cargo | Prep | Small |
| `base_water_tank` | Cargo | Base | Large |
| `base_quarters` | Cargo | Base | Medium |
| `base_gun_turret` | Cargo | Base | Large |
| `boarding_bridge_hydraulic` | Cargo | None | Large |
| `lootbox_small` | Cargo | LootBox | Small |
| `lootbox_medium` | Cargo | LootBox | Medium |
| `lootbox_large` | Cargo | LootBox | Large |
| `lootbox_cache` | Cargo | LootBox | Medium |

## Sound effect keys (audio.json `events`, `playSound`, travel event `sound`)

A mod may PLAY any of these, or REPLACE one by defining the same key in its own audio.json
(the replacement is active while the mod's level is loaded). Keys are case-sensitive.

`GARAGE_SNAP_IN`, `MASCOT_CHEER`, `MORALE_BREAK`, `CAPSTONE_BEAT`, `COMBAT_FIRE_RIFLE`, `COMBAT_FIRE_EXPLOSIVE`, `COMBAT_FIRE_MORALE`, `COMBAT_FIRE_NO_HIT`, `COMBAT_FIRE_HIT_RIFLE`, `COMBAT_FIRE_HIT_EXPLOSIVE`, `COMBAT_VEHICLE_DESTROYED`, `COMBAT_STATION_DESTROYED`, `COMBAT_ARMOR_BOUNCE`, `COMBAT_TIRES_SHRED`, `COMBAT_FUEL_PIERCE`, `COMBAT_WEAPON_WRECK`, `COMBAT_CREW_DOWN`, `COMBAT_BOARD_CLASH`, `COMBAT_REPAIR`, `COMBAT_EMP`, `COMBAT_PUSH_SHUNT`, `COMBAT_ORBITAL`, `LOOT_WATER_TAKEN`, `LOOT_AMO_TAKEN`, `LOOT_FUEL_TAKEN`, `LOOT_SCRAP_HAUL`, `ACH_UNLOCKED`, `COMBAT_VICTORY`, `COMBAT_DEFEAT`, `UI_WHEEL_CONFIRM`, `UI_ROUND_START`, `CREW_RECRUIT`, `BLUEPRINT_INSTALL`, `MAP_DISCOVERY`, `SURVIVAL_THIRST_WARNING`, `TRAVEL_EDGE_STAGE`, `TRAVEL_ENGINE_START`, `TRAVEL_FUEL_TICK`, `TRAVEL_BREAKDOWN_CLANK`, `TRAVEL_HAVARIST_DROP`, `TRAVEL_ARRIVAL_FANFARE`, `TRAVEL_EVENT_GOOD`, `TRAVEL_EVENT_BAD`, `TRAVEL_PURSUIT_RUMBLE`, `CONVOY_IDLE_LOOP`, `ROADSIDE_HOSTILE`, `ROADSIDE_SALVAGE`, `ROADSIDE_PEOPLE`, `ROADSIDE_HAZARD`, `ROADSIDE_MYSTERY`, `ROADSIDE_WINDFALL`, `CRAFT_WRENCH`, `CRAFT_WELDER`, `CRAFT_DRILL`, `CRAFT_SOLDER`, `CRAFT_ENGINE_STAND`, `CRAFT_ORDER_PLACED`, `CRAFT_DELIVERY_ARRIVED`, `GARAGE_REPAIR_DRILL`, `CREW_HEAL_BANDAGE`, `PICKUP_WATER`, `PICKUP_AMMO`, `PICKUP_EXPLOSIVES`, `PICKUP_TIRES`, `PICKUP_SCRAP`, `PICKUP_CREW`, `PICKUP_UPGRADE`, `PICKUP_MASCOT`, `PICKUP_ENGINE`, `LANE_SALVO`, `LANE_FLAME`, `LANE_RAM`, `LANE_SKID`, `LANE_ROPE`, `LANE_ROPE_SNAP`, `LANE_FIRE_IGNITE`, `LANE_BOARD`, `LANE_CAPTURE`, `LANE_VEHICLE_DOWN`, `LANE_EXPLOSION`, `LANE_EMP`, `LANE_GANG_MORALE`, `LANE_MARK`, `LANE_MINE_DROP`, `LANE_MINE_HIT`, `LANE_FLARE`, `UI_SCREEN_ENTER`, `UI_SCREEN_BACK`, `UI_SLIDE_SWAP`, `UI_BOARD_CLOSE`, `UI_MODAL_POP`, `TRANSIT_DEPART_CAMP`, `TRANSIT_ARRIVE_LOCATION`, `TRANSIT_TO_COMBAT`, `TRANSIT_FROM_COMBAT`.

## Music playlists (audio.json `playlists`)

Define a playlist with one of these names to replace its tracks while your level is active:
`title`, `worldmap`, `combat`, `gameover`.

