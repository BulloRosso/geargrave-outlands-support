# Base-game catalog (GENERATED)

Generated from the game (0.5) by `ModdingExportProbe` — do not edit by hand.
Every id below is something a mod may **reference** from the base game. Ids a mod
**defines** itself must be new and prefixed with a short level tag (see file-reference.md).
Content that ships inside the official levels (Sector East / West characters, encounters,
story actions) is NOT listed: it is only loaded while that level is active.

## Map vocabulary (level.json)

- Location `type`: `Settlement`, `GasStation`, `Factory`, `MilitaryBase`, `Ruin`, `Farm`
- Building `type`: `VehicleShop`, `RepairShop`, `TownHall`, `Arena`, `Clinic`, `Watchtower`, `Workshop`, `Bunker`, `Chapel`, `Library`, `MotorPool`, `Caravanserai`
- Road `type`: `Highway`, `CountryRoad`, `OffroadTrack`
- Road `passability`: `Open`, `BlockedEnemy`, `BlockedDamage`, `BlockedStory`

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
- `trade_ammo`
- `repair_vehicles_free`
- `scavenger_task`
- `buy_intel`
- `install_tow_rig`
- `place_bets`

Sector East **story** actions (bound to its characters and flags — do not reuse): `arena_fight`, `attend_sermon`, `endgame_quest`, `gr_first_haul`, `inspect_saucer`, `mayors_tasks`, `negotiation_job`, `open_armory`, `pump_diesel`, `quest_board`, `recruit_diesel_rita`, `recruit_doc_mira`, `recruit_kalinka_voss`, `recruit_preacher_kolb`, `recruit_widow_grete`, `restore_tank`, `send_feedback`, `sniper_training`, `swap_flak_trailer`, `training_yard`.

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

