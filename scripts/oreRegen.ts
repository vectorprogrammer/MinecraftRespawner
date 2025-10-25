import {
  world,
  system,
  BlockTypes,
  BlockLocation,
  Dimension
} from "@minecraft/server";

// Regeneration settings
const SCAN_RADIUS = 12;
const REGEN_INTERVAL = 6000; // ticks (~5 minutes)
const REGEN_CHANCE = 0.015; // 1.5% chance per eligible block

// Ore mappings
const OVERWORLD_ORES = [
  "minecraft:coal_ore",
  "minecraft:iron_ore",
  "minecraft:lapis_ore",
  "minecraft:redstone_ore",
  "minecraft:gold_ore",
  "minecraft:diamond_ore",
  "minecraft:emerald_ore"
];

const DEEPSLATE_ORES = [
  "minecraft:deepslate_coal_ore",
  "minecraft:deepslate_iron_ore",
  "minecraft:deepslate_lapis_ore",
  "minecraft:deepslate_redstone_ore",
  "minecraft:deepslate_gold_ore",
  "minecraft:deepslate_diamond_ore",
  "minecraft:deepslate_emerald_ore"
];

const NETHER_ORES = [
  "minecraft:nether_quartz_ore",
  "minecraft:nether_gold_ore",
  "minecraft:ancient_debris"
];

// Main regeneration loop
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const dim = player.dimension;
    const origin = player.location;

    for (let x = -SCAN_RADIUS; x <= SCAN_RADIUS; x++) {
      for (let y = -SCAN_RADIUS; y <= SCAN_RADIUS; y++) {
        for (let z = -SCAN_RADIUS; z <= SCAN_RADIUS; z++) {
          const loc = new BlockLocation(
            Math.floor(origin.x + x),
            Math.floor(origin.y + y),
            Math.floor(origin.z + z)
          );
          const block = dim.getBlock(loc);
          if (!block) continue;

          const id = block.type.id;

          // Overworld regeneration
          if (dim.id === "minecraft:overworld") {
            if (id === "minecraft:stone" && Math.random() < REGEN_CHANCE) {
              const ore = OVERWORLD_ORES[Math.floor(Math.random() * OVERWORLD_ORES.length)];
              block.setType(BlockTypes.get(ore));
            } else if (id === "minecraft:deepslate" && Math.random() < REGEN_CHANCE) {
              const ore = DEEPSLATE_ORES[Math.floor(Math.random() * DEEPSLATE_ORES.length)];
              block.setType(BlockTypes.get(ore));
            }
          }

          // Nether regeneration
          if (dim.id === "minecraft:nether") {
            if (id === "minecraft:netherrack" && Math.random() < REGEN_CHANCE) {
              const ore = NETHER_ORES[Math.floor(Math.random() * NETHER_ORES.length)];
              block.setType(BlockTypes.get(ore));
            }
          }
        }
      }
    }
  }
}, REGEN_INTERVAL);
