import { useCallback, useEffect, useRef, useState } from "react";

function parseDurationLabel(label) {
  if (!label) return 0;
  const [m, s] = label.split(":").map(Number);
  return m * 60 + s;
}

export function useAudioPlayer(songs) {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const song = songs && songs.length > 0 ? songs[index] : null;

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration || parseDurationLabel(song?.duration));
      setIsLoading(false);
    };
    const onEnded = () => handleNext();
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    const onError = () => {
      setIsLoading(false);
      setError("This track could not be loaded.");
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    setError(null);
    setIsLoading(true);
    setCurrentTime(0);
    audio.src = song.audio;
    audio.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audio.play().catch(() => setError("Playback was blocked. Tap play again."));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song?.id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setError("Playback was blocked. Tap play again."));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    isPlaying ? pause() : play();
  }, [isPlaying, play, pause]);

  const handleNext = useCallback(() => {
    if (!songs || songs.length === 0) return;
    setIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  }, [songs]);

  const handlePrevious = useCallback(() => {
    if (!songs || songs.length === 0) return;
    setIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  }, [songs]);

  const seek = useCallback((time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  return {
    song,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    error,
    play,
    pause,
    togglePlay,
    next: handleNext,
    previous: handlePrevious,
    seek,
    setVolume,
    toggleMute
  };
}