- UpgradeType (enemy upgrades, addUpgrade, roadside grantUpgrade): `Headlights`, `RamPlow`, `SpikeShields`, `Loudspeakers`, `MgMount`, `Mortar`, `ExtraTank`, `ReinforcedTires`, `Nitro`, `RadioRig`, `SniperRifle`, `AtGun`, `TowRig`, `DiscoHeaven`, `KuroganeBlades`, `AshDrumBanner`, `TetsujinServoKit`, `ColdForgeArmor`, `Flamethrower`, `SmokeGrenades`, `OverdriveBooster`, `GrenadeLauncher`, `MegaBoomBox`, `ManekiEars`, `LoadedDice`, `Gramophone`, `SpareKnuckles`, `FridgeMagnet`, `Harpoon`, `BunnyEars`, `MegaWelder`, `RadarUnit`, `AuditorKnee`, `ChoirSubwoofer`, `BrassLung`, `FinaleRack`, `MirrorPlate`, `CoffeeMachine`, `BlueprintDangerousPanelTruck`, `BlueprintMortarSuv`, `BlueprintRamTruck`, `BlueprintBattlePlatform`, `BlueprintDevilTruck`, `BlueprintDeadlyRain`, `BlueprintGiveWay`, `BlueprintFutureDreams`, `BlueprintAvalanche`, `BlueprintSandstormBuggy`, `BlueprintOutlandSedan`, `BlueprintOutlandPickup`, `BlueprintDuneRaider`, `MineSweeper`, `MotionDetector`, `LargeCabin`, `ChainsawFront`, `HeavyBoreBarrel`, `GyroStabilizer`, `IncendiaryLoader`, `ApRounds`, `SalvageRadar`, `SignalBooster`, `TerrainScanner`, `DroneUplink`, `ArmoredFuelLiner`, `FireExtinguisherRig`, `SelfSealingTires`, `CrashHarnesses`, `LongHaulTanks`, `OffroadSuspension`, `SpikedRamPlow`, `LongBarrelAtGun`, `OmniArray`, `CanOpener`, `AssaultRamp`, `EarPlugs`, `JammerPod`, `Leaflets`, `ShrapnelCharge`, `Winch`, `DemolitionCharge`, `ToolKit`, `SoundInsulation`, `NightVision`, `InfraredSight`, `CamoPaint`, `FlareRounds`, `SilentRunning`, `OrbitalStrikeController`, `MineFlailDrum`, `SealedIntakes`, `IrHeadlights`, `ArmoredCabin1`, `ArmoredCabin2`, `DeckParapet`, `RollCage`, `ArmorPlate`, `HeavyArmorPlate`, `ChainGun`, `TurretMount`, `OffroadChassis`, `Ballast`, `BulkheadWall`, `LimpetCharge`, `LoaderAssist`, `JumpSeat`, `FrameReinforcement`, `Whaler`, `SgRustBreaker`, `SgCoachwhip`, `SgStreetSermon`, `SgGoldenChoke`, `SgDustDevil`, `SgWidowmaker`, `RfDrifterLever`, `RfHomesteader`, `RfBrassPilgrim`, `RfSilverPsalm`, `RfSandCantor`, `RfIronDeacon`, `ArScrapKalash`, `ArRoadWarden`, `ArAshCarbine`, `ArGildedMutiny`, `ArDuneChorus`, `ArGreyProtocol`, `MgScrapyardHowl`, `MgFreightreaper`, `MgThunderquill`, `MgGoldenChoirmaster`, `MgSandHymn`, `MgSilverSermon`, `SrLongPrayer`, `SrHorizonNail`, `SrQuietAuditor`, `SrSilverVerdict`, `SrDuneWidow`, `SrGoldenFullstop`, `GlDoorAuditor`, `GlPipeApostle`, `GlWidowsKnock`, `GlGoldenRequiem`, `GlSandVerdict`, `GlLastArgument`, `EmpGrenade`, `EmpMineDropper`, `AuthorityTransponder`, `SnowChains`, `CabinHeater`
- CrewRole (crew role, character role): `Mechanic`, `Medic`, `Driver`, `Gunner`, `Fighter`, `Sniper`, `Politician`, `Leader`
- Zone (enemy / stationary zone): `OwnRear`, `OwnMid`, `OwnFront`, `EnemyFront`, `EnemyMid`, `EnemyRear`
- Environment (encounter environment): `Day`, `Night`, `Sandstorm`, `ScrapField`, `Highway`
- FactionId (encounter faction, gang.faction, character origin): `None`, `ConvoyGuild`, `RustWolves`, `SparkplugCult`, `FieldGreys`, `FreeNomads`, `RustFinches`, `KuroganeKai`, `LuciaProcession`, `ZimnikArtel`
- EncounterKind (encounter kind): `Battle`, `Vehicle`, `Person`, `Roadblock`
- StationaryType (encounter stationaries[].type): `None`, `MgNest`, `HiddenSniper`, `MortarTeam`, `AntiTankGun`
- Blockade kind (encounter blockades[].kind): `Wreck`, `Boulder`, `Container`, `BurningBarricade`, `TireStack`, `MineMound`, `DroppedTrailer`, `BarrelStack`, `PrototypeWreck`, `CanyonWall`, `BridgeRail`, `Barrier`

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
- `blessed_restart` - The first hit that would damage his hull's engine each battle is shrugged off: the engine coughs and catches again.
- `boarding_fury` - boarding assaults hit harder (Fighter)
- `broker_tongue` - negotiation +10 % / threshold +1
- `cg_cool_head` - The first reaction this vehicle triggers each battle costs no hand. (normally earned through experience)
- `cg_deck_guard` - Boarders face one more defender on this deck (the best defence bonus counts, they do not stack). (normally earned through experience)
- `cg_field_weld` - Field repairs by this mechanic restore one more point of structure. (normally earned through experience)
- `cg_night_eyes` - On lookout at night or in a sandstorm, the road preview reaches 6 ranks instead of 4. (normally earned through experience)
- `cg_quick_hands` - Works one extra repair note per day at the camp board. (normally earned through experience)
- `cg_second_cure` - The heal job puts two freshly wounded hands back on their feet instead of one. (normally earned through experience)
- `cg_silver_tongue` - The first propaganda broadcast by this politician each battle costs the gang one extra morale. (normally earned through experience)
- `cg_tall_tales` - Spins wasteland lore and brazen exaggerations at the negotiation table: the TALL TALE move buys patience and liking — unless a hardliner is listening. (normally earned through experience)
- `cold_solder` - Field repairs she works restore +1 structure.
- `cult_whisperer` - talks cultists down: better negotiation with the faithful (Politician)
- `deep_salvage` - The first wheel change on his hull each battle clears all tire wear: he dives under the hull.
- `eagle_eye` - can inspect enemy vehicles in the battle cutaway
- `emp_burst` - A synthetic frame with its own power cell: fires the EMP blast (two charges per battle, range 2).
- `field_recovery` - the wounded recover between fights (Medic)
- `fireworks_finale` - The first explosive shell she fires each battle (mortar, AT gun, grenade launcher) lands +1.
- `first_shot_bonus` - the first shot of each battle hits harder (Sniper)
- `flat_out_faith` - Her first ram each battle counts one tempo step more.
- `forge_hands` - Field repairs it works restore +1 structure.
- `free_repair` - one repair a day costs no parts (Mechanic)
- `free_reverse` - backing up a zone costs no move (Driver)
- `guardian_protocol` - The escort frame steps into the first hit that would drop a hand on its hull each battle: that hand stays on its feet.
- `half_a_map` - story gate, no engine rule
- `iron_patience` - The first boarding party that jumps onto his deck each battle meets him waiting: +1 defence.
- `lion_dance` - boarding ignores the enemy boarding overwatch
- `manifest_memory` - Every manifest she ever signed, memorised: +1 trust at the negotiation table.
- `moisture_reclaimer` - Its condenser fins pull water out of the night air: the convoy needs 1 water less per day while it rides along.
- `mounted_gun_range` - mounted guns reach one rank further (Gunner)
- `orbital_mortar` - calls the orbital strike (special - avoid in mods)
- `paper_warrant` - story gate, no engine rule
- `pathfinder` - spots mines and hazards on the road
- `plough_line` - story gate, no engine rule
- `radar_ears` - +1 scouting intel
- `ram_the_drift` - their first ram each battle lands two harder
- `regenerative_braking` - The first brake-check it drives each battle costs its hull no tempo: the flywheel banks it and lends it straight back.
- `relentless_pursuit` - +1 on the first hit each battle against a target that moved last round
- `roll_call` - story gate, no engine rule
- `set_it_alight` - their first flame hit each battle takes one more hand
- `showmans_timing` - Spins a TALL TALE at the negotiation table without the Tall Tales perk: he tells it with the music.
- `signal_master` - their vehicle is a command post (like a radio rig)
- `sobremesa` - Nobody leaves the table angry: +1 liking at the negotiation table.
- `stun_pulse` - A synthetic frame with its own power cell: fires the EMP blast (two charges per battle, range 2).
- `thousand_cups` - Pours tea before the first word: +1 liking at the negotiation table.
- `tractor_glimmer` - The first time its hull would bog down in sand or debris each battle, it hovers clear instead.
- `white_noise` - their vehicle ignores enemy reaction locks
- `whiteout_read` - a whiteout costs no scouting (winter levels)

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
`icon_pace`, `konvoi_ev_casualty`, `konvoi_ev_casualty_winter`, `konvoi_ev_crossing`, `konvoi_ev_crossing_winter`, `konvoi_ev_decoy`, `konvoi_ev_decoy_winter`, `konvoi_ev_deserter`, `konvoi_ev_deserter_winter`, `konvoi_ev_envoy`, `konvoi_ev_envoy_winter`, `konvoi_ev_gamble`, `konvoi_ev_gamble_winter`, `konvoi_ev_hauler`, `konvoi_ev_hauler_winter`, `konvoi_ev_incident`, `konvoi_ev_incident_winter`, `konvoi_ev_informant`, `konvoi_ev_informant_backlash`, `konvoi_ev_informant_backlash_winter`, `konvoi_ev_informant_winter`, `konvoi_ev_kid_camp`, `konvoi_ev_kid_camp_winter`, `konvoi_ev_lookout`, `konvoi_ev_lookout_winter`, `konvoi_ev_mechanic`, `konvoi_ev_mechanic_winter`, `konvoi_ev_patrol`, `konvoi_ev_patrol_convoy`, `konvoi_ev_patrol_cult`, `konvoi_ev_patrol_finches`, `konvoi_ev_patrol_greys`, `konvoi_ev_patrol_kurogane`, `konvoi_ev_patrol_lucia`, `konvoi_ev_patrol_nomads`, `konvoi_ev_patrol_winter`, `konvoi_ev_patrol_wolves`, `konvoi_ev_patrol_zimnik`, `konvoi_ev_rival`, `konvoi_ev_rival_winter`, `konvoi_ev_shortcut`, `konvoi_ev_shortcut_winter`, `konvoi_ev_shrine`, `konvoi_ev_shrine_winter`, `konvoi_ev_trader`, `konvoi_ev_trader_winter`, `konvoi_ev_turnabout`, `konvoi_ev_turnabout_winter`, `konvoi_ev_water`, `konvoi_ev_water_winter`, `konvoi_ev_wellspring`, `konvoi_ev_wellspring_winter`, `roadside_ambulance_drone`, `roadside_ambulance_drone_winter`, `roadside_ambush_remains`, `roadside_ambush_remains_winter`, `roadside_ambush_survivor`, `roadside_ambush_survivor_winter`, `roadside_broken_family`, `roadside_broken_family_winter`, `roadside_burning_tanker`, `roadside_burning_tanker_winter`, `roadside_chalk_cistern`, `roadside_chalk_sun_cave`, `roadside_chalk_sun_cave_winter`, `roadside_chalk_teacher`, `roadside_chalk_warning`, `roadside_clan_gift`, `roadside_clan_grudge`, `roadside_clan_outriders`, `roadside_clan_outriders_winter`, `roadside_dead_drop`, `roadside_dead_drop_winter`, `roadside_dead_surveyor`, `roadside_dead_surveyor_winter`, `roadside_distress_relay`, `roadside_distress_relay_trap`, `roadside_distress_relay_trap_winter`, `roadside_distress_relay_winter`, `roadside_drive_in_night`, `roadside_drive_in_night_winter`, `roadside_empty_truck`, `roadside_fever_wagon`, `roadside_fever_wagon_winter`, `roadside_glass_field`, `roadside_glass_field_winter`, `roadside_grave_road`, `roadside_grave_road_winter`, `roadside_hostage_swap`, `roadside_hostage_swap_winter`, `roadside_last_billboard`, `roadside_last_billboard_winter`, `roadside_mine_singer`, `roadside_mine_singer_winter`, `roadside_minefield_blind`, `roadside_minefield_blind_winter`, `roadside_minefield_marked`, `roadside_minefield_marked_winter`, `roadside_night_choir`, `roadside_night_choir_winter`, `roadside_night_flare`, `roadside_night_flare_winter`, `roadside_numbers_station`, `roadside_numbers_station_winter`, `roadside_parts_find`, `roadside_parts_trader`, `roadside_parts_trader_winter`, `roadside_pontoon_scales`, `roadside_pontoon_scales_winter`, `roadside_press_gang_toll`, `roadside_press_gang_toll_winter`, `roadside_rag_and_bone_king`, `roadside_rag_and_bone_king_winter`, `roadside_signal_flare`, `roadside_signal_flare_winter`, `roadside_sinkhole_cry`, `roadside_sinkhole_cry_winter`, `roadside_survey_obelisk`, `roadside_survey_obelisk_winter`, `roadside_the_one_who_walked`, `roadside_the_one_who_walked_winter`, `roadside_thirsty_pilgrims`, `roadside_thirsty_pilgrims_winter`, `roadside_vault_of_axles`, `roadside_walking_welder`, `roadside_walking_welder_winter`, `roadside_water_diviner`, `roadside_water_diviner_winter`, `roadside_wolf_tribute_post`, `roadside_wolves_payback`, `roadside_wolves_payback_winter`, `roadside_wolves_respect`, `roadside_wolves_respect_winter`, `sweep_lane_desert_day`, `sweep_lane_desert_night`, `sweep_lane_winter_day`, `sweep_lane_winter_night`, `travel_map_aerial`, `travel_map_aerial_winter`, `travel_scene_camp`, `travel_scene_camp_winter`, `travel_scene_country`, `travel_scene_country_winter`, `travel_scene_highway`, `travel_scene_highway_winter`, `travel_scene_night`, `travel_scene_night_winter`, `travel_scene_offroad`, `travel_scene_offroad_winter`.

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
- `rope_chew` (RopeChew)

