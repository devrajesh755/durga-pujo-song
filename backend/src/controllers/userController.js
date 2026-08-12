// In a production build this would read from a live presence
// store (Redis, websocket connection count, etc). For now it
// returns a plausible, slowly-varying number so the frontend has
// a real endpoint to call.

let baseline = 34;

export function getOnlineUsers(req, res) {
  const drift = Math.floor(Math.random() * 5) - 2; // -2..+2
  const online = Math.max(1, baseline + drift);
  res.status(200).json({ online });
}
