const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `Request to ${path} failed (${response.status})`);
  }

  return response.json();
}

export async function fetchSongs() {
  const data = await request("/songs");
  return data.songs;
}

export async function fetchSongById(id) {
  const data = await request(`/songs/${id}`);
  return data.song;
}

export async function fetchOnlineUsers() {
  const data = await request("/users/online");
  return data.online;
}

export async function fetchHealth() {
  return request("/health");
}
