import { useEffect, useState } from "react";
import OnlineStatus from "./OnlineStatus.jsx";
import MusicServices from "./MusicServices.jsx";

function formatTime(date) {
  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
    .toLowerCase();
}

export default function TopBar({ online }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000 * 10);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative z-10 flex w-full flex-wrap items-center justify-between gap-3 px-5 pt-6 sm:px-8 sm:pt-8">
      <time
        dateTime={time.toISOString()}
        className="text-base font-medium tracking-wide text-white sm:text-lg"
      >
        {formatTime(time)}
      </time>

      <div className="order-3 mx-auto sm:order-2 sm:mx-0">
        <OnlineStatus online={online} />
      </div>

      <div className="order-2 sm:order-3">
        <MusicServices />
      </div>
    </header>
  );
}
