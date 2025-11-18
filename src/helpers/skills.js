export const skills = [
   {
    skillId: "planche_001",
    skillName: "Full Planche",
    baseDifficulty: "elite",

    variants: [
      {
        variantId: "planche_tuck",
        variant: "Tuck Planche",
        type: "static",
        dmg: {
          damagePerSecond: 25,
          damagePerRep: 0,
          energyPerSecond: 8,
          energyPerRep: 0,
        },
        staticAU: 25, // ✔ calculado
        dynamicAU: 0,
        difficulty: "beginner",
        videoRequired: true
      },

      {
        variantId: "planche_straddle",
        variant: "Straddle Planche",
        type: "static",
        dmg: {
          damagePerSecond: 50,
          damagePerRep: 0,
          energyPerSecond: 12,
          energyPerRep: 0,
        },
        staticAU: 38, // ✔ calculado
        dynamicAU: 10,
        difficulty: "intermediate",
        videoRequired: true
      },

      {
        variantId: "planche_full_hold",
        variant: "Full Planche",
        type: "static",
        dmg: {
          damagePerSecond: 100,
          damagePerRep: 0,
          energyPerSecond: 20,
          energyPerRep: 0,
        },
        staticAU: 63, // ✔ calculado
        dynamicAU: 0,
        difficulty: "elite",
        videoRequired: true
      },

      {
        variantId: "planche_pushups",
        variant: "Full Planche Push-ups",
        type: "reps",
        dmg: {
          damagePerSecond: 0,
          damagePerRep: 350,
          energyPerSecond: 0,
          energyPerRep: 70,
        },
        staticAU: 221, // ✔ calculado
        dynamicAU: 120,
        difficulty: "elite",
        videoRequired: true
      },

      {
        variantId: "planche_one_arm",
        variant: "Full Planche One Arm",
        type: "static",
        dmg: {
          damagePerSecond: 250,
          damagePerRep: 0,
          energyPerSecond: 50,
          energyPerRep: 0,
        },
        staticAU: 158, // ✔ calculado
        dynamicAU: 120,
        difficulty: "legendary",
        videoRequired: true
      },
    ]
  },
  //  FRONT LEVER
   {
    skillId: "front_001",
    skillName: "Front Lever",
    baseDifficulty: "advanced",

    variants: [
      {
        variantId: "front_tuck",
        variant: "Tuck Front Lever",
        type: "static",
        dmg: {
          damagePerSecond: 15,
          damagePerRep: 0,
          energyPerSecond: 5,
          energyPerRep: 0,
        },
        staticAU: 16,
        dynamicAU: 0,
        difficulty: "beginner",
        videoRequired: true
      },

      {
        variantId: "front_straddle",
        variant: "Straddle Front Lever",
        type: "static",
        dmg: {
          damagePerSecond: 30,
          damagePerRep: 0,
          energyPerSecond: 7,
          energyPerRep: 0,
        },
        staticAU: 22,
        dynamicAU: 10,
        difficulty: "intermediate",
        videoRequired: true
      },

      {
        variantId: "front_full_hold",
        variant: "Full Front Lever Hold",
        type: "static",
        dmg: {
          damagePerSecond: 60,
          damagePerRep: 0,
          energyPerSecond: 12,
          energyPerRep: 0,
        },
        staticAU: 38,
        dynamicAU: 0,
        difficulty: "advanced",
        videoRequired: true
      },

      {
        variantId: "front_one_arm",
        variant: "One Arm Front Lever",
        type: "static",
        dmg: {
          damagePerSecond: 150,   // 60 × 2.5
          damagePerRep: 0,
          energyPerSecond: 30,    // 150 × 0.20
          energyPerRep: 0,
        },
        staticAU: 95, // 30×3×1.05
        dynamicAU: 120,
        difficulty: "elite",
        videoRequired: true
      },

      {
        variantId: "front_pullups",
        variant: "Front Lever Pull-ups",
        type: "reps",
        dmg: {
          damagePerSecond: 0,
          damagePerRep: 210,
          energyPerSecond: 0,
          energyPerRep: 42,
        },
        staticAU: 132,
        dynamicAU: 120,
        difficulty: "advanced",
        videoRequired: true
      },
    ]
  },

];