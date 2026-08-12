// import { Volume2, VolumeX } from "lucide-react";
// import ProgressBar from "./ProgressBar.jsx";
// import PlayerControls from "./PlayerControls.jsx";

// export default function MusicPlayer({ player, songsState }) {
//   const { song, isPlaying, currentTime, duration, isLoading, error, isMuted } = player;

//   if (songsState === "loading") {
//     return (
//       <div className="animate-slide-up mx-auto mb-6 w-[min(680px,calc(100vw-32px))] rounded-2xl border border-white/15 bg-black/30 px-6 py-5 text-center text-sm text-cream/80 backdrop-blur-xl">
//         Loading songs…
//       </div>
//     );
//   }

//   if (songsState === "error") {
//     return (
//       <div className="animate-slide-up mx-auto mb-6 w-[min(680px,calc(100vw-32px))] rounded-2xl border border-white/15 bg-black/30 px-6 py-5 text-center text-sm text-cream/80 backdrop-blur-xl">
//         Backend unavailable — showing offline tracks.
//       </div>
//     );
//   }

//   if (!song) {
//     return (
//       <div className="animate-slide-up mx-auto mb-6 w-[min(680px,calc(100vw-32px))] rounded-2xl border border-white/15 bg-black/30 px-6 py-5 text-center text-sm text-cream/80 backdrop-blur-xl">
//         No songs available.
//       </div>
//     );
//   }

//   return (
//     <div
//       className="animate-slide-up mx-auto mb-6 w-[min(680px,calc(100vw-32px))] rounded-2xl border border-white/15 px-5 py-4 shadow-2xl sm:px-6 sm:py-5"
//       style={{
//         background: "rgba(30, 18, 12, 0.45)",
//         backdropFilter: "blur(18px)",
//         WebkitBackdropFilter: "blur(18px)"
//       }}
//     >
//       <div className="flex items-center gap-4">
//         <img
//           src={song.artwork}
//           alt={`${song.title} album artwork`}
//           className="h-14 w-14 shrink-0 rounded-xl object-cover shadow-md sm:h-16 sm:w-16"
//           loading="lazy"
//         />

//         <div className="min-w-0 flex-1">
//           <p className="truncate text-sm font-semibold text-cream sm:text-base">
//             {song.title}
//           </p>
//           <p className="truncate text-xs text-cream/60 sm:text-sm">{song.artist}</p>
//         </div>

//         <button
//           type="button"
//           onClick={player.toggleMute}
//           aria-label={isMuted ? "Unmute" : "Mute"}
//           className="hidden shrink-0 text-cream/60 transition-colors hover:text-cream sm:block"
//         >
//           {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
//         </button>
//       </div>

//       {error && (
//         <p role="alert" className="mt-2 text-xs text-muted-pink">
//           {error}
//         </p>
//       )}

//       <div className="mt-4">
//         <ProgressBar
//           currentTime={currentTime}
//           duration={duration || 0}
//           onSeek={player.seek}
//         />
//       </div>

//       <div className="mt-3 flex items-center justify-center">
//         <PlayerControls
//           isPlaying={isPlaying}
//           onTogglePlay={player.togglePlay}
//           onNext={player.next}
//           onPrevious={player.previous}
//         />
//       </div>

//       {isLoading && (
//         <p className="mt-2 text-center text-[11px] text-cream/50">Buffering…</p>
//       )}
//     </div>
//   );
// }

import { Volume2, VolumeX } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import PlayerControls from "./PlayerControls.jsx";

export default function MusicPlayer({ player, songsState }) {
  const { song, isPlaying, currentTime, duration, isLoading, error, isMuted } = player;

  // Helper to format seconds into m:ss
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (songsState === "loading") {
    return (
      <div className="animate-slide-up mx-auto mb-16 -translate-y-6 w-[min(560px,calc(100vw-32px))] rounded-full border border-white/10 bg-black/40 px-6 py-3 text-center text-xs text-cream/80 backdrop-blur-2xl">
        Loading songs…
      </div>
    );
  }

  if (songsState === "error") {
    return (
      <div className="animate-slide-up mx-auto mb-16 -translate-y-6 w-[min(560px,calc(100vw-32px))] rounded-full border border-white/10 bg-black/40 px-6 py-3 text-center text-xs text-cream/80 backdrop-blur-2xl">
        Backend unavailable — showing offline tracks.
      </div>
    );
  }

  if (!song) {
    return (
      <div className="animate-slide-up mx-auto mb-16 -translate-y-6 w-[min(560px,calc(100vw-32px))] rounded-full border border-white/10 bg-black/40 px-6 py-3 text-center text-xs text-cream/80 backdrop-blur-2xl">
        No songs available.
      </div>
    );
  }

  return (
    <div
      className="animate-slide-up mx-auto mb-16 -translate-y-6 w-[min(560px,calc(100vw-32px))] rounded-full border border-white/10 p-3.5 shadow-2xl"
      style={{
        background: "rgba(35, 20, 18, 0.55)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)"
      }}
    >
      <div className="flex items-center justify-between gap-4 px-1">
        {/* Left Side: Artwork + Info + Progress Bar */}
        <div className="flex min-w-0 flex-1 items-center gap-3.5">
          <img
            src={song.artwork}
            alt={`${song.title} album artwork`}
            className="h-12 w-12 shrink-0 rounded-full object-cover shadow-md"
            loading="lazy"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              {song.title}
            </p>
            <p className="truncate text-[11px] text-white/60">
              {song.artist}
            </p>

            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex-1">
                <ProgressBar
                  currentTime={currentTime}
                  duration={duration || 0}
                  onSeek={player.seek}
                />
              </div>
            </div>

            {/* Timestamps directly under progress bar */}
            <div className="mt-1 text-[10px] text-white/50">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>

        {/* Right Side: Control Buttons */}
        <div className="flex shrink-0 items-center gap-2 pr-1">
          <PlayerControls
            isPlaying={isPlaying}
            onTogglePlay={player.togglePlay}
            onNext={player.next}
            onPrevious={player.previous}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-1 text-center text-[10px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}