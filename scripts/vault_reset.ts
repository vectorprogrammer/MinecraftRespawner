import { world, system, Block, BlockPermutation } from "@minecraft/server";

const VAULT_BLOCK_IDS = [
  "minecraft:trial_vault",
  "minecraft:ominous_vault"
];

// Called every 5 seconds to scan and reset vaults
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const radius = 16;
    const center = player.location;

    for (let x = -radius; x <= radius; x++) {
      for (let y = -4; y <= 4; y++) {
        for (let z = -radius; z <= radius; z++) {
          const blockLoc = {
            x: Math.floor(center.x + x),
            y: Math.floor(center.y + y),
            z: Math.floor(center.z + z)
          };

          const block = player.dimension.getBlock(blockLoc);
          if (!block) continue;

          if (VAULT_BLOCK_IDS.includes(block.typeId)) {
            const permutation = block.permutation;
            const state = permutation.getState("trial_vault_state");

            if (state === "ejecting" || state === "inactive") {
              permutation.withState("trial_vault_state", "waiting");
              block.setPermutation(permutation);
            }
          }
        }
      }
    }
  }
}, 100); // every 5 seconds
                          
