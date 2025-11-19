export const teams = [
  {
    _id: "t1",
    name: "Static Legends",
    description: "Equipo enfocado en fuerza isométrica y control.",
    createdBy: "u1", // ID del creador
    members: [
      {
        userId: "u1",
        role: "leader", // leader | co-leader | member
      },
      {
        userId: "u2",
        role: "member",
      },
    ],
    createdAt: new Date("2025-11-05"),
    totalWins: 10,
    totalLosses: 3,
    teamRank: 4,
    logo: "/users/logoteam.png",
  },
];