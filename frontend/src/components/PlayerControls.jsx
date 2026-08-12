import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export default function PlayerControls({ isPlaying, onTogglePlay, onNext, onPrevious }) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous song"
        className="text-cream/70 transition-colors hover:text-cream"
      >
        <SkipBack size={20} fill="currentColor" />
      </button>

      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-charcoal shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <Pause size={20} fill="currentColor" />
        ) : (
          <Play size={20} fill="currentColor" className="ml-0.5" />
        )}
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next song"
        className="text-cream/70 transition-colors hover:text-cream"
      >
        <SkipForward size={20} fill="currentColor" />
      </button>
    </div>
  );
}
