import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./AddressAutocomplete.module.css";

interface AddressAutocompleteProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onCoordinatesChange?: (coords: [number, number] | null) => void;
  leftIcon?: React.ReactNode;
  required?: boolean;
  className?: string;
  wrapperClassName?: string;
  iconClassName?: string;
}

// Bias all results toward Bangalore so every locality, layout, and
// neighbourhood (Whitefield, Koramangala, HSR, Yelahanka, Anekal, etc.)
// ranks first. We intentionally do NOT pass a bbox so users can still pick
// major metros outside Karnataka.
const BANGALORE_PROXIMITY = "77.5946,12.9716";
const BANGALORE_KEYWORDS = ["bangalore", "bengaluru", "karnataka"];

// Outside Bangalore, only allow these big Indian cities through. Anything
// else (small towns, villages) gets filtered out.
const BIG_CITIES_OUTSIDE_BANGALORE = new Set([
  "mumbai", "delhi", "new delhi", "chennai", "hyderabad", "kolkata",
  "pune", "ahmedabad", "jaipur", "lucknow", "surat", "kanpur", "nagpur",
  "indore", "bhopal", "visakhapatnam", "patna", "vadodara", "ghaziabad",
  "ludhiana", "agra", "nashik", "faridabad", "meerut", "rajkot", "varanasi",
  "coimbatore", "kochi", "chandigarh", "mysore", "mysuru", "mangalore", "mangaluru",
]);

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  id,
  placeholder,
  value,
  onChange,
  onCoordinatesChange,
  leftIcon,
  required,
  className,
  wrapperClassName,
  iconClassName,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const fetchSuggestions = async (rawQuery: string) => {
    const query = rawQuery.trim();
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!mapboxToken) {
      console.error("Mapbox access token is missing");
      return;
    }

    // Detect whether the user is searching outside Bangalore. If they typed
    // a big-city name (Mumbai, Delhi, etc.) we let it through unmodified so
    // Mapbox can resolve it. Otherwise we append "Bangalore" so generic
    // queries like "HSR" or "Koramangala" stay biased to the city.
    const lowered = query.toLowerCase();
    const hasBangaloreHint = BANGALORE_KEYWORDS.some((kw) => lowered.includes(kw));
    const hasBigCityHint = Array.from(BIG_CITIES_OUTSIDE_BANGALORE).some((c) =>
      lowered.includes(c)
    );
    const searchQuery = hasBangaloreHint || hasBigCityHint ? query : `${query}, Bangalore`;

    const currentRequest = ++requestIdRef.current;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`,
        {
          params: {
            access_token: mapboxToken,
            limit: 10,
            country: "IN",
            proximity: BANGALORE_PROXIMITY,
            language: "en",
            autocomplete: true,
            // Cover localities, neighborhoods, streets, landmarks, POIs, plus
            // city-level "place" results so big metros surface too.
            types: "place,locality,neighborhood,address,poi,district,postcode",
          },
        }
      );

      // Drop stale responses if the user kept typing.
      if (currentRequest !== requestIdRef.current) return;

      const features = (response.data.features || [])
        .filter((f: any) => {
          const name = (f.place_name || "").toLowerCase();
          const text = (f.text || "").toLowerCase();
          const placeTypes: string[] = f.place_type || [];

          // Always keep Bangalore-area results — every locality, layout,
          // neighbourhood, POI inside the city.
          if (BANGALORE_KEYWORDS.some((kw) => name.includes(kw))) return true;

          // Outside Bangalore, only allow whitelisted big cities at the
          // city level (Mapbox tags those with place_type "place").
          if (placeTypes.includes("place") && BIG_CITIES_OUTSIDE_BANGALORE.has(text)) {
            return true;
          }

          return false;
        })
        .map((f: any) => ({
          id: f.id || f.center.join(","),
          display_name: f.place_name || f.text,
          center: f.center as [number, number], // [lng, lat]
        }));

      setSuggestions(features);
      setShowSuggestions(features.length > 0);
    } catch (error) {
      if (currentRequest === requestIdRef.current) {
        console.error("Mapbox API error:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } finally {
      if (currentRequest === requestIdRef.current) setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    onCoordinatesChange?.(null); // reset coords when user types manually
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(newValue), 250);
  };

  const handleSuggestionClick = (suggestion: any) => {
    onChange(suggestion.display_name);
    onCoordinatesChange?.(suggestion.center ?? null);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={`${styles.container} ${wrapperClassName || ""}`} ref={containerRef}>
      <div className={styles.inputWrapper}>
        {leftIcon && <div className={`${styles.iconLeft} ${iconClassName || ""}`}>{leftIcon}</div>}
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          className={`${styles.input} ${className || ""}`}
          required={required}
          autoComplete="off"
        />
        {loading && <div className={styles.loader}></div>}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.id}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestionItem}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
