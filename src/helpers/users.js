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
    // stats base
    staticAu: 8589,
    dynamicAu: 1700,
    level: 10289,
    maxEnergy: 500,

    // skills del usuario: SOLO la variante que desbloqueó (Full Planche Hold)
       skills: [
      {
        skillId: "planche_001",
        variantId: "planche_full_hold",
        variantName: "Full Planche Hold (2 dedos, ambas manos)",
        armsUsed: 2,
        fingersUsed: 2,
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455261/AQPThx860RbajyCeqUspjK-eN9dehUyufJVrqM4rp1vYiyZ93tOKoFBNNcrmAun8ayoj5CVJSs7Mi6AARGAfnxIBEioxfanu_nqxpih.mp4",
      },
      {
        skillId: "frontlever_001",
        variantId: "front_full_hold",
        variantName: "Full Front Lever Hold (1 brazo)",
        armsUsed: 1,
        fingersUsed: 5,
        videoUrl:
          "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762455256/AQP4JsJgU0lKD31VJIM0yF8QY1zPa2Kvel08273FTq8oNTwoeNvgDj4gJxCTEXjnY3uD0b8vL-JV9b8rFVuD0FZeKCj32Lmg_lpqykx.mp4",
      }
    ]
  },
   {
    _id: "u2",
    name: "Jasi Svilenova",
    username: "jasi_svilenova",
    country: "Chile",
    videoProfile : "https://res.cloudinary.com/dztgbn3qa/video/upload/v1762457252/AQOtu00Hjj3F0Pmbv2PKb7K8OUqvF3ODxkFptxdx6XKvYfRKI5WBYpud7OXnYxUexSrG4PePVnETcKI7WLjfqg6kSJ_k9IvX_z6vutd.mp4",
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
        skillName: "Full Planche",
        variant: "Full Planche",
        type: "static",
        seconds: 5,
        cleanliness: 0.9,
        arms: 2,
        fingers: 5,
      },
      {
        skillName: "Full Planche Pushups",
        variant: "Full Planche Pushups",
        type: "reps",
        reps: 2,
        cleanliness: 0.85,
        arms: 2,
        fingers: 5,
      },
      {
        skillName: "Hefesto",
        variant: "Hefesto completo",
        type: "reps",
        reps: 2,
        cleanliness: 0.8,
        arms: 2,
        fingers: 5,
      },
    ],
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
        skillName: "Full Planche",
        variant: "Full Planche",
        type: "static",
        seconds: 5,
        cleanliness: 0.9,
        arms: 2,
        fingers: 5,
      },
      {
        skillName: "Full Planche Pushups",
        variant: "Full Planche Pushups",
        type: "reps",
        reps: 2,
        cleanliness: 0.85,
        arms: 2,
        fingers: 5,
      },
      {
        skillName: "Hefesto",
        variant: "Hefesto completo",
        type: "reps",
        reps: 2,
        cleanliness: 0.8,
        arms: 2,
        fingers: 5,
      },
    ],
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
        skillName: "Full Planche",
        variant: "Full Planche",
        type: "static",
        seconds: 5,
        cleanliness: 0.9,
        arms: 2,
        fingers: 5,
      },
      {
        skillName: "Full Planche Pushups",
        variant: "Full Planche Pushups",
        type: "reps",
        reps: 2,
        cleanliness: 0.85,
        arms: 2,
        fingers: 5,
      },
      {
        skillName: "Hefesto",
        variant: "Hefesto completo",
        type: "reps",
        reps: 2,
        cleanliness: 0.8,
        arms: 2,
        fingers: 5,
      },
    ],
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
        skillName: "Full Planche",
        variant: "Full Planche",
        type: "static",
        seconds: 5,
        cleanliness: 0.9,
        arms: 2,
        fingers: 5,
      },
      {
        skillName: "Full Planche Pushups",
        variant: "Full Planche Pushups",
        type: "reps",
        reps: 2,
        cleanliness: 0.85,
        arms: 2,
        fingers: 5,
      },
      {
        skillName: "Hefesto",
        variant: "Hefesto completo",
        type: "reps",
        reps: 2,
        cleanliness: 0.8,
        arms: 2,
        fingers: 5,
      },
    ],
  },
]