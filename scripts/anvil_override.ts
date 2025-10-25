import { world, system, ItemStack } from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const container = player.getComponent("minecraft:inventory")?.container;
    if (!container) continue;

    const anvilSlot = container.getItem(0); // adjust if using specific UI slot
    if (!anvilSlot) continue;

    const repairCost = anvilSlot.getDynamicProperty("repair_cost");
    if (repairCost && repairCost > 40) {
      anvilSlot.setDynamicProperty("repair_cost", 1); // reset to affordable level
      container.setItem(0, anvilSlot);
    }
  }
}, 20); // every second
