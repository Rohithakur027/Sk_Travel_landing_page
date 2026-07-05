"use client";

import { createContext, ReactNode } from "react";

const BANGALORE_PROXIMITY = "77.5946,12.9716";

interface LocationContextType {
  proximity: string;
}

const LocationContext = createContext<LocationContextType>({
  proximity: BANGALORE_PROXIMITY,
});

export function LocationProvider({ children }: { children: ReactNode }) {
  const proximity = BANGALORE_PROXIMITY;

  return (
    <LocationContext.Provider value={{ proximity }}>
      {children}
    </LocationContext.Provider>
  );
}