## Cargo sets (cargo_sets/<set_id>.json)

A set is 1-3 pieces (cargo parts, characters, vehicle types, an electric engine, an upgrade, a crew role) that together unlock an effect. The first time the effect fires, a near-full-screen Discovery Modal plays. Effects are built into the game: a set PICKS one of the ids below and tunes its parameters. File reference chapter 19.

| Field | Allowed values |
|---|---|
| `placement` | `sameVehicle`, `sameConvoy`, `hitchedTo` |
| piece kinds (exactly one per piece) | `part`, `character` (program name = characters.json id; `a\|b` = either), `vehicleType` (chassis), `engine` (`electric`), `upgrade` (UpgradeType), `role` (CrewRole; `a\|b` = either) |
| `requires[].type` | `orientation`, `night`, `location`, `building`, `factionEnemy`, `vehicleClass`; `orientation` takes `chased` or `chase`; `vehicleClass` takes a chassis-name fragment or a lane class 1-5 |
| `command.phase` | `movement`, `action`, `reaction` |
| `command.target` | `none`, `lane`, `rank`, `vehicle` (the implemented effects all use `none`) |
| `tier` | `early`, `mid` |
| part `carry` | `bay` (default), `hitch`: a hitch load rides on the tow hook as a generic Small / Medium / Large container (size = `quality`) |
| part `fragile` | `ram`, `rammed`, `boarded`, `fire`, `drop` |
| part `living.eats` / `living.fate` | `water`, `smallCargo` / `walksOff`, `dies` |
| part `story.origin` | `faction`, `character`, `prewar` |

### Effect ids

