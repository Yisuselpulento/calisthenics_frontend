export const skills = [
  {
    skillId: "lsit_001",
    skillName: "L-Sit",
    baseDifficulty: "beginner",

    variants: [
      {
        variantId: "lsit_basic",
        variant: "L-Sit",
        type: "static",
        dmg: {
          damagePerSecond: 33,
          energyPerSecond: 9,
          damagePerRep: 0,
          energyPerRep: 0,
        },
        staticAU: 27, // energy 9 × 3 × 1
        dynamicAU: 0,
        difficulty: "beginner",
        videoRequired: true
      },

      {
        variantId: "vsit",
        variant: "V-Sit",
        type: "static",
        dmg: {
          damagePerSecond: 60,
          energyPerSecond: 21,
          damagePerRep: 0,
          energyPerRep: 0,
        },
        staticAU: 66, // energy 21 × 3 × 1.05
        dynamicAU: 0,
        difficulty: "intermediate",
        videoRequired: true
      },

      {
        variantId: "ysit",
        variant: "Y-Sit",
        type: "static",
        dmg: {
          damagePerSecond: 84,
          energyPerSecond: 33,
          damagePerRep: 0,
          energyPerRep: 0,
        },
        staticAU: 109, 
        dynamicAU: 0,
        difficulty: "advanced",
        videoRequired: true
      },
    ]
  },
//front lever 
  {
  skillId: "frontlever_001",
  skillName: "Front Lever",
  baseDifficulty: "advanced",

  variants: [
    {
      variantId: "fl_tuck",
      variant: "Tuck Front Lever",
      type: "static",
      dmg: {
        damagePerSecond: 28,   // un poco menos que L-sit y MUCHO menos que tuck planche
        energyPerSecond: 8,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(8 * 3 * 1.05), // 8*3=24 → *1.05 = 25.2 → 25
      dynamicAU: 0,
      difficulty: "beginner",
      videoRequired: true
    },
    {
      variantId: "fl_advance_tuck",
      variant: "Advanced Tuck Front Lever",
      type: "static",
      dmg: {
        damagePerSecond: 45,
        energyPerSecond: 11,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(11 * 3 * 1.05), // 11*3=33 → *1.05 = 34.65 → 35
      dynamicAU: 0,
      difficulty: "intermediate",
      videoRequired: true
    },
    {
      variantId: "fl_one_leg",
      variant: "One Leg Front Lever",
      type: "static",
      dmg: {
        damagePerSecond: 60,
        energyPerSecond: 14,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(14 * 3 * 1.05), // 14*3=42 → *1.05 = 44.1 → 44
      dynamicAU: 0,
      difficulty: "intermediate",
      videoRequired: true
    },

    // -------------------------------------------------
    // 4) Straddle Front Lever
    // -------------------------------------------------
    {
      variantId: "fl_straddle",
      variant: "Straddle Front Lever",
      type: "static",
      dmg: {
        damagePerSecond: 78,
        energyPerSecond: 17,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(17 * 3 * 1.05), // 17*3=51 → *1.05 = 53.55 → 54
      dynamicAU: 0,
      difficulty: "advanced",
      videoRequired: true
    },

    // -------------------------------------------------
    // 5) Full Front Lever Hold
    // -------------------------------------------------
    {
      variantId: "fl_full",
      variant: "Full Front Lever",
      type: "static",
      dmg: {
        damagePerSecond: 105,
        energyPerSecond: 22,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(22 * 3 * 1.05), // 22*3=66 → *1.05 = 69.3 → 69
      dynamicAU: 0,
      difficulty: "elite",
      videoRequired: true
    },

    // -------------------------------------------------
    // 6) Full Front Lever Pull-ups
    // -------------------------------------------------
    {
      variantId: "fl_pullups",
      variant: "Front Lever Pull-ups",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        damagePerRep: 230,        // mucho menos que planche pushups (350)
        energyPerSecond: 0,
        energyPerRep: 55,
      },
      staticAU: 0,
      dynamicAU: Math.round(55 * 3 * 1.05), // 55*3=165 → *1.05 = 173.25 → 173
      difficulty: "elite",
      videoRequired: true
    },

    // -------------------------------------------------
    // 7) One Arm Front Lever
    // -------------------------------------------------
    {
      variantId: "fl_one_arm",
      variant: "One Arm Front Lever",
      type: "static",
      dmg: {
        damagePerSecond: 165,
        energyPerSecond: 34,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(34 * 3 * 1.05), // 34*3=102 → *1.05 = 107.1 → 107
      dynamicAU: 0,
      difficulty: "legendary",
      videoRequired: true
    },
  ]
},
// planche
 {
  skillId: "planche_001",
  skillName: "Full Planche",
  baseDifficulty: "elite",

  variants: [
    // -------------------------------------------------
    // 1) Tuck Planche
    // -------------------------------------------------
    {
      variantId: "planche_tuck",
      variant: "Tuck Planche",
      type: "static",
      dmg: {
        damagePerSecond: 35,
        energyPerSecond: 10,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(10 * 3 * 1.05), // 31.5 → 32
      dynamicAU: 0,
      difficulty: "beginner",
      videoRequired: true
    },

    // -------------------------------------------------
    // 2) Advanced Tuck Planche
    // -------------------------------------------------
    {
      variantId: "planche_tuck_advance",
      variant: "Advanced Tuck Planche",
      type: "static",
      dmg: {
        damagePerSecond: 55,
        energyPerSecond: 14,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(14 * 3 * 1.05), // 44.1 → 44
      dynamicAU: 0,
      difficulty: "intermediate",
      videoRequired: true
    },

    // -------------------------------------------------
    // 3) Half Planche
    // -------------------------------------------------
    {
      variantId: "planche_half",
      variant: "Half Planche",
      type: "static",
      dmg: {
        damagePerSecond: 80,
        energyPerSecond: 18,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(18 * 3 * 1.05), // 56.7 → 57
      dynamicAU: 0,
      difficulty: "advanced",
      videoRequired: true
    },

    // -------------------------------------------------
    // 4) Full Planche Hold
    // -------------------------------------------------
    {
      variantId: "planche_full_hold",
      variant: "Full Planche",
      type: "static",
      dmg: {
        damagePerSecond: 110,
        energyPerSecond: 24,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(24 * 3 * 1.05), // 75.6 → 76
      dynamicAU: 0,
      difficulty: "elite",
      videoRequired: true
    },

    // -------------------------------------------------
    // 5) Full Planche Push-ups (REBALANCEADA)
    // -------------------------------------------------
    {
      variantId: "planche_pushups",
      variant: "Full Planche Push-ups",
      type: "reps",
      dmg: {
        damagePerSecond: 0,

        // DPR = DPS × 3 × 1.2
        damagePerRep: Math.round(110 * 3 * 1.2), // 396

        energyPerSecond: 0,

        // EPR = EPS × 3 × 0.9
        energyPerRep: Math.round(24 * 3 * 0.9), // 65
      },

      staticAU: 0,

      // dynamicAU = energyPerRep × 3 × 1.05
      dynamicAU: Math.round(65 * 3 * 1.05), // 204.75 → 205

      difficulty: "elite",
      videoRequired: true
    },

    // -------------------------------------------------
    // 6) Full Planche One Arm (estático, muy difícil)
    // -------------------------------------------------
    {
      variantId: "planche_one_arm",
      variant: "Full Planche One Arm",
      type: "static",
      dmg: {
        damagePerSecond: 260,
        energyPerSecond: 50,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: Math.round(50 * 3 * 1.05), // 157.5 → 158
      dynamicAU: 0,
      difficulty: "legendary",
      videoRequired: true
    },
  ],
},

{
  skillId: "backlever_001",
  skillName: "Back Lever",
  baseDifficulty: "intermediate",

  variants: [
    {
      variantId: "backlever_basic",
      variant: "Back Lever",
      type: "static",
      dmg: {
        damagePerSecond: 7,
        energyPerSecond: 3,
        damagePerRep: 0,
        energyPerRep: 0,
      },
      staticAU: 9, // 3 × 3
      dynamicAU: 0,
      difficulty: "intermediate",
      videoRequired: true
    },
  ]
},
{
  skillId: "pullups_001",
  skillName: "Dominadas",
  baseDifficulty: "beginner",

  variants: [
    {
      variantId: "pullups_basic",
      variant: "Dominadas Básicas",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        energyPerSecond: 0,
        damagePerRep: 4,
        energyPerRep: 2,
      },
      staticAU: 0,
      dynamicAU: 0,
      difficulty: "beginner",
      videoRequired: false
    },

    {
      variantId: "pullups_explosive",
      variant: "Dominadas Explosivas",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        energyPerSecond: 0,
        damagePerRep: 7,
        energyPerRep: 3,
      },
      staticAU: 0,
      dynamicAU: 5,
      difficulty: "intermediate",
      videoRequired: true
    },

    {
      variantId: "pullups_archer",
      variant: "Dominadas Arqueras",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        energyPerSecond: 0,
        damagePerRep: 10,
        energyPerRep: 5,
      },
      staticAU: 0,
      dynamicAU: 12,
      difficulty: "advanced",
      videoRequired: true
    },

    {
      variantId: "pullups_typewriter",
      variant: "Dominadas Typewriter",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        energyPerSecond: 0,
        damagePerRep: 12,
        energyPerRep: 6,
      },
      staticAU: 0,
      dynamicAU: 15,
      difficulty: "advanced",
      videoRequired: true
    },
  ]
},
{
  skillId: "spins_001",
  skillName: "Giros",
  baseDifficulty: "intermediate",

  variants: [
    {
      variantId: "spin_180",
      variant: "Giro 180°",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        energyPerSecond: 0,
        damagePerRep: 12,
        energyPerRep: 7,
      },
      staticAU: 0,
      dynamicAU: 8,
      difficulty: "intermediate",
      videoRequired: true
    },

    {
      variantId: "spin_360",
      variant: "Giro 360°",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        energyPerSecond: 0,
        damagePerRep: 18,
        energyPerRep: 9,
      },
      staticAU: 0,
      dynamicAU: 15,
      difficulty: "advanced",
      videoRequired: true
    },

    {
      variantId: "spin_540",
      variant: "Giro 540°",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        energyPerSecond: 0,
        damagePerRep: 25,
        energyPerRep: 12,
      },
      staticAU: 0,
      dynamicAU: 22,
      difficulty: "advanced",
      videoRequired: true
    },

    {
      variantId: "spin_720",
      variant: "Giro 720°",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        energyPerSecond: 0,
        damagePerRep: 32,
        energyPerRep: 15,
      },
      staticAU: 0,
      dynamicAU: 30,
      difficulty: "elite",
      videoRequired: true
    },

    {
      variantId: "spin_1080",
      variant: "Giro 1080° (Legendary)",
      type: "reps",
      dmg: {
        damagePerSecond: 0,
        energyPerSecond: 0,
        damagePerRep: 50,
        energyPerRep: 22,
      },
      staticAU: 0,
      dynamicAU: 45,
      difficulty: "legendary",
      videoRequired: true
    },
  ]
},

];