"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2, X } from "lucide-react";
import styles from "./LocationPermissionPopup.module.css";

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
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div
        className={`${styles.popup} ${shake ? styles.shake : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeBtn}
          onClick={handleBackdropClick}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className={styles.iconWrap}>
          <MapPin size={26} strokeWidth={2.2} />
        </div>

        <h3 className={styles.title}>Better Service, Near You</h3>
        <p className={styles.body}>
          Allow location access so we can show the closest pickup points and
          smarter address suggestions around you.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.allowBtn}
            onClick={handleAllow}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={16} className={styles.spinner} />
                Locating…
              </>
            ) : (
              <>
                <MapPin size={16} />
                Share My Location
              </>
            )}
          </button>
          <button className={styles.dismissBtn} onClick={handleDontAskAgain}>
            Don&apos;t Ask Again
          </button>
        </div>
      </div>
    </div>
  );
}
