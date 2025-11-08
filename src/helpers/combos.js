// src/helpers/combos.js

export const combos = [
  {
    comboId: "combo_001",
    userId: "u1",
    comboName: "Static Power Flow",
    description: "Transición entre Full Planche y Front Lever.",
    type: "static",
    skills: [
      {
        skillId: "planche_001",
        variantId: "planche_full_hold",
        holdSeconds: 6,
        auraUsed: 120,
        energyCost: 100,
      },
      {
        skillId: "frontlever_001",
        variantId: "front_full_hold",
        holdSeconds: 5,
        auraUsed: 100,
        energyCost: 80,
      },
    ],
    totalAuraUsed: 220,
    totalEnergyCost: 180,
    totalDamage: 190,
    isFavorite: true, 
    createdAt: new Date("2025-11-08"),
  },
  {
    comboId: "combo_002",
    userId: "u1",
    comboName: "Dynamic Rings Flow",
    description: "Secuencia de ring dips y muscle-ups controlados.",
    type: "dynamic",
    skills: [
      {
        skillId: "dips_001",
        variantId: "dips_ring",
        reps: 6,
        auraUsed: 70,
        energyCost: 90,
      },
    ],
    totalAuraUsed: 70,
    totalEnergyCost: 90,
    totalDamage: 80,
    isFavorite: false,
    createdAt: new Date("2025-11-08"),
  },
];
