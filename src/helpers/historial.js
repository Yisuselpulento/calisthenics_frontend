// src/data/historial.js
export const historial = [
  {
    _id: "h1",
    userId: "u1",
    opponentId: "u2",
    date: new Date("2025-10-25T14:20:00Z"),
    mode: "static",
    result: "win",
    score: { user: 350, opponent: 290 },
    duration: "3:45",
    videoUrl: "https://res.cloudinary.com/.../h1.mp4"
  },
  {
    _id: "h2",
    userId: "u2",
    opponentId: "u3",
    date: new Date("2025-10-27T10:30:00Z"),
    mode: "dynamic",
    result: "win",
    score: { user: 410, opponent: 370 },
    duration: "4:10",
    videoUrl: "https://res.cloudinary.com/.../h2.mp4"
  },
  {
    _id: "h3",
    userId: "u3",
    opponentId: "u1",
    date: new Date("2025-10-29T18:05:00Z"),
    mode: "mixed",
    result: "lose",
    score: { user: 320, opponent: 340 },
    duration: "3:20",
    videoUrl: "https://res.cloudinary.com/.../h3.mp4"
  },
  {
    _id: "h4",
    userId: "u1",
    opponentId: "u4",
    date: new Date("2025-11-01T12:40:00Z"),
    mode: "mixed",
    result: "win",
    score: { user: 420, opponent: 390 },
    duration: "4:00",
    videoUrl: "https://res.cloudinary.com/.../h4.mp4"
  },
  {
    _id: "h5",
    userId: "u4",
    opponentId: "u5",
    date: new Date("2025-11-02T16:10:00Z"),
    mode: "static",
    result: "lose",
    score: { user: 280, opponent: 310 },
    duration: "3:15",
    videoUrl: "https://res.cloudinary.com/.../h5.mp4"
  },
  {
    _id: "h6",
    userId: "u5",
    opponentId: "u3",
    date: new Date("2025-11-03T09:50:00Z"),
    mode: "static",
    result: "win",
    score: { user: 500, opponent: 300 },
    duration: "5:00",
    videoUrl: "https://res.cloudinary.com/.../h6.mp4"
  },
  {
    _id: "h7",
    userId: "u2",
    opponentId: "u1",
    date: new Date("2025-11-04T20:00:00Z"),
    mode: "mixed",
    result: "lose",
    score: { user: 320, opponent: 400 },
    duration: "3:10",
    videoUrl: "https://res.cloudinary.com/.../h7.mp4"
  },
  {
    _id: "h8",
    userId: "u3",
    opponentId: "u4",
    date: new Date("2025-11-05T14:30:00Z"),
    mode: "dynamic",
    result: "win",
    score: { user: 410, opponent: 370 },
    duration: "4:10",
    videoUrl: "https://res.cloudinary.com/.../h8.mp4"
  },
  {
    _id: "h9",
    userId: "u5",
    opponentId: "u1",
    date: new Date("2025-11-06T11:15:00Z"),
    mode: "static",
    result: "win",
    score: { user: 330, opponent: 295 },
    duration: "3:40",
    videoUrl: "https://res.cloudinary.com/.../h9.mp4"
  },
  {
    _id: "h10",
    userId: "u4",
    opponentId: "u2",
    date: new Date("2025-11-07T19:00:00Z"),
    mode: "mixed",
    result: "win",
    score: { user: 400, opponent: 390 },
    duration: "3:50",
    videoUrl: "https://res.cloudinary.com/.../h10.mp4"
  }
];
