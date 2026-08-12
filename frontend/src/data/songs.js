// Fallback catalogue used only if the Express API cannot be reached.
// The real source of truth is GET /api/songs on the backend.

export const fallbackSongs = [
  {
    id: 1,
    title: "Mujhse Mohabbat Ka Izhaar Karta",
    artist: "Satrang Music Official",
    duration: "5:04",
    artwork: "/assets/album-placeholder-1.svg",
    audio: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
  },
  {
    id: 2,
    title: "Kolkata Evening",
    artist: "Indian Street Sessions",
    duration: "4:32",
    artwork: "/assets/album-placeholder-2.svg",
    audio: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8e70c5991.mp3"
  }
];
