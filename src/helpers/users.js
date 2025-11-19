export const users = [
  {
    _id: "u1",
    name: "Iliesse Ns",
    username: "iliesse_ns",
    country: "Chile",
    videoProfile:
      "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762447550/AQMAMjfgJ-Ku3cSSckQ1-sv7IvLSSBiIgJ_8j6icCaDXRyF1RfaANvTKb15jzNYH9CqXAnyo9XOYQ5OEG8eAt0dL7QQ0bN2P_lzb1fc.mp4",
    avatar: "/users/iliesse.jpg",
    altura: 1.75,
    peso: 70,
    favoriteSkills: [
      {
        title: "Full Planche Hold",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455261/AQPThx860RbajyCeqUspjK-eN9dehUyufJVrqM4rp1vYiyZ93tOKoFBNNcrmAun8ayoj5CVJSs7Mi6AARGAfnxIBEioxfanu_nqxpih.mp4"
      },
      {
        title: "Hefesto Progress",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQP4JsJgU0lKD31VJIM0yF8QY1zPa2Kvel08273FTq8oNTwoeNvgDj4gJxCTEXjnY3uD0b8vL-JV9b8rFVuD0FZeKCj32Lmg_lpqykx.mp4"
      },
      {
        title: "Full Planche Pushups Combo",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQPQR5mjOoAll_XGmGATctvWq466rZw4XrCxuaKLvfI-aARfQWLz_R5_jVPWh_WV-GashGF7DDof2mj3-HVezj66cVyOHA6T_pedha5.mp4"
      }
    ],
    type: "static",
    staticAu: 8589,
    dynamicAu: 1700,
    level: 10289,
    maxEnergy: 500,
    skills: [
    {
      userSkillId: "us_001",
      skillId: "lsit_001",
      variantId: "vsit",
      videoUrl: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQPQR5mjOoAll_XGmGATctvWq466rZw4XrCxuaKLvfI-aARfQWLz_R5_jVPWh_WV-GashGF7DDof2mj3-HVezj66cVyOHA6T_pedha5.mp4", // si quieres agrego un video
      fingersUsed: 5
    },
    {
      userSkillId: "us_002",
      skillId: "frontlever_001",
      variantId: "fl_full",
      videoUrl: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQP4JsJgU0lKD31VJIM0yF8QY1zPa2Kvel08273FTq8oNTwoeNvgDj4gJxCTEXjnY3uD0b8vL-JV9b8rFVuD0FZeKCj32Lmg_lpqykx.mp4",
      fingersUsed: 5
    },
    {
      userSkillId: "us_003",
      skillId: "planche_001",
      variantId: "planche_full_hold",
      videoUrl: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQPQR5mjOoAll_XGmGATctvWq466rZw4XrCxuaKLvfI-aARfQWLz_R5_jVPWh_WV-GashGF7DDof2mj3-HVezj66cVyOHA6T_pedha5.mp4",
      fingersUsed: 5
    }
  ],

  combos: [
  {
    comboId: "combo_iliesse_001",
    comboName: "Elite Static Flow",
    type: "static",

    skills: [
      {
        userSkillId: "us_003",
        skillId: "planche_001",
        variantId: "planche_full_hold",
        holdSeconds: 5,
        reps: 0,
      },
      {
        userSkillId: "us_002",
        skillId: "frontlever_001",
        variantId: "fl_full",
        holdSeconds: 5,
        reps: 0,
      }
    ],
    createdAt: new Date("2025-11-18")
  }
],
    favoriteCombos: {
      static: "combo_iliesse_001",
      dynamic: "",
      mixed: ""
    },
    historialIds: ["h1", "h3", "h4", "h7", "h9"],
     followers: ["u2", "u3"], // IDs de usuarios que lo siguen
    following: ["u2", "u4"], // IDs de usuarios a los que sigue

    // 🏆 Sistema de ranking
    rankPoints: 1320, // puntos de ranking global
    rankPosition: 12, // posición general actualizada periódicamente
    totalMatches: 45,
    wins: 30,
    losses: 15,
    winRate: 0.66, // calculado dinámicamente

    // 🧨 Equipos donde participa
    teamIds: ["t1"], 
  },
    {
  _id: "u2",
  name: "Jasi Svilenova",
  username: "jasi_svilenova",
  country: "Chile",
  videoProfile:
    "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762457252/AQOtu00Hjj3F0Pmbv2PKb7K8OUqvF3ODxkFptxdx6XKvYfRKI5WBYpud7OXnYxUexSrG4PePVnETcKI7WLjfqg6kSJ_k9IvX_z6vutd.mp4",
  avatar: "/users/jasi.jpg",
  altura: 1.75,
  peso: 70,
  favoriteSkills: [
    {
      title: "Full Planche Hold",
      url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762457254/AQN9jawwrJLt2erbESrGRu3MQLGokEQN2gnF6DI5ZqljMdkeK1SVmJGp9XWdmwCcSSCIbZIGF7fuEJDJYa_GRGSsAJo3YiLF_po73uo.mp4",
    },
    {
      title: "Hefesto Progress",
      url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762457249/AQOlIAn_ABuNQPvRSM6zoAqSn667U6kUtpMBqkO_OnCcBOHhFUOxzmmyR2jTCLWOGTUBnh1MoECskc31n7IPG2fCmuj4sk1E_xj3wck.mp4",
    },
    {
      title: "Full Planche Pushups Combo",
      url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762457249/AQM9HsRAx8oInJ5_SE1DwiGWaSPnbR5KyacIGOPiVLXtsZb2_DJaFkZvaskmd0jBreZX23V-SsUsAMij7KOkXs-52Z_tJdSy_sfyywa.mp4",
    },
  ],
  type: "Complete",
  staticAu: 5589,
  dynamicAu: 7500,
  level: 13089,
  skills: [
    {
      userSkillId: "js_001",
      skillId: "lsit_001",
      variantId: "vsit",
      videoUrl:
        "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762457249/AQM9HsRAx8oInJ5_SE1DwiGWaSPnbR5KyacIGOPiVLXtsZb2_DJaFkZvaskmd0jBreZX23V-SsUsAMij7KOkXs-52Z_tJdSy_sfyywa.mp4",
      fingersUsed: 5,
    },
    {
      userSkillId: "js_002",
      skillId: "frontlever_001",
      variantId: "fl_full",
      videoUrl:
        "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762457254/AQN9jawwrJLt2erbESrGRu3MQLGokEQN2gnF6DI5ZqljMdkeK1SVmJGp9XWdmwCcSSCIbZIGF7fuEJDJYa_GRGSsAJo3YiLF_po73uo.mp4",
      fingersUsed: 5,
    },
    {
      userSkillId: "js_003",
      skillId: "planche_001",
      variantId: "planche_full_hold",
      videoUrl:
        "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762457249/AQOlIAn_ABuNQPvRSM6zoAqSn667U6kUtpMBqkO_OnCcBOHhFUOxzmmyR2jTCLWOGTUBnh1MoECskc31n7IPG2fCmuj4sk1E_xj3wck.mp4",
      fingersUsed: 5,
    },
    {
      userSkillId: "js_004",
      skillId: "pullups_001",
      variantId: "pullups_explosive",
      videoUrl: "",
      fingersUsed: 2,
    },
  ],

  combos: [
    {
      comboId: "combo_jasi_001",
      comboName: "Static Power Flow",
      type: "static",
      skills: [
        {
           userSkillId: "js_003",
          skillId: "planche_001",
          variantId: "planche_full_hold",
          holdSeconds: 6,
          reps: 0,
        },
        {
          userSkillId: "js_002",
          skillId: "frontlever_001",
          variantId: "fl_full",
          holdSeconds: 5,
          reps: 0,
        },
      ],
      totalAuraUsed: 145,
      totalEnergyCost: 170,
      totalDamage: 110 * 6 + 105 * 5,
      createdAt: new Date("2025-11-18"),
    },
    {
      comboId: "combo_jasi_002",
      comboName: "Mixed Explosive Flow",
      type: "mixed",
      skills: [
        {
          skillId: "lsit_001",
          variantId: "vsit",
          holdSeconds: 4,
          reps: 0,
          auraUsed: 66,
          energyCost: 40,
        },
        {
          skillId: "pullups_001",
          variantId: "pullups_explosive",
          holdSeconds: 0,
          reps: 12,
          auraUsed: 0,
          energyCost: 36,
        },
      ],
      totalAuraUsed: 66,
      totalEnergyCost: 76,
      totalDamage: 0,
      createdAt: new Date("2025-11-18"),
    },
  ],

  favoriteCombos: {
    static: "combo_jasi_001",
    dynamic: "",
    mixed: "combo_jasi_002",
  },

  historialIds: ["h1", "h2", "h7", "h10"],
  followers: ["u2", "u3"],
  following: ["u2", "u4"],

  rankPoints: 1320,
  rankPosition: 12,
  totalMatches: 45,
  wins: 30,
  losses: 15,
  winRate: 0.66,
  teamIds: ["t1"],
},
   {
    _id: "u3",
    name: "Joseph Prime",
    username: "joseph_prime",
    country: "Chile",
    videoProfile : "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455264/AQPOrbdzHdsLwZcu4Azb_zmmC0dJmaxRPH0Y0UzToaVLx36xdE9L01jG41h3mi62IgG6rLjMwUEcAXtwBtEkOrHfqQxNivDV_jxkjpx.mp4",
    avatar: "/users/joseph.jpg",
    altura: 1.75,
    peso: 70,
    favoriteSkills: [
      {
        title: "Full Planche Hold",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455259/AQOyOsVe42TNiN9Y0M6p54kK2ezSq8mq3UjLvBjrhonOfpmjy0IClrXgyyUePVROuuPGHK5VJ6e7YzMhNENpnIMye0MI7v6z_wbi4t5.mp4",
      },
      {
        title: "Hefesto Progress",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455258/AQNp28I4X6nHyYaFFD6yBtaVSChrqLyVn6wbsrmE1U_sz-e7Prb_FE91k0KovRsjpmp6_Fb_cVjsPpAquaqUhu9Pde3K1DRL_upn0mz.mp4",
      },
      {
        title: "Full Planche Pushups Combo",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQN2WYFoXm48_073s0nWVcx0HNP7AVw1B3Pgyom5n9z30tYYqPkfUHB3JU7camLy8Q9k144Z12Olm9_t4b0ta8oGORxpY8AS_vgl6l3.mp4",
      },
    ],
    type: "static",
         staticAu: 4589,
    dynamicAu: 1500,
    level: 6089,
      skills: [
      {
        skillId: "planche_001",
        variantId: "planche_full_hold",
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455261/AQPThx860RbajyCeqUspjK-eN9dehUyufJVrqM4rp1vYiyZ93tOKoFBNNcrmAun8ayoj5CVJSs7Mi6AARGAfnxIBEioxfanu_nqxpih.mp4",
        fingersUsed: 2
      },
      {
        skillId: "frontlever_001",
        variantId: "front_full_hold",
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQP4JsJgU0lKD31VJIM0yF8QY1zPa2Kvel08273FTq8oNTwoeNvgDj4gJxCTEXjnY3uD0b8vL-JV9b8rFVuD0FZeKCj32Lmg_lpqykx.mp4",
        fingersUsed: 5
      },
      {
        skillId: "hefesto_001",
        variantId: "hefesto_progress",
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQP4JsJgU0lKD31VJIM0yF8QY1zPa2Kvel08273FTq8oNTwoeNvgDj4gJxCTEXjnY3uD0b8vL-JV9b8rFVuD0FZeKCj32Lmg_lpqykx.mp4",
        fingersUsed: 5
      }
    ],

    // 🌀 Combos creados por el usuario
    combos: [
      {
        comboId: "combo_001",
        comboName: "Static Power Flow",
        description: "Transición entre Full Planche y Front Lever.",
        type: "static",
        skills: [
          {
            skillId: "planche_001",
            variantId: "planche_full_hold",
            holdSeconds: 6,
            auraUsed: 120,
            energyCost: 100
          },
          {
            skillId: "frontlever_001",
            variantId: "front_full_hold",
            holdSeconds: 5,
            auraUsed: 100,
            energyCost: 80
          }
        ],
        totalAuraUsed: 220,
        totalEnergyCost: 180,
        totalDamage: 190,
        createdAt: new Date("2025-10-21")
      },
      {
        comboId: "combo_002",
        comboName: "Dynamic Explosion Flow",
        description: "Secuencia explosiva de Hefesto con transición controlada.",
        type: "dynamic",
        skills: [
          {
            skillId: "hefesto_001",
            variantId: "hefesto_progress",
            reps: 3,
            auraUsed: 150,
            energyCost: 140
          },
          {
            skillId: "planche_001",
            variantId: "planche_full_hold",
            holdSeconds: 4,
            auraUsed: 100,
            energyCost: 90
          }
        ],
        totalAuraUsed: 250,
        totalEnergyCost: 230,
        totalDamage: 260,
        createdAt: new Date("2025-10-27")
      },
      {
        comboId: "combo_003",
        comboName: "Mixed Titan Flow",
        description: "Combinación de control y potencia entre estáticos y dinámicos.",
        type: "mixed",
        skills: [
          {
            skillId: "planche_001",
            variantId: "planche_full_hold",
            holdSeconds: 5,
            auraUsed: 120,
            energyCost: 100
          },
          {
            skillId: "hefesto_001",
            variantId: "hefesto_progress",
            reps: 2,
            auraUsed: 150,
            energyCost: 120
          }
        ],
        totalAuraUsed: 270,
        totalEnergyCost: 220,
        totalDamage: 280,
        createdAt: new Date("2025-11-03")
      }
    ],

    // ⭐ Combo favorito por tipo (usado en VS automáticamente)
    favoriteCombos: {
      static: "combo_001",
      dynamic: "combo_002",
      mixed: "combo_003"
    },
     historialIds: ["h2", "h3", "h6", "h8"],
      followers: ["u2", "u3"], // IDs de usuarios que lo siguen
    following: ["u2", "u4"], // IDs de usuarios a los que sigue

    // 🏆 Sistema de ranking
    rankPoints: 1320, // puntos de ranking global
    rankPosition: 12, // posición general actualizada periódicamente
    totalMatches: 45,
    wins: 30,
    losses: 15,
    winRate: 0.66, // calculado dinámicamente

    // 🧨 Equipos donde participa
    teamIds: ["t1"], 
  },
   {
    _id: "u4",
    name: "Jose Aguilera",
    username: "jose_aguilera",
    country: "Chile",
    videoProfile : "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455258/AQOL7Li3oWbovJ8cMnfqPG1d7RteOSq9ZEiRMdC1y2UnaSpGKnE1BS5g4kIAWmYajgiMfkZ8DR7FsJ1Dp3VTtViDCtd9qj-l_qszwl9.mp4",
    avatar: "/users/jose.jpg",
    altura: 1.75,
    peso: 70,
    favoriteSkills: [
      {
        title: "Full Planche Hold",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455258/AQO9pybeKV6WeZG68_O-UC-6RoxJjuyW0rAoMDAVatyq5Kavv9nG2BGtassG6SciL6peBca9IfSXQnm96ueLn6POY-Vjynfl_uoy0ug.mp4",
      },
      {
        title: "Hefesto Progress",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762456972/AQMveY8lU1os6VJyQMwVGEodysPECtHcvYhYmpYkuxBjtACMdwBwmE9WJBFi5t44r6wViYxMZe2-Yti2X-zNaf1DUSmW-x6L_ufatd3.mp4",
      },
      {
        title: "Full Planche Pushups Combo",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455260/AQM71LeZYpWhqS0uwJGdKE8LIHCIqPs04p_1vGEEVWPL28Hhsv0iGUum3G9x-gU0SmMobXE27FCwteCdP_yH1G-_N5fX32b2_fgeuro.mp4",
      },
    ],
    type: "static",
    staticAu: 2589,
    dynamicAu: 100,
    level: 2689,
      skills: [
      {
        skillId: "planche_001",
        variantId: "planche_full_hold",
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455261/AQPThx860RbajyCeqUspjK-eN9dehUyufJVrqM4rp1vYiyZ93tOKoFBNNcrmAun8ayoj5CVJSs7Mi6AARGAfnxIBEioxfanu_nqxpih.mp4",
        fingersUsed: 2
      },
      {
        skillId: "frontlever_001",
        variantId: "front_full_hold",
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQP4JsJgU0lKD31VJIM0yF8QY1zPa2Kvel08273FTq8oNTwoeNvgDj4gJxCTEXjnY3uD0b8vL-JV9b8rFVuD0FZeKCj32Lmg_lpqykx.mp4",
        fingersUsed: 5
      },
      {
        skillId: "hefesto_001",
        variantId: "hefesto_progress",
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQP4JsJgU0lKD31VJIM0yF8QY1zPa2Kvel08273FTq8oNTwoeNvgDj4gJxCTEXjnY3uD0b8vL-JV9b8rFVuD0FZeKCj32Lmg_lpqykx.mp4",
        fingersUsed: 5
      }
    ],

    // 🌀 Combos creados por el usuario
    combos: [
      {
        comboId: "combo_001",
        comboName: "Static Power Flow",
        description: "Transición entre Full Planche y Front Lever.",
        type: "static",
        skills: [
          {
            skillId: "planche_001",
            variantId: "planche_full_hold",
            holdSeconds: 6,
            auraUsed: 120,
            energyCost: 100
          },
          {
            skillId: "frontlever_001",
            variantId: "front_full_hold",
            holdSeconds: 5,
            auraUsed: 100,
            energyCost: 80
          }
        ],
        totalAuraUsed: 220,
        totalEnergyCost: 180,
        totalDamage: 190,
        createdAt: new Date("2025-10-21")
      },
      {
        comboId: "combo_002",
        comboName: "Dynamic Explosion Flow",
        description: "Secuencia explosiva de Hefesto con transición controlada.",
        type: "dynamic",
        skills: [
          {
            skillId: "hefesto_001",
            variantId: "hefesto_progress",
            reps: 3,
            auraUsed: 150,
            energyCost: 140
          },
          {
            skillId: "planche_001",
            variantId: "planche_full_hold",
            holdSeconds: 4,
            auraUsed: 100,
            energyCost: 90
          }
        ],
        totalAuraUsed: 250,
        totalEnergyCost: 230,
        totalDamage: 260,
        createdAt: new Date("2025-10-27")
      },
      {
        comboId: "combo_003",
        comboName: "Mixed Titan Flow",
        description: "Combinación de control y potencia entre estáticos y dinámicos.",
        type: "mixed",
        skills: [
          {
            skillId: "planche_001",
            variantId: "planche_full_hold",
            holdSeconds: 5,
            auraUsed: 120,
            energyCost: 100
          },
          {
            skillId: "hefesto_001",
            variantId: "hefesto_progress",
            reps: 2,
            auraUsed: 150,
            energyCost: 120
          }
        ],
        totalAuraUsed: 270,
        totalEnergyCost: 220,
        totalDamage: 280,
        createdAt: new Date("2025-11-03")
      }
    ],

    // ⭐ Combo favorito por tipo (usado en VS automáticamente)
    favoriteCombos: {
      static: "combo_001",
      dynamic: "combo_002",
      mixed: "combo_003"
    },
     historialIds: ["h4", "h5", "h8", "h10"],
      followers: ["u2", "u3"], // IDs de usuarios que lo siguen
    following: ["u2", "u4"], // IDs de usuarios a los que sigue

    // 🏆 Sistema de ranking
    rankPoints: 1320, // puntos de ranking global
    rankPosition: 12, // posición general actualizada periódicamente
    totalMatches: 45,
    wins: 30,
    losses: 15,
    winRate: 0.66, // calculado dinámicamente

    // 🧨 Equipos donde participa
    teamIds: ["t1"], 
  },
  {
    _id: "u5",
    name: "Monsster",
    username: "monsster_dev",
    country: "Chile",
    videoProfile : "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762464618/InShot_20250806_203419601_afdpvb.mp4",
    avatar: "/users/monsster.webp",
    altura: 1.75,
    peso: 70,
    favoriteSkills: [
      {
        title: "Full Planche Hold",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762464615/InShot_20250905_202402242_rzfcid.mp4",
      },
      {
        title: "Hefesto Progress",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762464604/InShot_20250628_210515069_sjwyyj.mp4",
      },
      {
        title: "Full Planche Pushups Combo",
        url: "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762464606/InShot_20250924_183418076_c9t5mc.mp4",
      },
    ],
    type: "complete",
    staticAu: 8500,
    dynamicAu: 8500,
    level: 17000,
     skills: [
      {
        skillId: "planche_001",
        variantId: "planche_full_hold",
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455261/AQPThx860RbajyCeqUspjK-eN9dehUyufJVrqM4rp1vYiyZ93tOKoFBNNcrmAun8ayoj5CVJSs7Mi6AARGAfnxIBEioxfanu_nqxpih.mp4",
        fingersUsed: 2
      },
      {
        skillId: "frontlever_001",
        variantId: "front_full_hold",
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQP4JsJgU0lKD31VJIM0yF8QY1zPa2Kvel08273FTq8oNTwoeNvgDj4gJxCTEXjnY3uD0b8vL-JV9b8rFVuD0FZeKCj32Lmg_lpqykx.mp4",
        fingersUsed: 5
      },
      {
        skillId: "hefesto_001",
        variantId: "hefesto_progress",
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQP4JsJgU0lKD31VJIM0yF8QY1zPa2Kvel08273FTq8oNTwoeNvgDj4gJxCTEXjnY3uD0b8vL-JV9b8rFVuD0FZeKCj32Lmg_lpqykx.mp4",
        fingersUsed: 5
      }
    ],

    // 🌀 Combos creados por el usuario
    combos: [
      {
        comboId: "combo_001",
        comboName: "Static Power Flow",
        description: "Transición entre Full Planche y Front Lever.",
        type: "static",
        skills: [
          {
            skillId: "planche_001",
            variantId: "planche_full_hold",
            holdSeconds: 6,
            auraUsed: 120,
            energyCost: 100
          },
          {
            skillId: "frontlever_001",
            variantId: "front_full_hold",
            holdSeconds: 5,
            auraUsed: 100,
            energyCost: 80
          }
        ],
        totalAuraUsed: 220,
        totalEnergyCost: 180,
        totalDamage: 190,
        createdAt: new Date("2025-10-21")
      },
      {
        comboId: "combo_002",
        comboName: "Dynamic Explosion Flow",
        description: "Secuencia explosiva de Hefesto con transición controlada.",
        type: "dynamic",
        skills: [
          {
            skillId: "hefesto_001",
            variantId: "hefesto_progress",
            reps: 3,
            auraUsed: 150,
            energyCost: 140
          },
          {
            skillId: "planche_001",
            variantId: "planche_full_hold",
            holdSeconds: 4,
            auraUsed: 100,
            energyCost: 90
          }
        ],
        totalAuraUsed: 250,
        totalEnergyCost: 230,
        totalDamage: 260,
        createdAt: new Date("2025-10-27")
      },
      {
        comboId: "combo_003",
        comboName: "Mixed Titan Flow",
        description: "Combinación de control y potencia entre estáticos y dinámicos.",
        type: "mixed",
        skills: [
          {
            skillId: "planche_001",
            variantId: "planche_full_hold",
            holdSeconds: 5,
            auraUsed: 120,
            energyCost: 100
          },
          {
            skillId: "hefesto_001",
            variantId: "hefesto_progress",
            reps: 2,
            auraUsed: 150,
            energyCost: 120
          }
        ],
        totalAuraUsed: 270,
        totalEnergyCost: 220,
        totalDamage: 280,
        createdAt: new Date("2025-11-03")
      }
    ],

    // ⭐ Combo favorito por tipo (usado en VS automáticamente)
    favoriteCombos: {
      static: "combo_001",
      dynamic: "combo_002",
      mixed: "combo_003"
    },
    historialIds: ["h5", "h6", "h9"],
     followers: ["u2", "u3"], // IDs de usuarios que lo siguen
    following: ["u2", "u4"], // IDs de usuarios a los que sigue

    // 🏆 Sistema de ranking
    rankPoints: 1320, // puntos de ranking global
    rankPosition: 12, // posición general actualizada periódicamente
    totalMatches: 45,
    wins: 30,
    losses: 15,
    winRate: 0.66, // calculado dinámicamente

    // 🧨 Equipos donde participa
    teamIds: ["t1"], 
  },
]