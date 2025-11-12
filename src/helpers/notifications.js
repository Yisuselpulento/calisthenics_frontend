export const notifications = [
  {
    _id: "n1",
    userId: "u1", // currentUser._id
    type: "friend_request",
    message: "Tienes una nueva solicitud de amistad de @FlexMaster",
    createdAt: new Date("2025-11-10T14:30:00"),
    read: false,
  },
  {
    _id: "n2",
    userId: "u1",
    type: "team_invite",
    message: "Has sido invitado al equipo Static Legends",
    createdAt: new Date("2025-11-11T09:15:00"),
    read: true,
  },
  {
    _id: "n3",
    userId: "u1",
    type: "match_result",
    message: "Ganaste tu último match contra @BarMaster",
    createdAt: new Date("2025-11-12T08:00:00"),
    read: false,
  },
];
