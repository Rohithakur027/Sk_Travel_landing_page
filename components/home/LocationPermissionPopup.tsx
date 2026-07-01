"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2, X } from "lucide-react";

const BANGALORE_PROXIMITY = "77.5946,12.9716";
const RESHOWDELAY_MS = 5000;

interface Props {
  onAllow: (proximity: string) => void;
  onDismiss: () => void;
}

export default function LocationPermissionPopup({ onAllow, onDismiss }: Props) {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const doneRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scheduleReshow = () => {
    if (doneRef.current) return;
    timerRef.current = setTimeout(() => {
      if (doneRef.current) return;
      setVisible(true);
      // brief shake to draw attention when it re-appears
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }, RESHOWDELAY_MS);
  };

  const handleAllow = () => {
    if (!navigator.geolocation) {
      doneRef.current = true;
      setVisible(false);
      onAllow(BANGALORE_PROXIMITY);
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        doneRef.current = true;
        if (timerRef.current) clearTimeout(timerRef.current);
        setVisible(false);
        setLoading(false);
        onAllow(`${pos.coords.longitude},${pos.coords.latitude}`);
      },
      () => {
        doneRef.current = true;
        if (timerRef.current) clearTimeout(timerRef.current);
        setVisible(false);
        setLoading(false);
        onAllow(BANGALORE_PROXIMITY);
      },
      { timeout: 10000 }
    );
  };

  const handleDontAskAgain = () => {
    doneRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    onDismiss();
  };

  const handleBackdropClick = () => {
    setVisible(false);
    scheduleReshow();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(15,23,42,0.5)] p-4 animate-location-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-[360px] rounded-[1.5rem] bg-white px-8 pb-7 pt-9 text-center shadow-[0_24px_64px_-12px_rgba(0,0,0,0.3)] ${
          shake ? "animate-location-shake" : "animate-location-slide-up"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 flex items-center justify-center rounded-md border-0 bg-transparent p-1 text-[#94a3b8] transition-colors duration-150 ease-out hover:bg-[#f1f5f9] hover:text-[#475569]"
          onClick={handleBackdropClick}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[rgba(255,200,57,0.35)] bg-[rgba(255,200,57,0.15)] text-[#d4920a]">
          <MapPin size={26} strokeWidth={2.2} />
        </div>

        <h3 className="mb-[0.6rem] text-[1.15rem] font-bold tracking-[-0.01em] text-[#0f172a]">
          Better Service, Near You
        </h3>
        <p className="mb-7 text-[0.9rem] leading-[1.6] text-[#64748b]">
          Allow location access so we can show the closest pickup points and
          smarter address suggestions around you.
        </p>

        <div className="flex flex-col gap-2">
          <button
            className="flex items-center justify-center gap-[0.45rem] rounded-[0.875rem] border-0 bg-[#ffc839] px-4 py-[0.8rem] text-[0.95rem] font-bold text-[#1e293b] shadow-[0_4px_12px_rgba(255,200,57,0.4)] transition-all duration-[180ms] ease-out hover:enabled:-translate-y-0.5 hover:enabled:bg-[#f5b800] hover:enabled:shadow-[0_6px_18px_rgba(255,200,57,0.5)] active:enabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-[0.65]"
            onClick={handleAllow}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Locating…
              </>
            ) : (
              <>
                <MapPin size={16} />
                Share My Location
              </>
            )}
          </button>
          <button
            className="border-0 bg-transparent p-2 text-[0.82rem] tracking-[0.01em] text-[#94a3b8] transition-colors duration-[180ms] ease-out hover:text-[#475569]"
            onClick={handleDontAskAgain}
          >
            Don&apos;t Ask Again
          </button>
        </div>
      </div>
    </div>
  );
}
