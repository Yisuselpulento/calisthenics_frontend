export const skills = [
  {
    skillId: "planche_001",
    skillName: "Full Planche",
    description:
      "Familia Planche: progresiones desde Tuck hasta Full Planche y variantes dinámicas (push-ups, pull-ups).",
    baseDifficulty: "elite",
    variants: [
      {
        variantId: "planche_tuck",
        variant: "Tuck Planche",
        type: "static",
        dmg: 25,
        energyPerSecond: 8,
        energy: 0,
        staticAU: 10,
        dynamicAU: 0,
        energyReward: 10,
        difficulty: "beginner",
        videoRequired: true
      },
      {
        variantId: "planche_straddle",
        variant: "Straddle Planche",
        type: "static",
        dmg: 50,
        energyPerSecond: 12,
        energy: 0,
        staticAU: 25,
        dynamicAU: 10,
        energyReward: 25,
        difficulty: "intermediate",
        videoRequired: true
      },
      {
        variantId: "planche_full_hold",
        variant: "Full Planche Hold",
        type: "static",
        dmg: 100,
        energyPerSecond: 20,
        energy: 0,
        staticAU: 50,
        dynamicAU: 15,
        energyReward: 40,
        difficulty: "elite",
        videoRequired: true,
      },
      {
        variantId: "planche_pushups",
        variant: "Full Planche Push-ups",
        type: "reps",
        dmg: 85,
        energyPerSecond: 0,
        energy: 70,
        staticAU: 30,
        dynamicAU: 120,
        energyReward: 50,
        difficulty: "elite",
        videoRequired: true
      },
    ]
  },

  // 🧊 NUEVA SKILL: FRONT LEVER
  {
    skillId: "frontlever_001",
    skillName: "Front Lever",
    description:
      "Familia Front Lever: progresiones de tirón estático desde Tuck hasta Full Front Lever y sus variantes dinámicas.",
    baseDifficulty: "advanced",
    variants: [
      {
        variantId: "front_tuck",
        variant: "Tuck Front Lever",
        type: "static",
        dmg: 18,
        energyPerSecond: 6,
        energy: 0,
        staticAU: 8,
        dynamicAU: 0,
        energyReward: 8,
        difficulty: "beginner",
        videoRequired: true
      },
      {
        variantId: "front_advanced_tuck",
        variant: "Advanced Tuck Front Lever",
        type: "static",
        dmg: 30,
        energyPerSecond: 9,
        energy: 0,
        staticAU: 15,
        dynamicAU: 5,
        energyReward: 12,
        difficulty: "intermediate",
        videoRequired: true
      },
      {
        variantId: "front_straddle",
        variant: "Straddle Front Lever",
        type: "static",
        dmg: 55,
        energyPerSecond: 13,
        energy: 0,
        staticAU: 30,
        dynamicAU: 10,
        energyReward: 20,
        difficulty: "advanced",
        videoRequired: true
      },
      {
        variantId: "front_full_hold",
        variant: "Full Front Lever Hold",
        type: "static",
        dmg: 90,
        energyPerSecond: 18,
        energy: 0,
        staticAU: 45,
        dynamicAU: 15,
        energyReward: 35,
        difficulty: "elite",
        videoRequired: true,
      },
      {
        variantId: "front_pullups",
        variant: "Front Lever Pull-ups",
        type: "reps",
        dmg: 75,
        energyPerSecond: 0,
        energy: 55,
        staticAU: 25,
        dynamicAU: 90,
        energyReward: 45,
        difficulty: "elite",
        videoRequired: true
      },
    ]
  },
  {
  skillId: "dips_001",
  skillName: "Fondos (Dips Family)",
  description:
    "Familia de empuje vertical: fondos en barras paralelas, anillas y variantes avanzadas que combinan fuerza, control y rango completo.",
  baseDifficulty: "intermediate",
  variants: [
    {
      variantId: "dips_basic",
      variant: "Fondos en Paralelas",
      type: "reps",
      dmg: 25,                // daño por repetición (controlada)
      energyPerSecond: 0,
      energy: 20,             // energía por rep
      staticAU: 5,
      dynamicAU: 20,
      energyReward: 8,
      difficulty: "beginner",
      videoRequired: false
    },
    {
      variantId: "dips_ring",
      variant: "Ring Dips",
      type: "reps",
      dmg: 40,
      energyPerSecond: 0,
      energy: 30,
      staticAU: 10,
      dynamicAU: 35,
      energyReward: 15,
      difficulty: "intermediate",
      videoRequired: true
    },
    {
      variantId: "dips_russian",
      variant: "Russian Dips",
      type: "reps",
      dmg: 55,
      energyPerSecond: 0,
      energy: 45,
      staticAU: 15,
      dynamicAU: 50,
      energyReward: 25,
      difficulty: "advanced",
      videoRequired: true
    },
    {
      variantId: "dips_korean",
      variant: "Korean Dips",
      type: "reps",
      dmg: 70,
      energyPerSecond: 0,
      energy: 60,
      staticAU: 25,
      dynamicAU: 70,
      energyReward: 35,
      difficulty: "elite",
      videoRequired: true
    },
    {
      variantId: "dips_maltese",
      variant: "Maltese Dips",
      type: "reps",
      dmg: 90,
      energyPerSecond: 0,
      energy: 75,
      staticAU: 45,
      dynamicAU: 90,
      energyReward: 50,
      difficulty: "legendary",
      videoRequired: true
    },
    {
      variantId: "dips_static_support",
      variant: "Ring Support Hold",
      type: "static",
      dmg: 20,               // tensión ligera pero estable
      energyPerSecond: 6,
      energy: 0,
      staticAU: 15,
      dynamicAU: 0,
      energyReward: 10,
      difficulty: "beginner",
      videoRequired: false,
    },
    {
      variantId: "dips_rto_support",
      variant: "RTO Support Hold (Rings Turned Out)",
      type: "static",
      dmg: 45,
      energyPerSecond: 10,
      energy: 0,
      staticAU: 35,
      dynamicAU: 5,
      energyReward: 20,
      difficulty: "intermediate",
      videoRequired: true,
    }
  ]
}

];