| id | where | does | params (default) | built-in bonus | usable in a mod |
|---|---|---|---|---|---|
| `fx_stampede` | battle, movement, via the hitch release | Releasing the hitch load named in `command.viaDetach` in a CHASED battle: every enemy behind the release point takes `damage` structure; EMP-only hulls are stalled one round instead. The released load is consumed. | `damage` (99) | `preacher_kolb` aboard the tractor: the load survives empty | yes |
| `fx_green_flag` | battle, movement | All player vehicles +2 tempo this round (past the speed ladder), no enemy lane changes this round. | - | `diesel_rita` driving the carrier: one extra lane change for everyone | yes |
| `fx_parade` | battle, action | No enemy vehicle fires, rams or boards this round (leaders excepted); enemy gang morale minus `morale`. Consumes the parts listed in `consumes`. | `morale` (2), `moraleSponsor` (3) | `gabby_hernandes` aboard: morale minus `moraleSponsor` | yes |
| `fx_service_due` | battle, action | Every enemy vehicle with a Damaged engine goes to Broken. | - | `fixit_otto` aboard: the fastest enemy with a Working engine goes Damaged | yes |
| `fx_in_reverse` | battle, movement | Chase and chased swap sides; all player vehicles drop to tempo 1 this round. Needs `diesel_rita` DRIVING the carrier (built in). | - | - | only with Diesel Rita |
| `fx_standing_order` | battle, passive | Field Grey enemies never target the carrier (leaders excepted); convoy crew morale never drops below 3. | - | `kalinka_voss` aboard: Field Grey battles open the terms gate from round 1 | yes (needs Field Grey enemies) |
| `fx_knowing_things` | battle and travel, passive | Briefing shows the full enemy roster, doctrine and tells; no rolling-start ambush disadvantage; +1 scout intel on the road; on odd campaign days the sniper's signature rifle gets +1 range. Needs `widow_grete` aboard the carrier (built in). | - | - | only with Widow Grete |
| `fx_customs_post` | travel, territory entry | In Accepted or Liked territory the convoy COLLECTS the 45 l toll instead of paying it, once per territory per day. | - | - | yes |
| `fx_rule_87` | travel, rest | +1 morale per rest day and a Small gift part every third rest; the part `cargo_ee_gift_wrap` wears out after five rests. Needs `km_dawid` or `km_oto` aboard (built in). | - | `km_oto`: +2 morale | no (the required characters live in Sector East) |
| `fx_scheduled_service` | travel | With a bus-class vehicle in the rolling order: the first pursuit of each day starts 14 km further back; bus_stop / caravanserai buildings pay 5 water once per day. | - | - | yes |
| `fx_pending_review` | battle, action | Every enemy loses its reactions this round and may not change lane or tempo next round (leaders exempt). | `morale` (alias) | `kalinka_voss` or `km_ingrid` aboard: leaders are not exempt | yes |
| `fx_ignition_herald` | battle, movement then action | Your Damaged/Broken engines go back to Working; every enemy with a Broken engine detonates and leaves no loot; -1 Field Greys once per campaign day. | `reputation` (1) | - | only with Preacher Kolb |
| `fx_bring_a_dish` | travel rest + battle | +2 morale at rest; against unaffiliated raider packs the terms gate opens at morale `terms` instead of 4. The keg part wears out after 10 rests. | `terms` (6), `termsGivi` (7) | `km_givi`: `termsGivi` | yes |
| `fx_maintenance_traffic` | travel | Workshop truck with both pieces: Sweeper margin one band better every leg; once every 3 days a Sweeper contact can be cancelled; +1 heat in Field Grey territory. | - | - | yes |
| `fx_stakeholder_meeting` | battle start + travel | Enemy morale -3 at battle start and the enemy leader's effects suspended in round 1; pursuit packs one size smaller. | `morale` (3) | - | only with Gabby Hernandes |
| `fx_bunny` | battle, passive | Enemies never fire on the vehicle carrying the suit with a Fighter aboard (leaders and robots excepted); rams and boarding still allowed. | - | `berserk`: one fewer defender on her first boarding | yes |
| `fx_impounded` | battle, action, target vehicle | An enemy within `rows` is impounded: it leaves the battle (loot if you hold the field); leaders immune; enemy morale -1. | `rows` (3), `morale` (1) | - | only with Gernot or Ingrid |
| `fx_tea_service` | camp | Convert ammo to water 1:1 at camp, up to 20 water per day. | - | `km_iwan`: 2 ammo -> 3 water | yes |
| `fx_the_plant` | travel, per vehicle | Each vehicle with a living cutting absorbs one involuntary morale loss per day; three cuttings in three vehicles raise the morale cap by 1. | - | - | yes |
| `fx_oath` | battle, action, target vehicle | A robot-crewed enemy within `rows` (no leader, no Sweeper) switches sides at round end. | `rows` (2) | - | only with RONIN-3 or HACHIKO |
| `fx_assembly` | creation | A creation reveal: its modal buttons run their effects once (e.g. recruit a character). | - | - | yes (buttons are data) |
| `fx_daily_drop` | camp | A daily delivery from a fixed rotation (water, ammo, tires, a spare part, a small gift); +1 zone heat. | - | `hj_fenghuo`: two deliveries | yes |
| `fx_two_day_delivery` | camp | Every second day a Medium cargo item into a free bay; no bay: waits a day, then lost. | - | `gabby_hernandes`: every day | yes |
| `fx_price_war` | camp | With both delivery sets: one of the two daily deliveries is intercepted by the other, alternating; a score is kept. | - | - | yes |
| `fx_delivery_complete` | creation | A creation reveal (data buttons). | - | - | yes |
| `fx_hearing_restored` | creation + travel/battle | A creation reveal; the game's own YUTU bonus reads the story flag `yutu_hears_everything`. | - | - | creation part only |
| `fx_second_sun` | battle, reaction round 1, night only | The whole night battle counts as day for both sides; the flare part has `uses` charges. | `uses` (3) | - | only with Hou Yi |
| `fx_plaza_dance` | battle, via the hitch release | Releasing the hitch load: every enemy (leaders and robots too) runs at `tempo` with no lane changes for `rounds` rounds. | `tempo` (2), `rounds` (2) | - | yes |
| `fx_thunder_lance` | battle, movement then action, target lane | Everything in the chosen lane ahead of the carrier within `rows` takes `damage` (counts as EMP), friendly vehicles too; the carrier's engine becomes Damaged. Needs an electric engine. | `rows` (8), `damage` (12) | - | yes |
| `fx_requisitioned` | creation | A creation reveal (data buttons, e.g. grantParkedVehicle); `params.repExemptAt: allied` + `repFaction` drop the reputation cost for allies. | - | - | yes |
| `fx_crane7` | loot + travel | Recover wrecks even without holding the field, tow one extra prize, recovered hulls +`hullPct` %; one free breakdown tow per run. | `hullPct` (15), `extraTows` (1) | - | only with Naledi Dube |
| `fx_on_time` | travel | One extra dusk leg (night rules) when the day's clock runs out. | - | - | only with Jelani Osei driving |
| `fx_verified` | creation | A creation reveal (data buttons; e.g. grantLootBox + grantMissingSetPiece). | - | - | yes |
| `fx_we_fly` | travel choice, once per day | When a pursuit starts or a leg is hazardous: skip the leg's hazards and pursuit for 15 l fuel; 2-day cooldown. | - | - | only with Bazza and Shazza |

### Action and dialog vocabulary for cargo

- Effects: `grantHitchLoad` {part} hitches a `carry: hitch` part to the first vehicle with a free hook and tow capability, else parks it; `removeHitchLoad` {part}.
- Requirements: `hitchLoadAboard` {part}; `hitchFree` (a vehicle here can still take a hitch load).
- More effects: `grantMissingSetPiece` (one missing part of a set the player has started; else a medium loot box), `grantLootBox` {part: lootbox_small|medium|large} for a fixed size, `applyReputation` {unlessAllied: true}.
- More requirements: `atLocation` {location: a|b}, `locationHasBuilding` {building: garage|<BuildingType>|<id>}, `traitAboard` {trait, role?}, `seatFreeFor` {character}.
- Creation reveals: `set.modal.buttons[]` = {labelKey, label, requires[], effects[]}; each button runs once, then `cargo_choice_<setId>` is set. `effect.params.needsGarage: true` makes the reveal wait for a location with a Workshop / RepairShop / MotorPool building.
- Story flags the game sets: `cargo_seen_<partId>` (the piece entered the convoy once; gate hint dialog lines on it), `cargo_complete_<setId>` (all pieces held), `disc_<setId>` (the effect fired and the reveal played), `cargo_lost_<partId>` (living cargo walked off or fragile cargo broke).
- Reveal sounds: `DISC_STINGER_COMBAT`, `DISC_STINGER_TRAVEL`, `DISC_STINGER_CREATION` (used when a set names no `modal.sfx`).

