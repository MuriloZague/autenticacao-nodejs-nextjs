import { useState, useEffect } from "react";

export function useCountdown(initialSeconds: number) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [prevInitial, setPrevInitial] = useState(initialSeconds);

  if (prevInitial !== initialSeconds) {
    setPrevInitial(initialSeconds);
    setRemaining(initialSeconds);
  }

  useEffect(() => {
    if (initialSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds]);

  return remaining;
}

export function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
