import { ArrowUpRight } from "lucide-react";
import { musicServices } from "../data/musicServices.js";

export default function MusicServices() {
  return (
    <div className="flex items-center gap-2">
      {musicServices.map((service) => (
        <button
          key={service.id}
          type="button"
          onClick={() => window.open(service.url, "_blank", "noopener,noreferrer")}
          aria-label={`Open ${service.label} in a new tab`}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm font-medium text-cream backdrop-blur-sm transition-transform duration-200 hover:scale-[1.03] hover:bg-black/30"
        >
          {service.label}
          <ArrowUpRight size={14} strokeWidth={2.25} />
        </button>
      ))}
    </div>
  );
}