## Road incidents (road_incidents.json)

After the beats of battle rounds 3 and 7 (50 % each) one eligible incident fires: its walker crosses the road to the hex in front of the convoy hull with the most free hexes ahead, the card offers two choices (exactly one good), the result text replaces the question and the effects land at once. File reference chapter 20.

| Field | Allowed values |
|---|---|
| `time` | `day`, `night` |
| `stage` | `any`, `desert`, `winter` (winter = a winter-theme level) |
| `terrain` | `any`, `flat`, `rocky` (rocky = rocks in the encounter, or road terrain schlucht / flussbett) |
| `minSkulls` / `maxSkulls` | 2..5 - the story level (2 = start, 5 = endgame) |
| `needs` | "" (nothing), `robot`, `saucer`, `ambulance`, `warrig`, `battlemech`, `male_named`, `wreck_o` |
| `walker.entry` | `cross`, `drop`, `shoulder` |
| `walker.exit` | `cross`, `fade`, `stay`, `lift` |
| `walker.span` | 1..3 hexes across the lanes that must be free |

| Need | Eligible only when |
|---|---|
| `robot` | a robot crew member other than Cap is aboard |
| `saucer` | a Saucer is in the convoy |
| `ambulance` | an Ambulance is in the convoy |
| `warrig` | the Roadhold (WarRig) is in the convoy |
| `battlemech` | a BattleMech is in the convoy |
| `male_named` | a named man other than Cap and not a robot is aboard |
| `wreck_o` | Wreck-O is in the crew |

