import { useEffect, useState } from "react";
import Background from "./components/Background.jsx";
import TopBar from "./components/TopBar.jsx";
import HeroTitle from "./components/HeroTitle.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import { useAudioPlayer } from "./hooks/useAudioPlayer.js";
import { fetchSongs, fetchOnlineUsers } from "./services/api.js";
import { fallbackSongs } from "./data/songs.js";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [songsState, setSongsState] = useState("loading"); // loading | ready | error
  const [online, setOnline] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchSongs()
      .then((data) => {
        if (cancelled) return;
        if (!data || data.length === 0) {
          setSongs([]);
          setSongsState("ready");
        } else {
          setSongs(data);
          setSongsState("ready");
        }
      })
      .catch(() => {
        if (cancelled) return;
        setSongs(fallbackSongs);
        setSongsState("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    function poll() {
      fetchOnlineUsers()
        .then((count) => {
          if (!cancelled) setOnline(count);
        })
        .catch(() => {
          if (!cancelled) setOnline((prev) => prev ?? 34);
        });
    }

    poll();
    const id = setInterval(poll, 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const player = useAudioPlayer(songs);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Background />
      <TopBar online={online} />
      <HeroTitle />
      <MusicPlayer player={player} songsState={songsState} />
    </div>
  );
}
