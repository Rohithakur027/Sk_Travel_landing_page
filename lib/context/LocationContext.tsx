"use client";

import { createContext, useContext, ReactNode } from "react";
// Location-permission popup is unwired — proximity is fixed to Bangalore.
// Kept here (commented) so it can be re-enabled later without rebuilding.
// import LocationPermissionPopup from "@/components/home/LocationPermissionPopup";

const BANGALORE_PROXIMITY = "77.5946,12.9716";

interface LocationContextType {
  proximity: string;
}

const LocationContext = createContext<LocationContextType>({
  proximity: BANGALORE_PROXIMITY,
});

export function useLocation() {
  return useContext(LocationContext);
}

export function LocationProvider({ children }: { children: ReactNode }) {
  // User-location logic removed: proximity is now fixed to Bangalore.
  // The permission popup is unwired (not deleted) — see the commented block below.
  const proximity = BANGALORE_PROXIMITY;

  // --- Unwired location-permission popup (kept for easy re-enable) ---
  // const [proximity, setProximity] = useState<string>(() => {
  //   if (typeof window === "undefined") return BANGALORE_PROXIMITY;
  //   return sessionStorage.getItem(SESSION_KEY) || BANGALORE_PROXIMITY;
  // });
  // const [done, setDone] = useState<boolean>(() => {
  //   if (typeof window === "undefined") return false;
  //   return sessionStorage.getItem(SESSION_KEY) !== null;
  // });
  // const handleAllow = (prox: string) => {
  //   sessionStorage.setItem(SESSION_KEY, prox);
  //   setProximity(prox);
  //   setDone(true);
  // };
  // const handleDismiss = () => {
  //   sessionStorage.setItem(SESSION_KEY, BANGALORE_PROXIMITY);
  //   setDone(true);
  // };

  return (
    <LocationContext.Provider value={{ proximity }}>
      {/* {!done && (
        <LocationPermissionPopup onAllow={handleAllow} onDismiss={handleDismiss} />
      )} */}
      {children}
    </LocationContext.Provider>
  );
}