| Effect `type` | Arguments | What it does |
|---|---|---|
| `rep` | faction, delta | reputation with a base faction or a faction of your level.json (a mod faction moves on the map) |
| `spare` | delta | spare parts in the convoy pool (the brief's "scrap": 1 spare per 5 scrap) |
| `fuel` | delta | fuel units (10 L each); gains are clamped by the convoy's tanks |
| `water` | delta | water units; gains are clamped by the convoy's water capacity |
| `shells` | delta | explosive shells for the heavy barrels |
| `material` | key, delta | a map-only crafting material (raw resource key, e.g. resistors, screws, pistons) |
| `tire` | delta, vehicleType? | tires of the target: negative = worn, positive = repaired |
| `structure` | delta, vehicleType? | hull of the target on the 100-point scale: negative = damage, positive = repair |
| `stun` | rounds, all? | the target (or every own hull with all: true) sits still and holds fire |
| `tempo` | delta, rounds, vehicleType? | +- top speed of the target for N rounds (minimum 1) |
| `enemyStun` | who, rounds | an enemy hull (nearest | leader) sits still and holds fire |
| `enemyStructure` | who, delta | hull of an enemy on the 100-point scale |
| `enemyHeal` | who, delta | repairs an enemy hull |
| `enemyTire` | who, delta | wears an enemy's tires |
| `enemyDriverless` | who | the enemy's driver is gone: the hull rolls on driverless |
| `enemyMorale` | delta | morale of every gang in the fight (machine gangs ignore it) |
| `crewHeal` | filter? | every wounded hand is patched (filter robot = robots only) |
| `crewInjure` | role? | wounds one hand of the target (that role first, never Cap) |
| `killCrew` | filter | removes every matching hand for good (robot = every robot except Cap) |
| `removeCrew` | filter, count | count hands leave the convoy for good (male_named | unnamed; never Cap) |
| `removeVehicle` | - | the target drives off and never returns; its crew climbs into the next hull (needs >= 2 own hulls) |
| `grantPart` | id | a part (your parts.json or a base part) into the parts inventory |
| `grantBpParts` | count, rare? | count warehouse building parts, rolled from the battle seed |
| `grantLootBox` | size | a sealed loot box: small | medium | large |
| `grantMascot` | id | a mascot (your mascots.json or a base mascot) |
| `scramble` | - | the enemy plan is thrown away and every gang loses 1 morale |
| `light` | rounds | the whole field is lit like a flare (night battles) |
| `firePct` | side, pct, rounds | outgoing hull damage of player | enemy | both scaled (120 = +20 %) |
| `fire` | vehicleType? | the target catches fire |
| `repairAll` | - | every own hull to full hull, tires and no fire |
| `wreck` | side, count, lead? | count hulls are destroyed (player: never the last one; lead: true = the front ones) |
| `setFlag` | flag | a story flag (your quest can read it) |
| `repairSaucer` | - | the Saucer in the convoy (riding a Tieflader's deck or on its own) back to full hull |
| `abductVehicle` | - | the target is lifted away for good (never the hull carrying the Saucer); its crew climbs into the other hulls' free seats, named hands first, unnamed hands without a seat are lost; the result text may name the hull as {0} (needs >= 2 own hulls) |
| `abductNamed` | - | one named hand is taken for good (the target's crew first; never Cap, an essential character or Wreck-O); the result text may name them as {0} (needs one such hand) |

Base incident ids (reuse an id in your file to replace that incident while your level is active; `"baseIncidents": false` drops them all): `none_shall_pass` (day), `autodrive_ghost_car` (day), `tumbleweed_toll` (day), `blessed_pinata_mine` (day), `jerrycan_camel` (day), `nomad_wedding_bus` (day), `godbolt_shrine_machine` (day), `pensioner_band` (day), `pizza_scooter` (day), `prophets_toaster` (day), `mirage_gas_station` (day), `panzerfaust_nun` (day), `rust_wolves_goat` (day), `troll_toll_boulder` (day), `spelling_bee_robot` (day), `cousins_debt` (day), `saucer_groupies` (day), `ambulance_chaser` (day), `roadhold_squatters` (day), `mechs_mum` (day), `red_nosed_reindeer` (night), `riderless_motorcycle` (night), `noodle_cart` (night), `werewolf_kid` (night), `abduction_beam` (night), `floodlight_film_crew` (night), `fireworks_trailer` (night), `sleepwalking_giant` (night), `creek_wisps` (night), `karaoke_van` (night), `slowest_assassin` (day), `prehistoric_traffic_jam` (day), `microwave_messiah` (day), `mobile_car_wash` (day), `bride_of_the_wasteland` (day), `ufo_that_couldnt_fly` (night), `werewolf_mechanic` (night), `speed_camera_from_hell` (day), `landmine_salesman` (day), `mother_of_all_drones` (day), `alien_patrol` (day)

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
| `engine_leigong_s` | Engine | None | Small |
| `engine_leigong_m` | Engine | None | Medium |
| `engine_leigong_l` | Engine | None | Large |
| `cargo_radar_station` | Cargo | Base | Medium |
| `cargo_drone_set` | Cargo | None | Small |
| `cargo_water_purifier` | Cargo | Base | Medium |
| `cargo_field_forge` | Cargo | Base | Large |
| `cargo_medical_pod` | Cargo | Base | Medium |
| `cargo_fuel_bladder` | Cargo | Base | Large |
| `cargo_hc_battery` | Cargo | None | Medium |
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
| `cargo_loudspeakers` | Cargo | None | Small |

## Sound effect keys (audio.json `events`, `playSound`, travel event `sound`)

A mod may PLAY any of these, or REPLACE one by defining the same key in its own audio.json
(the replacement is active while the mod's level is loaded). Keys are case-sensitive.

`GARAGE_SNAP_IN`, `MASCOT_CHEER`, `MORALE_BREAK`, `CAPSTONE_BEAT`, `COMBAT_FIRE_RIFLE`, `COMBAT_FIRE_EXPLOSIVE`, `COMBAT_FIRE_MORALE`, `COMBAT_FIRE_NO_HIT`, `COMBAT_FIRE_HIT_RIFLE`, `COMBAT_FIRE_HIT_EXPLOSIVE`, `COMBAT_VEHICLE_DESTROYED`, `COMBAT_STATION_DESTROYED`, `COMBAT_ARMOR_BOUNCE`, `COMBAT_TIRES_SHRED`, `COMBAT_FUEL_PIERCE`, `COMBAT_WEAPON_WRECK`, `COMBAT_CREW_DOWN`, `COMBAT_BOARD_CLASH`, `COMBAT_REPAIR`, `COMBAT_EMP`, `COMBAT_PUSH_SHUNT`, `COMBAT_ORBITAL`, `LOOT_WATER_TAKEN`, `LOOT_AMO_TAKEN`, `LOOT_FUEL_TAKEN`, `LOOT_SCRAP_HAUL`, `ACH_UNLOCKED`, `COMBAT_VICTORY`, `COMBAT_DEFEAT`, `UI_WHEEL_CONFIRM`, `UI_ROUND_START`, `CREW_RECRUIT`, `BLUEPRINT_INSTALL`, `MAP_DISCOVERY`, `SURVIVAL_THIRST_WARNING`, `TRAVEL_EDGE_STAGE`, `TRAVEL_ENGINE_START`, `TRAVEL_FUEL_TICK`, `TRAVEL_BREAKDOWN_CLANK`, `TRAVEL_HAVARIST_DROP`, `TRAVEL_ARRIVAL_FANFARE`, `TRAVEL_EVENT_GOOD`, `TRAVEL_EVENT_BAD`, `TRAVEL_PURSUIT_RUMBLE`, `CONVOY_IDLE_LOOP`, `ROADSIDE_HOSTILE`, `ROADSIDE_SALVAGE`, `ROADSIDE_PEOPLE`, `ROADSIDE_HAZARD`, `ROADSIDE_MYSTERY`, `ROADSIDE_WINDFALL`, `DISC_STINGER_COMBAT`, `DISC_STINGER_TRAVEL`, `DISC_STINGER_CREATION`, `DISC_EE_NATURE_WINS`, `DISC_EE_GREEN_FLAG`, `DISC_EE_SMALL_PARADE`, `DISC_EE_RECEIPT`, `DISC_EE_REGIMENTAL_CAT`, `DISC_EE_SKIPPED_SERVICE`, `DISC_EE_IN_REVERSE`, `DISC_EE_RULE_87`, `DISC_EE_KNOWING_THINGS`, `DISC_EE_715_LATE`, `DISC_EE_PENDING_REVIEW`, `DISC_EE_COLD_CYLINDER`, `DISC_EE_BRING_A_DISH`, `DISC_EE_ROAD_SERVICE`, `DISC_EE_ROADMAP_LITERAL`, `DISC_EE_NOBODY_SHOOTS_BUNNY`, `DISC_EE_FAILED_INSPECTION`, `DISC_EE_TEA_SERVICE`, `DISC_EE_THE_PLANT`, `DISC_EE_ONE_FOR_ANCESTORS`, `DISC_EE_RETAINER_FRAME`, `DISC_EE_LINK_IN_DESCRIPTION`, `DISC_EE_TWO_DAY_DELIVERY`, `DISC_EE_PRICE_WAR`, `DISC_EE_CUSTOMER_GOAT`, `DISC_EE_YUTUS_EAR`, `DISC_EE_TWO_SUNS`, `DISC_EE_PLAZA_DANCE`, `DISC_EE_THUNDER_LANCE`, `DISC_EE_REQUISITIONED`, `DISC_EE_CRANE7`, `DISC_EE_ON_TIME`, `DISC_EE_CARGO_VERIFIED`, `DISC_EE_FLYING_MACHINE`, `CRAFT_WRENCH`, `CRAFT_WELDER`, `CRAFT_DRILL`, `CRAFT_SOLDER`, `CRAFT_ENGINE_STAND`, `CRAFT_ORDER_PLACED`, `CRAFT_DELIVERY_ARRIVED`, `GARAGE_REPAIR_DRILL`, `CREW_HEAL_BANDAGE`, `MEND_LEVER`, `MEND_ATTEMPT_PICK`, `MEND_SPOTTER`, `MEND_PATCH`, `MEND_GAUGE_SWING`, `MEND_BREAKTHROUGH`, `MEND_CLEAN`, `MEND_BOTCH`, `MEND_GRAFT_FIT`, `MEND_SURGERY`, `PICKUP_WATER`, `PICKUP_AMMO`, `PICKUP_EXPLOSIVES`, `PICKUP_TIRES`, `PICKUP_SCRAP`, `PICKUP_CREW`, `PICKUP_UPGRADE`, `PICKUP_MASCOT`, `PICKUP_ENGINE`, `LANE_SALVO`, `LANE_FLAME`, `LANE_RAM`, `LANE_SKID`, `LANE_ROPE`, `LANE_ROPE_SNAP`, `LANE_FIRE_IGNITE`, `LANE_BOARD`, `LANE_CAPTURE`, `LANE_VEHICLE_DOWN`, `LANE_EXPLOSION`, `LANE_EMP`, `LANE_GANG_MORALE`, `LANE_MARK`, `LANE_MINE_DROP`, `LANE_MINE_HIT`, `LANE_FLARE`, `UI_SCREEN_ENTER`, `UI_SCREEN_BACK`, `UI_SLIDE_SWAP`, `UI_BOARD_CLOSE`, `UI_MODAL_POP`, `TRANSIT_DEPART_CAMP`, `TRANSIT_ARRIVE_LOCATION`, `TRANSIT_TO_COMBAT`, `TRANSIT_FROM_COMBAT`, `BRIEFING_ROLLOUT`.

## Music playlists (audio.json `playlists`)

Define a playlist with one of these names to replace its tracks while your level is active:
`title`, `worldmap`, `combat`, `gameover`.

## Biome art (level.json `terrainTheme` + `biome`, files under `assets/game/`)

Pictures the game swaps by biome: each has a `_winter` variant today, so a mod biome `<theme>` may ship
`assets/game/<path>_<theme>.<ext>` for any of them (path relative to the game's `res://assets/`). Pictures not
listed can still be replaced outright by a same-path copy `assets/game/<path>`.

| folder | pictures (desert original; add `_<theme>` before the extension) |
|---|---|
| `explainers/` | `explainer_combat_boarded_lost.png`, `explainer_combat_capture.png`, `explainer_combat_negotiate.png`, `explainer_combat_ram.png`, `explainer_combat_surrender.png`, `explainer_training_yard.png` |
| `impacts/` | `impact_ammo_cookoff.png`, `impact_armor_pierced.png`, `impact_boarding_leap.png`, `impact_boarding_repelled.png`, `impact_confetti_armor.png`, `impact_crew_captured.png`, `impact_crew_down.png`, `impact_driver_down.png`, `impact_emp_stun.png`, `impact_engine_hit.png`, `impact_evaded_salvo.png`, `impact_field_triage.png`, `impact_fizzled.png`, `impact_flame_sweep.png`, `impact_fuel_boom.png`, `impact_fuel_pierced.png`, `impact_gearbox_snapped.png`, `impact_hatch_sesame.png`, `impact_headlights_reveal.png`, `impact_hull_wrecked.png`, `impact_insurance_field_greys.png`, `impact_insurance_free_nomads.png`, `impact_insurance_sparkplug_cult.png`, `impact_kombo_chorovaz.png`, `impact_limpet_charge.png`, `impact_marked.png`, `impact_mascot_down.png`, `impact_mine_underbody.png`, `impact_morale_break.png`, `impact_mortar_hit.png`, `impact_mortar_splash.png`, `impact_obstacle_crash.png`, `impact_oil_spin.png`, `impact_orbital_strike.png`, `impact_out_of_shells.png`, `impact_overwatch.png`, `impact_plow_through.png`, `impact_promise_broken.png`, `impact_radiator_geyser.png`, `impact_ricochet_pinball.png`, `impact_rope_snap.png`, `impact_rope_taut.png`, `impact_runninggear.png`, `impact_sand_stuck.png`, `impact_shove_pinned.png`, `impact_shrapnel_rake.png`, `impact_sideswipe.png`, `impact_superstructure_hit.png`, `impact_take_wheel.png`, `impact_towed_away.png`, `impact_windshield_frost.png`, `impact_wreck_plough.png`, `rescue_convoy_scene.png` |
| `journey/` | `journey_bg_asphalt.png`, `journey_bg_berg.png`, `journey_bg_land.png`, `journey_bg_minenfeld.png`, `journey_bg_ruinenstadt.png`, `journey_bg_schlucht.png`, `journey_bg_schotter.png`, `journey_bg_wrackfeld.png` |
| `konvoi/` | `morale_0.png`, `morale_1.png`, `morale_2.png`, `morale_3.png`, `morale_4.png` |
| `lane/iso/` | `road_tile.png` |
| `travel/` | `konvoi_ev_casualty.png`, `konvoi_ev_crossing.png`, `konvoi_ev_decoy.png`, `konvoi_ev_deserter.png`, `konvoi_ev_envoy.png`, `konvoi_ev_gamble.png`, `konvoi_ev_hauler.png`, `konvoi_ev_incident.png`, `konvoi_ev_informant.png`, `konvoi_ev_informant_backlash.png`, `konvoi_ev_kid_camp.png`, `konvoi_ev_lookout.png`, `konvoi_ev_mechanic.png`, `konvoi_ev_patrol.png`, `konvoi_ev_rival.png`, `konvoi_ev_shortcut.png`, `konvoi_ev_shrine.png`, `konvoi_ev_trader.png`, `konvoi_ev_turnabout.png`, `konvoi_ev_water.png`, `konvoi_ev_wellspring.png`, `roadside_ambulance_drone.png`, `roadside_ambush_remains.png`, `roadside_ambush_survivor.png`, `roadside_broken_family.png`, `roadside_burning_tanker.png`, `roadside_chalk_sun_cave.png`, `roadside_clan_outriders.png`, `roadside_dead_drop.png`, `roadside_dead_surveyor.png`, `roadside_distress_relay.png`, `roadside_distress_relay_trap.png`, `roadside_drive_in_night.png`, `roadside_fever_wagon.png`, `roadside_glass_field.png`, `roadside_grave_road.png`, `roadside_hostage_swap.png`, `roadside_last_billboard.png`, `roadside_mine_singer.png`, `roadside_minefield_blind.png`, `roadside_minefield_marked.png`, `roadside_night_choir.png`, `roadside_night_flare.png`, `roadside_numbers_station.png`, `roadside_parts_trader.png`, `roadside_pontoon_scales.png`, `roadside_press_gang_toll.png`, `roadside_rag_and_bone_king.png`, `roadside_signal_flare.png`, `roadside_sinkhole_cry.png`, `roadside_survey_obelisk.png`, `roadside_the_one_who_walked.png`, `roadside_thirsty_pilgrims.png`, `roadside_walking_welder.png`, `roadside_water_diviner.png`, `roadside_wolves_payback.png`, `roadside_wolves_respect.png`, `travel_map_aerial.png`, `travel_scene_camp.png`, `travel_scene_country.png`, `travel_scene_highway.png`, `travel_scene_night.png`, `travel_scene_offroad.png` |
| `travel3d/tex/` | `road_autobahn.jpg`, `road_berg.jpg`, `road_flussbett.jpg`, `road_land.jpg`, `road_minenfeld.jpg`, `road_schlucht.jpg`, `road_schotter.jpg`, `road_wrackfeld.jpg`, `road_wueste.jpg` |
| `ui/` | `camp-crew-sky.png`, `camp-fire-vista.png` |
| `ui/stances/` | `stance_attack.png`, `stance_capture.png`, `stance_safe.png`, `stance_support.png` |
| `ui/strategy_cards/` | `card_boarders.png`, `card_careful.png`, `card_gunline.png`, `card_hunt.png`, `card_quiet.png`, `card_recon.png`, `card_run.png`, `card_rush.png`, `card_steady.png` |
| `vignettes/` | `vig_bridge_jump.png`, `vig_burst_tire.png`, `vig_ford_crossing.png`, `vig_fuel_leak.png`, `vig_minefield.png`, `vig_outpost_assault.png`, `vig_radar_lock.png`, `vig_raider_dust.png`, `vig_roadside_cache.png`, `vig_rockfall.png`, `vig_sandstorm.png`, `vig_scout_bike.png`, `vig_sleeping_camp.png`, `vig_smoking_engine.png`, `vig_sniper_nest.png`, `vig_sos_call.png`, `vig_spike_strip.png`, `vig_toll_intercept.png`, `vig_wild_pack.png`, `vig_wreck_salvage.png` |

Pictures whose name already carries the biome (`convoy-bg-desert-day.png`, `sweep_lane_desert_day.png`,
`road_<type>_desert_day.png`, `loot-hall-desert.png`, …) take the BASE biome's file name plus the suffix:
`ui/convoy-bg-desert-day_jungle.png` on a desert-based jungle, `ui/convoy-bg-winter-day_tundra.png` on a winter-based tundra.

Iso battle backdrop sets (`biome.isoBackdrops`): `stone`, `canyon`, `winterplain`, `wintermountain` — or a mod's own set (see file-reference).

Iso travel palette keys (`biome.palette`): `sky`, `ambient`, `sun`, `shadow`, `dust`, `haze`, `water`, `sand`, `low`, `mid`, `rock`, `rockDark`, `peak`, `pan`, `wood`, `plant`, `scrub`, `stone`, `wall`, `plaza`, `formationRock`, `formationBand`.

Combat factions for `biome.roadsideFactions` / `fallbackFaction`: `None`, `ConvoyGuild`, `RustWolves`, `SparkplugCult`, `FieldGreys`, `FreeNomads`, `RustFinches`, `KuroganeKai`, `LuciaProcession`, `ZimnikArtel`.

## Mend board (mend_items.json)

Slots: vehicle + `engine`, `chassis`, `tank`, `armor`, `weapons`, `hull`; person + `body`.

Vehicle hooks (`fx`): `armor_front`, `armor_flank`, `armor_rear`, `hull_max`, `gun_damage`, `gun_range`, `gun_pierce`, `ram_out`, `ram_guard`, `board_def`, `board_att`, `tempo`, `fuel_saving_pct`, `speed_kmh`, `tire_saving_pct`, `payload_kg`.

Person hooks (`fx`): `skill`, `board`, `hands`, `wound_shrug`, `morale_day`, `water_saving_day`, `xp`.

What one point of each hook means (positive `n` = better for the carrier):

- `armor_front` - +1 front armor
- `armor_flank` - +1 flank armor
- `armor_rear` - +1 rear armor
- `hull_max` - +1 hull in a fight
- `gun_damage` - +1 damage on every gun
- `gun_range` - +1 range on every gun
- `gun_pierce` - +1 pierce on every gun
- `ram_out` - +1 damage when it rams
- `ram_guard` - −1 damage taken in a collision
- `board_def` - +1 boarding defence
- `board_att` - +1 boarding attack
- `tempo` - +1 tempo in a fight
- `fuel_saving_pct` - −1 % fuel on the road
- `speed_kmh` - +1 km/h on the road
- `tire_saving_pct` - −1 % tire wear on the road
- `payload_kg` - +1 kg of gear before it slows down
- `skill` - +1 skill at the job
- `board` - +1 in a boarding fight
- `hands` - +1 hand at the Mend board
- `wound_shrug` - Shrugs off 1 wound per battle
- `morale_day` - +1 morale per travel day
- `water_saving_day` - −1 water per day
- `xp` - +1 XP per won battle

- base items, `engine`: tune `ported_manifold`, `forged_pistons`, `choir_camshaft`; graft `turbo_fed_v8`, `jetwash_blower`, `undertakers_twelve`
- base items, `chassis`: tune `gusseted_wishbones`, `balanced_driveshaft`, `drunkards_alignment`; graft `long_fork_front`, `escalator_tracks`, `carousel_hub`
- base items, `tank`: tune `baffled_tank`, `rubber_lined_tank`, `whisky_reserve`; graft `duster_belly_tank`, `red_reserve`, `keg_rack`
- base items, `armor`: tune `spaced_armor`, `sloped_glacis`, `hammered_scales`; graft `spiked_flank`, `vault_door_prow`, `bell_plate`
- base items, `weapons`: tune `hair_trigger`, `lapped_barrel`, `polite_sight`; graft `belt_fed_conversion`, `whalers_winch`, `roofers_organ`
- base items, `hull`: tune `stitch_welded_frame`, `boxed_bumper_rails`, `signed_rivets`; graft `lifeboat_belly`, `cowcatcher`, `dodgem_skirt`
- base items, `body`: tune `iron_shoulder`, `leather_hands`, `steady_stitch`, `night_eye`, `the_souvenir`, `camel_kidney`, `second_opinion`, `phantom_itch`, `scar_map`, `welders_tan`, `borrowed_tendon`, `bone_staples`; graft `sweeper_arm`, `forklift_knee`, `gunners_monocle`, `vending_heart`, `recycler_bladder`, `karaoke_larynx`, `grandmaster_shunt`, `crane_hook`, `arc_eye`, `riot_spine`, `line_pacer`, `cold_shoulder`
- base marks: `mark_scored_cylinder`, `mark_bent_subframe`, `mark_weeping_seam`, `mark_warped_plate`, `mark_bent_feed_ramp`, `mark_twisted_frame`, `mark_crooked_set`, `mark_dressed_wound`

`balance` knobs (balancing.json `mend`, shipped value):

`botchBase` 34, `botchPerRating` 3, `botchMin` 8, `botchMax` 34, `breakBase` 16, `breakPerRating` 2, `breakMin` 18, `breakMax` 36, `graftBreakMalus` 5, `spotterBotchPct` 40, `severeBotchDivisor` 3, `townRating` 3, `talkRating` 3, `patchToPct` 50, `botchDamagePct` 25, `dressWater` 1, `personItemCap` 3, `trayCapacity` 5, `trayOverflowParts` 1, `trayPieces` 1, `trayPiecesBigBattle` 2, `trayBigBattleKills` 3, `trayBionicWeightMachine` 2.

