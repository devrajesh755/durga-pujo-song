function formatSeconds(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function ProgressBar({ currentTime, duration, onSeek }) {
  const percent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex w-full items-center gap-3">
      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-cream/70">
        {formatSeconds(currentTime)}
      </span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(currentTime, duration || 0)}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="Seek song position"
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-terracotta"
        style={{
          background: `linear-gradient(to right, #E08A3E ${percent}%, rgba(255,255,255,0.2) ${percent}%)`
        }}
      />
      <span className="w-10 shrink-0 text-xs tabular-nums text-cream/70">
        {formatSeconds(duration)}
      </span>
    </div>
  );
}
