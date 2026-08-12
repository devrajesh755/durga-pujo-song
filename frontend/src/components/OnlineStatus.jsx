// export default function OnlineStatus({ online }) {
//   return (
//     <div
//       className="flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 backdrop-blur-sm"
//       role="status"
//       aria-live="polite"
//     >
//       <span className="relative flex h-2.5 w-2.5">
//         <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
//         <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
//       </span>
//       <span className="text-sm font-medium tracking-wide text-cream">
//         {online === null ? "…" : online} online
//       </span>
//     </div>
//   );
// }

export default function OnlineStatus({ online }) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-2.5 py-0.5 backdrop-blur-md shadow-sm"
        role="status"
        aria-live="polite"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[11px] font-normal tracking-tight text-white/90">
          {online === null ? "…" : online} online
        </span>
      </div>
    </div>
  );
}
