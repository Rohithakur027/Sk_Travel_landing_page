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

interface SearchboxPlace {
  mapbox_id?: string;
  name?: string;
  full_address?: string;
  place_formatted?: string;
  properties?: {
    name?: string;
    full_address?: string;
    place_formatted?: string;
  };
  geometry?: {
    coordinates?: [number, number];
  };
}

interface SearchboxSuggestResponse {
  suggestions?: SearchboxPlace[];
}

interface SearchboxRetrieveResponse {
  features?: SearchboxPlace[];
}

interface AddressSuggestion {
  id?: string;
  mapbox_id?: string;
  name: string;
  address: string;
  display_name: string;
}

interface SelectedAddressDisplay {
  title: string;
  address: string;
}

// Search Box API endpoints.
const SEARCHBOX_BASE = "https://api.mapbox.com/search/searchbox/v1";

// Bangalore city centre — proximity (ranking) bias for suggestions.
const BANGALORE_PROXIMITY = "77.5946,12.9716";
// Bounding box (minLon,minLat,maxLon,maxLat) ≈ 200 km around Bangalore centre.
// The Search Box API can't be filtered by km on the client (it doesn't return
// coordinates until /retrieve), so we restrict to Bangalore via this bbox
// server-side instead. It's a square, so corners reach a bit past 200 km.
const BANGALORE_BBOX = "75.75,11.16,79.44,14.78";

// A Search Box "session" = many /suggest calls + one /retrieve, billed as a
// single request. The token groups them; after a /retrieve we start a new one.
function newSessionToken(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    // fall through to the manual fallback
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getFullAddress(place?: SearchboxPlace): string {
  const name = place?.name || place?.properties?.name || "";
  const fullAddress = place?.full_address || place?.properties?.full_address;
  if (fullAddress) return fullAddress;

  const formatted = place?.place_formatted || place?.properties?.place_formatted || "";
  return formatted && name ? `${name}, ${formatted}` : name || formatted;
}

function getAddressDisplay(place?: SearchboxPlace): SelectedAddressDisplay | null {
  const title = place?.name || place?.properties?.name || "";
  const fullAddress = place?.full_address || place?.properties?.full_address || "";
  const formatted = place?.place_formatted || place?.properties?.place_formatted || "";
  const address =
    formatted ||
    (title && fullAddress.startsWith(`${title}, `)
      ? fullAddress.slice(title.length + 2)
      : fullAddress);

  if (!title && !address) return null;
  return { title: title || address, address: title ? address : "" };
}

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
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDisplay, setSelectedDisplay] = useState<SelectedAddressDisplay | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  // One session token reused across keystrokes; reset after a pick (retrieve).
  const sessionTokenRef = useRef<string>(newSessionToken());

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

  useEffect(() => {
    if (!value) setSelectedDisplay(null);
  }, [value]);

  const fetchSuggestions = async (rawQuery: string) => {
    // Normalize: collapse whitespace and strip characters Mapbox can't use
    const query = rawQuery.trim().replace(/\s+/g, " ").replace(/[^\w\s,.-]/g, "");
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

    // Search Box /suggest: typeahead suggestions for the raw query, biased to
    // Bangalore via proximity + bbox. Coordinates are NOT returned here — they
    // come from /retrieve when the user picks a suggestion.
    const currentRequest = ++requestIdRef.current;
    setLoading(true);
    try {
      const response = await axios.get<SearchboxSuggestResponse>(`${SEARCHBOX_BASE}/suggest`, {
        params: {
          q: query,
          access_token: mapboxToken,
          session_token: sessionTokenRef.current,
          limit: 5,
          country: "IN",
          language: "en",
          proximity: BANGALORE_PROXIMITY,
          bbox: BANGALORE_BBOX,
        },
      });

      // Drop stale responses if the user kept typing.
      if (currentRequest !== requestIdRef.current) return;

      const features = (response.data.suggestions || []).map((s) => ({
        id: s.mapbox_id,
        mapbox_id: s.mapbox_id,
        // `name` is the primary label (rendered as the title); `place_formatted`
        // is the rest of the address (rendered below). Kept separate so the
        // dropdown can show a two-line title + address layout.
        name: s.name || "",
        address: s.place_formatted || "",
        // Combined label written into the input when the suggestion is picked.
        display_name: getFullAddress(s),
      }));

      setSuggestions(features);
      setShowSuggestions(features.length > 0);
    } catch (error) {
      if (currentRequest === requestIdRef.current) {
        console.error("Mapbox Search Box error:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } finally {
      if (currentRequest === requestIdRef.current) setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedDisplay(null);
    onChange(newValue);
    onCoordinatesChange?.(null); // reset coords when user types manually
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(newValue), 250);
  };

  const handleSuggestionClick = async (suggestion: AddressSuggestion) => {
    setSelectedDisplay({
      title: suggestion.name,
      address: suggestion.address,
    });
    onChange(suggestion.display_name || suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!mapboxToken || !suggestion.mapbox_id) {
      onCoordinatesChange?.(null);
      return;
    }

    // Search Box /retrieve: resolve the picked suggestion to its coordinates.
    // This call closes the billing session, so we rotate the session token.
    setLoading(true);
    try {
      const response = await axios.get<SearchboxRetrieveResponse>(
        `${SEARCHBOX_BASE}/retrieve/${suggestion.mapbox_id}`,
        {
          params: {
            access_token: mapboxToken,
            session_token: sessionTokenRef.current,
          },
        }
      );
      const feature = response.data.features?.[0];
      const coords = feature?.geometry?.coordinates;
      onCoordinatesChange?.(coords ?? null);
      const fullAddress = getFullAddress(feature);
      const display = getAddressDisplay(feature);
      if (fullAddress) onChange(fullAddress);
      if (display) setSelectedDisplay(display);
    } catch (error) {
      console.error("Mapbox Search Box retrieve error:", error);
      onCoordinatesChange?.(null);
    } finally {
      setLoading(false);
      sessionTokenRef.current = newSessionToken(); // start a fresh session
    }
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
          className={`${styles.input} ${selectedDisplay && value ? styles.selectedInput : ""} ${className || ""}`}
          required={required}
          autoComplete="off"
        />
        {selectedDisplay && value && (
          <div className={styles.selectedAddress} aria-hidden="true">
            <span className={styles.selectedTitle}>{selectedDisplay.title}</span>
            {selectedDisplay.address && (
              <span className={styles.selectedSubaddress}>{selectedDisplay.address}</span>
            )}
          </div>
        )}
        {loading && <div className={styles.loader}></div>}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.mapbox_id || `suggestion-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestionItem}
            >
              <span className={styles.suggestionTitle}>{suggestion.name}</span>
              <span className={styles.suggestionAddress}>{suggestion.address}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
